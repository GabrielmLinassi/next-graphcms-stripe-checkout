import { gql, GraphQLClient } from "graphql-request";
import Stripe from "stripe";
import { initializeApollo } from "libs/apollo";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

import auth0 from "./utils/auth0";
import { PRODUCTS_BY_ID } from "queries/queries";

export default auth0.requireAuthentication(async (req, res) => {
  const { products: reqProducts } = req.body;

  const { user } = await auth0.getSession(req);
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: PRODUCTS_BY_ID,
    variables: {
      ids: [reqProducts[0].id],
    },
  });

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.APP_URL}/summary/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}`,
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        customerId: user.sub,
      },
      line_items: data.nodes.map(({ title, variants }) => {
        return {
          price_data: {
            unit_amount: variants.edges[0].node.priceV2.amount * 100,
            currency: "USD",
            product_data: {
              name: title,
              metadata: {
                // productSlug: product.slug,
              },
            },
          },
          quantity: reqProducts[0].quantity, //reqProducts.find((reqProduct) => reqProduct.slug === product.slug).quantity,
        };
      }),
    });

    res.statusCode = 200;
    res.json(session);
  } catch (e) {
    console.log("Something went wrong", e);
    res.statusCode = 400;
    res.json({ error: { message: e } });
  }
});
