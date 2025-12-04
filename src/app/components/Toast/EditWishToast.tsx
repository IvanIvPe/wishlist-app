"use client"
import React, { useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import styles from '@/app/components/Toast/Toast.module.css';

interface EditWishToastProps {
    t: Toast;
    initialName: string;
    onSave: (newName: string) => void;
}

export default function EditWishToast({ t, initialName, onSave }: EditWishToastProps) {
    const [name, setName] = useState(initialName);

    const handleSave = () => {
        if (name.trim() !== '') {
            onSave(name.trim());
            toast.dismiss(t.id);
        }
    };

    return (
        <div className={styles.editContainer}>
            <span className={styles.label}>Edit Wish Name:</span>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.toastInput}
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                }}
            />
            <div className={styles.buttonGroup}>
                <button onClick={handleSave} className={styles.toastSaveBtn}>
                    Save
                </button>
                <button onClick={() => toast.dismiss(t.id)} className={styles.toastCancelBtn}>
                    Cancel
                </button>
            </div>
        </div>
    );
}