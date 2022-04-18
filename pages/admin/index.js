import axios from "axios";
import Image from "next/image";
import { React, useState } from "react";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import Edit from "../../components/Edit";
import HandleDetails from "../../components/HandleDetails";
import styles from "../../styles/Admin.module.css";
const Admin = ({ products, orders }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [productID, setProductID] = useState(null);
  const status = ["Preparing", "On the way", "Delivered"];

  const handleDetails = (id) => {
    setOrderID(id);
    setDetailsProduct(true);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/products/` + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    setProductID(id);
    setEditProduct(true);
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      if (currentStatus == 2) return;
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/orders/` + id,
        {
          status: currentStatus + 1,
        }
      );

      setOrderList([data, ...orderList.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AddButton setAddProduct={setAddProduct} />
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.ptitle}>Products</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pizzaList.map((product) => (
                <tr key={product._id} className={styles.trBody}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        className={styles.img}
                        src={product.img}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td className={styles.id}>{product._id.slice(0, 5)}..</td>
                  <td className={styles.title}>{product.title}</td>
                  <td className={styles.prices}>${product.prices[0]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.item}>
          <h1 className={styles.ptitle}>Orders</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                {/* <th>Id</th> */}
                <th>Customer</th>
                <th>Total</th>
                <th>Details</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order._id} className={styles.trBody}>
                  {/* <td className={styles.id}>{order._id.slice(0, 5)}..</td> */}
                  <td className={styles.customer}>{order.customer}</td>
                  <td className={styles.total}>${order.total}</td>

                  <td>
                    <button
                      onClick={() => handleDetails(order._id)}
                      className={styles.buttonDetails}
                    >
                      Details
                    </button>
                  </td>
                  <td className={styles.method}>
                    {order.method === 0 ? <span>COD</span> : <span>Paid</span>}
                  </td>
                  <td className={styles.status}>{status[order.status]}</td>
                  <td>
                    <button
                      onClick={() => handleStatus(order._id)}
                      className={styles.nextStage}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {addProduct && (
          <Add
            setAddProduct={setAddProduct}
            setPizzaList={setPizzaList}
            pizzaList={pizzaList}
          />
        )}
        {editProduct && (
          <Edit
            productID={productID}
            setProductID={setProductID}
            setEditProduct={setEditProduct}
            setPizzaList={setPizzaList}
            pizzaList={pizzaList}
          />
        )}

        {detailsProduct && (
          <HandleDetails
            orders={orders}
            orderID={orderID}
            setDetailsProduct={setDetailsProduct}
          />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(`${process.env.URL}/products`);
  const orderRes = await axios.get(`${process.env.URL}/orders`);

  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    },
  };
};

export default Admin;
