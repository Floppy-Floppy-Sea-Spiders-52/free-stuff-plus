import React, { useState } from 'react';
import './auth-form.scss';
import { Box, TextField, Button } from '@mui/material';

const AuthForm = ({ signUpShown, sendUserData, toggleForm, authErrorOccurred }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputIncomplete, setInputIncomplete] = useState(false);

  const labelText = signUpShown ? 'SIGN UP' : 'LOG IN';
  const toggleText = signUpShown ? 'Already a user?' : 'Need an account?';
  const linkText = signUpShown ? 'LOG IN' : 'SIGN UP';

  // on incomplete input, display error message for 3 seconds
  const showInputError = () => {
    setInputIncomplete(true);
    setTimeout(() => setInputIncomplete(false), 3000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // handling missing inputs since "required" attribute on MUI input fields do not appear to work
    if (signUpShown && (firstName === '' || lastName === '')) {
      return showInputError();
    } else if (email === '' || password === '') {
      return showInputError();
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };
    sendUserData(userData);
  };

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
            required
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </React.Fragment>
      }
      <TextField
        id="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {
        authErrorOccurred 
          && !signUpShown 
          && <div className="ErrorMessage"><p>Incorrect username or password.</p></div>
      }
      {
        authErrorOccurred 
          && signUpShown 
          && <div className="ErrorMessage"><p>Account creation error.</p></div>
      }
      {
        inputIncomplete
          && <div className="ErrorMessage"><p>Please enter all required information.</p></div>
      }
      <div className="ButtonContainer">
        <Button variant="contained" onClick={handleSubmit}>{labelText}</Button>
      </div>
      <div className="ToggleText"><p>{toggleText} <a onClick={toggleForm}>{linkText}</a></p></div>
    </div>
  </Box>
  );
};

export default AuthForm;