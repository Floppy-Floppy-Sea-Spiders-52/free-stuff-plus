import React, { useState } from 'react';
import './auth-form.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AuthForm = ({ signUpShown, sendUserData, toggleForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const labelText = signUpShown ? 'SIGN UP' : 'LOG IN';
  const toggleText = signUpShown ? 'Already a user?' : 'Need an account?';
  const linkText = signUpShown ? 'LOG IN' : 'SIGN UP';

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      firstName,
      lastName,
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
      <div className="ButtonContainer">
        <Button variant="contained" onClick={handleSubmit}>{labelText}</Button>
      </div>
      <div className="ToggleText"><p>{toggleText} <a onClick={toggleForm}>{linkText}</a></p></div>
    </div>
  </Box>
  );
};

export default AuthForm;