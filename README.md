## Next GraphCMS Stripe Checkout

E-commerce Application built with Next.JS as the React Framework, GraphCMS as the GraphQL database and Stripe as the Payment Gateway

Live: https://next-graphcms-stripe-checkout.vercel.app/

![screencapture-localhost-3000-2021-04-07-00_17_12](https://user-images.githubusercontent.com/17390090/113805419-e15e1680-9736-11eb-8758-8a19fe0815fb.png)

## Test Stripe webhook locally

1. Disable live stripe webhook
2. Run `stripe listen --events=checkout.session.completed --forward-to localhost:3000/api/webhook` on stripe CLI

## Checkout

use this credit card number `4242 4242 4242 4242`

| Functionality       | Stack/Tooling |
| ------------------- | ------------- |
| Payment Gateway     | Stripe        |
| e-Commerce solution | Commerce.js   |
| Content managment   | GraphCMS      |
| API Solution        | GraphQL       |
| State Managment lib | Apollo Client |
| Searcher & Results  | Algolia       |
| Image Carousels     | React Spring  |

## Good Practices

- Style

Algolia + Commerce.js + Stripe
