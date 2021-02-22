export const SaveButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`px-4 py-1 rounded-sm 
      ${
        loading
          ? "bg-gray-300 cursor-default"
          : "bg-yellow-400 hover:bg-yellow-500"
      }`}
    >
      {loading ? "Loading..." : "Save"}
    </button>
  );
};
