import auth0 from "./utils/auth0";

export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res);
    res.status(200);
    res.send({ message: "hello there" });
  } catch (error) {
    console.error(error);
    res.status(400);
    res.send("error ===>", error.message);
  }
}
