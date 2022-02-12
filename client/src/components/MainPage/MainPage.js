import React from 'react'
import styles from './MainPage.module.css'
import HomeHeader from './HomeHeader'
import Contact from '../Contact/Contact'

const MainPage = ({ AddContact, contacts }) => {
    return (
        <div className={styles.MainPage}>
            <HomeHeader AddContact={AddContact}/>
            {contacts.map((contact, index) => (
                <Contact name={contact.login} key={index} />
            ))}
        </div>
    )
}

export default MainPage