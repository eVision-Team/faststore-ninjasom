import { gql } from '@faststore/core/api'

//@ts-ignore
export const SUBSCRIBE_BACK_IN_STOCK = gql(`
  mutation subscribeBackInStock($name: String!, $email: String!, $skuId: String!, $productId: String!) {
    subscribeBackInStock(name: $name, email: $email, skuId: $skuId, productId: $productId)
  }
`)
