import "../styles/globals.css";
import "../styles/index.css";
import CartProvider from "contexts/CartProvider";
import { AuthProvider } from "contexts/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
