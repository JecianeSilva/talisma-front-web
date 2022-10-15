const black = "#1F1F1F";
const white = "#FFFFFF";

const palette = {
  palette: {
    common: {
      black: black,
      white: white,
    },
    //PRIMARY
    primary: {
      main: "#70163A",
      dark: "#982B57",
      light: "#C14979",
      contrastText: "#EFD4DF",
    },

    //SECONDARY
    secondary: {
      main: "#D68E70",
      dark: "#F1A788",
      light: "#FECAB5",
      contrastText: "#F3EAE7",
    },

    //TERCIÁRIA
    error: { main: "#F35457" },
    warning: { main: "#E3CC00" },
    success: { main: "#21AB69", light: "#66E792" },

    //CINZA E NEUTROS
    grey: {
      50: black,
      100: "#4F4F4F",
      200: "#8C8C8C",
      300: "#BDBCBC",
      400: "#CECECE",
      500: "#EDEDED",
      600: "#F4F9F9",
      700: white,
    },

    text: {
      primary: "#4f4f4f",
      secondary: black,
      disabled: "#8c8c8c",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FAF9F9",
    },

    border: {
      default: "#DFDFDF",
    },
  },
};
export default palette;
