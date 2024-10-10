// useCrud.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCrud = (baseUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  
const baseUrl = 'https://tech-foring-job-portal-1.onrender.com'
  // Delete
  const deleteRecord = async (id) => {
    setLoading(true);
    try {
    //   await axios.delete(`${baseUrl}/${id}`);
    const response = await axios.delete(`${baseUrl}/api/v1/jobs/delete-job/?prodId=${id}`, { withCredentials: true });  
    setData(response.data);
    console.log(response.data);
    } catch (error) {
        console.log(error)
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    deleteRecord,
  };
};

export default useCrud;