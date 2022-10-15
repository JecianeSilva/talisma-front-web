import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const StepIconComponent = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#cecece",
  color: "#fff",
  width: 35,
  height: 35,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",

  ...(ownerState.active && {
    backgroundColor: "#C14979",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#C14979",
  }),
}));
