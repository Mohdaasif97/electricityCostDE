import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Über uns</h3>
          <p>Stromkostenrechner - Kostenlos Ihren Stromverbrauch und -kosten berechnen</p>
        </div>

        <div className={styles.section}>
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Wichtig</h3>
          <p>Die Strompreise sind Durchschnittswerte für Deutschland 2026 und können je nach Region variieren.</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 Stromkostenrechner. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
