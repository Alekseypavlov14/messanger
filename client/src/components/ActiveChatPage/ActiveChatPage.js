import React from 'react'
import styles from './ActiveChatPage.module.css'

const ActiveChatPage = ({ setPageIndex }) => {
    return (
        <div className={styles.ActiveChatPage}>
            ActiveChatPage

            <button onClick={() => {
                setPageIndex(0)
            }}>
                Exit
            </button>
        </div>
    )
}

export default ActiveChatPage