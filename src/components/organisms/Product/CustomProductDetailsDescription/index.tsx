import React, { useEffect } from "react";
import { usePDP } from "@faststore/core";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_PRODUCT_DESCRIPTION } from "./graphql/queries";

const CustomProductDetailsDescription = (props: any) => {
  const [getProductById, { data, loading, error }] = useQuery(
    GET_PRODUCT_DESCRIPTION
  );
  const context = usePDP();

  const fetchShortDescription = async () => {
    console.log(context.data.product.id)

    await getProductById({ productId: context.data.product.isVariantOf.productGroupID });
  };

  // Sempre que "data" mudar, registra no console
  useEffect(() => {
    console.log("Retorno da query (data):", data);
    if (error) {
      console.error("Erro na query:", error);
    }
  }, [data, error]);

  return (
    <>
      <button onClick={fetchShortDescription}>Buscar Descrição Curta</button>
      {loading && <div>Carregando...</div>}
      {data?.getProductById?.DescriptionShort && (
        <div>{data.getProductById.DescriptionShort}</div>
      )}
    </>
  );
};

export default CustomProductDetailsDescription;
