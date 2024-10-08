import { Button, Container, Typography, TextField, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useCrud from '../hooks/useCrud';
import SelectJob from './SelectJob';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const EditForm = () => {
    const [job_title, setJobTitle] = useState('');
    const [error, setError] = useState(null);
    const [job_description, setJobDesc] = useState('');
    const {updateRecord, data, error: errs} = useCrud();
    const notify = (mes) => toast(mes);
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        if (data) {
            notify("successfully edited added");
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
        job_id: formData.get('job_id')
         };
     
       console.log(data, error)
      
        setError(null);
        updateRecord(data);
        // Proceed with sign-up logic
    
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
        name='job_description'
      />
      <input type="hidden" name="job_id" defaultValue={id} />
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
        update Job
      </Button>
    </form>
  </Container>
  )
}

export default EditForm
