import styles from '@/app/components/Map/Map.module.css';

export default function MapComponent() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.18351429370787!2d21.89705747612598!3d43.31589919921745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b0b4d1c0f06b%3A0x3fb0b3472c3106d4!2sBoopro%20Technology%20DOO!5e0!3m2!1sen!2srs!4v1764847613860!5m2!1sen!2srs"
      className={styles.mapFrame}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}