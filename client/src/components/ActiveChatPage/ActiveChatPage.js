import React from 'react'
import styles from './ActiveChatPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const ActiveChatPage = ({ setPageIndex, activeChat }) => {
    return (
        <div className={styles.ActiveChatPage}>
            <header
                className={styles.Header}
            >
                {activeChat.login}

                <button 
                    onClick={() => {
                        setPageIndex(0)
                    }}
                    className={styles.ExitButton}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </header>
        </div>
    )
}

export default ActiveChatPage