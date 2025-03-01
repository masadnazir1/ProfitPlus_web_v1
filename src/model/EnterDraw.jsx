import React from "react";
import styles from "../../Styles/EnterDraw.module.css";
import { useNavigate } from "react-router-dom";
import Back from "../assets/Back.png";

const EnterDraw = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.EnterDraw} onClick={onClose}>
          <img src={Back} alt="" className={styles.EnterDrawIMG} />
        </button>
      </div>
    </div>
  );
};

export default EnterDraw;
