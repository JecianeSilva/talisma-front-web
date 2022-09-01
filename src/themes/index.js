import defaultTheme from "./defaults";
import { ptBR } from "@material-ui/core/locale";
import { createTheme } from "@material-ui/core";

const overrides = {
  typography: {
    h1: {
      fontFamily: `"Calibri", "Roboto", sans-serif`,
      fontSize: "2.18rem",
      lineHeight: "2.6rem",
    },
    h2: {
      fontSize: "1.375rem",
      lineHeight: "1.5rem",
    },
    h3: {
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    h4: {
      fontSize: "1.125rem",
      lineHeight: "1.2rem",
    },
    h5: {
      fontSize: "0.9rem",
      lineHeight: "1.2rem",
    },
    h6: {
      fontSize: "0.8rem",
      lineHeight: "1rem",
    },
    body1: {
      fontSize: "0.9rem",
      lineHeight: "1.2rem",
    },
    body2: {
      fontSize: "0.8rem",
      lineHeight: "1rem",
      color: "#989898",
    },
  },
};

export default {
  default: createTheme({ ...defaultTheme, ...overrides }, ptBR),
};
