import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { createCustomer, issueJwtToken, issueToken } from "libs/commercejs";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const { pathname, events } = useRouter();
  const [user, setUser] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/me");
        const profile = await response.json();

        if (profile.error) {
          setUser(null);
        } else {
          setUser(profile);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [pathname]);

  useEffect(() => {
    console.log({ customerId });
  }, [customerId]);

  useEffect(async () => {
    if (user) {
      let customerId = null;

      const { data: token, error } = await issueToken(user.name);

      if (error?.type === "not_found") {
        const { data: createCustomerData, error: createCustomerError } = await createCustomer(
          user.name,
          user.nickname
        );
        customerId = createCustomerData.data.id;
      }

      const { data: jwt } = await issueJwtToken(customerId || token.data.customer_id);

      if (jwt) {
        setCustomerId(jwt.customer_id);
      }
    }

    // check new route is OK
    const handleRouteChange = (url) => {
      if (url !== "/" && !user) {
        //window.location.href = "/";
      }
    };

    // Check that initial route is OK
    /*if (["/orders", "/me"].includes(pathname) && user === null) {
      window.location.href = "/";
    }*/

    // Monitor route changes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [user]);

  return <AuthContext.Provider value={{ user, customerId }}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
