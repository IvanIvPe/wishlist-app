import TV404 from "@/app/components/errors/NotFoundView"
import styles from "@/app/not-found.module.css"; 

export default function NotFound() {
  return (
    <div className={styles.container}>
      <TV404 />
    </div>
  );
}