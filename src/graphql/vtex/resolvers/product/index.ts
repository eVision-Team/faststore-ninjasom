import { BASE_URL } from "../../../../constants";

export const productResolver = {
  getProductById: async (_: any, { productId }: { productId: string }) => {
    const url = `${BASE_URL}/api/catalog_system/pub/products/search?fq=productId:${productId}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-VTEX-API-AppKey": process.env.VTEX_APP_KEY ?? "",
          "X-VTEX-API-AppToken": process.env.VTEX_APP_TOKEN ?? "",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("VTEX API error:", response.status, await response.text());
        return null;
      }

      const data = await response.json();
      const product = data[0];

      if (!product) return null;

      const sku = product.items?.[0];
      const offer = sku?.sellers?.[0]?.commertialOffer;

      return [
        {
          Id: product.productId,
          Name: product.productName,
          // allSpecifications é um array de nomes (ex: ["Garantia", "Voltagem"]);
          // cada valor fica na raiz do objeto produto indexado pelo nome da spec.
          Value: (product.allSpecifications ?? []).map((specName: string) => ({
            Name: specName,
            Value: product[specName],
          })),
          listPrice: offer?.ListPrice,
          price: offer?.Price,
          // sellingPrice: mapeia Price da API de Search como preço nominal de
          // venda. Distinção real entre price/sellingPrice só existe no fragmento
          // ClientManyProducts (StoreOffer), não neste endpoint de catálogo.
          sellingPrice: offer?.Price,
          installments: offer?.Installments?.map((ins: any) => ({
            value: ins.Value,
            numberOfInstallments: ins.NumberOfInstallments,
            interestRate: ins.InterestRate,
          })),
        },
      ];
    } catch (err) {
      console.error("Erro no Resolver:", err);
      return null;
    }
  },
};
