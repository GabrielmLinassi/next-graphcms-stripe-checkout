import "../styles/globals.css";
import ContextProvider from "contexts/context";
import { AuthProvider } from "contexts/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
