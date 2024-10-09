import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getList = async () => {
  const list = await axios
    .get("https://tech-foring-job-portal-1.onrender.com/api/v1/jobs/views", { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      return res.data.Jobs;
    })
    .catch((err) => {
      return null;
    });
  return list;
};

const JobList = () => {
  // fetch list of jobs
  const JobList = useLoaderData();
  const { deleteRecord, data: datas, error: errs } = useCrud();
  const notify = (mes) => toast(mes);

  const Navigate = useNavigate();

  const handleDelete = async (e) => {
    await deleteRecord(e.target.dataset.id);
  };

  useEffect(() => {
    if (datas) {
      notify("successfully removed job");
      Navigate("/views", { replace: true });
    }
    if (errs) {
      console.log(errs);
      notify(errs.error);
    }

    return () => {
      if (datas) window.location.reload();
    };
  }, [datas, errs]);

  if (!JobList) {
    return <p>No data found</p>;
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ToastContainer />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: -2,
            alignItems: "center",
          }}
        >
          <Typography variant="title" align="center" fontWeight={"bold"}>
            BROWSE OPEN POSITION BY CATEGORY
          </Typography>
          <Typography variant="title" align="center" fontSize="small">
            We are always on the lookout for talented people
          </Typography>
        </Box>
      </Box>

      <List sx={{ width: { xs: 320, md: 600, lg: 1000 }, gap: 2, mt: 4 }}>
        {JobList?.map(({ id, type, Jobs }) => {
          return (
            <ListItem
              key={id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                outline: 2,
                outlineColor: "#f6eeff",
                mb: 2,
                borderRadius: 2,
                bgcolor: "#fffbfe",
              }}
            >
              <Accordion elevation={0} sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1-content"
                  id={`panel1-${id}`}
                  data-ids={id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{type}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {Jobs?.map(({ id, title, description }) => {
                    return (
                      <Box
                        key={id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="title" fontWeight={"bold"}>
                          {title}
                        </Typography>
                        <Typography variant="body1">{description}</Typography>
                        <Box sx={{ display: "flex", gap: 4 }}>
                          <Button
                            data-id={id}
                            variant="contained"
                            sx={{ textWrap: "nowrap", p: 1 }}
                            onClick={() => Navigate(`/edit-job/${id}`)}
                          >
                            Edit Job
                          </Button>
                          <Button
                            data-id={id}
                            variant="contained"
                            sx={{ textWrap: "nowrap", p: 1 }}
                            onClick={handleDelete}
                          >
                            Delete Job
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default JobList;
