import React, { useEffect, useState } from "react";
import styles from "../styles/AddButton.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons/lib/icons";
const Add = ({ setAddProduct, setPizzaList, pizzaList }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    if (!extra.price || !extra.text) {
      return toast.error("Ingredient + price is needed");
    }
    setExtraOptions([...extraOptions, extra]);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pizzapp");

    if (!title || !desc || prices.length < 3 || !file) {
      return toast.error("Please all necessary information is needed");
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/db9pqndbj/image/upload",
        formData
      );

      const { url } = data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      const dataProduct = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/products`,
        newProduct
      );

      setPizzaList([dataProduct.data, ...pizzaList]);
      toast.success("Product has been added");
      setAddProduct(false);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setAddProduct(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            resize="none"
            row={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option, index) => (
              <span key={index} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          {loading ? <SyncOutlined spin style={{ color: "#fff" }} /> : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Add;
