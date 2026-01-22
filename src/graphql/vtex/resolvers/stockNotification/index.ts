import { BASE_URL } from "../../../../constants"

const VTEX_APP_KEY = "vtexappkey-ninjasomfaststore-CUGTSB"
const VTEX_APP_TOKEN =
  "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ"

type SubscribeArgs = {
  name: string
  email: string
  skuId: string
  productId: string
}

export const stockNotificationResolver = {
  subscribeBackInStock: async (_: unknown, args: SubscribeArgs) => {
    const url = `${BASE_URL}/api/dataentities/NS/documents`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-VTEX-API-AppKey": VTEX_APP_KEY,
          "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: args.name,
          email: args.email,
          skuId: args.skuId,
          productId: args.productId,
        }),
      })

      if (!response.ok) {
        console.error(
          "Master Data error:",
          response.status,
          await response.text()
        )
        return false
      }

      return true
    } catch (err) {
      console.error("Master Data error:", err)
      return false
    }
  },
}
