import "../styles/globals.css";
import "../styles/index.css";
import CartProvider from "contexts/CartProvider";
import { AuthProvider } from "contexts/auth";
// import { QueryClient, QueryClientProvider } from "react-query";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";

// const queryClient = new QueryClient();

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: ApolloLink.from([
    link,
    new HttpLink({
      uri:
        "https://api-us-east-1.graphcms.com/v2/ckkhi0rzzq2ym01xyghsz8kzz/master",
    }),
  ]),
});

function MyApp({ Component, pageProps }) {
  return (
    // <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
    // </QueryClientProvider>
  );
}

export default MyApp;
