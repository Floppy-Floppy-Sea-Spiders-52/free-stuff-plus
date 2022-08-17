import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth-page.scss';
import AuthForm from './AuthForm';

// ugh gotta refactor to extract the dang form
const AuthPage = () => {
  const [signUpShown, setSignUpShown] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setSignUpShown(!signUpShown);
  };

  const sendUserData = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    };
    try {
      if (signUpShown) {
        const response = await fetch('/signup', options)
        if (response.status !== 200 && response.status !== 201) {
          throw Error();
        }
        navigate('/home', { state: { username: userData.email }});
      } else {
        const response = await fetch('/login', options);
        if (response.status !== 200 && response.status !== 201) {
          throw Error();
        }
        navigate('/home', { state: { username: userData.email }});
      }
    } catch (err) {
      // consider passing props down to form to display an error message! 
      const errorType = signUpShown ? 'creation' : 'authentication' 
      console.log(`User ${errorType} failed:`, err);
    }
  }

  return (
    <div className="AuthContainer">
      <AuthForm 
        signUpShown={signUpShown}
        toggleForm={toggleForm}
        sendUserData={sendUserData}
      />
    </div>
  );
};

export default AuthPage;