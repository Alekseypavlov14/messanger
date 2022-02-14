import React from 'react'
import styles from './Contact.module.css'

const Contact = ({ name }) => {
    return (
        <div className={styles.Contact}>
            {name}
        </div>
    )
}

export default Contact