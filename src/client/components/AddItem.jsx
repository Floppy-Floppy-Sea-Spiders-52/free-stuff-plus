import React, { useState } from "react";
import styles from "./add-item.scss";

// add dark background so that when it is clicked the modal closes
// add button that will submit the info and then close the modal
// set quantity to negative infinity or 0, something for me to think about

const AddItem = ({ setIsOpen }) => {
  const [ nameOfItem, setNameOfItem ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ quantity, setQuantity ] = (0);
  <div>
    <button onClick={() => setIsOpen(true)}>Add Item</button>
    {isOpen && <AddItem setIsOpen={setIsOpen} />}
    <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
    <button className={styles.button} />
    <div className={styles.centered}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}></div>
      </div>
    </div>
  </div>;
};

export default AddItem;
