import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { ApolloProvider } from "@apollo/client";

import App from "./App";
import theme from "./theme";

import apolloClient from "./services/graphql";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.querySelector("#root")
);
