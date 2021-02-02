## Next GraphCMS Stripe Checkout

E-commerce Application built with Next.JS as the React Framework, GraphCMS as the GraphQL database and Stripe as the Payment Gateway

Live: https://next-graphcms-stripe-checkout.vercel.app/

## Test Stripe webhook locally
1. Disable live stripe webhook 
2. Run `stripe listen --events=checkout.session.completed --forward-to localhost:3000/api/webhook` on stripe CLI

## Checkout
use this credit card number `4242 4242 4242 4242`
