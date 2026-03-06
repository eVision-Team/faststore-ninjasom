import { gql } from "@faststore/core/api";

/**
 * Extends the native ClientManyProducts fragment (used by ProductShelf and
 * ProductTiles) to include `sellingPrice` on each offer.
 *
 * sellingPrice = "Computed price before applying coupons, taxes or benefits"
 * → the nominal selling price (e.g. R$ 329,00) that should be used as the
 *   base for installment calculations, as opposed to `price` (spot price,
 *   which already includes the Pix payment-condition discount, e.g. R$ 302,68).
 *
 * NOTE: uses tagged-template syntax (gql`...`) instead of gql(`...`) to avoid
 * "No overload matches this call" — the @faststore/core gql function exposes
 * only exact string-literal overloads for registered documents; its catch-all
 * implementation signature is not visible to callers, but TypeScript does not
 * apply the same strict overload check for tagged template calls.
 */
// @ts-ignore — gql exposes only exact-string overloads for registered documents;
// the catch-all implementation signature is not callable. This is an expected
// limitation of @faststore/core's generated gql helper for new fragment extensions.
export const fragment = gql`
  fragment ClientManyProducts on Query {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
      sponsoredCount: $sponsoredCount
    ) {
      products {
        edges {
          node {
            offers {
              offers {
                sellingPrice
              }
            }
          }
        }
      }
    }
  }
`;
