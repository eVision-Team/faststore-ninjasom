import React, { useEffect } from "react";
import formatPrice from "../../../../utils/formatPrice";
import styles from "../../../../sass/customProductDetailsPrice/styles.module.scss";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_PRODUCT_DESCRIPTION } from "../CustomProductDetailsDescription/graphql/queries";
import { usePDP } from "@faststore/core";
import RenderRichText from "../../../../utils/renderRichText";

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
  const [getProductById, { data, loading, error }] = useQuery(
    GET_PRODUCT_DESCRIPTION
  );
  const context = usePDP();

  const fetchGarantia = async () => {
    await getProductById({
      productId: context.data.product.isVariantOf.productGroupID,
    });
  };

  // Sempre que "data" mudar, registra no console
  useEffect(() => {
    fetchGarantia();
  }, []);

  useEffect(() => {
    console.log("AAAAAAAAAAAAA", data);
  }, [data]);

  const garantia = data?.getProductById?.find(
    (item: any) => item.Name === "Descrição Curta na Página de Produto"
  )?.Value[0];
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
      {garantia && (
        <div className={styles.garantia}>
          <RenderRichText content={garantia} />
        </div>
      )}
    </div>
  );
};

export default CustomProductDetailsPrice;
