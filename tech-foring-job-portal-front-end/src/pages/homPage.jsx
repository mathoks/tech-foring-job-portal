import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NavTabs from "../components/NavTab";

const HomPage = () => {
  const loc = useLocation();
  const  navigate = useNavigate();
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

      <Outlet />
    </Box>
  );
};

export default HomPage;
