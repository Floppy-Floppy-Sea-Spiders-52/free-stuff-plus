import React, { useState } from 'react';
import { Button, Box, Modal, Typography, TextField } from '@mui/material';
// uncertain if I'll need react router here, keep an open mind to it.
import './navbar.scss';

// update style later
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 350,
  bgcolor: 'background.paper',
  border: '3px sold #000',
  boxShadow: 24,
  p: 4,
};

// add error handling after you get main function working

const NavBar = ({ incrementCounter, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameOfItem, setNameOfItem] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  // When user clicks submit, invoke handleAddItemSubmit 
  const handleAddItemSubmit = async (e) => {
    e.preventDefault();
    console.log('invoked?');
    const formData = {
      imageURL: url,
      name: nameOfItem,
      tag,
      quantity,
      description,
      email
    };
    try {
      // POST to backend the data submitted from user
      console.log('item data:', formData);
      const response = await fetch('/api/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // if item added successfully, increment a counter in App to re-render page with new item
      const newItemData = await response.json();
      console.log('backend data :', newItemData);
      if (newItemData === 'Item added') {
        incrementCounter();
      }
      handleClose();
    } catch (error) {
      console.log('Fetching error is :', error);
    }
  }
    // return
    return (
      <div className='NavBar'>
        <div className='Title'>free stuff</div>
        <Button onClick={handleOpen} sx={{ color: 'white', mx: 2, 'text-transform': 'none', 'font-size': '15px' }}>add item</Button>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div className='addItemModal'>
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Please fill out form to add item
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2, mx: 8 }}>
                <TextField
                  id='url'
                  label='Picture Url'
                  variant='standard'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                  id='nameOfItem'
                  label='Item Name'
                  variant='standard'
                  value={nameOfItem}
                  onChange={(e) => setNameOfItem(e.target.value)}
                />
                <TextField
                  id='tag'
                  label='Category'
                  variant='standard'
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <TextField
                  id='quantity'
                  label='Quantity'
                  variant='standard'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                  id='description'
                  label='Description'
                  variant='standard'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Typography>
              <Button variant='contained' sx={{ my: 4, mx: 13 }} onClick={handleAddItemSubmit}>Submit</Button>
            </Box>
          </div>
        </Modal>
      </div>
    );
};
export default NavBar;
