import styled from "styled-components";

export const Container = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
}));

export const ContentHeader = styled("div")(({ theme }) => ({
  width: " 100%",
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
}));

export const ContentBody = styled("div")(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  width:  '100%',
  backgroundColor: theme.palette.background.default,
  margin: '0px 0px 64px 0px',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.10)',
  borderRadius: '8px',
  padding: '0.3rem 1rem 2rem',
}));

export const Form = styled.form``;
