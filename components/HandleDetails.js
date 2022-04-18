import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/HandleDetails.module.css";

const HandleDetails = ({ orderID, setDetailsProduct }) => {
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    if (orderID !== null) {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/orders/` + orderID
        );
        setOrder(data.pizza);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, [orderID]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setDetailsProduct(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Order Details</h1>
        <div className={styles.details}>
          {order.length > 0 &&
            order.map((item, index) => (
              <div key={index}>
                {/* {JSON.stringify(item, null, 4)} */}
                <div>
                  <h3> {item.title} </h3>
                  <p>
                    Size:
                    {item.size === 0
                      ? " Small"
                      : item.size === 1
                      ? " Medium"
                      : " Large"}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  {item.extraOptions.length > 0 ? <h4>Extras: </h4> : ""}
                  {item.extraOptions.length > 0 &&
                    item.extraOptions.map((extra, index) => (
                      <div key={index}>
                        {" "}
                        <p>{extra.text}</p>{" "}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HandleDetails;
