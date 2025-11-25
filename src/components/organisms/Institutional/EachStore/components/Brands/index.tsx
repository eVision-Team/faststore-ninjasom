import React from "react";
import { icons } from "./icons";
import styles from "../../../../../../sass/institutional/eachStore/styles.module.scss";

const Brands = () => {
  return (
    <div className={styles["brands-scroll-wrapper"]}>
      <div className={styles["brands-title"]}>
        As Melhores Marcas do Mercado
      </div>

      <div className={styles["brands-scroll-content"]}>
        {icons.map((icon, index) => (
          <img
            key={`main-${index}`}
            src={icon.link}
            alt={icon.name}
            className={styles["brand-icon"]}
          />
        ))}

        {icons.map((icon, index) => (
          <img
            key={`dup-${index}`}
            src={icon.link}
            alt={icon.name}
            className={styles["brand-icon"]}
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
