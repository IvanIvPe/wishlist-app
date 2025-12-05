import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/Footer/Footer.module.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerMain}>
          <p className={styles.brand}>
            &copy; {year} <span className={styles.brandName}>Wishlist App</span>
          </p>
          <p className={styles.meta}>Organize the things you&apos;re saving for, one wish at a time.</p>
        </div>

        <nav className={styles.footerNav} aria-label="Footer">
          <Link href="/wishlist" className={styles.footerLink}>
            Wishlist
          </Link>
          <Link href="/about" className={styles.footerLink}>
            About
          </Link>
          <Link href="/contact" className={styles.footerLink}>
            Contact
          </Link>
        </nav>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.credit}>Created by Ivan</p>
      </div>
    </footer>
  );
};

export default Footer;
