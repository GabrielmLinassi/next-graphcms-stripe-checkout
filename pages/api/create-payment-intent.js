import { stripe } from "libs/stripe";
import { retrieveCart } from "libs/commercejs";

export default async function createPaymentIntent(req, res) {
  const { checkoutId } = req.body;
  const { data } = await retrieveCart(checkoutId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.subtotal.raw * 100,
    currency: "usd",
  });

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  });
}
