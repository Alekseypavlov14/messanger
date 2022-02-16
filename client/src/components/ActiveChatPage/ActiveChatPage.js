import React, { useEffect, useState, useRef } from 'react'
import styles from './ActiveChatPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Message from '../Message/Message'

const ActiveChatPage = ({ setPageIndex, activeChat }) => {
    const [currentMessage, setCurrentMessage] = useState('')

    const TextAreaRef = useRef(null)
    const MessagesBoxRef = useRef(null)

    function sendMessage() {
        fetch('/message/send', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'Post',
            body: JSON.stringify({
                time: Date.now(),
                from: localStorage.getItem('login'),
                to: activeChat.login,
                text: currentMessage,
                read: false,
                send: false
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.isSaved) {
                setMessages(prev => {
                    prev[prev.length - 1].send = true
                    return prev
                })
            }
        })
    }

    function sortByDate(messages) {
        // const dates = messages.map(message => new Date(message.time))
        // console.log(dates)

        // console.log(dates)

        return messages.sort((a, b) => new Date(a.time) - new Date (b.time))
    }

    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch('/message/get-by-login', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('login'),
                contact: activeChat.login
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            return setMessages(sortByDate(data.messages))
        }).then(() => {
            const box = MessagesBoxRef.current
            box.scrollTop = box.scrollHeight - box.clientHeight
        })
    }, [activeChat.login])

    useEffect(() => {
        const reloader = setInterval(() => {
            fetch('/message/get-by-login', {
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('login'),
                    contact: activeChat.login
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                return setMessages(sortByDate(data.messages))
            })
        }, 1000)

        return () => {
            clearInterval(reloader)
        }
    }, [])

    useEffect(() => {
        fetch('/message/read', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                messages: {
                    from: activeChat.login,
                    to: localStorage.getItem('login')
                }
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data.response)
        })

        const box = MessagesBoxRef.current
        box.scrollTop = box.scrollHeight
    }, [messages])

    return (
        <div className={styles.ActiveChatPage}>
            <header
                className={styles.Header}
            >
                {activeChat.login}

                <button 
                    onClick={() => {
                        setPageIndex(0)
                    }}
                    className={styles.ExitButton}
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </header>

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
                    onClick={() => {
                        if (!(/\S/.test(currentMessage))) {
                            TextAreaRef.current.value = ''
                            setCurrentMessage('')
                            return
                        }

                        sendMessage()
                        setMessages(prev => prev.concat([{
                            time: Date.now(),
                            from: localStorage.getItem('login'),
                            to: activeChat.login,
                            text: currentMessage,
                            read: false
                        }]))
                        TextAreaRef.current.value = ''
                        setCurrentMessage('')
                        TextAreaRef.current.focus()
                    }}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.Icon} />
                </button>
            </div>
        </div>
    )
}

export default ActiveChatPage