import React from 'react';
import DailyQuests from './DailyQuests';
import ChetChat from './ChetChat';
import Leaderboards from './Leaderboards';
import UserStats from './UserStats';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <>
      <div className="main-layout-container">
        <div className="left-panel">
          <DailyQuests />
        </div>

        <div className="center-panel">
          <div className="chat-wrapper">
            <ChetChat />
          </div>
          <div className="broadcast-bar-wrapper">
            <div className="broadcast-bar">
              🌌 Nova Prime Broadcast: "The cosmic winds are restless tonight..."
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="leaderboards">
            <Leaderboards />
          </div>
          <div className="user-stats-container">
            <UserStats />
          </div>
        </div>
      </div>

      {/* Global Footer: Always at the bottom */}
      <footer className="global-footer">
        <a href="https://buymeacoffee.com/novaprime" target="_blank" rel="noopener noreferrer">
          ☕ Buy Me a Coffee
        </a>
      </footer>
    </>
  );
};

export default MainLayout;
