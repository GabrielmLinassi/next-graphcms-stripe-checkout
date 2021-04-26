import { useEffect, useState } from "react";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from "react-cookie";
import tw, { css } from "twin.macro";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import Layout from "components/Layout";
import Cart from "components/Cart";
import { COMPLETE_CHECKOUT_WITH_TOKEN } from "queries/queries";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [state, setState] = useState({
    succeeded: false,
    error: null,
    processing: false,
    disabled: true,
    clientSecret: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const [cookies] = useCookies(["cart"]);
  const router = useRouter();
  const [completeCheckoutWithToken, { data: dataCompleteCheckoutWithToken }] = useMutation(
    COMPLETE_CHECKOUT_WITH_TOKEN
  );

  useEffect(() => {
    console.log({ dataCompleteCheckoutWithToken });
  }, [dataCompleteCheckoutWithToken]);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkoutId: cookies.cart }),
    })
      .then((res) => res.json())
      .then((data) => setState((prevState) => ({ ...prevState, clientSecret: data.clientSecret })));
  }, []);

  const handleChange = async (e) => {
    setState((prevState) => ({
      ...prevState,
      disabled: e.empty,
      error: e.error ? e.error.message : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log({ error });
      return;
    }

    const payload = await stripe.confirmCardPayment(state.clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (payload.error) {
      setState((prevState) => ({
        ...prevState,
        error: `Payment failed ${payload.error.message}`,
        processing: false,
      }));
    } else {
      console.log({ payload });
      stripe.createToken(cardElement).then((result) => {
        if (result.error) {
          console.log(result.error);
        } else {
          console.log(`paymentData: ${result.token.id}`);
          console.log({ result });
          completeCheckoutWithToken({
            variables: {
              checkoutId: cookies.cart,
              payment: {
                paymentAmount: {
                  amount: payload.paymentIntent.amount / 100,
                  currencyCode: "BRL",
                },
                idempotencyKey: payload.paymentIntent.id,
                billingAddress: {
                  address1: "Rua Almirante Barroso, 204",
                  city: "Palmitinho",
                  country: "Brazil",
                  province: "RS",
                  zip: "98430000",
                  lastName: "Linassi",
                },
                paymentData: result.token.id,
                type: "VAULT",
                test: true,
              },
            },
          })
            .then((res) => {
              console.log({ res });
            })
            .catch((err) => {
              console.log({ err });
            });
        }
      });
      setState((prevState) => ({
        ...prevState,
        error: null,
        processing: false,
        succeeded: true,
      }));
      router.push("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit} tw="p-3 shadow-md">
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
