import { gql } from "@apollo/client";

const ADDRESS_QUERY = gql`
  query UserAddress($userId: String!) {
    addresses(where: { userId: $userId }) {
      id
      userId
      city
      state
      zipCode
      address
    }
  }
`;

const UPSERT_ADDRESS_MUTATION = gql`
  mutation createOrUpdateMutation(
    $userId: String!
    $create: AddressCreateInput!
    $update: AddressUpdateInput!
  ) {
    upsertAddress(
      where: { userId: $userId }
      upsert: { create: $create, update: $update }
    ) {
      id
      userId
      city
      state
      zipCode
      address
    }
    publishAddress(where: { userId: $userId }, to: PUBLISHED) {
      id
      userId
      city
      state
      zipCode
      address
    }
  }
`;

export { ADDRESS_QUERY, UPSERT_ADDRESS_MUTATION };
