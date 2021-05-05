import { useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import { issueToken, listOrders } from "libs/commercejs";

const Orders = () => {
  const { user, customerId } = useAuth();

  useEffect(async () => {
    if (customerId) {
      const { data } = await listOrders(customerId);
      console.log({ data });
    }
  }, [customerId]);

  return <div>Orders</div>;
};

export default Orders;
