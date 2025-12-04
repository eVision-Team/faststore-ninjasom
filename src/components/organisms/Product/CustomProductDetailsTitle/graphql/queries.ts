import { gql } from "@faststore/core/api";

//@ts-ignore
export const GET_PRODUCT_REF_ID = gql(`
  query getProductRefId($productId: String!) {
    getProductRefId(productId: $productId) {
        ProductRefId
    }
  }
`);
