import React from "react";
import styles from "../styles/AddButton.module.css";
const AddButton = ({ setAddProduct }) => {
  return (
    <div onClick={() => setAddProduct(true)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
