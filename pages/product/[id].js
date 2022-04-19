import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Product.module.css";
import { addProduct } from "../../redux/cartSlice";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extraOptions, setExtraOptions] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];

    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleIngredients = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtraOptions([...extraOptions, option]);
      // setIngredients((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtraOptions(extraOptions.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    console.log(quantity);
    if (quantity <= 0) {
      return toast.error("QTY should be at least 1");
    } else if (quantity > 10) {
      return toast.error("Max QTY is 10");
    }
    const nano = nanoid(6);
    dispatch(
      addProduct({ ...pizza, extraOptions, price, quantity, nano, size })
    );

    toast.success(pizza.title + " has been added");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" objectFit="contain" layout="fill" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}> {pizza.desc} </p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>
          {pizza.extraOptions.length > 0 ? "Choose additional ingredients" : ""}{" "}
        </h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions?.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleIngredients(e, option)}
              />
              <label htmlFor={option.text} style={{ marginLeft: "5px" }}>
                {" "}
                {option.text}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value.replace(".", ""))}
            type="number"
            min="1"
            max="10"
            className={styles.quantity}
          />
          <button className={styles.button} onClick={() => handleClick()}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`${process.env.MAINURL}/products/${params.id}`);

  return {
    props: {
      pizza: data,
    },
  };
};

export default Product;
