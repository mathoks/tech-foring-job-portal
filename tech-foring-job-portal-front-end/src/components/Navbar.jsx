import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Box, Container, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar = () => {
  return (
    <AppBar position = "static">
        <Container maxWidth = "xl">
        <Toolbar disableGutters sx={{display: "flex", gap: 2}}>
        <AdbIcon />
        <Box sx={{display: "flex", flexDirection: "column", pb:2}}>
        <h2>TechForing</h2>
        <Typography sx={{mt: -2}}>Shopping Tomorrows Cybersecurity</Typography>
        </Box>
        
        </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar