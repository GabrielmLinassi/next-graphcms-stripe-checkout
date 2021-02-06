import { initAuth0 } from "@auth0/nextjs-auth0";

export default async function login(req, res) {
  try {
    // await auth0.handleLogin(req, res);
    res.status(200);
    res.send({ message: "login working" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400);
    res.send("error ===>", error.message);
  }
}
