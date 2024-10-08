import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import JobList from '../components/JobList'
import { Outlet } from 'react-router-dom'
import NavTabs from '../components/NavTab'


const HomPage = () => {
  
  return (

    <Box sx={{display: "flex", flexDirection: "column", gap: 2, alignItems: 'center'}}>
     <Navbar />
     <NavTabs/>
    
     <Outlet/>
    </Box>

  )
}

export default HomPage