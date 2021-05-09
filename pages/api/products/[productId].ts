import api from "./../utils/api";

export default async function (req, res) {
  const { productId } = req.query;

  try {
    const { data } = await api.get(`/products/${productId}`);
    res.json({ data });
  } catch (error) {
    res.json({ error: error.response.data });
  }
}
