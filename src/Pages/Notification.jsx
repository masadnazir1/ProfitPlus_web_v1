import styles from "../../Styles/Notifications.module.css";

const Notifications = () => {
  return (
    <div className={styles.container}>
      <section className={styles.containerInner}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/9221/9221485.png"
          alt=""
          className={styles.Icon}
        />
        <p>You have no Notifications</p>
      </section>
    </div>
  );
};

export default Notifications;
