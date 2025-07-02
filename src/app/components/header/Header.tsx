import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/" className={styles.navLink}>Accueil</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}