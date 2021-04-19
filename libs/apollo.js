import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

/*const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});*/

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: new createHttpLink({
      uri: "https://gabriels-sample-store.myshopify.com/api/2021-04/graphql.json",
      // uri: "https://test-gabriels-sample-store.myshopify.com/api/2021-04/graphql.json",
      headers: {
        "Content-Type": "application/graphql",
        Accept: "application/graphql",
        // "X-Shopify-Storefront-Access-Token": "bda0ea7ec2f73ee784dea8355f4d2704",
        "X-Shopify-Storefront-Access-Token": "c8089fd576b144da06bd40ecba4c4aa3",
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

/*const apolloClientGraphCMS = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: ApolloLink.from([
    link,
    new HttpLink({
      uri: "https://api-us-east-1.graphcms.com/v2/ckkhi0rzzq2ym01xyghsz8kzz/master",
    }),
  ]),
});*/

//export default apolloClientShopify;
