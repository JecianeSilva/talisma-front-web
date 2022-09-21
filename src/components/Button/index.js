import { Button as Button2 } from "@material-ui/core";
import React from "react";

import Loading from "../Loading";

import { ButtonContainer } from "./styles";

function Button({
  title,
  width = 100,
  padding = "1rem",
  isLoading = false,
  color = "primary",
  variant = "contained",
  handleOnClick,
  startIcon,
  ...rest
}) {
  return (
    <ButtonContainer {...rest}>
      <Button2
        onClick={handleOnClick ? handleOnClick : () => {}}
        variant={variant}
        color={color}
        startIcon={startIcon}
        style={{
          backgroundColor: "#70163A",
          width: `${width}%`,
          color: "#FFF",
          borderRadius: "30px",
          padding: padding,
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading size={1.5} color="white" />
        ) : (
          <span
            style={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {title}
          </span>
        )}
      </Button2>
    </ButtonContainer>
  );
}

export default Button;
