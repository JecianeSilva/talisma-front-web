import React from "react";
import { Box, TextField } from "@material-ui/core";

import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function InputPhone({
  id = "",
  localization = "pt",
  country = "br",
  disabled = false,
  error = false,
  errorMessage = "",
  ...rest
}) {
  return (
    <>
      <ReactPhoneInput
        id={id}
        name={id}
        localization={localization}
        country={country}
        showCountrySelect={ false }
        disabled={disabled}
        className={"input-phone"}
        style={{
          borderColor: error && "#F32424",
        }}
        component={TextField}
        {...rest}
      />
      {error ? (
        <Box className="MuiFormHelperText-root Mui-error">{errorMessage}</Box>
      ) : null}
    </>
  );
}
export default InputPhone;
