import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
        <div className={styles.description}>
          <h1>Welcome to the Wishlist App</h1>
          <p>Create and manage your wishlists with ease!</p>
        </div>

        <div className={styles.center}>
        </div>
        
      </main>
    </div>
  );
}