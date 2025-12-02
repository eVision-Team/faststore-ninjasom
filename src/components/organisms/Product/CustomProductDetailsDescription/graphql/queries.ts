import { gql } from "@faststore/core/api";

//@ts-ignore
export const GET_PRODUCT_DESCRIPTION = gql(`
  query getProductById($productId: String!) {
    getProductById(productId: $productId) {
        Id
        Name
        Value
    }
  }
`);
