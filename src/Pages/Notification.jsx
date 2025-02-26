import { useEffect, useState } from "react";
import styles from "../../Styles/Notifications.module.css";
import GET_NOTIFICATIONS from "../utils/GetNotifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  //
  console.log("from state", notifications);
  useEffect(() => {
    document.title = "Notifications";

    const userId = localStorage.getItem("user_id");
    console.log(userId);
    if (!userId) return;
    const fetchNotifications = async () => {
      try {
        const data = await GET_NOTIFICATIONS(userId);
        setNotifications(data.notifications);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.containerInner}>
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <div key={notification.id} className={styles.Notification}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9221/9221485.png"
                alt=""
                className={styles.IconNotification}
              />
              <p>{notification.message}</p>
            </div>
          ))}

        {notifications.length === 0 && (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9221/9221485.png"
              alt=""
              className={styles.Icon}
            />
            <p>You have no Notifications</p>
          </>
        )}
      </section>
    </div>
  );
};

export default Notifications;
