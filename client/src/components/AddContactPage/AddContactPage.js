import React, { useState } from 'react'
import styles from './AddContactPage.module.css'

const AddContactPage = ({ AddContact, setPageIndex }) => {
    const [login, setLogin] = useState('')

    return (
        <div className={styles.AddContactPage}>

            <header className={styles.header}>
                AddContactPage

                <button 
                    onClick={() => {
                        setPageIndex(0)
                    }}
                    className={styles.ExitButton}
                >
                    X
                </button>
            </header>

            <div className={styles.Form}>
                <label
                    htmlFor='loginInput'
                >
                    login:
                </label>
                <input 
                    type='text'
                    placeholder='login...'
                    className={styles.login}
                    id='loginInput'
                    onChange={(e) => {
                        setLogin(e.target.value)

                        fetch('/contacts/find', {
                            method: 'POST',
                            body: JSON.stringify({
                                login: login
                            })
                        }).then(response => {
                            return response.json()
                        }).then(data => {
                            console.log(data)
                        })
                    }}
                />
            </div>
            
            <div className={styles.CandidatesBox}>

            </div>


            {/* ======================= */}


            <button onClick={() => {
                AddContact({login: 'World', messages: []})
            }}>
                Add
            </button>
        </div>
    )
}

export default AddContactPage