import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Organize everything you&apos;re wishing for.</h1>
            <p className={styles.subtitle}>
              Create lists for birthdays, gear upgrades, books to read, or your next big adventure all in one simple place.
            </p>
            <div className={styles.actions}>
              <Link href="/wishlist" className={styles.primaryButton}>
                Go to my wishlist
              </Link>
              <Link href="/about" className={styles.secondaryButton}>
                Learn more
              </Link>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <span className={styles.pill}>Preview</span>
              <span className={styles.heroCardTitle}>Today&apos;s top wishes</span>
            </div>
            <ul className={styles.heroList}>
              <li className={styles.heroListItem}>
                <span>Weekend trip</span>
                <span className={`${styles.badge} ${styles.badgeHigh}`}>High</span>
              </li>
              <li className={styles.heroListItem}>
                <span>Noise-cancelling headphones</span>
                <span className={`${styles.badge} ${styles.badgeMedium}`}>Medium</span>
              </li>
              <li className={styles.heroListItem}>
                <span>Books to read this year</span>
                <span className={`${styles.badge} ${styles.badgeLow}`}>Low</span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h2>Stay organized</h2>
            <p>Create as many lists as you need and keep everything in one tidy place.</p>
          </div>
          <div className={styles.featureCard}>
            <h2>Prioritize easily</h2>
            <p>Mark each wish by priority so you always know what matters most right now.</p>
          </div>
          <div className={styles.featureCard}>
            <h2>Plan smarter</h2>
            <p>Add links and prices to compare options and plan your budget with ease.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
