import { initializeApollo } from "libs/apollo";
import { stripe } from "libs/stripe";
import { GET_CART } from "queries/queries";

export default async function createPaymentIntent(req, res) {
  const apolloClient = initializeApollo();
  const { checkoutId } = req.body;

  const { data } = await apolloClient.query({
    query: GET_CART,
    variables: {
      id: checkoutId,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.node.lineItemsSubtotalPrice.amount * 100,
    currency: "brl",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
