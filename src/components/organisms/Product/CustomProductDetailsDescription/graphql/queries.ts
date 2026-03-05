import { gql } from "@faststore/core/api";

//@ts-ignore
// export const GET_PRODUCT_DESCRIPTION = gql(`
//   query getProductById($productId: String!) {
//     getProductById(productId: $productId) {
//         Id
//         Name
//         Value
//         Price
//         ListPrice
//         FullSellingPrice
//         installments {
//         value
//         numberOfInstallments
//       }
//     }
//   }
// `);

export const GET_PRODUCT_DESCRIPTION = gql`
  query getProductById($productId: String!) {
    getProductById(productId: $productId) {
      Id
      Name
      # Peça os campos internos do objeto
      Value {
        Name
        Value
      }
      listPrice
      price
      sellingPrice
      installments {
        value
        numberOfInstallments
      }
    }
  }
`;
