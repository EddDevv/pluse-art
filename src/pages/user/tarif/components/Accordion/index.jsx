import { useState } from "react";
import styles from "./style.module.scss";
import Row from "../Row";
import { AddIcon } from "../Icons";

const Accordion = ({ item }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.Accordion}>
      <Row className={styles.Top} onClick={() => setActive(!active)}>
        <p>{item.name}</p>

        <AddIcon className={`${styles.Icon} ${active ? styles.Active : ""}`} />
      </Row>

      {active && (
        <div className={styles.Bottom}>
          от 10.000 USD – 50.000 USD – 0.010% в день <br />
          от 50.001 USD – 100.000 USD – 0.016% в день <br />
          от 100.000 USD - 500.000 USD- 0.023% в день
        </div>
      )}
    </div>
  );
};

export default Accordion;
