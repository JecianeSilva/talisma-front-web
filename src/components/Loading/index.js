import React from "react";
import ReactLoading from "react-loading";

function Loading({ type = "spin", color = "#000", size = 1 }) {
  return (
    <ReactLoading
      type={type}
      color={color}
      height={`${size}rem`}
      width={`${size}rem`}
    />
  );
}

export default Loading;
