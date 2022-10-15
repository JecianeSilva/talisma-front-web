import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0; 
    box-sizing: border-box;
  }

  @font-face {
    font-family: "CalibriBold";
    src: local("CalibriBold"),
      url("../fonts/Calibri/calibri-bold.ttf") ("truetype");
    font-weight: bold;
  }
  
  @font-face {
    font-family: "Calibri";
    src: local("Calibri"),
      url("../fonts/Calibri/calibri-regular.ttf") ("truetype");
  }

  html {
    @media (max-width: 1080px) {
        font-size: 93.75%;
    }

    @media (max-width: 720px) {
        font-size: 87.5%;
    }

    @media (max-width: 600px) {
      font-size: 71.25%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    fontFamily: 'Calibri', Roboto, sans-serif;
  }

  h1,h2,h3,h4,h5,h6, strong {
    font-family: 'CalibriBold', Roboto, sans-serif;
    font-weight: bold;
  }

  button {
    cursor: pointer;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  //-----------------------------
  .MuiToolbar-regular{
    min-height: 56px;
  }
  .MuiOutlinedInput-input{
    padding: 10.5px 12px;
  }

  // ----------------------
.input-phone{
    border: 1px solid rgb(0,0,0,0.25);
    border-radius: 4px;
    display: flex;
}
.input-cpf{
  width: 92.5%;
  padding: 8.5px 10px;
  border: 1px solid rgb(0,0,0,0.25);
  border-radius: 4px;
  min-height: 20px;
}
.MuiFormHelperText-contained{
  margin-left: 0px;
  margin-right: 0px;
}

.MuiAutocomplete-paper{
  background-color: #FFFFFF;
}

  //TABLE ---------------/
  .MuiTableCell-root {
    padding: 10px;
  }
  .Mui-checked MuiIconButton-colorSecondary{
    color: #C14979
  }
  .MuiPaper-elevation2 {
    box-shadow: 0px 0px 8px rgba(0,0,0,0.10)
  }
  .MuiStepConnector-root{
    top: 18px !important;
  }
  .MuiStepConnector-root span{
    border-top-width: 3px;
  }
  .MuiStepConnector-active span, .MuiStepConnector-completed span{
    border-top-color: #C14979
  }

  .MuiStepper-root {
    padding: 6px 12px;
  }
  .MuiStepLabel-label.MuiStepLabel-alternativeLabel{
    margin-top: 5px;
    font-size: 10px;
  }

  .MuiIconButton-colorInherit {
    color: #4F4F4F;

    .clear{
      color: #F35457;
    }
    .add{
      color: #21AB69;
    }
  }
  .MuiIconButton-colorInherit:disabled {
    color: #8c8c8c;
    .clear{
      color: #8c8c8c;
    }
    .add{
      color: #8c8c8c;
    }
  }

  .MuiTableRow-root:hover {
    background-color: #FFE9F2;
  }

  .react-tel-input :disabled, .input-cpf:disabled  {
    color: #8c8c8c
  }

`;
