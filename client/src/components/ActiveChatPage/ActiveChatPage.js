import React, { useState } from 'react'
import styles from './ActiveChatPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const ActiveChatPage = ({ setPageIndex, activeChat }) => {
    const [currentMessage, setCurrentMessage] = useState('')

    function sendMessage() {
        fetch('/message/send', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'Post',
            body: JSON.stringify({
                time: Date.now(),
                from: localStorage.getItem('login'),
                to: activeChat.login,
                text: currentMessage,
                read: false
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
        })
    }

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

            <div className={styles.Messages}>
                {currentMessage}
            </div>

            <div className={styles.WriteMessageBox}>
                <textarea 
                    wrap='soft' 
                    className={styles.Input}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}
                />

                <button
                    className={styles.Send}
                    onClick={() => {
                        sendMessage()
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.Icon} />
                </button>
            </div>
        </div>
    )
}

export default ActiveChatPage