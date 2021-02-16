import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { pathname, events } = useRouter();
  const [user, setUser] = useState(null);

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
    // check new route is OK
    const handleRouteChange = (url) => {
      if (url !== "/" && !user) {
        //window.location.href = "/";
      }
    };

    console.log("pathname", pathname);

    // Check that initial route is OK
    if (pathname == "/orders" && user === null) {
      window.location.href = "/";
    }

    // Monitor route changes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
