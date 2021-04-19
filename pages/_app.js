import "instantsearch.css/themes/reset.css";
import "nprogress/nprogress.css";

import "../styles/globals.css";
import "../styles/index.css";

import dynamic from "next/dynamic";
import { InstantSearch } from "react-instantsearch-dom";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import { CookiesProvider } from "react-cookie";

import { AuthProvider } from "contexts/auth";
import CartProvider from "contexts/CartProvider";
import { theme } from "styles/theme";
import { algoliaClient, indexName } from "libs/algolia";
import { ErrorFallBack } from "components/ErrorFallback";
import { useApollo } from "libs/apollo";
import GlobalStyles from "components/GlobalStyles";

/* --- --- --- */

const TopProgressBar = dynamic(
  () => {
    return import("components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {}}>
      <InstantSearch searchClient={algoliaClient} indexName={indexName} routing={true}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <CookiesProvider>
              <CartProvider>
                <ThemeProvider theme={theme}>
                  <GlobalStyles />
                  <TopProgressBar />
                  <Component {...pageProps} />
                </ThemeProvider>
              </CartProvider>
            </CookiesProvider>
          </AuthProvider>
        </ApolloProvider>
      </InstantSearch>
    </ErrorBoundary>
  );
}

export default MyApp;
