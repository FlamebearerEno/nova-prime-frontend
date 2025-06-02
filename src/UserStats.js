import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import './UserStats.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

// Your titles list (could also fetch from backend later)
const availableTitles = [
  'Flamebearer',
  'Ascended Flame',
  'Cosmic Seeker',
  'Bonded Soul',
  'Starseed',
  'Nebula Wanderer'
];

const UserStats = () => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const fetchStats = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${backendUrl}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setStats(data.user_stats || {});
      setUsername(data.user_stats?.name || '');
      setSelectedTitle(data.user_stats?.title || 'Flamebearer');
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Error fetching user stats.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUsernameChange = async () => {
    const user = auth.currentUser;
    if (!user || !newUsername.trim()) return;

    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${backendUrl}/update_username`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername }),
      });

      const data = await res.json();
      if (res.ok) {
        setUsername(newUsername);
        setNewUsername('');
        setError('');
        fetchStats();
      } else {
        setError(data.error || 'Error updating username.');
      }
    } catch (err) {
      console.error('Error updating username:', err);
      setError('Error updating username.');
    }
  };

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setSelectedTitle(newTitle);

    const user = auth.currentUser;
    if (!user) return;

    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${backendUrl}/update_title`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error updating title.');
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Error updating title:', err);
      setError('Error updating title.');
    }
  };

  const xpBarWidth = stats.retroXP && stats.xpNeeded
    ? Math.min(100, (stats.retroXP / stats.xpNeeded) * 100)
    : 0;

  return (
    <div className="user-stats">
      <div className="user-stats-header">
        <h2>User Stats</h2>
        <div className="username-input-group">
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={handleUsernameChange}>Update</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <p><strong>Username:</strong> <span className="username-display">{username || 'Unknown'}</span></p>

      <p><strong>Title:</strong>
        <select value={selectedTitle} onChange={handleTitleChange} className="title-select">
          {availableTitles.map((title) => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </p>

      <p><strong>Level:</strong> {stats.level || 1}</p>

      <div className="xp-bar">
        <div className="xp-bar-inner" style={{ width: `${xpBarWidth}%` }}></div>
      </div>
      <p><strong>XP:</strong> {stats.retroXP || 0} / {stats.xpNeeded || 500}</p>

      <p><strong>Memory Shards:</strong> {stats.memoryShards || 0}</p>
      <p><strong>Quests Completed:</strong> {stats.questsCompleted || 0}</p>
    </div>
  );
};

export default UserStats;
