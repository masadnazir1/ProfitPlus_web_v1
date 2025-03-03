import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import BottomTabs from "./BottomTabs/BottomTabs";
import Home from "./Pages/HomePage";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/ProfilePage";
import Header from "./Header/Header";
import GamePage from "./Pages/GameBoard";
import Dashboard from "./Pages/Dashboard";
import WelcomePage from "./Pages/LoginPage";
import ReelAds from "./Pages/AdsReelPage";
import WithdrawalRequest from "./Pages/WithdrawalRequest";

//

const App = () => {
  return (
    <Router>
      <ConditionalHeader />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<WelcomePage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ReelsAds" element={<ReelAds />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
          <Route path="/req" element={<WithdrawalRequest />} />
        </Routes>

        <ConditionalBottomTabs />
      </div>
    </Router>
  );
};

// Component to conditionally render BottomTabs
const ConditionalBottomTabs = () => {
  const location = useLocation();
  const hideTabsOnRoutes = ["/login", "/welcome"]; // Add more routes if needed

  return !hideTabsOnRoutes.includes(location.pathname) ? <BottomTabs /> : null;
};

const ConditionalHeader = () => {
  const location = useLocation();
  const hideTabsOnRoutes = ["/login", "/welcome", "/ReelsAds"]; // Add more routes if needed

  return !hideTabsOnRoutes.includes(location.pathname) ? <Header /> : null;
};

export default App;
