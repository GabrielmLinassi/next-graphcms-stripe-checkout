import React from "react";
import { SaveButton } from "./SaveButton";
import { useAddress, userAddressControler } from "./Address.js";
import InputGroup from "./InputGroup";

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
  } = useAddress({ userId: user.sub });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An Error ocurred</p>;
  if (!data) return <p>No Data!</p>;

  return (
    <>
      <h1>Main Address</h1>
      <MainAddress
        mainAddress={data.addresses[0]}
        createAddressHandler={createAddressHandler}
        mutationLoading={mutationLoading}
      />
      {mutationError && <p>An Error ocurred. Please try again</p>}
    </>
  );
};

const MainAddress = ({
  mainAddress,
  mutationLoading,
  createAddressHandler,
}) => {
  const { address, city, state, zipCode } = mainAddress;
  const { errors, handleSubmit, register } = userAddressControler();

  function onSubmit(data) {
    createAddressHandler(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="border p-5 mt-3">
        <InputGroup
          register={register}
          errors={errors}
          required
          label="City"
          name="city"
          value={city}
          disabled={mutationLoading}
        />
        <InputGroup
          register={register}
          errors={errors}
          required
          label="State"
          name="state"
          value={state}
          disabled={mutationLoading}
        />
        <InputGroup
          register={register}
          errors={errors}
          required
          label="ZIP Code"
          name="zipCode"
          value={zipCode}
          disabled={mutationLoading}
        />
        <InputGroup
          register={register}
          errors={errors}
          required
          label="Address"
          name="address"
          value={address}
          disabled={mutationLoading}
        />
      </div>
      <div className="flex justify-end mt-3">
        <SaveButton loading={mutationLoading} />
      </div>
    </form>
  );
};
