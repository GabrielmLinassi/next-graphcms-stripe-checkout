import auth0 from "./utils/auth0";

export default async function callback(req, res) {
  const redirectTo = req.cookies["redirect-to"];

  try {
    await auth0.handleCallback(req, res, { redirectTo });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
