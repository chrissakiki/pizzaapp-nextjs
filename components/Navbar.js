import Image from "next/image";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <nav className={styles.container}>
      <div className={styles.item}>
        <div className={styles.logocontainer}>
          <Link href="/" passHref>
            <h2 className={styles.logo}>
              <span>Pizza</span> King
            </h2>
          </Link>
          <FaCrown className={styles.crown} />
        </div>
      </div>

      <div className={styles.item}>
        <h2 className={styles.pizzamid}>
          <span>#1</span> Pizza Restaurant in the middle east.
        </h2>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart} style={{ cursor: "pointer" }}>
            <Image src="/img/cart.png" alt="" width="32" height="32" />

            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
