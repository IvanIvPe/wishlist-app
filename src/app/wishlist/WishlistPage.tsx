"use client"

import styles from '@/app/wishlist/WishlistPage.module.css'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

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
        }
    };

    const handleDeleteWish = (id: number) => {
        const updatedWishes = wishes.filter(wish => wish.id !== id);
        setWishes(updatedWishes);
    };

    const handleEditWish = (id: number, newName: string) => {
        const updatedWishes = wishes.map(wish =>
            wish.id === id ? { ...wish, name: newName } : wish
        );
        setWishes(updatedWishes);
    };

    const handleToggleComplete = (id: number) => {
        const updatedWishes = wishes.map(wish =>
            wish.id === id ? { ...wish, completed: !wish.completed } : wish
        );
        setWishes(updatedWishes);
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
                                const newName = prompt('Enter new wish name:', wish.name);
                                if (newName !== null && newName.trim() !== '') {
                                    toast.success('Wish updated successfully!');
                                    handleEditWish(wish.id, newName.trim());
                                }
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