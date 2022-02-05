import './App.css';
import LoginPage from './components/LoginPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to='/register'/> }/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
