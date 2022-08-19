import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider as StyledComponetsThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import { GlobalStyle } from "./themes/GlobalStyle.js";

import "react-toastify/dist/ReactToastify.css";
import Themes from "./themes";
import Route from "./routes/index.routes";

import * as serviceWorker from "./serviceWorker";

import { store, persistor } from "./store/index";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StyledComponetsThemeProvider theme={Themes.default}>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <Route />
            <GlobalStyle />
          </ThemeProvider>
        </StyledComponetsThemeProvider>
        <ToastContainer
          autoClose={2500}
          theme="colored"
          pauseOnHover={false}
          icon
        />
      </PersistGate>
    </Provider>
  );
}
