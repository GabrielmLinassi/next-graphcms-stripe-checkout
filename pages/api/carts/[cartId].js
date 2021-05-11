import { asyncTryCatch, RETRIEVE_CART, ADD_ITEM_CART } from "./../utils/helpers";

export default async function (req, res) {
  const { cartId } = req.query;

  if (req.method === "POST") {
    const { id, quantity } = req.body;
    const [data, error] = await asyncTryCatch(ADD_ITEM_CART(cartId, id, quantity));

    if (error) {
      return res.json(error.response.data.error);
    }

    return res.json(data);
  }

  const [data, error] = await asyncTryCatch(RETRIEVE_CART(cartId));

  if (error) {
    return res.status(error.response.status).json(error.response.data.error);
  }

  return res.json(data);
}
