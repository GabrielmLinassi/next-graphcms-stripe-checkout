import Image from "next/image";
import { Field } from "./Field";
import { SaveButton } from "./SaveButton";

export const Profile = ({ user }) => {
  return (
    <div>
      <h1>Profile</h1>
      <div className="border p-5 mt-3">
        <div className="flex flex-col">
          <Field label="ID" value={user.sub} disabled />
        </div>
        <div className="flex flex-col mt-5">
          <Field label="Nickname" value={user.nickname} disabled />
        </div>
        <div className="flex flex-col mt-5">
          <Field label="Name" value={user.name} disabled />
        </div>
        <div className="mt-5">
          <Image src={user.picture} width="100" height="100" />
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <SaveButton />
      </div>
    </div>
  );
};
