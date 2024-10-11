import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Form,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import axios from "../api/axios";


export async function signIn({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await axios
    .post(
      `/api/v1/auth/login`,
      data,
      { withCredentials: true }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data);
    });
  if (res.status !== "success") {
    return false;
  }
  return redirect("/views", { replace: true });
}

function SignInPage() {
  const navigate = useNavigate();
    const Navigate = useNavigation()
  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Sign In
      </Typography>
      <Form method="post">
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%", marginTop: 2 }}
          disabled={Navigate.state === "submitting" || Navigate.state === "loading"} 
        >
                  {Navigate.state === 'submitting' ? 'Please wait...' : Navigate.state === 'loading' ? <CircularProgress size={30} sx={{color: 'white'}} /> : 'Sign In'} 

        </Button>
      </Form>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        don't have an account ?{" "}
        <Button variant="text"  onClick={() => navigate("/auth/signup")}>Sign Up</Button>
      </Typography>
    </Container>
  );
}

export default SignInPage;
