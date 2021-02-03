import React from "react";
import { gql, GraphQLClient } from "graphql-request";
import { formatPrice } from "../../components/helper";
import Layout from "components/Layout";
import BackBtn from "components/BackBtn";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default function SummaryPage({ order }) {
  {
    return (
      <Layout>
        <BackBtn title="Back home" />
        <h1 className="text-2xl font-bold mt-3">Order Summary</h1>
        <ul className="bg-white p-5 rounded-md shadow-md mt-3">
          {order.orderItems.map((orderItem) => (
            <li key={orderItem.id} className="flex gap-5">
              <img
                src={orderItem.product.images[0].url}
                alt={orderItem.product.images[0].fileName}
                width={100}
                height={100}
              />
              <div>
                <div>
                  {orderItem.quantity} x {orderItem.product.name}
                </div>
                <div className="mt-2">{formatPrice(orderItem.price)}</div>
              </div>
            </li>
          ))}
          <li className="border-t-2 pt-3 mt-5 text-right">
            <span className="font-bold">Total Order:</span>{" "}
            {formatPrice(order.total)}
          </li>
        </ul>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  const { orderId } = context.query;

  const { order } = await graphcms.request(
    gql`
      query OrderFullfilment($stripeCheckoutId: String!) {
        order(where: { stripeCheckoutId: $stripeCheckoutId }) {
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
      order,
    },
  };
}
