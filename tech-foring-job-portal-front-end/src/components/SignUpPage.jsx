import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


export async  function signUp({request}) {
    
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
 const res = await axios.post('https://tech-foring-job-portal-1.onrender.com/api/v1/users/create-user', data, {withCredentials: true}).then((res) => {
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

 
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const { addUser, user, error: errs } = useAuth();
  // const nav = useNavigate();
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log("Sign-up attempted:", { username, password });

  //   const formData = new FormData(event.target);
  //   const data = {
  //     username: formData.get("username"),
  //     password: formData.get("password"),
  //   };
  //   if (!data.username || !data.password) {
  //     setError("Please fill in both fields.");
  //   } else {
  //     setError(null);
  //     addUser(data);
  //     // Proceed with sign-up logic
  //   }
  // };

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
        Create an Account
      </Typography>
      <Form method="post">
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          // value={username}
          // onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          // value={password}
          name="password"
          // onChange={(event) => setPassword(event.target.value)}
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
        >
          Create Account
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
