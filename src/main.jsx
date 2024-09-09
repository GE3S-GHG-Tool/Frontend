import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9D9D9",
            },
            "&:hover fieldset": {
              borderColor: "#D9D9D9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D9D9D9",
            },
            "&.Mui-disabled fieldset": {
              borderColor: "#D9D9D9",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: "#fff",
          fontFamily: "Inter",
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D9D9D9",
            },
          },
          // Adding placeholder size style
          "& input::placeholder": {
            fontSize: "14px", // Change this to your desired placeholder font size
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          background: "#fff",
          color: "#B7B7B7",

          "&.Mui-focused": {
            color: "#3CB477", // Change this to your desired focused label color
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </ThemeProvider>
);
