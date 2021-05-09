import { NextApiRequest, NextApiResponse } from "next";

import api from "../utils/api";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { data } = await api.get("/carts");
  res.json(data);
}
