import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, gql, useMutation } from "@apollo/client";

import { Field } from "./Field";
import { SaveButton } from "./SaveButton";
import { Error } from "components/Error";

const schema = yup.object().shape({
  city: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
  address: yup.string().required(),
});

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
//FIXME: Alter createMutation to createOrUpdateMutation and its logic to create or update as required
const CREATE_ADDRESS_MUTATION = gql`
  mutation createMutation(
    $city: String!
    $state: String!
    $zipCode: String!
    $address: String!
    $userId: String!
  ) {
    createAddress(
      data: {
        city: $city
        state: $state
        zipCode: $zipCode
        address: $address
        userId: $userId
      }
    ) {
      id
    }
  }
`;

//FIXME: Look for a way to combine createAddress and publishAddress mutations since they're dependent
const PUBLISH_ADDRESS_MUTATION = gql`
  mutation mutate($userId: String!) {
    publishAddress(where: { userId: $userId }, to: PUBLISHED) {
      stage
    }
  }
`;

export const Address = ({ user }) => {
  if (!user) {
    return;
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const { loading, data, error } = useQuery(ADDRESS_QUERY, {
    variables: {
      userId: user.sub,
    },
  });

  const [
    createAddress,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ADDRESS_MUTATION, {
    errorPolicy: "all",
    onError: () => null,
  });

  const [
    publishAddress,
    { loading: mutationPublishLoading, error: mutationPublishError },
  ] = useMutation(PUBLISH_ADDRESS_MUTATION, {
    errorPolicy: "all",
    onError: () => null,
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <p>Error :( </p>;
  }

  const { address, city, state, zipCode } = data.addresses[0];

  const createAddressHandler = async (data) => {
    await createAddress({ variables: { ...data, userId: user.sub } });
    await publishAddress({ variables: { userId: user.sub } });
  };

  const onSubmit = (data) => {
    createAddressHandler(data);
  };

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
          <SaveButton />
        </div>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </>
  );
};
