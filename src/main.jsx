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

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif", // Fallback to Arial, sans-serif if Inter is unavailable
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Inter, Arial, sans-serif", // Apply font globally to the body
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
          fontFamily: "Inter, Arial, sans-serif", // Apply Inter font to InputBase
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
          fontFamily: "Inter, Arial, sans-serif", // Apply Inter font to InputLabel
          "&.Mui-focused": {
            color: "#3CB477",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, Arial, sans-serif", // Apply Inter font to FormHelperText
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9D9D9", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#D9D9D9", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D9D9D9", // Border color when focused
            },
            "&.Mui-disabled fieldset": {
              borderColor: "#D9D9D9", // Border color when disabled
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#D9D9D9", // Ensures OutlinedInput gets #D9D9D9 border
          },
          "&:hover fieldset": {
            borderColor: "#D9D9D9", // Hover state for OutlinedInput
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D9D9D9", // Focus state for OutlinedInput
          },
          "&.Mui-disabled fieldset": {
            borderColor: "#D9D9D9", // Disabled state for OutlinedInput
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </ThemeProvider>
);
