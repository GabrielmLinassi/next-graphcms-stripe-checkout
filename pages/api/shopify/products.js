import { client } from "./shopify";

export default async function fetchProducts(req, res) {
  const data = await client.product.fetchAll();

  res.status(200);
  res.send(JSON.parse(JSON.stringify(data)));
}
