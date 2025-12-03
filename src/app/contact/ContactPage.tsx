import React from 'react'
import styles from '@/app/contact/ContactPage.module.css'

const ContactPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.description}>We'd love to hear from you! Please fill out the form below or reach out directly.</p>

            <div className={styles.contactInfo}>
                <p><strong>Email:</strong> contact@wishlist.com</p>
                <p><strong>Phone:</strong> +381 (123) 456-7890</p>
                <p><strong>Address:</strong> 123 Test adress, Belgrade, Serbia</p>
                <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM </p>
            </div>

            <h2 className={styles.subtitle}>Send us a message</h2>
            <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name:</label>
                    <input type="text" id="name" name="name" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input type="email" id="email" name="email" className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message:</label>
                    <textarea id="message" name="message" rows={5} className={styles.textarea} required></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>Send Message</button>
            </form>
        </div>
    )
}

export default ContactPage