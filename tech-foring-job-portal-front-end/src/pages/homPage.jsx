import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Outlet,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";
import NavTabs from "../components/NavTab";

const HomPage = () => {
  const loc = useLocation();
  const  navigate = useNavigate();
  const Navigate = useNavigation()
  useEffect(() => {
    if (loc.pathname === "/") {
      navigate("/views");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Navbar />
      <NavTabs />
       {Navigate.state === "loading" && <CircularProgress />} 
      <Box sx={{ opacity :Navigate.state === "loading" ? 50 : 100}}>
      <Outlet />
      </Box>
    </Box>
  );
};

export default HomPage;
