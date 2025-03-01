import { useState } from "react";
import styles from "../../Styles/LuckyDraw.module.css";
import EnterDraw from "./EnterDraw";
//
//

const LuckyDraw = () => {
  const [showPrizes, setShowPrizes] = useState(false);
  return (
    <section className={styles.luckydraw}>
      <h2>Lucky Draw</h2>
      <p>Enter the world of Lucky Draw for a chance to win amazing prizes!</p>
      <img
        className={styles.luckydraw__img}
        src="https://ronin.pk/cdn/shop/files/R-7010_Earbuds_Blue_01_1024x1024.webp?v=1738416575"
        alt=""
      />
      <button
        className={styles.buttonEnter}
        onClick={() => setShowPrizes(true)}
      >
        Enter Now
      </button>
      <EnterDraw isOpen={showPrizes} onClose={() => setShowPrizes(false)} />
    </section>
  );
};

export default LuckyDraw;
