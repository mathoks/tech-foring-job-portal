import React from 'react'
import {
    createBrowserRouter,
  } from "react-router-dom";
import App from '../App';
import ProtectedHomePage from '../pages/ProtectedHomePage';
import AuthPage from '../pages/AuthPage';
import SignUpPage, { signUp } from '../components/SignUpPage';
import JobList, { getList } from '../components/JobList';
import AddJob from '../components/AddJob';
import EditForm, { EdditJob } from '../components/EditForm';
import { checkAuth } from '../pages/ProtectedHomePage';
import { signIn } from '../components/SignInPage';
import ErrorPage from '../components/error/SignInError';
import { AddNewJob } from '../components/JobForm';



const routes =  createBrowserRouter([
    {
      path: "/",
      element: <ProtectedHomePage><App/></ProtectedHomePage>,
      loader: checkAuth,
      children: [
        {
            path: 'views',
           element: <JobList/>,
           loader: getList,
           
          
        },
        {
          path: 'create',
          element:<AddJob/>,
          action: AddNewJob
        },
        {
          path: "edit-job/:id",
          element: <EditForm/>,
          action: EdditJob
        },
        ],
    },
       
        
    
    {
        path: "/auth/signin",
        element: <AuthPage/>,
        action: signIn,
        errorElement: <ErrorPage/>,
      },
      {
        path: "/auth/signup",
        element: <SignUpPage/>,
        action: signUp
      },
  ]);


export default routes
