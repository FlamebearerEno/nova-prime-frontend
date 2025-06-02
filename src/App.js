import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import SyncMemory from './SyncMemory';
import MainLayout from './MainLayout'; // 👈 Import the full layout

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Login</Link> | <Link to="/chat">Chat</Link> | <Link to="/sync">Sync Memory</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<MainLayout />} />  {/* 👈 Use MainLayout here */}
          <Route path="/sync" element={<SyncMemory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
