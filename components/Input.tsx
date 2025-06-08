import { InputPropType } from "@/interfaces/InputPropType";
import React from "react";

const Input = (props: InputPropType) => {
  const { type, id, name, required = false, className, value, onChange} = props;
  return (
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
