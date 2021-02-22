import { Field } from "./Field";
import { Error } from "components/Error";

const InputGroup = ({
  required,
  label,
  name,
  value,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col mt-5">
      <Field
        register={register}
        required={required}
        label={label}
        name={name}
        value={value}
        disabled={disabled}
      />
      {errors[name] && <Error message={errors[name].message} />}
    </div>
  );
};

export default InputGroup;
