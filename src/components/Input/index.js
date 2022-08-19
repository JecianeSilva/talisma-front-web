import React from "react";
import { InputBlock } from "./styles";

function Input({ name, label, error, ...rest }) {
  return (
    <InputBlock>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} {...rest} />
      {error && <span className="error">{error}</span>}
    </InputBlock>
  );
}

export default Input;
