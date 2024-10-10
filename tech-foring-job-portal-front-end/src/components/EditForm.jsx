import { Button, Container, Typography, TextField, Box } from '@mui/material'
import React, { useEffect } from 'react'
import SelectJob from './SelectJob';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, useActionData, useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'https://tech-foring-job-portal-1.onrender.com'
export async  function EdditJob({request}) {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const filteredObj = Object.entries(data).reduce((acc, a) => {
        if (a[1] !== null && a[1] !== undefined && a[1] !== "") {
         acc[a[0]] = a[1];
    }
       return acc;
     }, {});
   
   const res = await axios.patch(`${baseUrl}/api/v1/jobs/update-job`, filteredObj, {withCredentials: true }).then((res) => {
       return { data: res.data, error: null }
    }).catch((err) => {
        console.log(err)
        return { error: err.response.data, data: null }
        
    });
    
        return res
    
}

const EditForm = () => {
   const info = useActionData();
    const notify = (mes) => toast(mes);
    const { id } = useParams();
    
    useEffect(() => {
        if (info?.data) {
            notify("successfully edited added");
        }
        if (info?.error) {
            console.log(info?.error)
            notify(info?.error);
        }
    }, [info?.data, info?.error]);

    
  return (
    <Container
    maxWidth="xs"
    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
  <ToastContainer />
    <Form method='patch'>
   
      <TextField    
        label="Job Title"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        
        helperText="Enter the job title"
        name='title'
      />
      <TextField    
        label="Job Description"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        helperText="Enter the job description"
        name='description'
      />
      <input type="hidden" name="job_id" defaultValue={id} />
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
        update Job
      </Button>
    </Form>
  </Container>
  )
}

export default EditForm
