import { gql, GraphQLClient } from "graphql-request";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default async (req, res) => {
  const { products: reqProducts } = req.body;

  const { products } = await graphcms.request(
    gql`
      query ProductPageQuery($slugs: [String!]) {
        products(where: { slug_in: $slugs }) {
          slug
          name
          price
          description
          images {
            id
            url
            fileName
            height
            width
          }
        }
      }
    `,
    {
      slugs: reqProducts.map((reqProduct) => reqProduct.slug),
    }
  );

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.APP_URL}/summary/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}`,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          unit_amount: product.price,
          currency: "USD",
          product_data: {
            name: product.name,
            metadata: {
              productSlug: product.slug,
            },
          },
        },
        quantity: reqProducts.find(
          (reqProduct) => reqProduct.slug === product.slug
        ).quantity,
      })),
    });

    res.statusCode = 200;
    res.json(session);
  } catch (e) {
    console.log("Something went wrong", e);
    res.statusCode = 400;
    res.json({ error: { message: e } });
  }
};
