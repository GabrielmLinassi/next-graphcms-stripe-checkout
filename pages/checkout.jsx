import { useEffect, useState } from "react";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from "react-cookie";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { useAuth } from "contexts/auth";

import Layout from "components/Layout";
import Cart from "components/Cart";
import { createCheckout, createOrder } from "libs/commercejs";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [state, setState] = useState({
    succeeded: false,
    error: null,
    processing: false,
    disabled: true,
    clientSecret: "",
    paymentIntentId: null,
  });
  const [finished, setFinished] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const [cookies, setCookie, removeCookie] = useCookies(["cartId"]);
  const router = useRouter();
  const { user, customerId } = useAuth();

  useEffect(() => {
    if (finished) {
      console.log("finished...");
      removeCookie("cartId");
    }
  }, [finished]);

  const handleChange = async (e) => {
    setState((prevState) => ({
      ...prevState,
      disabled: e.empty,
      error: e.error ? e.error.message : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User must be logged in!");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    /**
     *
     */
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log({ error });
      return;
    }

    /**
     *
     */
    await stripe.createToken(cardElement).then(async (result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        const { data: checkout } = await createCheckout(cookies.cartId);

        const { data: order } = await createOrder({
          checkoutId: checkout.id,
          user,
          cardToken: result.token.id,
          paymentMethodId: paymentMethod.id,
        });

        setCookie("orderId", order.id);
        setFinished(true);
        // router.push("/success");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} tw="p-3 shadow-md mt-5 w-2/5">
      <CardElement options={{}} onChange={handleChange} />
      <button
        type="submit"
        css={[
          tw`px-4 py-2 bg-green-500 cursor-pointer`,
          (state.disabled || state.error) && tw`bg-gray-400 cursor-not-allowed`,
        ]}
        disabled={state.disabled || state.error}
      >
        {state.processing ? "Processing..." : "Pay"}
      </button>
      <div>Error: {state.error}</div>
    </form>
  );
};

const Checkout = () => {
  return (
    <Layout>
      <Cart />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Layout>
  );
};

export default Checkout;
