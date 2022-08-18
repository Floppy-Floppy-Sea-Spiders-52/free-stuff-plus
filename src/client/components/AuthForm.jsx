import React, { useEffect, useState } from 'react';
import './auth-form.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AuthForm = ({ signUpShown, sendUserData, toggleForm, authErrorOccurred }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputIncomplete, setInputIncomplete] = useState(false);

  const labelText = signUpShown ? 'SIGN UP' : 'LOG IN';
  const toggleText = signUpShown ? 'Already a user?' : 'Need an account?';
  const linkText = signUpShown ? 'LOG IN' : 'SIGN UP';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signUpShown && (firstName === '' || lastName === '')) {
      return setInputIncomplete(true);
    } else if (email === '' || password === '') {
      return setInputIncomplete(true);
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };
    sendUserData(userData);
  };

  let errorMessage;
  useEffect(() => {
    if (authErrorOccurred) {
      if (signUpShown) {
        errorMessage = 'Account creation error. Please try again later'
      } else {
        errorMessage = 'Incorrect username or password.'
      }
    }
    // display input incomplete error for 3 seconds
    if (inputIncomplete) {
      errorMessage = 'Please enter all required information.'
      console.log(errorMessage);
      setTimeout(() => setInputIncomplete(false), 3000);
    }
  }, [authErrorOccurred, inputIncomplete])

  return (
    <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div className="FormContainer">
      <p><strong>{labelText}</strong></p>
      {
        signUpShown &&
        <React.Fragment>
          <TextField
            id="firstName"
            label="First Name"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required={true}
          />
        </React.Fragment>
      }
      <TextField
        id="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      />
      {(authErrorOccurred || inputIncomplete) && <div className="ErrorMessage"><p>{errorMessage}</p></div>}
      <div className="ButtonContainer">
        <Button variant="contained" onClick={handleSubmit}>{labelText}</Button>
      </div>
      <div className="ToggleText"><p>{toggleText} <a onClick={toggleForm}>{linkText}</a></p></div>
    </div>
  </Box>
  );
};

export default AuthForm;