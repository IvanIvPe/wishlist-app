"use client"

import React from 'react'
import styles from '@/app/components/ui/inputs/InputGroup.module.css'


const UsernameForm: React.FC = () => {
    return (
        <div className={styles.inputGroup}>
            <input type="text" id="username" required />
            <label htmlFor="username">
                <span style={{ transitionDelay: '0ms' }}>U</span>
                <span style={{ transitionDelay: '50ms' }}>s</span>
                <span style={{ transitionDelay: '100ms' }}>e</span>
                <span style={{ transitionDelay: '150ms' }}>r</span>
                <span style={{ transitionDelay: '200ms' }}>n</span>
                <span style={{ transitionDelay: '250ms' }}>a</span>
                <span style={{ transitionDelay: '300ms' }}>m</span>
                <span style={{ transitionDelay: '350ms' }}>e</span>
            </label>
        </div>
    )
}

export default UsernameForm
