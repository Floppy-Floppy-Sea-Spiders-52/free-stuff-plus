import React, { useState, useEffect } from 'react';
import { FormControlLabel, FormGroup, Checkbox, Icon } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './sidebar.scss';
import axios from 'axios';

// Notes on use of material UI library checkbox components:
    // Form group acts as form element
    // form control label takes an input component (checkbox, textarea, etc) as control argument and label
    // https://mui.com/material-ui/react-checkbox/

//https://reactjs.org/docs/hooks-state.html
// useEffect -> in the use effect, we are sending a request to the backend to give us new posts based on the filter.
// in the dependency array, we are passing selectedFilters. Every time selectedFilters changes, it will trigger the callback passed to useEffect, querying the database and giving new posts. As a result, posts should no longer depend on state of filters, just on what data is sent to them in response from backednd.

// This design is highly dependent on backend to do the logic (filtering). Not the most efficient use of network resources, but benefit is less client side code which, when dealing with large amounts of data, will slow experience for user - but better balance workload btw front and backend

//setPosts needs to be passed as props from app component

//arr of filters

const defaultFilters = ['scissors', 'paper', 'tape', 'glue', 'marker', 'book', 'chalk', 'covid mask', 'name tag', 'hole puncher', 'pencil', 'toy', 'globe', 'miscellaneous', 'grades K-5', 'grades 6-8', 'grades 9-12', 'child proof', 'new', 'used'];

export default function Sidebar({ setPosts, filters = defaultFilters }) {
  const [selectedFilters, setSelectedFilters] = useState([]); //this line probably needs editing
  //console.log('selectedFilters:', selectedFilters);
  const handleCheck = (e) => {
    setSelectedFilters(prev => {
      if (e.target.checked) { // check if checkbox is being activated or deactivated
        return [...prev, e.target.label]; //if so, return the spread previous state array of checked (selected) filters, and add checked filter
      }
      return prev.filter((selectedFilter) => selectedFilter !== e.target.label); //filter any unchecked boxes out of selectedFilter arr  
    })
  };

  // the post request expects an object with a tag property assigned to the value of a tag string on the req.body
  useEffect(() => {
    async function getItemsByFilter() {
      console.log('selectedFilters', selectedFilters)
    if (selectedFilters.length > 0) {
      const param = {}
      // ... is tag supposed to be one tag or array of tags... ? 
      selectedFilters.forEach((filter) => {
        param.tag = filter
      });
      //console.log('param', param)
      const body = await axios.post('/api/tag', param);
      console.log(body)
      setPosts(body);
      return;
    } 
    
   // this was intended to manipulate state of posts; to work, setPosts should probably be defined in app and passed down as props here and in posts
   
   // const body = await axios.get('/api/tag');
   // console.log('body', body);
   // setPosts(body);
  }
    getItemsByFilter()
  
  }, [selectedFilters])


  // added index as key for now to stop error; probably not best practice & could use nanoid or other alternative
  return (
    <div className='Checkbox__form'>
      <button type="button">find stuff</button>
      <FormGroup>
        {
          filters.map((filter, index) => (
            <FormControlLabel key={index} onChange={handleCheck} control={<Checkbox 
              size="small" 
              color="default" sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}/>} label={filter} />
          ))
        }
      </FormGroup>
    </div>
  )
}

