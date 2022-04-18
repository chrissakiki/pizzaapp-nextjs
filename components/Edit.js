import React, { useEffect, useState } from "react";
import styles from "../styles/AddButton.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons/lib/icons";

const Edit = ({ productID, setEditProduct, setPizzaList, pizzaList }) => {
  const [loading, setLoading] = useState(false);
  const [imago, setImago] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState();
  const [extraOptions, setExtraOptions] = useState([]);

  const fetchProduct = async () => {
    if (productID !== null) {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/products/` + productID
        );

        if (data) {
          setImago(data.img);
          setTitle(data.title);
          setDesc(data.desc);
          setPrices(data.prices);
          setExtraOptions(data.extraOptions);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [productID]);

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

  const handleEdit = async () => {
    if (!title || !desc || prices.length < 3) {
      return toast.error("Please all necessary information is needed");
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/products/` + productID,
        {
          title,
          desc,
          prices,
          extraOptions,
        }
      );

      setPizzaList([
        data,
        ...pizzaList.filter((pizza) => pizza._id !== productID),
      ]);
      toast.success("Changes has been made");
      setEditProduct(false);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setEditProduct(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Edit Pizza</h1>
        <div className={styles.imago}>
          {imago && <Image src={imago} alt="" width="150" height="150" />}
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            row={4}
            type="text"
            value={desc || ""}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              defaultValue={prices[0] || ""}
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              defaultValue={prices[1] || ""}
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              defaultValue={prices[2] || ""}
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
            {extraOptions &&
              extraOptions.map((option, index) => (
                <span key={index} className={styles.extraItem}>
                  {option.text}
                </span>
              ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleEdit}>
          {loading ? <SyncOutlined spin style={{ color: "#fff" }} /> : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Edit;
