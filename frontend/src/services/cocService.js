import axios from 'axios';

const API_BASE_URL = 'https://cocbackend-kohl.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL
});

export const getPlayerInfo = async (playerTag) => {
    try {
        // Remove # from the tag if present
        const formattedTag = playerTag.startsWith('#') ? playerTag.substring(1) : playerTag;
        const response = await api.get(`/players/${formattedTag}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player info:', error);
        throw error;
    }
};

export const getPlayerDetails = async (playerTag) => {
    try {
        const playerInfo = await getPlayerInfo(playerTag);
        return {
            name: playerInfo.name,
            townHallLevel: playerInfo.townHallLevel,
            expLevel: playerInfo.expLevel,
            trophies: playerInfo.trophies,
            bestTrophies: playerInfo.bestTrophies,
            warStars: playerInfo.warStars,
            attackWins: playerInfo.attackWins,
            defenseWins: playerInfo.defenseWins,
            builderHallLevel: playerInfo.builderHallLevel,
            troops: playerInfo.troops,
            heroes: playerInfo.heroes,
            spells: playerInfo.spells,
            defenses: playerInfo.defenses
        };
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw error;
    }
}; 