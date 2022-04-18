import styles from "../styles/OrderDetail.module.css";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const OrderDetail = ({
  total,
  createOrder,
  setCash,
  setLoading,
  loading,
  pizza,
}) => {
  const executeScroll = useRef(null);
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    executeScroll.current.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const handleClick = () => {
    if (!customer || !address || phoneNumber.length < 8) {
      return toast.error("Please add all the details.");
    }
    setLoading(true);
    createOrder({
      customer,
      phoneNumber,
      address,
      pizza,
      total,
      method: 0,
    });
  };
  return (
    <div className={styles.container} ref={executeScroll}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cash on Delivery</h1>
          <b onClick={() => setCash(false)} style={{ cursor: "pointer" }}>
            X{" "}
          </b>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value.replace(/[^a-zA-Z\s]/gi, ""))
            }
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number:</label>
          <input
            type="text"
            maxLength={8}
            placeholder="03 666 666"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value.replace(/[^0-9]/gi, ""))
            }
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            placeholder="Jounieh Ghadir Bld 89 Flr 5"
            className={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className={styles.button}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <SyncOutlined spin style={{ color: "#fff" }} /> : "Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
