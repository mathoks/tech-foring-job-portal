import React from 'react'
import {
    createBrowserRouter,
  } from "react-router-dom";
import App from '../App';
import ProtectedHomePage from '../pages/ProtectedHomePage';
import AuthPage from '../pages/AuthPage';
import SignUpPage from '../components/SignUpPage';
import JobList from '../components/JobList';
import AddJob from '../components/AddJob';
import EditForm from '../components/EditForm';


const routes =  createBrowserRouter([
    {
      path: "/",
      element: <ProtectedHomePage><App/></ProtectedHomePage>,
      
      children: [
        {
          path: "views",
          element: <JobList/>
        },
        {
          path: 'create',
          element: <AddJob/>
        },
        {
          path: "edit-job/:id",
          element: <EditForm/>
        },
        ]
    },
    {
        path: "/auth/signin",
        element: <AuthPage/>,
      },
      {
        path: "/auth/signup",
        element: <SignUpPage/>,
      },
  ]);


export default routes