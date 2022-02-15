import React from 'react'
import styles from './Message.module.css'

const Message = ({ message }) => {
    const {to, from, text, time, read, send} = message

    const status = to === localStorage.getItem('login') ? 'incoming' : 'outgoing'

    return (
        <div className={styles.MessageBox + ' ' + styles[status]}>
            <div className={styles.message}>
                {text}
            </div>
        </div>
    )
}

export default Message