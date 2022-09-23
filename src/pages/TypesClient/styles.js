import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  margin-bottom: 2.2rem;

  .MuiInputBase-root {
    color: #8c8c8c;
    min-width: 400px;
    border-radius: 24px;
    border: none;
    background-color: #fff;
  }
  .MuiOutlinedInput-input {
    padding: 15.5px 14px 15.5px 0px;
  }
  .MuiOutlinedInput-input::placeholder {
    color: #000;
  }
  .MuiInputAdornment-positionStart {
    margin: 0;
  }
  .MuiOutlinedInput-adornedStart {
    padding: 0;
  }
`;
export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  background-color: #fff;
  margin: 0px 0px 44px 0px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.03);
  border-radius: 8px 5px 8px 8px;
  padding: 1rem;

  color: #cecece;
  .MuiTypography-body1 {
    color: #1f1f1f;
  }
  .MuiInputBase-root,
  .MuiInputBase-input,
  .react-tel-input .form-control {
    color: #8c8c8c;
  }
  .muiinputbase-root.mui-disabled, muiinputbase-input: {
    color: #bdbcbc;
  }

  .react-tel-input .form-control {
    padding-left: 16px !important;
    border: none;
  }
  .flag-dropdown {
    display: none !important;
  }
  .MuiSvgIcon-colorPrimary {
    color: #1f1f1f;
  }
  #simple-tabpanel-1 .MuiPaper-elevation2,
  #simple-tabpanel-2 .MuiPaper-elevation2 {
    box-shadow: none !important;
  }
`;
