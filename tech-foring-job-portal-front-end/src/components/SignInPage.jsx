import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import {
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const baseUrl = 'https://tech-foring-job-portal-1.onrender.com'
export async function signIn({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await axios
    .post(
      `${baseUrl}/api/v1/auth/login`,
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
        >
          Sign In
        </Button>
      </Form>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        don't have an account ?{" "}
        <Button variant="text" onClick={() => navigate("/auth/signup")}>
          SignUp
        </Button>
      </Typography>
    </Container>
  );
}

export default SignInPage;
