import React, { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import Notification from './components/Notification';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NotificationContext } from './context/context'
import styles from './App.module.css';

function App() {
  const [notifications, setNotifications] = useState([])

  function addNotify(message) {
    setNotifications(prev => prev.concat([message]))
  }

  return (
    <BrowserRouter>
        <NotificationContext.Provider value={{ notifications, addNotify, setNotifications }}>
          <div className={styles.App}>
            {notifications.map((notify, index) => (
              <Notification text={notify} key={index} />
            ))}
            <Routes>
              <Route path='/' element={<Navigate to='/register'/> }/>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/home' element={<HomePage />} />
            </Routes>
          </div>
        </NotificationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
