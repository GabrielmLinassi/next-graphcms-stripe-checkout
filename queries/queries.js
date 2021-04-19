import { gql } from "@apollo/client";

export const STORE_SETTINGS = gql`
  query getStoreSettings {
    shop {
      name
      primaryDomain {
        url
        host
      }
    }
  }
`;

export const CREATE_CART = gql`
  mutation checkout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
      }
    }
  }
`;

export const GET_CART = gql`
  query getCheckout($id: ID!) {
    node(id: $id) {
      id
      ... on Checkout {
        id
        ready
        currencyCode
        lineItemsSubtotalPrice {
          amount
          currencyCode
        }
        taxesIncluded
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                priceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_ITEM_CART = gql`
  mutation checkoutLineItemsRemove($lineItemIds: [ID!]!, $checkoutId: ID!) {
    checkoutLineItemsRemove(lineItemIds: $lineItemIds, checkoutId: $checkoutId) {
      checkout {
        id
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const ADD_ITEM_CART = gql`
  mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const UPDATE_ITEM_CART = gql`
  mutation checkoutLineItemsUpdate($lineItems: [CheckoutLineItemUpdateInput!]!, $checkoutId: ID!) {
    checkoutLineItemsUpdate(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
