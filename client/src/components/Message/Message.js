import React from 'react'
import styles from './Message.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const Message = ({ message }) => {
    const {to, from, text, time, read, send} = message

    const status = to === localStorage.getItem('login') ? 'incoming' : 'outgoing'

    const timeDate = new Date(time)
    let hours = timeDate.getHours()
    if (hours < 10) hours = '0' + hours
    let minutes = timeDate.getMinutes()
    if (minutes < 10) minutes = '0' + minutes

    const timeFormat = `${hours}:${minutes}`
     
    return (
        <div className={styles.MessageBox + ' ' + styles[status]}>
            <div className={styles.message}>
                {text}
                <div className={styles.data}>
                    <div className={styles.time}>
                        {timeFormat}
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