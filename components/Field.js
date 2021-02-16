export const Field = ({ label, value, disabled }) => (
  <>
    <label htmlFor={label}>{`${label}:`}</label>
    <input
      name={label}
      className="py-1 px-3 line border border-yellow-300"
      placeholder=""
      disabled={disabled}
      value={value}
    />
  </>
);
