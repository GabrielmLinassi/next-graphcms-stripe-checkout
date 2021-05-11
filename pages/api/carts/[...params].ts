import { NextApiRequest, NextApiResponse } from "next";

import {
  asyncTryCatch,
  UPDATE_ITEM_CART,
  DELETE_ITEMS_CART,
  DELETE_ITEM_CART,
} from "./../utils/helpers";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const [cartId, , itemId] = req.query.params;

  if (req.method === "PUT") {
    const { quantity } = req.body;
    const [data, error] = await asyncTryCatch(UPDATE_ITEM_CART(cartId, itemId, quantity));

    if (error) {
      return res.status(error.response.status).json(error.response.data.error);
    }

    res.json(data);
  }

  if (req.method === "DELETE") {
    if (itemId) {
      const [data, error] = await asyncTryCatch(DELETE_ITEM_CART(cartId, itemId));

      if (error) {
        return res.status(error.response.status).json(error.response.data.error);
      }

      return res.json(data);
    }

    const [data, error] = await asyncTryCatch(DELETE_ITEMS_CART(cartId));

    if (error) {
      return res.status(error.response.status).json(error.response.data.error);
    }

    return res.json(data);
  }
}
