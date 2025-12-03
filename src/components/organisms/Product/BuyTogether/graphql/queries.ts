import { gql } from "@faststore/core/api";

//@ts-ignore
export const GET_SIMILAR_PRODUCTS = gql(`
  query getSimilarProducts($productId: String!) {
  getSimilarProducts(productId: $productId) {
    productId
    productName
    linkText
    productTitle
    items {
      itemId
      name
      nameComplete
      complementName
      images {
        imageId
        imageLabel
        imageTag
        imageUrl
        imageText
        imageLastModified
      }
      sellers {
        sellerId
        sellerName
        addToCartLink
        sellerDefault
        commertialOffer {
          Installments {
            Value
            InterestRate
            TotalValuePlusInterestRate
            NumberOfInstallments
            PaymentSystemName
            PaymentSystemGroupName
            Name
          }
          DiscountHighLight
          Price
          ListPrice
          PriceWithoutDiscount
          FullSellingPrice
          PriceToken
          RewardValue
          PriceValidUntil
          AvailableQuantity
          IsAvailable
        }
      }
    }
  }

  }
`);
