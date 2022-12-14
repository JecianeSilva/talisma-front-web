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
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Calibri';
  }

  h1,h2,h3,h4,h5,h6, strong {
    font-family: 'CalibriBold';
    font-weight: bold;
  }

  button {
    cursor: pointer;
  }


  //TABLE ---------------/
  .MuiTableRow-root:hover{
    background-color: #FFE9F2
  }
  .Mui-checked MuiIconButton-colorSecondary{
    color: #C14979
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
      color: red;
    }
    .clear:disabled{
      color: #8c8c8c;
    }
    .add{
      color: green;
    }
    .add:disabled{
      color: #8c8c8c;
    }
}
`;
