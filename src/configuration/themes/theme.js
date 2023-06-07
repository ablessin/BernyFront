import { createTheme } from "@mui/material/styles";

export const FONT_PRIMARY = "Poppins";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#EE545A",
    },
    secondary: {
      main: "#006168",
      light: "#8fb783",
      dark: "#1e1e1e",
    },
    text: {
      secondary: "#022b3a",
    },
    info: {
      main: "#87ceeb",
    },
  },
  typography: {
    fontFamily: FONT_PRIMARY,
    fontSize: 16,
    h1: {
      fontSize: "5.3rem",
      fontWeight: 400,
      fontFamily: FONT_PRIMARY,
    },
    h2: {
      fontSize: "3.5rem",
      fontFamily: FONT_PRIMARY,
    },
    h3: {
      fontSize: "3rem",
      fontFamily: FONT_PRIMARY,
    },
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
  spacing: 8,
};

const theme = createTheme(themeOptions);

export default theme;
