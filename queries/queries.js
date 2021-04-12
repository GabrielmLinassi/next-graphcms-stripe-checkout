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
