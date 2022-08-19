import defaultTheme from "./defaults";
import { ptBR } from "@material-ui/core/locale";
import { createTheme } from "@material-ui/core";

const overrides = {
  typography: {
    h1: {
      fontFamily: "Calibri",
      fontSize: "1.5rem",
      lineHeight: "1.6rem",
    },
    h2: {
      fontFamily: "Calibri",
      fontSize: "1.375rem",
      lineHeight: "1.5rem",
    },
    h3: {
      fontFamily: "Calibri",
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    h4: {
      fontFamily: "Calibri",
      fontSize: "1.125rem",
      lineHeight: "1.2rem",
    },
    h5: {
      fontFamily: "Calibri",
      fontSize: "0.9rem",
      lineHeight: "1.2rem",
    },
    h6: {
      fontFamily: "Calibri",
      fontSize: "0.8rem",
      lineHeight: "1rem",
    },
    body1: {
      fontFamily: "Calibri",
      fontSize: "0.9rem",
      lineHeight: "1.2rem",
    },
    body2: {
      fontFamily: "Calibri",
      fontSize: "0.8rem",
      lineHeight: "1rem",
      color: "#989898",
    },
  },
};

export default {
  default: createTheme({ ...defaultTheme, ...overrides }, ptBR),
};
