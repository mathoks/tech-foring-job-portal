import { Button, Container, Typography, TextField, Box } from '@mui/material'
import React, { useEffect } from 'react'
import SelectJob from './SelectJob';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Form, useActionData } from 'react-router-dom';

const baseUrl = 'https://tech-foring-job-portal-1.onrender.com'
export async  function AddNewJob({request}) {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
   const res = await axios.post(`${baseUrl}/api/v1/jobs/add-job`, data, {withCredentials: true}).then((res) => {
       return { data: res.data, error: null }
    }).catch((err) => {
        console.log(err)
        return { error: err.response.data, data: null }
        
    });
    
        return res
    
}

const JobForm = () => {

    const info = useActionData();
    const notify = (mes) => toast(mes);
   
    useEffect(() => {
        
        if (info?.data) {
            notify("successfully job added");
        }
        if (info?.error) {
            console.log(info?.error);
            notify(info?.error);
        }
        
    }, [info?.data, info?.error]);

     
       
  return (
    <Container
    maxWidth="xs"
    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
  <ToastContainer />
    <Form method='post'>
   
      <TextField    
        label="Job Title"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      
        helperText="Enter the job title"
        required
        name='title'
      />
      <TextField    
        label="Job Description"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
       
        helperText="Enter the job description"
        required
        name='description'
      />
      
      <SelectJob/>
      {info?.error && (
        <Box sx={{minWidth: 318}}>
        <Typography color="error" gutterBottom>
          {info?.error}
        </Typography>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{width: '100%', marginTop: 4}}
      >
        Add Job
      </Button>
    </Form>
  </Container>
  )
}

export default JobForm
