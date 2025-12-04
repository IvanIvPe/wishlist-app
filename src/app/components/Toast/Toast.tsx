"use client"

import { Toaster } from 'react-hot-toast';
import styles from '@/app/components/Toast/Toast.module.css';

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-center" 
      containerClassName={styles.toastContainer}
      toastOptions={{
        className: styles.toastPopup,
      }}
    />
  );
}