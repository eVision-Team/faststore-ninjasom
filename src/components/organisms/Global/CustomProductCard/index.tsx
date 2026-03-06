import React, { useEffect, useMemo, useState } from "react";
import { Button, Link } from "@faststore/ui";
import Image from "next/image";
import styles from "../../../../sass/customProductCard/styles.module.scss";
import formatPrice from "../../../../utils/formatPrice";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_COLLECTION_PRODUCTS } from "./graphql/queries";
import badgeIcon from "./icon/badge-icon.svg";

type Installments = {
  count: number;
  value: number;
};

type Props = {
  product: any;
  showDiscountBadge?: boolean;
};

type CollectionProduct = {
  SkuId: number;
  ProductId: number;
  ProductName: string;
};

const CustomProductCard = ({ product, showDiscountBadge = true }: Props) => {
  const [getCollectionById] = useQuery(GET_COLLECTION_PRODUCTS, {});
  const [bestSellerCollection, setBestSellerCollection] = useState([] as any);
  const [exclusivePriceCollection, setExclusivePriceCollection] = useState(
    [] as any,
  );

  const fetchCollectionById = async () => {
    const [bestSeller, exclusivePrice] = await Promise.all([
      getCollectionById({ collectionId: 159 }),
      getCollectionById({ collectionId: 160 }),
    ]);
    setBestSellerCollection(bestSeller);
    setExclusivePriceCollection(exclusivePrice);
  };

  const isBestSeller = useMemo(() => {
    if (!bestSellerCollection?.getCollectionById?.Data) return false;

    return bestSellerCollection?.getCollectionById?.Data?.some(
      (item: CollectionProduct) => item.SkuId == product?.sku,
    );
  }, [bestSellerCollection, product?.sku]);

  const isExclusivePrice = useMemo(() => {
    if (!exclusivePriceCollection?.getCollectionById?.Data) return false;

    return exclusivePriceCollection?.getCollectionById?.Data?.some(
      (item: CollectionProduct) =>
        item.SkuId == product?.sku ||
        item.ProductId == product?.id ||
        item.ProductName == product?.name,
    );
  }, [exclusivePriceCollection, product?.sku, product?.id, product?.name]);

  useEffect(() => {
    fetchCollectionById();
  }, []);

  if (!product) return null;

  const offer = product.offers?.offers?.[0];
  const listPrice = offer?.listPrice ?? 0;
  const price = offer?.price ?? 0;
  // sellingPrice = preço nominal de venda, antes de descontos de forma de
  // pagamento (ex: Pix). Disponível via extensão do fragmento ClientManyProducts
  // em src/fragments/ClientManyProducts.ts.
  const sellingPrice = (offer as any)?.sellingPrice ?? 0;

  const discount =
    listPrice && listPrice > price
      ? Math.round(((listPrice - price) / listPrice) * 100)
      : 0;

  const getInstallments = (value: number): Installments => {
    const maxInstallments = 10;
    return {
      count: maxInstallments,
      value: value / maxInstallments,
    };
  };

  // Usa sellingPrice (preço nominal, ex: R$ 329,00) para parcelas.
  // Evita usar price (spot price com Pix, ex: R$ 302,68) como base.
  const installments = getInstallments(sellingPrice || listPrice || price);

  const imageUrl = product.image?.[0]?.url;
  const productName = product.name;
  const sku = product.sku;
  const productStock = product?.offers?.offers?.[0]?.quantity;

  const cleanSlug = product.slug.endsWith(`-${sku}`)
    ? product.slug.slice(0, product.slug.length - `-${sku}`.length)
    : product.slug;

  return (
    <Link href={`/${cleanSlug}/p`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <img src={imageUrl} alt={productName} className={styles.image} />
        )}

        <div className={styles.badges}>
          {showDiscountBadge && discount > 0 && (
            <span className={`${styles.discountBadge} ${styles.badge}`}>
              {discount}% Off
            </span>
          )}

          {isBestSeller && (
            <span className={`${styles.bestSellerBadge} ${styles.badge}`}>
              <Image
                src={badgeIcon}
                alt="Mais vendido"
                width={13}
                height={12}
              />
              + Vendido
            </span>
          )}

          {isExclusivePrice && (
            <span className={`${styles.exclusivePriceBadge} ${styles.badge}`}>
              <Image
                src={badgeIcon}
                alt="Preço exclusivo no site"
                width={13}
                height={12}
              />
              Preço exclusivo site
            </span>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{productName}</h3>

        {productStock > 0 ? (
          <div className={styles.priceContainer}>
            <div className={styles.prices}>
              {listPrice > price && (
                <span className={styles.listPrice}>
                  {formatPrice(listPrice)}
                </span>
              )}
              <span className={styles.price}>{formatPrice(price)}</span>
              {discount > 0 && <div className={styles.pixMessage}>À vista</div>}
            </div>

            <div className={styles.installments}>
              ou até{" "}
              <strong>
                {installments.count}x de {formatPrice(installments.value)}
              </strong>
            </div>
          </div>
        ) : (
          <button className={styles.consultBtn}>Sob consulta</button>
        )}
      </div>
    </Link>
  );
};

export default CustomProductCard;
