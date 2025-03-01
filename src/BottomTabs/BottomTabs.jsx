import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomTabs.module.css";
import homeIcon from "../assets/home.png";
import Reel from "../assets/Reel.png";
import profileIcon from "../assets/user.png";

const BottomTabs = () => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.activeTab : styles.tab)}
      >
        <img src={homeIcon} alt="Home" className={styles.Icon} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/ReelsAds"
        className={({ isActive }) => (isActive ? styles.activeTab : styles.tab)}
      >
        <img src={Reel} alt="ReelsAds" className={styles.Icon} />
        <span>Ads Reels</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? styles.activeTabProfile : styles.tabProfile
        }
      >
        <img
          src={localStorage.getItem("user_picture") || profileIcon}
          alt="Profile"
          className={styles.IconAsProfile}
        />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomTabs;
