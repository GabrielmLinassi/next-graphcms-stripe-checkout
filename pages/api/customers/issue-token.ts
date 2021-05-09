import { NextApiRequest, NextApiResponse } from "next";
import api from "./../utils/api";

interface Customer {
  customer_id: string;
  token: string;
}

interface Data {
  data: Customer;
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email } = req.body;

  const { data } = await api.post<any>(`/customers/issue-token`, { email, base_url: "{token}" });

  const normalized: Customer = {
    customer_id: data.customer_id,
    token: data.token,
  };

  res.json({ data: normalized });
}
