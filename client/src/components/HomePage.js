import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    return (
        <div>
            <MainPage AddContact={AddContact} contacts={contacts} />
        </div>
    )
}

export default HomePage