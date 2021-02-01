import { gql, GraphQLClient } from "graphql-request";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default async (req, res) => {
  const { slug } = req.body;

  const { product } = await graphcms.request(
    gql`
      query ProductPageQuery($slug: String!) {
        product(where: { slug: $slug }) {
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
      slug: slug,
    }
  );

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.APP_URL}/?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/products/${slug}`,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            unit_amount: product.price,
            currency: "USD",
            product_data: {
              name: product.name,
              metadata: {
                productSlug: slug,
              },
            },
          },
          quantity: 1,
        },
      ],
    });
    res.statusCode = 200;
    res.json(session);
  } catch (e) {
    console.log("Something went wrong", e);
    res.statusCode = 400;
    res.json({ error: { message: e } });
  }
};
