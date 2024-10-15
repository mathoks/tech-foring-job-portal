import React, { useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";


export async  function signUp({request}) {
    
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
 const res = await axios.post(`/api/v1/users/create-user`, data, {withCredentials: true}).then((res) => {
     return { user: res.data.newUser.username, error: null }
  }).catch((err) => {
      //  throw new Error(err.response.data.message) 
      console.log(err)
      return  { error: err.response.data , user: null} 
  });
  if(res.user === null){
      return res
  }
  return redirect('/auth/signIn', { replace: true });
}

function SignUpPage() {
   const notify = (mes) => toast(mes);
  const data = useActionData()
  const Navigate = useNavigation()
 

  useEffect(() => {
    if (data?.error) {
      notify(data?.error);
    }
  }, [data?.error]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 20,
      }}
    >
      <ToastContainer />
      <Typography variant="h4" component="h2" gutterBottom>
        Sign Up
      </Typography>
      <Form method="post">
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          required 
          sx={{ marginBottom: 2 }}
          helperText = " min of 8 characters"

        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          name="password"
          required 
          helperText = "min of 8 characters must contain an uppercase, number and a special character"
          

         
        />
        {data?.error && (
          <Typography color="error" gutterBottom>
            {data?.error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%", marginTop: 2 }}
          disabled= {Navigate.state === "submitting" || Navigate.state === 'loading'}
        >
          { Navigate.state === 'submitting' ? 'Please wait...' : Navigate.state === 'loading' ? <CircularProgress size={30} sx={{color: 'white'}} /> : 'Create Account'}
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
