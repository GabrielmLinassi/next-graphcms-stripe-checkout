import auth0 from "./utils/auth0";

export default async function login(req, res) {
  const params = req.query;

  const cookie = `redirect-to=${encodeURIComponent(params["redirect-to"])}; Path=/; SameSite=Lax`;
  res.setHeader("Set-Cookie", cookie);

  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
