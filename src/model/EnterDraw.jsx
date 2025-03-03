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
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/coming-soon-3d-sticker-download-in-png-blend-fbx-gltf-file-formats--maintenance-hand-opening-board-pack-miscellaneous-stickers-5686068.png?f=webp"
          alt=""
          className={styles.Soon}
        />
      </div>
    </div>
  );
};

export default EnterDraw;
