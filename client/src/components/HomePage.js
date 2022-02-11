import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeHeader from './HomeHeader'

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (!login || !password) {
            navigate('/register')
        }
    }, [navigate])

    const user = JSON.parse( localStorage.getItem('user') )
    const contacts = user.contacts
    
    return (
        <div>
            <HomeHeader />
        </div>
    )
}

export default HomePage