import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { ADDRESS_QUERY, UPSERT_ADDRESS_MUTATION } from "queries/address";

const useAddress = ({ userId }) => {
  const [
    createAddress,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPSERT_ADDRESS_MUTATION, {
    errorPolicy: "all",
    onError: () => null,
  });

  const { loading, data, error } = useQuery(ADDRESS_QUERY, {
    variables: { userId },
  });

  const createAddressHandler = async (data) => {
    await createAddress({
      variables: {
        userId,
        create: {
          userId,
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
    data,
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

export { useAddress, userAddressControler };
