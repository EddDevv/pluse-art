import styles from "./style.module.scss";

const Item = ({ item }) => {
  return (
    <div className={styles.Item}>
      <div className={styles.Item_first}>
        <div>{item.name}</div> <p>от суммы сделки</p>
      </div>

      <div className={styles.Item_second}>
        {item.text}<b>{item.subtext}</b>
      </div>
    </div>
  );
};

export default Item;
