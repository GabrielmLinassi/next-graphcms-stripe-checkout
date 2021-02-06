export default async function me(req, res) {
  try {
    res.status(200);
    res.send({ message: "hello there" });
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send("error ===>", error.message);
  }
}
