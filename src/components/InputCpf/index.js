import { Box } from "@material-ui/core";
import React from "react";
import ReactInputMask from "react-input-mask";

function InputCPF({
  id = "",
  mask = "999.999.999-99",
  disabled = false,
  error,
  errorMessage,
  ...rest
}) {
  return (
    <>
      <ReactInputMask
        className={"MuiInputBase-input input-cpf"}
        style={{ borderColor: error && "#F32424" }}
        id={id}
        disabled={disabled}
        name={id}
        mask={mask}
        {...rest}
      />
      {error ? (
        <Box className="MuiFormHelperText-root Mui-error">{errorMessage}</Box>
      ) : null}
    </>
  );
}

export default InputCPF;
