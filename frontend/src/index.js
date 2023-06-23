import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7798AB",
    },
    background: {
      darkest: "#242423",
      dark: "#333533",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    allVariants: {
      color: "#EEF8E2",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
