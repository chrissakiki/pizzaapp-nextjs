import Head from "next/head";
import Slider from "../components/Slider";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import PizzaList from "../components/PizzaList";
import axios from "axios";

export default function Home({ pizzaList }) {
  return (
    <div>
      <Head>
        <title>Pizza King</title>
        <meta name="description" content="Best Pizza restaurant in Lebanon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />

      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get(`${process.env.MAINURL}/products`);

  return {
    props: {
      pizzaList: data,
    },
  };
};
