import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomTabs from "./BottomTabs/BottomTabs";
import Home from "./Pages/HomePage";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/ProfilePage";
import Header from "./Header/Header";
import GamePage from "./Pages/GameBoard";
import GoogleAuth from "./components/GoogleAuth";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleAuth />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <BottomTabs />
      </div>
    </Router>
  );
};

export default App;
