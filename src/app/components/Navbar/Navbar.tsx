import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/Navbar/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      
      <Link href="/" className={styles.logo}>
        <img 
            src="/listlogo.png" 
            alt="App Logo" 
            className={styles.logoImage} 
        />
        <span className={styles.logoText}>List App</span>
      </Link>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/about" className={styles.navLink}>About</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/wishlist" className={styles.navLink}>Wishlist</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;