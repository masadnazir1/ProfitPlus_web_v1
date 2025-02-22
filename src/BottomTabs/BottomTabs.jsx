import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./BottomTabs.module.css";
import homeIcon from "../assets/home.png";
import notificationIcon from "../assets/Bell.png";
import profileIcon from "../assets/user.png";

const BottomTabs = () => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.activeTab : styles.tab)}
      >
        <img src={homeIcon} alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) => (isActive ? styles.activeTab : styles.tab)}
      >
        <img src={notificationIcon} alt="Notifications" />
        <span>Notifications</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? styles.activeTab : styles.tab)}
      >
        <img src={profileIcon} alt="Profile" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomTabs;
