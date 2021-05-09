import { NextApiRequest, NextApiResponse } from "next";

import { asyncTryCatch } from "../utils/helpers";
import api from "./../utils/api";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cartId } = req.query;

  const [data, error] = await asyncTryCatch(() => api.get(`/checkouts/${cartId}?type=cart`));

  if (error) {
    return res.json({ error: error.response.data });
  }

  res.json(data.data);
}
