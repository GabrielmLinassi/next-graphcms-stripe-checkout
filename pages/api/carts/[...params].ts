import { NextApiRequest, NextApiResponse } from "next";

import api from "../utils/api";
import { asyncTryCatch } from "./../utils/helpers";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const [cartId, , itemId] = req.query.params;

  if (req.method === "GET") {
    const [data, error] = await asyncTryCatch(async () => await api.get(`/carts/${cartId}`));

    if (error) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(200).send({ cart: data.data });
  }

  if (req.method === "POST") {
    const { id, quantity } = req.body;

    const [data, error] = await asyncTryCatch(
      async () => await api.post(`/carts/${cartId}`, { id, quantity })
    );

    if (error) {
      return res.json({ error });
    }

    res.json(data.data);
  }

  if (req.method === "PUT") {
    const { quantity } = req.body;

    try {
      const { data } = await api.put(`/carts/${cartId}/items/${itemId}`, { quantity });
      res.json({ data });
    } catch (error) {
      res.json({ error });
    }
  }

  if (req.method === "DELETE") {
    if (itemId) {
      const [data, error] = await asyncTryCatch(
        async () => await api.delete(`/carts/${cartId}/items/${itemId}`)
      );

      if (error) {
        return res.status(error.response.status).json(error.response.data);
      }

      return res.status(200).send(data.data);
    }

    const [data, error] = await asyncTryCatch(
      async () => await api.delete(`/carts/${cartId}/items`)
    );

    if (error) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(200).send(data.data);
  }
}
