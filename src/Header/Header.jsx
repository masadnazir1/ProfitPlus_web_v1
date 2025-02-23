import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      localStorage.removeItem("user_id"); // Replace with your key
      navigate("/login");
      // alert("Item removed from local storage!");
    }
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />

      <button className={styles.logoutBtn} onClick={handleDelete}>
        <img
          src={localStorage.getItem("user_picture")}
          alt="logout"
          className={styles.LogoutImg}
        />
      </button>
    </header>
  );
};

export default Header;
