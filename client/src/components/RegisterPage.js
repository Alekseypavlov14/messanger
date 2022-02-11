import React, { useEffect, useState,useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RegisterPage.module.css'
import registerUser from '../authentication/register'
import { valid } from '../authentication/validation'
import { NotificationContext } from '../context/context'

const RegisterPage = () => {
    const { addNotify } = useContext(NotificationContext)
    const navigate = useNavigate()

    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)
    const loginInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    useEffect(() => {
        const login = localStorage.getItem('login')
        const password = localStorage.getItem('password')

        if (login && password) {
            navigate('/home')
        }
    }, [navigate])

    return (
        <div className={styles.LoginPage}>
            <div className={styles.container}>

                <h2 className={styles.headline} >
                    Register
                </h2>

                <form 
                    className={styles.form} 
                >

                    <label 
                        className={styles.inputLabel} 
                        htmlFor='loginInput'
                    >
                        Your login
                    </label>

                    <input 
                        className={styles.input} 
                        id='loginInput' 
                        type='text'
                        placeholder='login...'
                        onChange={(e) => {
                            setLogin(e.target.value)
                        }}
                        ref={loginInputRef}
                        autoComplete='off'
                        tabIndex={1}
                        onFocus={() => {
                            loginInputRef.current.classList.remove(styles.invalid)
                        }}
                    >
                    </input>

                    <label 
                        className={styles.inputLabel} 
                        htmlFor='passwordInput'
                    >
                        Your login
                    </label>

                    <input 
                        className={styles.input} 
                        id='passwordInput' 
                        type='password'
                        placeholder='password...'
                        ref={passwordInputRef}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        autoComplete='off'
                        tabIndex={2}
                        onFocus={() => {
                            passwordInputRef.current.classList.remove(styles.invalid)
                        }}
                    >
                    </input>
                </form>

                <button 
                    type='submit'
                    className={styles.button}
                    onClick={() => {
                        if ( valid.login(login) &&  valid.password(password) ) {
                            registerUser(login, password)
                                .then(data => {
                                    if ( data.login && data.password ){
                                        localStorage.setItem('login', data.login)
                                        localStorage.setItem('password', data.password)
                                        localStorage.setItem('user', data.user)
                                    }
                                    else {
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
                            if ( !valid.login(login) ) {
                                loginInputRef.current.classList.add(styles.invalid)
                            }
                            if ( !valid.password(password) ) {
                                passwordInputRef.current.classList.add(styles.invalid)
                            }
                        }
                    }}
                >
                    Register
                </button>
                <hr className={styles.row}></hr>

                <span className={styles.footerText}>
                    Have an account? &nbsp;
                    <a
                        href='/login' 
                        className={styles.link}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate('/login')
                        }}
                    >
                        Login!
                    </a>
                </span>
            </div>
        </div>
    )
}

export default RegisterPage