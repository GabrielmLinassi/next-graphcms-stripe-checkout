import { NextApiRequest, NextApiResponse } from "next";
import { asyncTryCatch, CREATE_CART } from "./../utils/helpers";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const [data, error] = await asyncTryCatch(CREATE_CART);

  if (error) {
    return res.status(error.response.status).json(error.response.data.error);
  }

  res.json(data);
}
