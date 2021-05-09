import api from "./../utils/api";

export default async function (req, res) {
  try {
    const { data } = await api.get("/products?limit=250");
    res.json({ data });
  } catch (error) {
    res.json({ error: error.response.data });
  }
}
