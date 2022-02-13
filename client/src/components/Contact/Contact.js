import React from 'react'
import styles from './Contact.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Contact = ({ contact, login, setPageIndex, removeContact, setActiveChat }) => {
    return (
        <div 
            className={styles.Contact}
            onClick={(e) => {
                if (e.target.tagName === 'DIV'){
                    setActiveChat(contact)
                    setPageIndex(2)
                }
            }}
        >
            { login }

            <button 
                onClick={() => removeContact(login)}
                className={styles.RemoveButton}
            >
                <FontAwesomeIcon className={styles.Icon} icon={faTrashCan} />
            </button>
        </div>
    )
}

export default Contact