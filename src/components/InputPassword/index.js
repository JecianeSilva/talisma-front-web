import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";

function InputPassword({
  id = "",
  disabled = false,
  size = "small",
  variant = "outlined",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      id={id}
      name={id}
      placeholder="********"
      disabled={disabled}
      variant={variant}
      size={size}
      fullWidth
      autoFocus
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} disabled={disabled}>
              {showPassword ? (
                <VisibilityOutlined color="primary" />
              ) : (
                <VisibilityOffOutlined color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

export default InputPassword;
