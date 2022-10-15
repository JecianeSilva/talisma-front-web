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

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  background-color: #fff;
  margin: 0px 0px 64px 0px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.10);
  border-radius: 8px;
  padding: 0.3rem 0.8rem 1rem;

  .MuiOutlinedInput-input {
    padding: 10px 14px;
  }
  .react-tel-input .form-control {
    padding-left: 16px !important;
    border: none;
  }
  .flag-dropdown {
    display: none !important;
  }
  .MuiSvgIcon-colorPrimary {
    color: #4f4f4f;
  }
  #simple-tabpanel-1 .MuiPaper-elevation2,
  #simple-tabpanel-2 .MuiPaper-elevation2 {
    box-shadow: none !important;
  }
`;

export const Form = styled.form``;
