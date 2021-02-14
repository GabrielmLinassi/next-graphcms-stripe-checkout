import auth0 from "./api/utils/auth0";
import { gql, GraphQLClient } from "graphql-request";
import { formatPrice } from "components/helper";
import Layout from "components/Layout";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function orders({ orders }) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mt-3">My Orders</h1>
      {orders.length ? (
        <ul>
          {orders.map((order) => {
            return (
              <li
                key={order.id}
                className="bg-white p-5 rounded-md shadow-md mt-3"
              >
                <ul>
                  {order.orderItems.map((orderItem) => {
                    return (
                      <li key={orderItem.id} className="mb-5">
                        <div>{orderItem.product.name}</div>
                        {orderItem.quantity} x {formatPrice(orderItem.price)}
                      </li>
                    );
                  })}
                </ul>
                <div>Total: {formatPrice(order.total)}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="bg-white p-5 rounded-md shadow-md mt-3">Not found</div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { user } = (await auth0.getSession(context.req)) || {};

  const { orders } = await graphcms.request(
    gql`
      query fetchOrders($customerId: String!) {
        orders(where: { customerId: $customerId }) {
          id
          total
          orderItems {
            id
            quantity
            price
            product {
              name
            }
          }
        }
      }
    `,
    {
      customerId: user?.sub || "",
    }
  );

  return {
    props: {
      orders,
    },
  };
}
