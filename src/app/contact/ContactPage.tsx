import React from 'react'
import styles from '@/app/contact/ContactPage.module.css'
import MapComponent from '@/app/components/Map/Map'
import UsernameForm from '@/app/components/ui/inputs/Username/UsernameForm'
import EmailForm from '@/app/components/ui/inputs/Email/EmailForm'
import MessageForm from '@/app/components/ui/inputs/Message/MessageForm'
import SendMessage from '@/app/components/ui/buttons/SendMessage/SendMessage'


const ContactPage: React.FC = () => {
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
            <form className={styles.contactForm}>
                <UsernameForm />
                <EmailForm />
                <MessageForm />
                <SendMessage />
            </form>
        </div>
    )
}

export default ContactPage