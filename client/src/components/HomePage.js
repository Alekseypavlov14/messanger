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
            <a href='/message/contacts' 
            onClick={(e) => {
                e.preventDefault()

                fetch('/message/contacts', {
                    method: 'POST'
                }).then(res => {
                    return res.json()
                }).then(data => {
                    console.log(data)
                })
            }}
            >Send</a>
        </div>
    )
}

export default HomePage