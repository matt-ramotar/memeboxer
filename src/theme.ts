import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
      paper: "#ebe6ff",
    },
    primary: {
      main: "#0160fe",
    },
  },
});

export default theme;
