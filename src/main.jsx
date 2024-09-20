import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SignupProvider } from "./context/User-signup.jsx";

const theme = createTheme({
  typography: {
    fontFamily: "Inter", // Fallback to Arial, sans-serif if Inter is unavailable
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Inter", // Apply font globally to the body
        },
      },
    },
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
          fontFamily: "Inter", // Apply Inter font to InputBase
          "&.Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D9D9D9",
            },
          },
          "& input::placeholder": {
            fontSize: "14px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          background: "#fff",
          color: "#B7B7B7",
          fontFamily: "Inter", // Apply Inter font to InputLabel
          "&.Mui-focused": {
            color: "#3CB477",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
          fontFamily: "Inter", // Apply Inter font to FormHelperText
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    {" "}
    <CssBaseline />
    <BrowserRouter>
      <SignupProvider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </SignupProvider>
    </BrowserRouter>
  </ThemeProvider>
);
