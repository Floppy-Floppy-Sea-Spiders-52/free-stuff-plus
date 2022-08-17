import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth-page.scss';
import AuthForm from './AuthForm';

// ugh gotta refactor to extract the dang form
const AuthPage = () => {
  const [signUpShown, setSignUpShown] = useState(false);
  const [authErrorOccurred, setAuthErrorOccurred] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setSignUpShown(!signUpShown);
  };

  // make post request to backend depending on origin of request (signup vs login)
  // use react router to navigate to homepage upon successful signup/login
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
        const response = await fetch('/api/signup', options)
        if (response.status !== 200 && response.status !== 201) {
          throw Error();
        }
        navigate('/home', { state: { username: userData.email }});
      } else {
        const response = await fetch('/api/login', options);
        if (response.status !== 200 && response.status !== 201) {
          throw Error();
        }
        navigate('/home', { state: { username: userData.email }});
      }
    } catch (err) {
      // pass down prop to display error message for 3 seconds
      setAuthErrorOccurred(true);
      setTimeout(() => setAuthErrorOccurred(false), 3000);
      // console log for testing during dev, can remove later
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
        authErrorOccurred={authErrorOccurred}
      />
    </div>
  );
};

export default AuthPage;