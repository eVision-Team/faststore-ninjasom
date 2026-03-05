//import { BASE_URL } from "../../../../constants";

// export const productResolver = {
//   getProductById: async (_: any, { productId }: { productId: string }) => {
//     const url = `${BASE_URL}/api/catalog_system/pvt/products/${productId}/specification`;

//     try {
//       const response = await fetch(url, {
//         headers: {
//           "X-VTEX-API-AppKey": "vtexappkey-ninjasomfaststore-CUGTSB",
//           "X-VTEX-API-AppToken":
//             "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ",
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         console.error(
//           "VTEX API error:",
//           response.status,
//           await response.text()
//         );
//         return null;
//       }

//       const result = await response.json();

//       return result

//     } catch (err) {
//       console.log("erro", err);
//       return null;
//     }
//   },
// };

import { BASE_URL } from "../../../../constants";

export const productResolver = {
  getProductById: async (_: any, { productId }: { productId: string }) => {
    // Utilizamos o endpoint de search para obter o objeto completo do produto
    const url = `${BASE_URL}/api/catalog_system/pub/products/search?fq=productId:${productId}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-VTEX-API-AppKey": "vtexappkey-ninjasomfaststore-CUGTSB",
          "X-VTEX-API-AppToken": "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("VTEX API error:", response.status);
        return null;
      }

      const data = await response.json();
      const product = data[0];

      if (!product) return null;

      const sku = product.items?.[0];
      const offer = sku?.sellers?.[0]?.commertialOffer;

      // Montamos o retorno para bater com seu TypeDefs e queries
      // Mantendo o mapeamento das especificações para não quebrar sua "Garantia"
      return [{
        Id: product.productId,
        Name: product.productName,
        // No Search, as especificações ficam em um formato que precisamos mapear 
        // para manter compatibilidade com sua lógica de .find() e .Value[0]
        Value: Object.keys(product.allSpecifications || {}).map(key => ({
          Name: key,
          Value: product[key] // O Search coloca os valores das specs na raiz do objeto
        })),
        listPrice: offer?.ListPrice,
        price: offer?.Price,
        sellingPrice: offer?.Price, // Aqui chegará o valor de R$ 4.299,00
        installments: offer?.Installments?.map((ins: any) => ({
          value: ins.Value,
          numberOfInstallments: ins.NumberOfInstallments,
          interestRate: ins.InterestRate,
        })),
      }];

    } catch (err) {
      console.log("Erro no Resolver:", err);
      return null;
    }
  },
};