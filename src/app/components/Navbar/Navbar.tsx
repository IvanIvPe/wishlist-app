'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/app/components/Navbar/Navbar.module.css';
import { useTheme } from '@/app/components/Theme/ThemeProvider';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <img
          src="/listlogo.png"
          alt="App Logo"
          className={styles.logoImage}
        />
        <span className={styles.logoText}>Wishlist App</span>
      </Link>

      <div className={styles.navRight}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              href="/wishlist"
              className={`${styles.navLink} ${isActive('/wishlist') ? styles.navLinkActive : ''}`}
            >
              Wishlist
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/about"
              className={`${styles.navLink} ${isActive('/about') ? styles.navLinkActive : ''}`}
            >
              About
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/contact"
              className={`${styles.navLink} ${isActive('/contact') ? styles.navLinkActive : ''}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☾' : '☼'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
