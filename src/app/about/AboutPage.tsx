import React from 'react'
import styles from '@/app/about/AboutPage.module.css'

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.header}>
        <h1>About Wishlist App</h1>
        <p className={styles.subtitle}>Simplifying your life, one wish at a time.</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempor tristique tortor ut sagittis.
            Proin tempor tristique tortor ut sagittis.
            Nulla tristique pellentesque neque, quis tempus libero. Proin varius, sem a pharetra commodo
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why Choose Us?</h2>
          <ul className={styles.featureList}>
            <li>
              <strong>Simplicity First:</strong> We prioritize a clean interface that lets you focus on what matters.
            </li>
            <li>
              <strong>Efficient:</strong> Quick to add, edit, and manage your wishes.
            </li>
            <li>
              <strong>Reliable:</strong> Your data is safe and always accessible when you need it.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Our Story</h2>
          <p>
            Sed condimentum imperdiet elit ut venenatis. Nulla facilisi. In hac habitasse platea dictumst. 
            Pellentesque placerat convallis neque facilisis condimentum
            Morbi lacinia massa nec ornare aliquet. Cras tempus ac lectus ut mollis.
          </p>
        </section>
      </div>
    </div>
  )
}