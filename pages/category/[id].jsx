import React from 'react'
import axios from 'axios';
import Featured from '../../components/Featured';
import PizzaList from '../../components/PizzaList';
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next/router'

export default function category({pizzaList}) {
  return (
    <div className={styles.container}> 
      <Featured/>
      <PizzaList pizzaList={pizzaList}/>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/category?cat=${params.id}`);
    return {
      props: {
        pizzaList: res.data,
      
      },
    };
  };