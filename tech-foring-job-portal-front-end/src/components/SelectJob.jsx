import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import useFetch from '../hooks/useFetch';
export default function SelectJob() {
    const { data, error, loading } = useFetch('http://localhost:4000/api/v1/jobs/views');
    if (loading) return <p>Loading...</p>;
    if (error) return <p>cant load category</p>;
    return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Job Type
        </InputLabel>
        <NativeSelect
         name='job_type'
          defaultValue={"Select Job Type"}
          inputProps={{
            name: 'job_type',
            id: 'uncontrolled-native',
          }}
         
        >{ data?.map(({id, type}) => 
          <option key={id}  value={id}>{type}</option>
        )}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}