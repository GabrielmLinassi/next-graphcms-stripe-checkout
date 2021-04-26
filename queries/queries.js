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

export const ASSOCIATE_CUSTOMER_CART = gql`
  mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
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

export const GET_CHECKOUT_LINE_ITEMS = gql`
  query getCheckoutLineItems($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on CheckoutLineItem {
        quantity
        variant {
          priceV2 {
            amount
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

export const PRODUCTS_BY_ID = gql`
  query ProductsById($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        variants(first: 1) {
          edges {
            node {
              priceV2 {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const COMPLETE_CHECKOUT_WITH_TOKEN = gql`
  mutation checkoutCompleteWithTokenizedPaymentV3(
    $checkoutId: ID!
    $payment: TokenizedPaymentInputV3!
  ) {
    checkoutCompleteWithTokenizedPaymentV3(checkoutId: $checkoutId, payment: $payment) {
      checkout {
        id
        orderStatusUrl
        order {
          fulfillmentStatus
          successfulFulfillments {
            fulfillmentLineItems {
              edges {
                node {
                  lineItem {
                    title
                    quantity
                  }
                  quantity
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        id
      }
    }
  }
`;

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE = gql`
  mutation checkoutShippingAddressUpdateV2(
    $shippingAddress: MailingAddressInput!
    $checkoutId: ID!
  ) {
    checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
      checkout {
        id
        availableShippingRates {
          ready
          shippingRates {
            handle
            priceV2 {
              amount
              currencyCode
            }
            title
          }
        }
        shippingLine {
          handle
          priceV2 {
            amount
            currencyCode
          }
          title
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

export const CHECKOUT_SHIPPING_LINE_UPDATE = gql`
  mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
    checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
