import { initAuth0 } from "@auth0/nextjs-auth0";

export default async function login(req, res) {
  try {
    await initAuth0({
      domain: "dev-qgvsfan0.us.auth0.com",
      clientId: "pMfHceXVY3qKMtWV8qIaA8LAtmyXcci9",
      clientSecret:
        "zVxWnWlF_N6nMmZ-yIaJU7NTb3G9poPECKtEXx3y2_bjwmsvKGThdux3x-VGCTp5",
      scope: "openid profile",
      redirectUri:
        "https://next-graphcms-stripe-checkout.vercel.app/api/callback",
      postLogoutRedirectUri: "https://next-graphcms-stripe-checkout.vercel.app",
      session: {
        cookieSecret:
          "hsahhsadsadlkewrwerldlsfdf-03-4323-249tkiretkgbp-dsfsdf;sasapppppwq",
      },
    }).handleLogin(req, res);
    res.status(200);
    res.send({ message: "login working" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400);
    res.send("error ===>", error.message);
  }
}
