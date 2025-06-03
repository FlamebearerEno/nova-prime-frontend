import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import SyncMemory from './SyncMemory';
import MainLayout from './MainLayout';
import SignUp from './SignUp';  // 👈 Import SignUp
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Login</Link> | <Link to="/chat">Chat</Link> | <Link to="/sync">Sync Memory</Link> | <Link to="/signup">Sign Up</Link> {/* 👈 Add SignUp link */}
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<MainLayout />} />
          <Route path="/sync" element={<SyncMemory />} />
          <Route path="/signup" element={<SignUp />} />  {/* 👈 Add SignUp route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;