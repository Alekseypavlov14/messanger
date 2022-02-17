import React, { useEffect, useState } from 'react'
import styles from './AddContactPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { request } from '../../api/request'
import Header from '../Header/Header'

const AddContactPage = ({ AddContact, setPageIndex }) => {
    const [login, setLogin] = useState('')
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        request('/contacts/get', { login: login })
        .then(data => {
            setCandidates(data.candidates)
        })
    }, [login])

    return (
        <div className={styles.AddContactPage}>
            <Header 
                title='AddContactPage' 
                active={() => setPageIndex(0)}
                icon={faClose}
            />

            <div className={styles.Form}>
                <input 
                    type='text'
                    autoComplete='off' 
                    placeholder='login...'
                    className={styles.login}
                    id='loginInput'
                    onChange={async (e) => setLogin(e.target.value)}
                />
            </div>
            
            <div className={styles.CandidatesBox}>
                {candidates.map((candidate, index) => {
                    if (candidate.login === localStorage.getItem('login')) return null
                    return (
                        <div
                            key={index}
                            className={styles.Candidate}
                            onClick={() => {
                                const contacts = JSON.parse(localStorage.getItem('contacts'))
                                const duplicates = contacts.filter(contact => contact.login === candidate.login)
                                if (duplicates.length === 0) {
                                    AddContact({login: candidate.login})
                                }
                                setPageIndex(0)
                            }}
                        > 
                            {candidate.login} 
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AddContactPage