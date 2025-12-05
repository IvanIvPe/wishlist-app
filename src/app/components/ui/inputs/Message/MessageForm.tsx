"use client"

import React from 'react'
import styles from '@/app/components/ui/inputs/Message/MessageForm.module.css'


const MessageForm: React.FC = () => {
    return (
        <div className={styles.inputGroup}>
            <textarea id="message" rows={5} required></textarea>
            <label htmlFor="message">
                <span style={{ transitionDelay: '0ms' }}>M</span>
                <span style={{ transitionDelay: '50ms' }}>e</span>
                <span style={{ transitionDelay: '100ms' }}>s</span>
                <span style={{ transitionDelay: '150ms' }}>s</span>
                <span style={{ transitionDelay: '200ms' }}>a</span>
                <span style={{ transitionDelay: '250ms' }}>g</span>
                <span style={{ transitionDelay: '300ms' }}>e</span>
            </label>
        </div>
    )
}

export default MessageForm
