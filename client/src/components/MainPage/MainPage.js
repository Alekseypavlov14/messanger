import React, {useEffect} from 'react'
import styles from './MainPage.module.css'
import HomeHeader from './HomeHeader'
import Contact from '../Contact/Contact'

const MainPage = ({ setContacts, setActiveChat, setPageIndex, contacts, removeContact }) => {
    useEffect(() => {
        const reloader = setInterval(() => {
            fetch('/contacts/get-my', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    login: localStorage.getItem('login'),
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                setContacts(data.contacts)
            })
        }, 1000)
        return () => {
            clearInterval(reloader)
        }
    }, [])

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