import { Button, Container, Typography, TextField, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useCrud from '../hooks/useCrud';
import SelectJob from './SelectJob';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobForm = () => {
    const [job_title, setJobTitle] = useState('');
    const [error, setError] = useState(null);
    const [job_description, setJobDesc] = useState('');
    const {createRecord, data, error: errs} = useCrud();
    const notify = (mes) => toast(mes);

    useEffect(() => {
        if (data) {
            notify("successfully job added");
        }
        if (errs) {
            console.log(errs)
            notify(errs.error);
        }
    }, [data, errs]);

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log(formData)
      const data = {
      title: formData.get('job_title'),
      description: formData.get('job_description'),
      categoryId: formData.get('job_type'),
       };
     
       console.log(data, error)
      // Example error handling
      if (!job_title || !job_description  || !data.categoryId) {
        setError('Please fill in the required fields.');
      } else {
        setError(null);
        createRecord(data);
        // Proceed with sign-up logic
      }
    };
  return (
    <Container
    maxWidth="xs"
    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
  <ToastContainer />
    <form onSubmit={handleSubmit}>
   
      <TextField    
        label="Job Title"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={job_title}
        onChange={(event) => setJobTitle(event.target.value)}
        helperText="Enter the job title"
        required
        name='job_title'
      />
      <TextField    
        label="Job Description"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={job_description}
        onChange={(event) => setJobDesc(event.target.value)}
        helperText="Enter the job description"
        required
        name='job_description'
      />
      
      <SelectJob/>
      {error && (
        <Box sx={{minWidth: 318}}>
        <Typography color="error" gutterBottom>
          {error}
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
    </form>
  </Container>
  )
}

export default JobForm
