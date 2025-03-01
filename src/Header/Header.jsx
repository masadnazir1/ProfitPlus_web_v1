import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import notificationIcon from "../assets/Bell.png";

const Header = () => {
  const navigate = useNavigate();
  const handleGo = () => {
    navigate("/notifications");
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />

      <button className={styles.logoutBtn} onClick={handleGo}>
        <img src={notificationIcon} alt="logout" className={styles.LogoutImg} />
      </button>
    </header>
  );
};

export default Header;
