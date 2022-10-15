import { TextField } from "@material-ui/core";
import React from "react";
import { ContentInput } from "./styles";

function Input({
  id = "",
  disabled = false,
  size = "small",
  placeholder = "",
  label = "",
  variant = "outlined",
  autoComplete = "text",
  select,
  ...rest
}) {
  return (
    <ContentInput
      id={id}
      name={id}
      placeholder={placeholder ? placeholder : label}
      disabled={disabled}
      variant={variant}
      size={size}
      fullWidth
      autoFocus
      {...rest}
    />
  );
}

export default Input;
