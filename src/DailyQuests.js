import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import './DailyQuests.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://nova-prime-backend-v2.onrender.com';

const DailyQuests = ({ fetchStats }) => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          console.error('No user signed in');
          return;
        }

        const token = await user.getIdToken(true);
        console.log("📡 Fetching /daily_quests with token:", token.slice(0, 10) + "...");

        const res = await fetch(`${BACKEND_URL}/daily_quests`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('❌ Failed to fetch daily quests:', errorText);
          return;
        }

        const data = await res.json();
        console.log("🌌 Daily Quests Data:", data);
        setQuests(data.quests || []);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchQuests();
  }, [fetchStats]);

  const markComplete = async (index) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error('No user signed in');
        return;
      }

      const token = await user.getIdToken(true);
      const quest = quests[index];

      if (!quest.completed) {
        const res = await fetch(`${BACKEND_URL}/complete_quest`, {
  		method: 'POST',
 		 headers: {
  	 	 'Content-Type': 'application/json',
   	 	Authorization: `Bearer ${token}`,
  		},
  		body: JSON.stringify({ questId: quest.id, memoryShards: quest.memoryShards }),
		});

        const data = await res.json();

        if (res.ok && data.message === 'Quest completed.') {
          const updatedQuests = [...quests];
          updatedQuests[index].completed = true;
          setQuests(updatedQuests);
          console.log('✅ Quest marked as complete!');

          if (typeof fetchStats === 'function') {
            fetchStats();
          }
        } else {
          console.error('❌ Unexpected completion response:', data);
        }
      }
    } catch (err) {
      console.error('Error completing quest:', err);
    }
  };

  return (
    <div className="daily-quests">
      <h2>Daily Quests</h2>
      <ul>
        {quests.map((quest, index) => (
          <li key={quest.id} className="quest-card">
            <div className="quest-info">
              <strong>{quest.title}</strong><br />
              {quest.description}<br />
              <span className="bonus-xp">+{quest.memoryShards} Memory Shard{quest.memoryShards !== 1 ? 's' : ''}</span>
            </div>
            <div className="quest-action">
              {!quest.completed ? (
                <button onClick={() => markComplete(index)}>Mark as Complete</button>
              ) : (
                <span className="completed">✅ Completed</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyQuests;
