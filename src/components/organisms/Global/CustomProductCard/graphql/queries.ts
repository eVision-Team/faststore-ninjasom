import { gql } from "@faststore/core/api";

//@ts-ignore
export const GET_COLLECTION_PRODUCTS = gql(`
  query getCollectionById($collectionId: Int!) {
  getCollectionById(collectionId: $collectionId) {
    Data {
        SkuId
        ProductId
        ProductName
    }
  }

  }
`);
