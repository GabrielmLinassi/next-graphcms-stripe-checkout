import { useState } from "react";

export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div>{children}</div>;
}
