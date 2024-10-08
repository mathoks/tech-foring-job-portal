import { Container, Box, Typography, List, ListItem, Button, Icon, IconButton } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import useFetch from '../hooks/useFetch';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import useCrud from '../hooks/useCrud';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const JobList = () => {
    // fetch list of jobs
    const { data, error, loading } = useFetch('http://localhost:4000/api/v1/jobs/views');
    const {deleteRecord, data: datas, error: errs} = useCrud()
    const notify = (mes) => toast(mes);
const Navigate = useNavigate();
    const handleDelete = async (e) => {
        console.log(e.target.dataset

        )
       await deleteRecord(e.target.dataset.id)
       
    }

  

    

    useEffect(() => {
        if (datas) {
            notify("successfully removed job");
        }
        if (errs) {
            console.log(errs)
            notify(errs.error);
        }

        return () => {
            if (datas) window.location.reload()
            
            
        }
    }, [datas, errs]);

    

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Can't load category</p>
        
    }
    if (!data) {
        return <p>No data found</p>
    }

    


  return (
    <Container sx={{display: "flex", flexDirection: 'column', alignItems: "center" }}>
    <ToastContainer />
     <Box>
     <Box sx={{display: "flex", flexDirection: "column", gap: -2, alignItems: 'center'}} >
      <Typography variant="title" align="center" fontWeight={"bold"}>BROWSE OPEN POSITION BY CATEGORY</Typography>
      <Typography variant="title" align="center" fontSize= "small" >We are always on the lookout for talented people</Typography>
      </Box>
     </Box>
       
       <List sx={{ width: { xs: 320, md: 600, lg: 1000 }, gap: 2, mt:4}}>
       {data?.map(({id, type, Jobs}) => {
              return (
                <ListItem key={id} sx= {{display : "flex", justifyContent: "space-between", outline: 2, outlineColor: "#f6eeff",  mb: 2, borderRadius: 2, bgcolor: "#fffbfe"}} >
                <Accordion elevation={0} sx={{width: "100%"}}>
        <AccordionSummary
          expandIcon={<AddIcon />} 
          aria-controls="panel1-content"
          id={`panel1-${id}`} 
          data-ids={id}
          sx={{display:"flex", justifyContent: 'space-between' , width: "100%"}}    
          
        >
          <Typography>{type}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex",  justifyContent: 'center', flexDirection:"column", gap: 2}}>
        
        {
            Jobs?.map(({id, title, description}) => {
                return (
                
                <Box key={id} sx={{display: "flex", flexDirection: "column", gap:4, width: "90%",justifyContent: "center"}} >
                    <Typography variant="title" fontWeight={"bold"}>{title}</Typography>
                    <Typography variant="body1">{description}</Typography>
                    <Box sx={{display: "flex", gap: 4}}>
                    <Button data-id = {id} variant="contained" sx={{textWrap: "nowrap", p:1,}} onClick={()=>Navigate(`/edit-job/${id}`)}>Edit Job</Button>
                    <Button data-id = {id} variant="contained" sx={{textWrap: "nowrap", p:1}} onClick={handleDelete}>Delete Job</Button>
                    </Box>
                </Box>
                    
                
                )
            })
            }
        
        </AccordionDetails>
      </Accordion>
                </ListItem>
              )
       })}
       </List>
    </Container>
  )
}

export default JobList