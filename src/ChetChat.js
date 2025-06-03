import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase';
import './chat.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nova-prime-backend-v2.onrender.com';

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
      const res = await fetch(`${backendUrl}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUserStats(data.user_stats || {});
      setMessages(data.bonded_memory?.memory || []);
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

  const countTokens = (text) => {
    return text.trim().split(/\s+/).length; // Simple token count
  };

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!user || !prompt.trim()) return;

    const token = await user.getIdToken(true);
    const newMessage = { role: 'user', content: prompt };

    setMessages(prev => [...prev, newMessage]);
    setPrompt('');

    try {
      const res = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiContent = data.response;
      const assistantMessage = { role: 'assistant', content: aiContent };

      setMessages(prev => [...prev, assistantMessage]);

      // 🌌 Count tokens and sync XP
      const tokenCount = countTokens(aiContent);
      console.log(`🌌 Tokens generated: ${tokenCount}`);

      await fetch(`${backendUrl}/llm_response`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: aiContent, tokensGenerated: tokenCount }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('🌌 XP Sync Response:', data);
          fetchStats(); // 🌠 Refresh stats after each response
        })
        .catch((err) => console.error('Error syncing XP:', err));
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
