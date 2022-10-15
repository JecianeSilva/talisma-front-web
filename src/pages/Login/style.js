import styled from "styled-components";

export const Container = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: 0,
  top: 0,
}));

export const LogoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "24px",
}));

export const Logo = styled("img")(({ theme }) => ({
  width: "11rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ContentToolbar = styled("div")(({ theme }) => ({
  top: 0,
  position: "fixed",
  width: "100%",
}));

export const FormContainer = styled("form")(({ theme }) => ({
  minWidth: "22.5rem",
  filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16))",
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.16)",
  borderRadius: "30px",
  padding: "3rem 2rem 3.5rem",

  ".MuiInputBase-root": {
    color: theme.palette.grey[200],
    background: theme.palette.secondary.contrastText,
    border: "none",
  },

  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.white,
  },

}));

export const Divider = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "0.8rem",
}));
