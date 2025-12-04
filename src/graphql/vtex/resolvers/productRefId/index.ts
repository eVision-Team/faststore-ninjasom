import { BASE_URL } from "../../../../constants";

export const productRefId = {
  getProductRefId: async (_: any, { productId }: { productId: string }) => {
    const url = `${BASE_URL}/api/catalog_system/pvt/sku/stockkeepingunitbyid/${productId}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-VTEX-API-AppKey": "vtexappkey-ninjasomfaststore-CUGTSB",
          "X-VTEX-API-AppToken":
            "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(
          "VTEX API error:",
          response.status,
          await response.text()
        );
        return null;
      }

      const result = await response.json();

      return result;
    } catch (err) {
      console.log("erro", err);
      return null;
    }
  },
};
