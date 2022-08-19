import React from "react";

import Loading from "../Loading";

import { ButtonContainer } from "./styles";

function Button({ title, Icon, isLoading = false, ...rest }) {
  return (
    <ButtonContainer {...rest} className={Icon ? "hasIcon" : ""}>
      {isLoading ? (
        <Loading color="#FFF" size={1.4} />
      ) : (
        <>
          {Icon}
          {title}
        </>
      )}
    </ButtonContainer>
  );
}

export default Button;
