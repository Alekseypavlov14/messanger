import React from 'react'
import styles from './HomeHeader.module.css'

const HomeHeader = ({ AddContact }) => {
    return (
        <div className={styles.HomeHeader}>
            <span className={styles.Title}>
                Messager
            </span>
            <button 
                className={styles.AddContact}
                onClick={() => AddContact({
                    login: 'Hello',
                    messages: []
                })}
            >
               +
            </button>
        </div>
    )
}

export default HomeHeader