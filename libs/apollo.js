import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, createHttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const apolloClientShopify = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: new createHttpLink({
    uri: "https://gabriels-sample-store.myshopify.com/api/2021-04/graphql.json",
    headers: {
      "Content-Type": "application/graphql",
      Accept: "application/graphql",
      "X-Shopify-Storefront-Access-Token": "c8089fd576b144da06bd40ecba4c4aa3",
    },
  }),
});

const apolloClientGraphCMS = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: ApolloLink.from([
    link,
    new HttpLink({
      uri: "https://api-us-east-1.graphcms.com/v2/ckkhi0rzzq2ym01xyghsz8kzz/master",
    }),
  ]),
});

export default apolloClientShopify;
