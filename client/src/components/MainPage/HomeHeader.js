import React from 'react'
import styles from './HomeHeader.module.css'

const HomeHeader = ({ setPageIndex }) => {
    return (
        <header className={styles.HomeHeader}>
            <span className={styles.Title}>
                Messager
            </span>
            <button 
                className={styles.AddContact}
                onClick={() => setPageIndex(1)}
            >
               +
            </button>
        </header>
    )
}

export default HomeHeader