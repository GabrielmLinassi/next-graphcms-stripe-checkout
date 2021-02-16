import "../styles/globals.css";
import "../styles/index.css";
import CartProvider from "contexts/CartProvider";
import { AuthProvider } from "contexts/auth";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
