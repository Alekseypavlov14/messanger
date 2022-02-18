import React, {useEffect} from 'react'
import styles from './MainPage.module.css'
import Contact from '../Contact/Contact'
import Header from '../Header/Header'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { request } from '../../api/request'

const MainPage = ({ setContacts, setActiveChat, setPageIndex, contacts, removeContact }) => {
    useEffect(() => {
        const reloader = setInterval(() => {
            request('/contacts/get-my', {
                login: localStorage.getItem('login')
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
            <Header 
                title='Messager' 
                active={() => setPageIndex(1)} 
                icon={faMagnifyingGlass} 
            />
            
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