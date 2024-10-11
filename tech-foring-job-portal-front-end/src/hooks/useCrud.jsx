// useCrud.js
import { useState } from "react";
import axios from "../api/axios";

const useCrud = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Delete
  const deleteRecord = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/v1/jobs/delete-job/?prodId=${id}`,
        { withCredentials: true }
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
