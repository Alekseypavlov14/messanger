import React, { useEffect, useState } from 'react'
import styles from './AddContactPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const AddContactPage = ({ AddContact, setPageIndex }) => {
    const [login, setLogin] = useState('')

    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        fetch('/contacts/get', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                login: login
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            setCandidates(data.candidates)
        })
    }, [login])

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
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </header>

            <div className={styles.Form}>
                <input 
                    type='text'
                    autoComplete='off' 
                    placeholder='login...'
                    className={styles.login}
                    id='loginInput'
                    onChange={async (e) => {
                        setLogin(e.target.value)
                    }}
                />
            </div>
            
            <div className={styles.CandidatesBox}>
                {candidates.map((candidate, index) => {
                    if (candidate.login !== localStorage.getItem('login')){
                        return (
                            <div
                                key={index}
                                className={styles.Candidate}
                                onClick={() => {
                                    const contacts = JSON.parse(localStorage.getItem('contacts'))
                                    const duplicates = contacts.filter(contact => contact.login === candidate.login)
                                    if (duplicates.length === 0) {
                                        AddContact({login: candidate.login, messages: []})
                                    }
                                    setPageIndex(0)
                                }}
                            > 
                                {candidate.login} 
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default AddContactPage