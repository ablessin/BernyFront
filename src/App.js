import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./configuration/themes/theme";
import Router from "./router";
import Navbar from "./components/core/Navbar";
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Router />
      <Box mt={5} mb={2} />
    </ThemeProvider>
  );
}

export default App;
