import { useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import { issueToken, listOrders } from "libs/commercejs";

const Orders = () => {
  const { user } = useAuth();
  const [state, setState] = useState({
    customerId: null,
  });

  useEffect(async () => {
    if (user) {
      const { data } = await issueToken(user.name);
      setState((prevState) => ({
        ...prevState,
        customerId: data.customer_id,
      }));
    }
  }, [user]);

  useEffect(async () => {
    if (state.customerId) {
      const { data } = await listOrders(state.customerId);
      console.log({ data });
    }
  }, [state]);

  return <div>Orders</div>;
};

export default Orders;
