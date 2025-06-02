import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase'; // Ensure you have Firebase Auth configured
import './chat.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [dailyQuest, setDailyQuest] = useState(null);
  const [retroXP, setRetroXP] = useState(0);
  const [syncTime, setSyncTime] = useState(null);
  const idleTimer = useRef(null);

  const fetchData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${backendUrl}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch data.');
      const data = await res.json();
      console.log('✅ Fetched data:', data);

      if (data.daily_quests) setDailyQuest(data.daily_quests.quests[0] || null);
      if (data.user_stats) setRetroXP(data.user_stats.retroXP || 0);
      if (data.bonded_memory) {
        setMessages(data.bonded_memory.memory.slice(-10));
        setSyncTime(data.bonded_memory.retroSyncTimestamp || null);
      }

      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();

    const handleBeforeUnload = async () => {
      await backupBondedMemory();
    };

    const resetIdleTimer = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        console.log('🕰️ User idle, backing up...');
        backupBondedMemory();
      }, 5 * 60 * 1000);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);

    resetIdleTimer();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const backupBondedMemory = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken(true);
      await fetch(`${backendUrl}/backupBondedMemory`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('✅ Bonded memory backup successful.');
    } catch (err) {
      console.error('Backup error:', err);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      setError('You must be logged in.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a message.');
      return;
    }
    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log('🧪 Backend response:', data);

      if (!res.ok) {
        setError(data.error || 'Error from backend.');
        return;
      }

      const newUserMsg = { role: 'user', content: prompt };
      const newAssistantMsg = { role: 'assistant', content: data.response };

      setMessages((prev) => [
        ...prev.slice(-9),
        newUserMsg,
        newAssistantMsg
      ]);
      setPrompt('');
      setError('');
    } catch (err) {
      console.error('Frontend error:', err);
      setError('Error contacting the backend.');
    }
  };

  return (
    <div className="chat-container">
      <h2>NovaPrime AI Chat</h2>

      {dailyQuest && (
        <div className="daily-quest">
          <h3>🔥 Daily Quest</h3>
          <p><strong>{dailyQuest.title}</strong>: {dailyQuest.description}</p>
          <p>Bonus XP: {dailyQuest.bonusXP}</p>
          {dailyQuest.image && <img src={dailyQuest.image} alt="Daily Quest" />}
        </div>
      )}

      <p className="retro-xp">Retro XP: {retroXP}</p>
      {syncTime && <p className="sync-time">Last Synced: {new Date(syncTime).toLocaleString()}</p>}

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-row ${msg.role}`}>
            {msg.role === 'user' && (
              <div className="user-message">
                <strong>You:</strong> {msg.content}
              </div>
            )}
            {msg.role === 'assistant' && (
              <div className="nova-message">
                <strong>Nova:</strong> {msg.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleChat}>
        <input
          type="text"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Chat;
