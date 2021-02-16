import { Field } from "components/Field";
import Layout from "components/Layout";
import { SaveButton } from "components/SaveButton";
import { useAuth } from "contexts/auth";
import Image from "next/image";

export default function Me() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Layout title="Profile">
      <div>
        <h1>Profile</h1>
        <div className="border p-5 mt-3">
          <div className="flex flex-col">
            <Field label="ID" value={user.sub} disabled />
          </div>
          <div className="flex flex-col mt-5">
            <Field label="Nickname" value={user.nickname} />
          </div>
          <div className="flex flex-col mt-5">
            <Field label="Name" value={user.name} />
          </div>
          <div className="mt-5">
            <Image src={user.picture} width="100" height="100" />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <SaveButton />
        </div>
      </div>
      <div className="mt-10">
        <h1>Main Address</h1>
        <div className="border p-5 mt-3">
          <div className="flex flex-col mt-5">
            <Field label="City" />
          </div>
          <div className="flex flex-col mt-5">
            <Field label="State" />
          </div>
          <div className="flex flex-col mt-5">
            <Field label="Zip Code" />
          </div>
          <div className="flex flex-col mt-5">
            <Field label="Address" />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <SaveButton />
        </div>
      </div>
    </Layout>
  );
}
