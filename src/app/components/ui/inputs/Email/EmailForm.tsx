"use client"

import React from 'react'
import styles from '@/app/components/ui/inputs/InputGroup.module.css'


const EmailForm: React.FC = () => {
    return (
        <div className={styles.inputGroup}>
            <input type="email" id="email" required />
            <label htmlFor="email">
                <span style={{ transitionDelay: '0ms' }}>E</span>
                <span style={{ transitionDelay: '50ms' }}>m</span>
                <span style={{ transitionDelay: '100ms' }}>a</span>
                <span style={{ transitionDelay: '150ms' }}>i</span>
                <span style={{ transitionDelay: '200ms' }}>l</span>
            </label>
        </div>
    )
}

export default EmailForm
