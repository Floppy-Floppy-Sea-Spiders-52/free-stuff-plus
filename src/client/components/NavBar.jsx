import React, { useState } from 'react';
import AddItem from './AddItem';

// gather what functionality will be happening inside of navbar
// double check exactly what I need to pass to add item
const NavBar = () => {
  const [ isOpen, setIsOpen ] = useState(false);

}
// return 
return (
  <div>
  <AddItem setIsOpen={setIsOpen} />
  </div>
);

export default NavBar;