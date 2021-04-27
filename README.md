This is my side-project I've working for a while now as a mean of improving my programming skills. It's a JAMStack Headless E-Commerce built with Nextjs and Tailwind.css and contains several nice integrations like with Aloglia for search and filtering and Commercejs for the commerce layer.

### Headaches & Pitfalls I had while developing it:
- Tailwind.css can be really messy and scary to work with. At first, I thought several times about giving up and using other solutions like MaterialUI, Bootstrap, etc. However Tailwind really pays off. [complete...]

- I tried several solutions as the commerce layer. Mainly, WooComerce and Shopify then stuck with CommerceJS. The problem with WooComerce for headless solutions is that it's a WordPress plugin so it needs a WP site running and I didn't found a good way to host it for free so I left it behind. Then I went with Shopify it was great, but it's a pain in the ass to understand its documentation. When it comes to building a headless checkout then it's almost impossible. They want us to use their Shopify Checkout URL Redirect and if one wants to build a customized checkout and integrate it with Stripe there's no documentation and info on how to do it.

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
