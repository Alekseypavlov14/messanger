import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.css'
import { valid } from '../authentication/validation'
import { NotificationContext } from '../context/context'
import loginUser from './../authentication/login'

const LoginPage = () => {
    const navigate = useNavigate()
    const { addNotify } = useContext(NotificationContext)

    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)

    const loginRef = useRef(null)
    const passwordRef = useRef(null)

    return (
        <div className={styles.LoginPage}>

            <div className={styles.container}>
                <h2 className={styles.headline}>
                    Login
                </h2>

                <form className={styles.form}>
                    <label
                        htmlFor='loginInput' 
                        className={styles.label} 
                    >
                        Your login
                    </label>
                    <input 
                        id='loginInput' 
                        placeholder='login...' 
                        autoComplete='off' 
                        type='text'
                        ref={loginRef} 
                        className={styles.input} 
                        onChange={(e) => {
                            setLogin(e.target.value)
                        }}
                        onFocus={() => {
                            loginRef.current.classList.remove(styles.invalid)
                        }}
                    />

                    <label 
                        htmlFor='loginInput' 
                        className={styles.label} 
                    >
                        Your password
                    </label>
                    <input 
                        id='passwordInput' 
                        autoComplete='off' 
                        placeholder='password...'
                        type='password' 
                        ref={passwordRef}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        onFocus={() => {
                            passwordRef.current.classList.remove(styles.invalid)
                        }}
                        className={styles.input} 
                    />
                </form>

                <button
                    className={styles.button}
                    onClick={() => {
                        if ( valid.login(login) && valid.password(password) ) {
                            loginUser(login, password)
                                .then(data => {
                                    if ( data.login && data.password ){
                                        localStorage.setItem('login', data.login)
                                        localStorage.setItem('password', data.password)
                                    }
                                    if (data.message) {
                                        addNotify(data.message)
                                    }
                                })
                                .then(() => {
                                    navigate('/home')
                                })
                                .catch(e => {
                                    console.error(e)
                                })
                        } else {
                            if ( !valid.login(login) ) loginRef.current.classList.add(styles.invalid)
                            if ( !valid.password(password) ) passwordRef.current.classList.add(styles.invalid)
                        }
                    }}
                >
                    Login
                </button>

                <hr className={styles.row} />

                <span className={styles.footerText}>
                    Don`t have an account? &nbsp;
                    <a
                        href='/register' 
                        className={styles.link}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate('/register')
                        }}
                    >
                        Register!
                    </a>
                </span>
            </div>
        </div>
    )
}

export default LoginPage