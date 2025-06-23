import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Login from "./Login";
import SignUp from "./SignUp";
import SyncMemory from "./SyncMemory";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<MainLayout />} />
        <Route path="/sync" element={<SyncMemory />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
