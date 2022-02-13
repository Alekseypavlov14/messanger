import React from 'react'
import styles from './MainPage.module.css'
import HomeHeader from './HomeHeader'
import Contact from '../Contact/Contact'

const MainPage = ({ setPageIndex, contacts, removeContact }) => {
    return (
        <div className={styles.MainPage}>
            <HomeHeader setPageIndex={setPageIndex} />
            <div className={styles.ContactsBox}>
                {contacts.map((contact, index) => (
                    <Contact login={contact.login} key={index} setPageIndex={setPageIndex} removeContact={removeContact} />
                ))}
            </div>
        </div>
    )
}

export default MainPage