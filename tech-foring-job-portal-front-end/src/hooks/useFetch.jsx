// useFetch.js
import axios from '../api/axios';
import { useState, useEffect} from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let Ismounted = true;
const controller = new AbortController()
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true, signal: controller.signal, ...options });
       Ismounted && setData(response.data.Jobs);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return ()=>{
        Ismounted = false;
        controller.abort()
    }
  }, [url]);

  return { data, error, loading };
};

export default useFetch;