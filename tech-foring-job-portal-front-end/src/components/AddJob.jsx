import { Container, Box, Typography } from '@mui/material'
import React from 'react'
import JobForm from './JobForm'

const AddJob = () => {
  return (
    <Container sx={{display: "flex", flexDirection: "column", gap:4}}>
     <Box sx={{display: "flex", flexDirection: "column", gap: -2, alignItems: 'center'}} >
      <Typography variant="title" align="center" fontWeight={"bold"}>ADD A JOB</Typography>
      <Typography variant="title" align="center" fontSize= "small" >We are always on the lookout for talented people</Typography>
      </Box>
    <JobForm/>
    </Container>
  )
}

export default AddJob