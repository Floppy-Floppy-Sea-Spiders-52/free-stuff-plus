import React, { useState } from "react";
// import AddItem from "./AddItem";
import { Button, Box, Modal, Typography } from "@mui/material";
import styles from "./navbar.scss";

// gather what functionality will be happening inside of navbar
// double check exactly what I need to pass to add item - I think I figured this out?

const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px sold #000',
      boxShadow: 24,
      p: 4,
    }


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  // return
  return (
    <div>
      <Button onClick={handleOpen}>Add Item</Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Please fill out form to add item
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Placeholder text until I get the form working
          </Typography>
        </Box>
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
