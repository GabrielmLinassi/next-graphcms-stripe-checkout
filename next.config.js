module.exports = {
  images: {
    domains: ["media.graphcms.com"],
  },
  env: {
    APP_URL: process.env.APP_URL,
    GRAPHCMS_API: process.env.GRAPHCMS_API,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    GRAPHCMS_MUTATION_TOKEN: process.env.GRAPHCMS_MUTATION_TOKEN,
    GRAPHCMS_PRODUCTION_TOKEN: process.env.GRAPHCMS_PRODUCTION_TOKEN,
  },
};
