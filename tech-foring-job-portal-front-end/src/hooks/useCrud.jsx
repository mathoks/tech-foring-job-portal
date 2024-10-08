// useCrud.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCrud = (baseUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create
  const createRecord = async (record) => {
   
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/v1/jobs/add-job', record, { withCredentials: true });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // Read
  const getRecord = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      setData(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // Update
  const updateRecord = async (obj) => {
    const cleanedObj = Object.keys(obj).reduce((acc, key) => {
        if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
   console.log(cleanedObj)
    setLoading(true);
    try {
      const response = await axios.patch(`http://localhost:4000/api/v1/jobs/update-job`, cleanedObj, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const deleteRecord = async (id) => {
    setLoading(true);
    try {
    //   await axios.delete(`${baseUrl}/${id}`);
    const response = await axios.delete(`http://localhost:4000/api/v1/jobs/delete-job/?prodId=${id}`, { withCredentials: true });  
    setData(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    createRecord,
    getRecord,
    updateRecord,
    deleteRecord,
  };
};

export default useCrud;