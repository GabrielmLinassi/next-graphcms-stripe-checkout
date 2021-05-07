import { gql } from "@apollo/client";

export const AllProducts = gql`
  query AllProducts {
    products(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const ProductByHandle = gql`
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      variants(first: 20) {
        edges {
          node {
            id
            price
          }
        }
      }
      images(first: 20) {
        edges {
          node {
            originalSrc
          }
        }
      }
    }
  }
`;
