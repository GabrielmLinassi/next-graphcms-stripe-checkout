import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import tw from "twin.macro";
import { useCookies } from "react-cookie";

import { LOGIN } from "queries/queries";

const Login = () => {
  const [login, { data }] = useMutation(LOGIN);
  const [cookies, setCookie] = useCookies(["customerAccessToken"]);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      variables: {
        input: {
          email: "gabrielm.linassi@gmail.com",
          password: "classea2",
        },
      },
    });
  };

  useEffect(() => {
    if (data?.customerAccessTokenCreate) {
      const { accessToken, expiresAt } = data.customerAccessTokenCreate.customerAccessToken;
      setCookie("customerAccessToken", accessToken, {
        path: "/",
        expires: new Date(expiresAt),
      });
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <div>Login Form</div>
      <button tw="bg-blue-500 p-2" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
