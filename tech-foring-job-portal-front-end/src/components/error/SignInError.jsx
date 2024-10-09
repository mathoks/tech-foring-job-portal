import { Container, Typography } from '@mui/material'
import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()
   
  return (
   <Container sx={{display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", mt: 12 }}>
<Typography>
    Opps
</Typography>
<Typography>
    <i>{error.message}</i>
</Typography>
   </Container>
  )
}

export default ErrorPage
