"use client";

import React from 'react'
import toast from 'react-hot-toast';
import styles from '@/app/contact/ContactPage.module.css'
import MapComponent from '@/app/components/Map/Map'
import UsernameForm from '@/app/components/ui/inputs/Username/UsernameForm'
import EmailForm from '@/app/components/ui/inputs/Email/EmailForm'
import MessageForm from '@/app/components/ui/inputs/Message/MessageForm'
import SendMessage from '@/app/components/ui/buttons/SendMessage/SendMessage'


const ContactPage: React.FC = () => {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);
        const username = (data.get('username') ?? '').toString().trim();
        const email = (data.get('email') ?? '').toString().trim();
        const message = (data.get('message') ?? '').toString().trim();

        const errors: string[] = [];
        if (!username) errors.push('Name is required');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
        if (!message || message.length < 10) errors.push('Message should be at least 10 characters');

        if (errors.length > 0) {
            toast.error(errors[0]);
            return;
        }

        toast.success('Message sent (demo only)');
        form.reset();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.description}>We'd love to hear from you! Please fill out the form below or reach out directly.</p>

            <div className={styles.contactInfo}>
                <p><strong>Email:</strong> ivan@contact.com</p>
                <p><strong>Phone:</strong> +381 (123) 456-7890</p>
                <p><strong>Address:</strong> 123 Test adress, Niš, Serbia</p>
                <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM </p>
                <MapComponent />
            </div>

            <h2 className={styles.subtitle}>Send us a message</h2>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
                <UsernameForm />
                <EmailForm />
                <MessageForm />
                <SendMessage />
            </form>
        </div>
    )
}

export default ContactPage
