import React, {useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  styled,
  
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




 
 

function SignUpPage() {
  const notify = (mes) => toast(mes);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {addUser, user, error: errs} = useAuth();
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Sign-up attempted:', { username, password });
  
    const formData = new FormData(event.target);
    const data = {
    username: formData.get('username'),
    password: formData.get('password'),
     };
    if (!data.username || !data.password) {
      setError('Please fill in both fields.');
    } else {
      setError(null);
      addUser(data);
      // Proceed with sign-up logic
    }
  };

  useEffect(() => {
    if (user) {
       nav('/auth/signin');
    }
    if (errs) {
        notify(errs.error);
    }
}, [user, errs]);
  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 20 }}
    >
     <ToastContainer />
      <Typography variant="h4" component="h2" gutterBottom>
        Create an Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name='username'
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={password}
          name='password'
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{width: '100%', marginTop: 2}}
        >
          Create Account
        </Button>
      </form>
    </Container>
  );
}

export default SignUpPage;