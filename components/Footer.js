import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.jpg" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>DUIS AUTE IRRENUI</h1>
          <p className={styles.text}>
            <b> Excepteur sint occaecat onia</b>
            <br /> Duis aute irure dolor molan
          </p>
          <p className={styles.text}>
            Excepteur sint occaecat onia
            <br /> Duis aute irure dolor molan
          </p>
          <p className={styles.text}>
            <b> Excepteur sint occaecat onia</b>
            <br /> Duis aute irure dolor molan
          </p>
          <p className={styles.text}>
            Excepteur sint occaecat onia
            <br /> Duis aute irure dolor molan
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            222 Keserwan, Jounieh
            <br /> Center Molas
          </p>
          <p className={styles.text}>
            222 Metn, Dbayeh
            <br /> Center Lomo
          </p>
          <p className={styles.text}>
            222 Keserwan, Jounieh
            <br /> Center Molas
          </p>
          <p className={styles.text}>
            222 Keserwan, Jounieh
            <br /> Center Molas
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 12:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 10:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
