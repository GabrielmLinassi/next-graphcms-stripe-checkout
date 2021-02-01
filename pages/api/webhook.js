import { gql, GraphQLClient } from "graphql-request";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default async (req, res) => {
  const event = req.body;

  const session = await stripe.checkout.sessions.retrieve(
    event.data.object.id,
    {
      expand: ["line_items.data.price.product", "customer"],
    }
  );

  const line_items = session.line_items.data;
  const customer = session.customer;

  const { order } = await graphcms.request(
    gql`
      mutation createOrderMutation($data: OrderCreateInput!) {
        createOrder(data: $data) {
          id
          email
          total
        }
      }
    `,
    {
      data: {
        email: customer.email,
        total: session.amount_total,
        stripeCheckoutId: session.id,
        orderItems: {
          create: line_items.map((li) => {
            return {
              quantity: li.quantity,
              price: li.amount_total,
              product: {
                connect: {
                  slug: li.price.product.metadata.productSlug,
                },
              },
            };
          }),
        },
      },
    }
  );
  res.json({ message: "success" });
};
