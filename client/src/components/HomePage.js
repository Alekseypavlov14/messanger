import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (!login || !password) {
            navigate('/register')
        }
    }, [navigate])
    
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default HomePage