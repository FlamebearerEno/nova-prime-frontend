import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import './chat.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://nova-prime-backend-v2.onrender.com';

const ChetChat = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [userStats, setUserStats] = useState({});
  const messagesEndRef = useRef(null);

  const fetchStats = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`${BACKEND_URL}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      setUserStats(data.user_stats || {});
      setMessages(data.bonded_memory?.memory.slice(-20) || []);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Error fetching data. Please try again.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const countTokens = (text) => text.trim().split(/\\s+/).length;

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!user || !prompt.trim()) return;

    const token = await user.getIdToken(true);
    const userMessage = { role: 'user', content: prompt };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to send message');
      const data = await res.json();
      const aiMessage = { role: 'assistant', content: data.response.trim() };

      setMessages((prev) => [...prev, aiMessage]);

      const tokenCount = countTokens(data.response);
      console.log(`🌌 Tokens generated: ${tokenCount}`);

      const xpRes = await fetch(`${BACKEND_URL}/llm_response`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: data.response, tokensGenerated: tokenCount }),
      });

      const xpData = await xpRes.json();
      console.log('🌌 XP Sync Response:', xpData);
      if (xpData.stats) setUserStats(xpData.stats); // only update stats
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error sending message. Please try again.');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-row ${msg.role}`}>
            <div className={msg.role === 'user' ? 'user-message' : 'nova-message'}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Your Chet Something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ChetChat;