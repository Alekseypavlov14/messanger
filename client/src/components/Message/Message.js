import React from 'react'
import styles from './Message.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { formatTime } from '../../api/formatTime'

const Message = ({ message }) => {
    const {to, text, time, read} = message

    const status = to === localStorage.getItem('login') ? 'incoming' : 'outgoing'

    const messageTime = formatTime(time)
     
    return (
        <div className={styles.MessageBox + ' ' + styles[status]}>
            <div className={styles.message}>
                {text}
                
                <div className={styles.data}>
                    <div className={styles.time}>
                        {messageTime}
                    </div>
                    
                    {status === 'outgoing' && (
                        <div className={styles.readBox}>
                            <FontAwesomeIcon icon={faEye} className={read ? styles.read : styles.unread} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Message