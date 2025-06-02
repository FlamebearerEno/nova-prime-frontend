import React, { useState, useEffect } from 'react';
import './Leaderboards.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('level');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${backendUrl}/leaderboards`);
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard.');
      }
    };

    fetchLeaderboard();
  }, []);

  const sortLeaderboard = () => {
    const sorted = [...leaderboard];
    if (activeTab === 'level') {
      sorted.sort((a, b) => b.level - a.level || b.xp - a.xp);
    } else if (activeTab === 'xp') {
      sorted.sort((a, b) => b.xp - a.xp || b.level - a.level);
    } else if (activeTab === 'shards') {
      sorted.sort((a, b) => b.memoryShards - a.memoryShards || b.level - a.level);
    }
    return sorted;
  };

  const sortedLeaderboard = sortLeaderboard();

  return (
    <div className="leaderboard">
      <h2>🌌 Leaderboards</h2>
      <div className="tabs">
        <button className={activeTab === 'level' ? 'active' : ''} onClick={() => setActiveTab('level')}>Level</button>
        <button className={activeTab === 'xp' ? 'active' : ''} onClick={() => setActiveTab('xp')}>XP</button>
        <button className={activeTab === 'shards' ? 'active' : ''} onClick={() => setActiveTab('shards')}>Shards</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {sortedLeaderboard.map((user, index) => (
          <li key={index}>
  		<strong>{index + 1}. {user.title} - {user.name}</strong>
  		{activeTab === 'level' && <> - Level {user.level}</>}
  		{activeTab === 'xp' && <> - {user.xp} Experience</>}
		{activeTab === 'shards' && <> - {user.memoryShards} Memory Shards</>}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboards;
