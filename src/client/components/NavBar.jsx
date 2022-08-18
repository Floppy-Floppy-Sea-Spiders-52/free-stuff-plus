import React, { useState } from 'react';
// import AddItem from './AddItem'; // keeping this for the moment will probably delete
import { Button, Box, Modal, Typography, TextField } from '@mui/material';
import styles from './navbar.scss'; // I might still need this uncertain
// uncertain if I'll need react router here, keep an open mind to it. 

// update style later 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px sold #000',
  boxShadow: 24,
  p: 4,
};

// add error handling after you get main function working


const NavBar = ({setItemData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameOfItem, setNameOfItem] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    console.log('invoked?');
    const formData = {
      pic_url: url,
      item_name: nameOfItem,
      category: tag,
      item_quantity: quantity,
      item_description: description,
    }
    console.log('item data:', formData);
    // pass filled out form back to app 
    setItemData(formData);
    handleClose();
  } 

  // return
  return (
    <div>
      <Button onClick={handleOpen}>Add Item</Button>
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
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
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
          <Button onClick={handleAddItemSubmit}>Submit</Button>
        </Box>
        </div>
      </Modal>
      <div></div>
    </div>
  );
};
export default NavBar;

// <AddItem
// open={isOpen}
// close={handleClose}
// />
