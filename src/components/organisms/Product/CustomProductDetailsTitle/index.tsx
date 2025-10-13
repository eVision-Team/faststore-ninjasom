import React, { ReactElement, ReactNode } from "react";
import { usePDP } from "@faststore/core";
import styles from "../../../../sass/customProductDetailsTitle/styles.module.scss";

type Props = {
  title: ReactElement | ReactNode;
};

type ProductOffer = {
  availability: string;
  listPrice: number;
  listPriceWithTaxes: number;
  price: number;
  priceWithTaxes: number;
  seller: {
    identifier: string;
  };
};

const CustomProductDetailsTitle = ({ title }: Props) => {
  const context = usePDP();
  const product = context?.data?.product;
  const seller = product?.offers?.offers?.find((offer: ProductOffer) =>
    offer.availability.includes("InStock")
  )?.seller?.identifier;

  console.log(context?.data);

  return (
    <div className={styles.customProductDetailsTitle}>
      {title}

      <div>
        <p>
          Vendido por: <span>{seller}</span>
        </p>
        <p>
          Marca: <span>{product?.brand?.name}</span>
        </p>
        <p>
          Referência: <span>{product?.sku}</span>
        </p>
      </div>
    </div>
  );
};

export default CustomProductDetailsTitle;
