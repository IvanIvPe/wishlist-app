"use client"
import React from 'react';
import toast, { Toast } from 'react-hot-toast';
import styles from './Toast.module.css'; 

interface ConfirmDeleteToastProps {
    t: Toast;
    onConfirm: () => void;
    message?: string;
}

export default function ConfirmDeleteToast({ t, onConfirm, message = "Delete this wish?" }: ConfirmDeleteToastProps) {
    return (
        <div className={styles.confirmContainer}>
            <span className={styles.confirmText}>{message}</span>
            <div className={styles.buttonGroup}>
                <button
                    onClick={() => {
                        onConfirm();
                        toast.dismiss(t.id);
                    }}
                    className={styles.toastDeleteBtn}
                >
                    Delete
                </button>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className={styles.toastCancelBtn}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}