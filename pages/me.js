import { useAuth } from "contexts/auth";

import Layout from "components/Layout";
import { Address } from "components/Address.jsx";
import { Profile } from "components/Profile";

export default function Me() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Layout title="Profile">
      <Profile user={user} />
      <Address user={user} />
    </Layout>
  );
}
