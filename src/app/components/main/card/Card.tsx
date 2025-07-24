import Link from "next/link";
import Header from "../../header/Header";
import styles from "./card.module.css";

export default function Card() {
  return (
    <div className={styles.cardContainer}>
      {/* <Header /> */}
      <div className={styles.card}>
        <h3 className={styles.title}>Harry Potter</h3>
        <Link href="/quiz/harrypotter">
          <button className={styles.button}>Start</button>
        </Link>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>le seigneur des anneaux</h3>
        <Link href="/quiz/seigneuranneaux">
          <button className={styles.button}>Start</button>
        </Link>
      </div>
    </div>
  );
}