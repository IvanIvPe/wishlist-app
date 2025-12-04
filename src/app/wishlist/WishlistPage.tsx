"use client"

import styles from '@/app/wishlist/WishlistPage.module.css'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import ConfirmDeleteToast from '@/app/components/Toast/ConfirmDeleteToast';
import EditWishToast from '@/app/components/Toast/EditWishToast';

interface Wish {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

export default function Wishlist() {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('wishes');
        if (saved) {
            setWishes(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('wishes', JSON.stringify(wishes));
        }
    }, [wishes, isLoaded]);

    const handleAddWish = () => {
        if (inputValue.trim() !== '') {
            const newWish: Wish = {
                id: Date.now(),
                name: inputValue.trim(),
                description: '',
                completed: false,
            };
            setWishes([...wishes, newWish]);
            setInputValue('');
            toast.success('Wish added successfully!');
        }
    };

    const handleDeleteWish = (id: number) => {
        toast.dismiss();
        toast((t) => (
            <ConfirmDeleteToast
                t={t}
                message="Delete this wish?"
                onConfirm={() => {
                    setWishes((prev) => prev.filter(wish => wish.id !== id));
                    toast.success('Wish deleted');
                }}
            />
        ), {
            duration: 5000,
            style: { minWidth: '300px' }
        });
    };

    const handleEditWish = (id: number, newName: string) => {
        const updatedWishes = wishes.map(wish =>
            wish.id === id ? { ...wish, name: newName } : wish
        );
        setWishes(updatedWishes);
        toast.success('Wish updated successfully!');
    };

    const handleToggleComplete = (id: number) => {
        const updatedWishes = wishes.map(wish =>
            wish.id === id ? { ...wish, completed: !wish.completed } : wish
        );
        setWishes(updatedWishes);
        toast.success('Wish status updated');
    };

    if (!isLoaded) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Wishlist</h1>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddWish()}
                    placeholder="Enter a new wish..."
                    className={styles.input}
                />
                <button onClick={handleAddWish} className={styles.addButton}>
                    Add Wish
                </button>
            </div>
            <ul className={styles.wishList}>
                {wishes.length === 0 && (
                    <div className={styles.emptyMessage}>
                        <p>Your wishlist is empty</p>
                        <p>Add something to start your Wishlist!</p>
                    </div>
                )}
                {wishes.map((wish) => (
                    <li key={wish.id} className={styles.wishItem}>
                        <div className={styles.wishContent}>
                            <input
                                type="checkbox"
                                checked={wish.completed}
                                onChange={() => handleToggleComplete(wish.id)}
                                className={styles.checkbox}
                            />
                            <span className={wish.completed ? styles.completed : ''}>
                                {wish.name}
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                toast.dismiss();
                                toast((t) => (
                                    <EditWishToast
                                        t={t}
                                        initialName={wish.name}
                                        onSave={(newName) => handleEditWish(wish.id, newName)}
                                    />
                                ), {
                                    id: 'edit-toast',
                                    duration: Infinity,
                                });
                            }}
                            className={styles.editButton}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDeleteWish(wish.id)}
                            className={styles.deleteButton}
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}