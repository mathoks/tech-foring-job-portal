import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  styled,
  
} from '@mui/material';
import { Form, redirect, useFormAction, useNavigate, useRouteError } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';



export async  function signIn({request}) {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
   const res = await axios.post('https://tech-foring-job-portal-1.onrender.com/api/v1/auth/login', data, {withCredentials: true}).then((res) => {
       return res.data
    }).catch((err) => {
        console.log(err)
        throw new Error(err.response.data)
        
    });
    if(res.status !== 'success'){
        return false
    }
    return redirect('/views', { replace: true });
}


 

function SignInPage() {
  
    
//   const {login, user} = useAuth();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
    const navigate = useNavigate();
    
//     const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = {
//     username: formData.get('username'),
//     password: formData.get('password'),
//      };
//     if (!username || !password) {
//       setError('Please fill in both fields.');
//     } else {
//       setError(null);
//       login(data);
//       console.log(user)
//       if(user){
//         navigate({to:'/views', replace: true});
//       }
//       // Proceed with sign-up logic
//     }
//   };

  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Sign In
      </Typography>
      <Form method='post'>
        <TextField
          label="Username"
          variant="outlined"
          name='username'
          fullWidth
          sx={{ marginBottom: 2 }}
          
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name='password'
          fullWidth
          sx={{ marginBottom: 2 }}
        //   value={password}
        //   onChange={(event) => setPassword(event.target.value)}
        />
        {/* {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )} */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{width: '100%', marginTop: 2}}
        >
          Sign In
        </Button>
      </Form>
      <Typography variant="body2" sx={{ marginTop: 2 }}>don't have an account ? <Button variant="text" onClick={()=>navigate( '/auth/signup')} >SignUp</Button></Typography>
    </Container>
  );
}

export default SignInPage;