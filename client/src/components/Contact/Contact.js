import React from 'react'
import styles from './Contact.module.css'

const Contact = ({ login, setPageIndex, removeContact }) => {
    return (
        <div className={styles.Contact}>
            { login }

            <button onClick={() => {
                setPageIndex(2)
            }}>
                open
            </button>

            <button onClick={() => {
                removeContact(login)
            }}>
                remove
            </button>
        </div>
    )
}

export default Contact