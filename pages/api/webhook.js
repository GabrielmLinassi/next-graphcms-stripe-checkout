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

  /**
   * create order
   */
  const { createOrder } = await graphcms.request(
    gql`
      mutation createOrderMutation($data: OrderCreateInput!) {
        createOrder(data: $data) {
          id
          orderItems {
            id
          }
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

  /**
   * publish order
   */
  await graphcms.request(
    gql`
      mutation publishOrder($id: ID!) {
        publishOrder(where: { id: $id }, to: PUBLISHED) {
          stage
        }
      }
    `,
    {
      id: createOrder.id,
    }
  );

  /**
   * publish order items
   */
  const publishOrderItem = async (id) =>
    await graphcms.request(
      gql`
        mutation publishOrder($id: ID!) {
          publishOrderItem(where: { id: $id }, to: PUBLISHED) {
            stage
          }
        }
      `,
      {
        id,
      }
    );

  const promises = createOrder.orderItems.map((orderItem) =>
    publishOrderItem(orderItem.id)
  );

  await Promise.all(promises);

  res.json({ message: "success" });
};
