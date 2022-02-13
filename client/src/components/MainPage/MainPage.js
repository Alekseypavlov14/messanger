import React from 'react'
import styles from './MainPage.module.css'
import HomeHeader from './HomeHeader'
import Contact from '../Contact/Contact'

const MainPage = ({ setActiveChat, setPageIndex, contacts, removeContact }) => {
    return (
        <div className={styles.MainPage}>
            <HomeHeader setPageIndex={setPageIndex} />
            <div className={styles.ContactsBox}>
                {contacts.map((contact, index) => {
                    if(contact.login !== localStorage.getItem('login')) {
                        return (
                            <Contact 
                                setActiveChat={setActiveChat} 
                                contact={contact} login={contact.login} 
                                key={index} 
                                setPageIndex={setPageIndex} 
                                removeContact={removeContact} 
                            />
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default MainPage