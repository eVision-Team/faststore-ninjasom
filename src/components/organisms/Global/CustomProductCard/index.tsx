import React from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/customProductCard/styles.module.scss";
import formatPrice from "../../../../utils/formatPrice";

type Installments = {
  count: number;
  value: number;
};

type Props = {
  product: any;
  showDiscountBadge?: boolean;
};

const CustomProductCard = ({ product, showDiscountBadge = true }: Props) => {
  if (!product) return null;

  const offer = product.offers?.offers?.[0];
  const listPrice = offer?.listPrice ?? 0;
  const price = offer?.price ?? 0;

  // calcula desconto %
  const discount =
    listPrice && listPrice > price
      ? Math.round(((listPrice - price) / listPrice) * 100)
      : 0;

  // parcelas sempre pelo valor original (listPrice)
  const getInstallments = (value: number): Installments => {
    const maxInstallments = 10;
    return {
      count: maxInstallments,
      value: value / maxInstallments,
    };
  };

  const installments = getInstallments(listPrice || price);
  const imageUrl = product.image?.[0]?.url;
  const productName = product.name;
  const productLink = `/${product.slug}/p`;

  return (
    <Link href={productLink} className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <img src={imageUrl} alt={productName} className={styles.image} />
        )}

        {showDiscountBadge && discount > 0 && (
          <span className={styles.discountBadge}>{discount}% Off</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{productName}</h3>

        <div className={styles.prices}>
          {listPrice > price && (
            <span className={styles.listPrice}>{formatPrice(listPrice)}</span>
          )}
          <span className={styles.price}>{formatPrice(price)}</span>
          {discount > 0 && (
            <div className={styles.pixMessage}>À vista no PIX</div>
          )}
        </div>

        <div className={styles.installments}>
          ou até{" "}
          <strong>
            {installments.count}x de {formatPrice(installments.value)}
          </strong>
        </div>
      </div>
    </Link>
  );
};

export default CustomProductCard;
