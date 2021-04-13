module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: "url-loader?limit=100000",
    });
    return config;
  },
  images: {
    domains: [
      "media.graphcms.com",
      "s.gravatar.com",
      "images-na.ssl-images-amazon.com",
      "cdn.shopify.com",
    ],
  },
  env: {
    APP_URL: process.env.APP_URL,
    GRAPHCMS_API: process.env.GRAPHCMS_API,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    GRAPHCMS_MUTATION_TOKEN: process.env.GRAPHCMS_MUTATION_TOKEN,
    GRAPHCMS_PRODUCTION_TOKEN: process.env.GRAPHCMS_PRODUCTION_TOKEN,

    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,

    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    AUTH0_LOGOUT_REDIRECT_URI: process.env.AUTH0_LOGOUT_REDIRECT_URI,
    AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
  },
};
