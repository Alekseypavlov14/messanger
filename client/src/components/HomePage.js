import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActiveChatPage from './ActiveChatPage/ActiveChatPage'
import AddContactPage from './AddContactPage/AddContactPage'
import MainPage from './MainPage/MainPage'

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        // redirect unregistered users
        if (!login || !password) {
            navigate('/register')
        }
    }, [navigate])

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        // check login and password
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (!login || !password) return

        const savedContacts = JSON.parse(localStorage.getItem('contacts'))
        setContacts(savedContacts)

        // exit from site
        return () => window.history.go(-1)
    }, [])

    useEffect(() => {
        fetch('message/get', {
            headers: { 
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                login: localStorage.getItem('login'),
                password: localStorage.getItem('password')
            })
        })
    }, [])

    useEffect(() => {
        // check login and password
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (!login || !password) return

        // save all contacts on localStorage
        localStorage.setItem('contacts', JSON.stringify(contacts))

        // save all contacts on server
        fetch('/contacts/save', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                login: login,
                contacts: contacts
            })
        })
    }, [contacts])

    function AddContact(contact) {
        setContacts(prev => [contact].concat(prev))
    }

    function removeContact(login) {
        setContacts(prev => prev.filter(contact => contact.login !== login))
    }

    // index of active page 
    const [pageIndex, setPageIndex] = useState(0)

    // chat = contact = {name: string, messages = []}
    const [activeChat, setActiveChat] = useState(null)

    // list of home pages
    const pages = [
        (<MainPage setActiveChat={setActiveChat} removeContact={removeContact} setPageIndex={setPageIndex} contacts={contacts} />),
        (<AddContactPage setPageIndex={setPageIndex} AddContact={AddContact} />),
        (<ActiveChatPage activeChat={activeChat} setPageIndex={setPageIndex} />)
    ]

    return (
        <div>
            {pages[pageIndex]}
        </div>
    )
}

export default HomePage