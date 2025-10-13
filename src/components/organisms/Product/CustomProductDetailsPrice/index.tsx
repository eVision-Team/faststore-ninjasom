import React from "react";
import formatPrice from "../../../../utils/formatPrice";
import styles from "../../../../sass/customProductDetailsPrice/styles.module.scss";

type Installments = {
  count: number;
  value: number;
};

interface CustomProductDetailsPriceProps {
  listPrice: number;
  value: number;
}

const CustomProductDetailsPrice: React.FC<CustomProductDetailsPriceProps> = ({
  listPrice,
  value,
}) => {
  const hasDiscount = listPrice > value;

  const getInstallments = (value: number): Installments => {
    const maxInstallments = 10;
    return {
      count: maxInstallments,
      value: value / maxInstallments,
    };
  };

  const installments = getInstallments(listPrice || value);

  return (
    <div className={styles.customProductDetailsPrice}>
      {hasDiscount ? (
        <div className={styles.prices}>
          <span className={styles.listPrice}>De {formatPrice(listPrice)}</span>
          <span className={styles.value}>
            Por <strong>{formatPrice(value)}</strong> à vista
          </span>
        </div>
      ) : (
        <span className={styles.value}>
          <strong>{formatPrice(value)}</strong>
        </span>
      )}
      <div className={styles.installments}>
        ou{" "}
        <strong>
          {installments.count}x de {formatPrice(installments.value)}
        </strong>{" "}
        sem juros
      </div>
    </div>
  );
};

export default CustomProductDetailsPrice;
