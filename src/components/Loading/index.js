import React from "react";
import ReactLoading from "react-loading";
import { Container } from "./styles";

function Loading({
  type = "spin",
  color = "#70163A",
  size = 3,
  fullScreen = false,
}) {
  return (
    <>
      {fullScreen ? (
        <Container>
          <ReactLoading
            type={type}
            color={color}
            height={`${size}rem`}
            width={`${size}rem`}
          />
        </Container>
      ) : (
        <ReactLoading
          type={type}
          color={color}
          height={`${size}rem`}
          width={`${size}rem`}
        />
      )}
    </>
  );
}

export default Loading;
