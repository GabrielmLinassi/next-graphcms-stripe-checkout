export const Field = ({ label, name, value, disabled, register }) => (
  <>
    <label htmlFor={label}>{`${label}:`}</label>
    <input
      name={name}
      ref={register}
      className="py-1 px-3 line border border-yellow-300"
      disabled={disabled}
      readOnly={disabled}
      defaultValue={value}
    />
  </>
);
