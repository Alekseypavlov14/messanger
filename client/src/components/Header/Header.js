import React from 'react'
import styles from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ title, active, icon }) => {
    return (
        <header className={styles.Header}>
            <span className={styles.Title}>
                {title}
            </span>

            <button 
                className={styles.AddContact}
                onClick={active}
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        </header>
    )
}

export default Header