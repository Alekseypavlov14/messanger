import React, { useEffect, useState, useRef } from 'react'
import styles from './ActiveChatPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Message from '../Message/Message'
import { sortByDate } from '../../api/sortMessagesByDate'
import { request } from '../../api/request'
import Header from '../Header/Header'

const ActiveChatPage = ({ setPageIndex, activeChat }) => {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([])

    const TextAreaRef = useRef(null)
    const MessagesBoxRef = useRef(null)

    function sendMessage() {
        request('/message/send', {
            time: Date.now(),
            from: localStorage.getItem('login'),
            to: activeChat.login,
            text: currentMessage,
            read: false,
            send: false
        })
        .then(data => {
            if (data.isSaved) {
                setMessages(prev => {
                    prev[prev.length - 1].send = true
                    return prev
                })
            }
        })
    }

    useEffect(() => {
        request('/message/get-by-login', {
            user: localStorage.getItem('login'),
            contact: activeChat.login
        })
        .then(data => {
            return setMessages(sortByDate(data.messages))
        })
        .then(() => {
            const box = MessagesBoxRef.current
            box.scrollTop = box.scrollHeight
        })

        const reloader = setInterval(() => {
            request('/message/get-by-login', {
                user: localStorage.getItem('login'),
                contact: activeChat.login
            })
            .then(data => {
                return setMessages(sortByDate(data.messages))
            })
        }, 1000)

        return () => {
            clearInterval(reloader)
        }
    }, [activeChat.login])

    useEffect(() => {
        request('/message/read', {
            messages: {
                from: activeChat.login,
                to: localStorage.getItem('login')
            }
        })
    }, [messages])

    return (
        <div className={styles.ActiveChatPage}>
            <Header 
                title={activeChat.login} 
                active={() => {setPageIndex(0)}} 
                icon={faClose} 
            />

            <div className={styles.Messages} ref={MessagesBoxRef}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>

            <div className={styles.WriteMessageBox}>
                <textarea 
                    ref={TextAreaRef}
                    wrap='soft' 
                    className={styles.Input}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value)
                    }}
                />

                <button
                    className={styles.Send}
                    onClick={async () => {
                        if (!(/\S/.test(currentMessage))) {
                            TextAreaRef.current.value = ''
                            setCurrentMessage('')
                            return
                        }

                        // send to server
                        sendMessage()
                        // set on client
                        await setMessages(prev => prev.concat([{
                            time: Date.now(),
                            from: localStorage.getItem('login'),
                            to: activeChat.login,
                            text: currentMessage,
                            read: false
                        }]))

                        // clear textarea and focus on it
                        TextAreaRef.current.value = ''
                        setCurrentMessage('')
                        TextAreaRef.current.focus()
                        
                        // scroll to bottom
                        const box = MessagesBoxRef.current
                        box.scrollTop = box.scrollHeight
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.Icon} />
                </button>
            </div>
        </div>
    )
}

export default ActiveChatPage