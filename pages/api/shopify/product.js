import { client } from "./shopify";

export default async function fetchProduct(req, res) {
  const { id } = req.query;
  const data = await client.product.fetch(id);

  res.status(200);
  res.send(JSON.parse(JSON.stringify(data)));
}
