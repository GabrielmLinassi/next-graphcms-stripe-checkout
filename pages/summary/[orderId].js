import React from "react";
import { gql, GraphQLClient } from "graphql-request";
import { formatPrice } from "../../components/helper";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function SummaryPage({ orders }) {
  {
    return orders.map((order) => {
      return (
        <div key={order.id}>
          <div>Total Order: {formatPrice(order.total)}</div>
          <div>
            {order.orderItems.map((orderItem) => (
              <div key={orderItem.id}>
                <div>Quantity: {orderItem.quantity}</div>
                <div>Price: {formatPrice(orderItem.price)}</div>
                <div>Product: {orderItem.product.name}</div>
                <img
                  src={orderItem.product.images[0].url}
                  alt={orderItem.product.images[0].fileName}
                  width={orderItem.product.images[0].width}
                  height={orderItem.product.images[0].height}
                />
              </div>
            ))}
          </div>
        </div>
      );
    });
  }
}

export async function getServerSideProps(context) {
  const { orderId } = context.query;

  const { orders } = await graphcms.request(
    gql`
      query OrderFullfilment($stripeCheckoutId: String!) {
        orders(where: { stripeCheckoutId: $stripeCheckoutId }) {
          id
          total
          orderItems {
            id
            quantity
            price
            product {
              name
              images {
                fileName
                url
                height
                width
              }
            }
          }
        }
      }
    `,
    {
      stripeCheckoutId: orderId,
    }
  );

  return {
    props: {
      orders,
    },
  };
}
