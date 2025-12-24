import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import api from './api/axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        // Set token in headers for future requests
        api.defaults.headers.common['Authorization'] = token;
        setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = token;
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <>
           <LandingPage onLoginClick={() => setShowLoginModal(true)} />
           {showLoginModal && (
             <Login 
               onLoginSuccess={handleLoginSuccess} 
               onCancel={() => setShowLoginModal(false)} 
             />
           )}
        </>
      )}
    </>
  );
}

export default App;