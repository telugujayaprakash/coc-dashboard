import React, { useState } from 'react';
import { getPlayerInfo } from './services/cocService';
import './index.css';

function App() {
  const [playerTag, setPlayerTag] = useState('');
  const [playerInfo, setPlayerInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerTag) {
      setError('Please enter a player tag');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await getPlayerInfo(playerTag);
      setPlayerInfo(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch player information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-orange-50 px-4 py-6">

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          id="playerTag"
          type="text"
          value={playerTag}
          onChange={(e) => setPlayerTag(e.target.value)}
          placeholder="Enter game ID (e.g., #G9JVPPJ80)"
          className="px-4 py-2 rounded-full border border-gray-400 w-full md:w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Player Info */}
      {playerInfo && (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 space-y-8">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-600">
              Supercell Pic
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">{playerInfo.name} <span className="text-sm text-gray-500">{playerInfo.tag}</span></h2>
              <p className="text-sm text-gray-600">Exp Level: {playerInfo.expLevel}</p>
              <p className="text-sm text-gray-600">Role: {playerInfo.role}</p>
            </div>
            {/* League Icon */}
            {playerInfo.league?.iconUrls?.medium && (
              <div className="text-center">
                <img src={playerInfo.league.iconUrls.medium} alt="League" className="w-16 h-16 mx-auto" />
                <p className="text-sm text-gray-600 mt-1">{playerInfo.league.name}</p>
              </div>
            )}
          </div>

          {/* Clan Info */}
          {playerInfo.clan && (
            <div className="flex items-center gap-4">
              <img src={playerInfo.clan.badgeUrls.medium} alt="Clan Badge" className="w-14 h-14" />
              <div>
                <h3 className="text-lg font-semibold text-orange-600">{playerInfo.clan.name}</h3>
                <p className="text-sm text-gray-600">Level: {playerInfo.clan.clanLevel} | Tag: {playerInfo.clan.tag}</p>
              </div>
            </div>
          )}

          {/* Home Village Section */}
          <div>
            <h2 className="text-xl font-semibold text-orange-600 mb-3">🏰 Home Village</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Town Hall Level:</strong> {playerInfo.townHallLevel}</p>
              <p><strong>Town Hall Weapon Level:</strong> {playerInfo.townHallWeaponLevel}</p>
              <p><strong>Trophies:</strong> {playerInfo.trophies}</p>
              <p><strong>Best Trophies:</strong> {playerInfo.bestTrophies}</p>
              <p><strong>War Stars:</strong> {playerInfo.warStars}</p>
              <p><strong>Attack Wins:</strong> {playerInfo.attackWins}</p>
              <p><strong>Defense Wins:</strong> {playerInfo.defenseWins}</p>
              <p><strong>War Preference:</strong> {playerInfo.warPreference === 'in' ? 'In War' : 'Out'}</p>
              <p><strong>Donations:</strong> {playerInfo.donations}</p>
              <p><strong>Donations Received:</strong> {playerInfo.donationsReceived}</p>
              <p><strong>Clan Capital Contributions:</strong> {playerInfo.clanCapitalContributions.toLocaleString()}</p>
            </div>
            {/* Home Village Army Section */}
            <div>
              <h2 className="text-xl font-semibold text-green-600 mb-3">🪖 Home Village Army</h2>

              {/* Troops */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Troops</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {playerInfo.troops
                    .filter(troop => troop.village === 'home')
                    .map((troop, idx) => (
                      <div key={idx} className="bg-orange-100 rounded-lg p-3 shadow text-center">
                        <p className="font-medium">{troop.name}</p>
                        <p className="text-sm text-gray-600">Level: {troop.level}</p>
                        {troop.maxLevel !== troop.level && (
                          <p className="text-xs text-orange-500">Max: {troop.maxLevel}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Spells */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Spells</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {playerInfo.spells
                    .filter(spell => spell.village === 'home')
                    .map((spell, idx) => (
                      <div key={idx} className="bg-blue-100 rounded-lg p-3 shadow text-center">
                        <p className="font-medium">{spell.name}</p>
                        <p className="text-sm text-gray-600">Level: {spell.level}</p>
                        {spell.maxLevel !== spell.level && (
                          <p className="text-xs text-blue-500">Max: {spell.maxLevel}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Heroes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Heroes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {playerInfo.heroes
                    .filter(hero => hero.village === 'home')
                    .map((hero, idx) => (
                      <div key={idx} className="bg-purple-100 rounded-lg p-3 shadow text-center">
                        <p className="font-medium">{hero.name}</p>
                        <p className="text-sm text-gray-600">Level: {hero.level}</p>
                        {hero.maxLevel !== hero.level && (
                          <p className="text-xs text-purple-500">Max: {hero.maxLevel}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

          </div>

          {/* Builder Base Section */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-3">🛠️ Builder Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Builder Hall Level:</strong> {playerInfo.builderHallLevel}</p>
              <p><strong>Versus Trophies:</strong> {playerInfo.builderBaseTrophies}</p>
              <p><strong>Best Versus Trophies:</strong> {playerInfo.bestBuilderBaseTrophies}</p>
              {playerInfo.builderBaseLeague && (
                <p><strong>League:</strong> {playerInfo.builderBaseLeague.name}</p>
              )}
            </div>
            {/* Builder Base Army Section */}
            <div>
              <h2 className="text-xl font-semibold text-yellow-600 mb-3">🔧 Builder Base Army</h2>

              {/* Builder Troops */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Troops</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {playerInfo.troops
                    .filter(troop => troop.village === 'builderBase')
                    .map((troop, idx) => (
                      <div key={idx} className="bg-yellow-100 rounded-lg p-3 shadow text-center">
                        <p className="font-medium">{troop.name}</p>
                        <p className="text-sm text-gray-600">Level: {troop.level}</p>
                        {troop.maxLevel !== troop.level && (
                          <p className="text-xs text-yellow-500">Max: {troop.maxLevel}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Builder Heroes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Heroes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {playerInfo.heroes
                    .filter(hero => hero.village === 'builderBase')
                    .map((hero, idx) => (
                      <div key={idx} className="bg-amber-100 rounded-lg p-3 shadow text-center">
                        <p className="font-medium">{hero.name}</p>
                        <p className="text-sm text-gray-600">Level: {hero.level}</p>
                        {hero.maxLevel !== hero.level && (
                          <p className="text-xs text-amber-500">Max: {hero.maxLevel}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
