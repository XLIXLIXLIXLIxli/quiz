import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/x-data-grid";
import Router from "./modules/Router";
import "./App.css";

const theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,

        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        light: "#fff",
        main: "#fff",
        dark: "#e0e0e0",
        contrastText: "#000",
      },
      secondary: {
        light: "#f1e4b0",
        main: "#EEDE9D",
        dark: "#f1e4b0",
        contrastText: "#000",
      },

      background: {
        default: "#f2f2f2",
        paper: "#ffffff",
      },
      action: {
        active: "#595959",
      },
      text: {
        primary: "#202020",
        secondary: "#595959",
        disabled: "#a6a6a6",
      },
    },
  },
  ruRU
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
