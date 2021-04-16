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
import { algoliaClient, indexName } from "libs/algolia";
import { ErrorFallBack } from "components/ErrorFallback";
import { useApollo } from "libs/apollo";
import GlobalStyles from "components/GlobalStyles";

/* --- --- --- */

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {}}>
      <InstantSearch searchClient={algoliaClient} indexName={indexName} routing={true}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <CartProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyles />
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
