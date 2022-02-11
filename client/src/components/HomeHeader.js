import React from 'react'
import styles from './HomeHeader.module.css'

const HomeHeader = () => {
    return (
        <div className={styles.HomeHeader}>
            <span className={styles.Title}>
                Messager
            </span>
        </div>
    )
}

export default HomeHeader