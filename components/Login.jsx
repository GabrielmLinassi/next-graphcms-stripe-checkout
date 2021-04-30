import tw from "twin.macro";

const Login = () => {
  return (
    <form onSubmit={() => {}} tw="border-2 p-5 w-2/5 mt-5">
      <div tw="flex flex-col">
        <label>Email</label>
        <input tw="p-2 border-2" />
      </div>
      <div tw="flex flex-col mt-2">
        <label>Password</label>
        <input tw="p-2 border-2" />
      </div>
      <div tw="mt-3">
        <button type="submit" tw="bg-yellow-500 px-4 py-2 rounded">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
