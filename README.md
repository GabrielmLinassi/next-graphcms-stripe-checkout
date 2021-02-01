## Next GraphCMS Stripe Checkout

E-commerce Application built with Next.JS as the React Framework, GraphCMS as the GraphQL database and Stripe as the Payment Gateway

Live: https://next-graphcms-stripe-checkout.vercel.app/

## Test Stripe webhook locally
Disable live stripe webhook and run `stripe listen --events=checkout.session.completed --forward-to localhost:3000/api/webhook` on stripe CLI. To test it live, just not run stripe CLI locally. Will automatically use the lvie webhook.
