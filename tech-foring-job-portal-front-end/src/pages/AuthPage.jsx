import React from 'react'
import SignInPage from '../components/SignInPage'
import { Container } from '@mui/material'

const AuthPage = () => {
  return (
    <Container sx={{display: 'block', alignItems: "center", mt: 20}}>
    <SignInPage/>
    </Container>
  ) 
}

export default AuthPage