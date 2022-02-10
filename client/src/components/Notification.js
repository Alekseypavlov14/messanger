import React, { useContext, useRef } from 'react'
import styles from './Notification.module.css'
import { NotificationContext } from '../context/context'

const Notification = ({ text }) => {
    const { setNotifications } = useContext(NotificationContext)
    const NotifyBox = useRef(null)

    return (
        <div 
            className={styles.NotificationBox} 
            onClick={() => {
                NotifyBox.current.classList.add(styles.removing)
                setTimeout(() => {
                    setNotifications(prev => prev.slice(1, prev.length))
                }, 500) 
            }}
            ref={NotifyBox}
        >
            <div className={styles.text}>
                { text }
            </div>
        </div>
    )
}

export default Notification