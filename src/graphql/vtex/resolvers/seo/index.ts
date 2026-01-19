import { BASE_URL } from "../../../../constants"

const VTEX_APP_KEY = "vtexappkey-ninjasomfaststore-CUGTSB"
const VTEX_APP_TOKEN =
  "ROCJMDGMSIXGJQEAAKWJUKEMPCUYTKDYFGGPVOQPUYMUDXSESUVVRFWGCKODUPUBYROXRUDCVIKSBSAULVBWTEDUSEVTTCFRBNEMVBQNNXCZKDEISQSUSZCIXBYIJJWQ"

const productCache = new Map<string, { timestamp: number; data: any }>()
const CACHE_TTL = 5 * 60 * 1000

const fetchCatalogProduct = async (productId: string) => {
  const cached = productCache.get(productId)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  const url = `${BASE_URL}/api/catalog/pvt/product/${productId}`

  try {
    const response = await fetch(url, {
      headers: {
        "X-VTEX-API-AppKey": VTEX_APP_KEY,
        "X-VTEX-API-AppToken": VTEX_APP_TOKEN,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    productCache.set(productId, { timestamp: Date.now(), data })

    return data
  } catch {
    return null
  }
}

type StoreProduct = {
  metaTagDescription?: string | null
  description?: string | null
  name?: string | null
  id?: string | number | null
  productID?: string | number | null
  sku?: string | number | null
  itemId?: string | number | null
  isVariantOf?: {
    metaTagDescription?: string | null
    description?: string | null
    productName?: string | null
    productTitle?: string | null
    linkText?: string | null
    productGroupID?: string | null
    productId?: string | number | null
  } | null
  seo?: {
    title?: string | null
    titleTemplate?: string | null
    description?: string | null
    canonical?: string | null
  } | null
}

export const seoResolver = {
  StoreProduct: {
    seo: async (root: StoreProduct) => {
      const variant = root?.isVariantOf
      let metaDescription =
        variant?.metaTagDescription ??
        root?.metaTagDescription ??
        root?.seo?.description ??
        variant?.description ??
        root?.description

      const baseSeo = root?.seo ?? {}
      let title =
        baseSeo.title ??
        variant?.productTitle ??
        variant?.productName ??
        root?.name ??
        ""
      const canonical =
        baseSeo.canonical ??
        (variant?.linkText ? `/${variant.linkText}/p` : "")

      if (
        (!metaDescription || metaDescription.trim() === "") ||
        (title && title.trim() === "")
      ) {
        const rawProductId =
          variant?.productId ??
          variant?.productGroupID ??
          root?.productID ??
          root?.id ??
          root?.sku ??
          root?.itemId ??
          null
        const productId =
          typeof rawProductId === "number" || typeof rawProductId === "string"
            ? String(rawProductId)
            : null

        const catalogProduct = productId
          ? await fetchCatalogProduct(productId)
          : null

        if (catalogProduct) {
          metaDescription =
            metaDescription ||
            catalogProduct.MetaTagDescription ||
            catalogProduct.metaTagDescription ||
            ""
          title = title || catalogProduct.Name || catalogProduct.name || ""
        }
      }

      const description =
        typeof metaDescription === "string" && metaDescription.trim() !== ""
          ? metaDescription
          : baseSeo.description ?? ""

      return {
        ...baseSeo,
        title,
        titleTemplate: baseSeo.titleTemplate ?? "",
        description,
        canonical,
      }
    },
  },
}
