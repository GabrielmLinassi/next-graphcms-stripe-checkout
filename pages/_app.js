import "instantsearch.css/themes/reset.css";
import "../styles/globals.css";
import "../styles/index.css";

import { InstantSearch } from "react-instantsearch-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "contexts/auth";
import CartProvider from "contexts/CartProvider";
import { theme } from "styles/theme";
import apolloClient from "libs/apollo";
import { algoliaClient, indexName } from "libs/algolia";
import { ErrorFallBack } from "components/ErrorFallback";

/* --- --- --- */

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {}}>
      <InstantSearch searchClient={algoliaClient} indexName={indexName} routing={true}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <CartProvider>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </CartProvider>
          </AuthProvider>
        </ApolloProvider>
      </InstantSearch>
    </ErrorBoundary>
  );
}

export default MyApp;
