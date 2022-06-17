import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const PizzaCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
      <h1 className={styles.title}>{pizza.title}</h1></Link>
      <span className={styles.price}>{pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.category}
      </p>
    </div>
  );
};

export default PizzaCard;
