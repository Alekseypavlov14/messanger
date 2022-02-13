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

        if (!login || !password) {
            navigate('/register')
        }
    }, [navigate])

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (!login || !password) return

        const savedContacts = JSON.parse(localStorage.getItem('contacts'))
        setContacts(savedContacts)
    }, [])

    useEffect(() => {
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (!login || !password) return

        localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])

    function AddContact(contact) {
        setContacts(prev => [contact].concat(prev))
    }

    function removeContact(login) {
        setContacts(prev => prev.filter(contact => contact.login !== login))
    }

    const [pageIndex, setPageIndex] = useState(0)

    const pages = [
        (<MainPage removeContact={removeContact} setPageIndex={setPageIndex} contacts={contacts} />),
        (<AddContactPage setPageIndex={setPageIndex} AddContact={AddContact} />),
        (<ActiveChatPage  setPageIndex={setPageIndex} />)
    ]

    return (
        <div>
            {pages[pageIndex]}
        </div>
    )
}

export default HomePage