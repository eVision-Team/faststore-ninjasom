import { gql } from "@faststore/core/api";

// @ts-ignore
export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
      hasChildren
      url
      title
      metaTagDescription
      children {
        id
        name
        hasChildren
        url
        children
      }
    }
  }
`;
