import React, { ReactElement, ReactNode, useEffect } from "react";
import { usePDP } from "@faststore/core";
import styles from "../../../../sass/customProductDetailsTitle/styles.module.scss";
import ProductRating from "../../../molecules/ProductRating";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_PRODUCT_REF_ID } from "./graphql/queries";
import { Link } from "@faststore/ui";

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
  const [getProductRefId, { data }] = useQuery(GET_PRODUCT_REF_ID, {});
  const seller = product?.offers?.offers?.find((offer: ProductOffer) =>
    offer.availability.includes("InStock"),
  )?.seller?.identifier;
  const sellerName = seller == "1" ? "Ninja Som" : seller;

  const fetchShortDescription = async () => {
    await getProductRefId({
      productId: context.data.product.id,
    });
  };

  // Sempre que "data" mudar, registra no console
  useEffect(() => {
    fetchShortDescription();
  }, []);

  return (
    <div className={styles.customProductDetailsTitle}>
      {title}

      <div>
        <p>
          Vendido por: <span>{sellerName}</span>
        </p>
        <p>
          Marca:{" "}
          <Link href={`/${product?.brand?.name}`}>
            <span>{product?.brand?.name}</span>
          </Link>
        </p>
        <p>
          Referência:{" "}
          <span>{(data as any)?.getProductRefId?.ProductRefId}</span>
        </p>
      </div>

      {/* <ProductRating productId={product?.id} /> */}
    </div>
  );
};

export default CustomProductDetailsTitle;
