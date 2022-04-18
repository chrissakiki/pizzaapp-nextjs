import React from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, reset } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import CODDetail from "../components/CODDetail";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  //PAYPAL This values are the props in the UI
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [pizzaData, setPizzaData] = useState([
    {
      title: "",
      quantity: 0,
      size: 0,
      extraOptions: [{}],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.quantity > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
      setOpen(false);
    }

    setPizzaData([
      ...cart.products?.map(({ title, quantity, size, extraOptions }) => ({
        title,
        quantity,
        size,
        extraOptions,
      })),
    ]);
    // eslint-disable-next-line
  }, [cart.quantity]);

  const handleCOD = () => {
    setCash(true);
  };

  const handleDelete = (nano, price, quantity) => {
    dispatch(deleteProduct({ nano, price, quantity }));
  };

  const createOrder = async (dataOrder) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/orders`,
        dataOrder
      );

      router.push(`orders/${data._id}`);
      dispatch(reset());
    } catch (err) {}
    setLoading(false);
  };

  //PAYPAL
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        // type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
      // eslint-disable-next-line
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                pizza: pizzaData,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };
  //PAYPAL

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {cart.total < 1 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ShoppingCartOutlined
              style={{ color: "#d1411e", fontSize: "3rem" }}
            />
            <h2 style={{ fontWeight: "400" }}>Empty Cart</h2>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.products &&
                cart.products.map((product, index) => (
                  <tr key={index} className={styles.trItem}>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={product.img}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                          priority
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>{product.title}</span>
                    </td>
                    <td>
                      <span className={styles.extras}>
                        {product.extraOptions.map((ing) => (
                          <span key={ing._id}>{ing.text} </span>
                        ))}
                      </span>
                    </td>
                    <td>
                      <span className={styles.price}>${product.price}</span>
                    </td>

                    <td>
                      <span className={styles.quantity}>
                        {product.quantity}
                      </span>
                    </td>
                    <td>
                      <span className={styles.total}>
                        ${product.price * product.quantity}
                      </span>
                    </td>

                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() =>
                          handleDelete(
                            product.nano,
                            product.price,
                            product.quantity
                          )
                        }
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal: </b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount: </b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total: </b>${cart.total}
          </div>

          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payCOD} onClick={() => handleCOD()}>
                Cash On Delivery
              </button>
              <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ATlY-4reZ2sEemxIxAM9CPZ-vx_XpH928M8AFmZrmD5CwnLCjbOlV1aPWJ4C0m2u1bw6l04wZzbJRaym",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,card,p24,venmo",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={true} />
                </PayPalScriptProvider>
              </div>
            </div>
          ) : (
            <button
              disabled={disabled}
              onClick={() => setOpen(true)}
              className={styles.button}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>

      {cash && (
        <CODDetail
          setCash={setCash}
          total={cart.total}
          createOrder={createOrder}
          setLoading={setLoading}
          loading={loading}
          pizza={pizzaData}
        />
      )}
    </div>
  );
};

export default Cart;
