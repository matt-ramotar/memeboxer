import { useMediaQuery } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

export function useLightMode() {
  try {
    return useMediaQuery("(prefers-color-scheme: light)");
  } catch (e) {
    return null;
  }
}

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#282c34",
      paper: "#21252b",
    },
    divider: "#999999",
    primary: {
      main: "#404754",
    },
  },

  typography: {
    fontFamily: "Roboto",
  },
});

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    divider: "#dbdbdb",
    text: {
      primary: "#262626",
    },

    primary: {
      main: "#262626",
    },
  },

  typography: {
    fontFamily: "Roboto",
  },
});

export default function useTheme() {
  return useLightMode() ? lightTheme : darkTheme;
}
