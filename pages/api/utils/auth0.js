import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  domain: "dev-qgvsfan0.us.auth0.com",
  clientId: "pMfHceXVY3qKMtWV8qIaA8LAtmyXcci9",
  clientSecret:
    "zVxWnWlF_N6nMmZ-yIaJU7NTb3G9poPECKtEXx3y2_bjwmsvKGThdux3x-VGCTp5",
  scope: "openid profile",
  redirectUri: "http://localhost:3000/api/callback",
  postLogoutRedirectUri: "http://localhost:3000",
  session: {
    cookieSecret:
      "hsahhsadsadlkewrwerldlsfdf-03-4323-249tkiretkgbp-dsfsdf;sasapppppwq",
  },
});
