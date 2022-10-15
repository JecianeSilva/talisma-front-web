import { IconButton } from "@material-ui/core";
import styled from "styled-components";

export const InputContainer = styled("div")(({ theme, error }) => ({
  border: "1px solid rgb(0,0,0,0.25)",
  borderRadius: "4px",
  borderColor: error && "#F32424",
  display: "flex",
}));

export const Button = styled(IconButton)(({ theme }) => ({
  height: "36px",
  width: "36px",
}));
