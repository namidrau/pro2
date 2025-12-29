import Link from 'next/link';
import styles from '../../styles/components/navbar.module.css';

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <Link href="/">My App</Link>
      </div>
      <ul className={styles.menu}>
        <li><Link href="/">Home</Link></li>
      </ul>
    </nav>
  );
}
