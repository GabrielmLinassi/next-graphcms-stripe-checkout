/**
 *
 * TODO: Add typeScript
 *
 * TODO: Add Testings (RTL)
 *
 * TODO: Look for a way to clean the code a bit more. Like separate the queries into a another file
 *
 */

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, gql, useMutation } from "@apollo/client";

import { Field } from "./Field";
import { SaveButton } from "./SaveButton";
import { Error } from "components/Error";

export const Address = ({ user }) => {
  if (!user) {
    return;
  }

  const {
    createAddressHandler,
    mutationError,
    mutationLoading,
    loading,
    data,
    error,
  } = useAddress(user.sub);

  const { address, city, state, zipCode } = data;

  const { errors, handleSubmit, register } = userAddressControler();

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>{`Error :(`}</p>;
  }

  const onSubmit = (data) => createAddressHandler(data);

  return (
    <>
      <h1>Main Address</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="border p-5 mt-3">
          <div className="flex flex-col mt-5">
            <Field
              register={register}
              required
              label="City"
              name="city"
              value={city}
              disabled={loading}
            />
            {errors.city && <Error message={errors.city.message} />}
          </div>
          <div className="flex flex-col mt-5">
            <Field
              register={register}
              required
              label="State"
              name="state"
              value={state}
              disabled={loading}
            />
            {errors.state && <Error message={errors.state.message} />}
          </div>
          <div className="flex flex-col mt-5">
            <Field
              register={register}
              required
              label="Zip Code"
              name="zipCode"
              value={zipCode}
              disabled={loading}
            />
            {errors.zipCode && <Error message={errors.zipCode.message} />}
          </div>
          <div className="flex flex-col mt-5">
            <Field
              register={register}
              required
              label="Address"
              name="address"
              value={address}
              disabled={loading}
            />
            {errors.address && <Error message={errors.address.message} />}
          </div>
        </div>
        <div className="flex justify-end mt-3">
          {/* FIXME: Display loader on mutationLoading=true */}
          <SaveButton />
        </div>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </>
  );
};

/* ------------------------ */

const useAddress = (sub) => {
  const ADDRESS_QUERY = gql`
    query UserAddress($userId: String!) {
      addresses(where: { userId: $userId }) {
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
        city
        state
        zipCode
        address
        userId
      }
      publishAddress(where: { userId: $userId }, to: PUBLISHED) {
        stage
      }
    }
  `;

  const [
    createAddress,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPSERT_ADDRESS_MUTATION, {
    errorPolicy: "all",
    onError: () => null,
  });

  const { loading, data, error } = useQuery(ADDRESS_QUERY, {
    variables: {
      userId: sub,
    },
  });

  const createAddressHandler = async (data) => {
    await createAddress({
      variables: {
        userId: sub,
        create: {
          userId: sub,
          ...data,
        },
        update: {
          ...data,
        },
      },
    });
  };

  return {
    createAddressHandler,
    mutationLoading,
    mutationError,
    loading,
    data: data?.addresses ? data.addresses[0] : {},
    error,
  };
};

const userAddressControler = () => {
  const schema = yup.object().shape({
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
    address: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};
