module.exports = {
  images: {
    domains: ["media.graphcms.com"],
  },
  env: {
    GRAPHCMS_API: process.env.GRAPHCMS_API,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
};
