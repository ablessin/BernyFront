import { createTheme } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#ED545A",
    },
    secondary: {
      main: "#026068",
    },
    text: {
      primary: "#026068",
    },
  },
  typography: {
    fontFamily: "Lora",
    fontSize: 16,
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
