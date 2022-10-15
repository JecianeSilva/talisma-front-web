import defaultTheme from "./defaults";
import { ptBR } from "@material-ui/core/locale";
import { createTheme } from "@material-ui/core";

const overrides = {
  typography: {
    allVariants: {
      fontFamily: `"Calibri", "Roboto", sans-serif`,
    },
    h1: {
      fontSize: "2.1rem",
      lineHeight: "2.4rem",
    },
    h2: {
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    h3: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
    h4: {
      fontSize: "1.125rem",
      lineHeight: "1.25rem",
    },
    h5: {
      fontSize: "1.0rem",
      lineHeight: "1.2rem",
    },
    h6: {
      fontSize: "0.9rem",
      lineHeight: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: "1rem",
    },
  },
};

export default {
  default: createTheme({ ...defaultTheme, ...overrides }, ptBR),
};
