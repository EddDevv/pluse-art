import styles from "./style.module.scss";

const Row = (props) => {
  return (
    <div
      {...props}
      style={{ gap: props.gap }}
      className={`${styles.Row} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Row;
