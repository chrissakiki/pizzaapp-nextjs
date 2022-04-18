import React, { useState } from "react";
import styles from "../styles/Slider.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
const Slider = () => {
  const [index, setIndex] = useState(0);
  const slide = [
    {
      img: "/img/slider1.jpg",
      text: "Buy 2 Get 1 Free!",
    },
    {
      img: "/img/slider2.jpg",
      text: "Hungry? We got you!",
    },
    { img: "/img/slider3.jpg", text: "Man2ouche 3a Pizza" },
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftArrow} onClick={() => handleArrow("l")}>
        <LeftOutlined className={styles.arrow} style={{ color: "#fff" }} />
      </div>

      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {slide.map((s, index) => (
          <div
            key={index}
            className={styles.bgImage}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${s.img})`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 className={styles.sliderText}>{s.text}</h1>

              <Link href="https://wa.me/70083899" passHref>
                <button className={styles.button}>More Info?</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.rightArrow} onClick={() => handleArrow("r")}>
        <RightOutlined className={styles.arrow} style={{ color: "#fff" }} />
      </div>
    </div>
  );
};

export default Slider;
