import { NextApiRequest, NextApiResponse } from "next";

import api from "./../utils/api";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const [customerId] = req.query.params;

  if (req.method === "POST" && req.query.params.includes("issue-token")) {
    const { data } = await api.post(`/customers/${customerId}/issue-token`);
    return res.json(data);
  }

  if (req.method === "GET") {
    const { data } = await api.get(`/customers/${customerId}/orders`);
    return res.json({ orders: data.data });
  }

  res.status(405).json({ error: "method not allowed" });
}
