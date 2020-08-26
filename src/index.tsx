import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ThemeContextProvider from "./theme/themeContext";
import AuthContextProvider from "./auth/authContext";
import ScrollToTop from "./utils/ScrollToTop";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </BrowserRouter>
        </AuthContextProvider>
      </ThemeContextProvider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
