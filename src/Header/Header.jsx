import React from "react";
import styles from "./Header.module.css";
import icon from "../assets/logout.png";

const Header = ({ username, onLogout }) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.welcome}>
        Welcome, {localStorage.getItem("user_name")}!
      </h2>
      <button className={styles.logoutBtn} onClick={onLogout}>
        <img src={icon} alt="logout" className={styles.LogoutImg} />
      </button>
    </header>
  );
};

export default Header;
