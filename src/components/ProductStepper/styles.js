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

// const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
//   zIndex: 1,

//   ...(ownerState.active && {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//   }),
//   ...(ownerState.completed && {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//   }),
// }));
