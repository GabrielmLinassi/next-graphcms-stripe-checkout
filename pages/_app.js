import "../styles/globals.css";
import "../styles/index.css";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "contexts/auth";
import CartProvider from "contexts/CartProvider";
import { ShopifyProvider } from "contexts/shopify";
import { theme } from "styles/theme";
import apolloClient from "libs/apollo";
import { ErrorFallBack } from "components/ErrorFallback";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {}}>
      <ApolloProvider client={apolloClient}>
        <ShopifyProvider>
          <AuthProvider>
            <CartProvider>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </CartProvider>
          </AuthProvider>
        </ShopifyProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
