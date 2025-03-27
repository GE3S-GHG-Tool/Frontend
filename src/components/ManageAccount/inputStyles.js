export const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      borderColor: "#E0E0E0",
      "& fieldset": {
        borderColor: "#E0E0E0", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "#C5D2CB", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C5D2CB", // Border color when focused
      },
      "&.Mui-error fieldset": {
        borderColor: "#F51934", // Border color when there is an error
      },
      paddingRight: "10px", // Add padding to prevent overlap of label and input content
    },
    "& .MuiInputLabel-root": {
      fontFamily: "Inter",
      fontSize: "13px",
      color: "#787878",
      transform: "translate(13px, 14px) scale(1)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.60)", // Label color when focused
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "#F51934", // Label color when there is an error
    },
    "& .MuiFormHelperText-root": {
      color: "#F51934!important", // Default helper text color
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#F51934!important", // Custom error helper text color
    },
    "& .MuiInputBase-input": {
      fontFamily: "Inter",
      borderColor: "#EEEEEE",
      fontSize: "14px",
      padding: "13px 12px", // Adjust the padding to reduce the size
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(13px, -6px) scale(0.85)", // Adjust the label position when focused to leave room for longer text
      maxWidth: "calc(100% - 24px)", // Prevent shrinking too much when focused
    },
  };
  
  export const selectStyles = {
    "& .MuiInputBase-input": {
      fontFamily: "Inter",
      borderColor: "#EEEEEE",
      maxHeight: "40px",
      padding: "11.5px 12px", // Adjust the padding to reduce the size
      fontSize: "14px",
    },
  
    "& .MuiInputLabel-root": {
      fontSize: "13px",
      color: "#787878",
    },
  
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#787878", // Ensure the color remains #787878 when focused
    },
  
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      color: "#787878", // Ensure the color is #787878 when shrunk (label moved up)
    },
  };
  
  export const currencyDisabledStyles = {
    fontSize: "14px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      borderColor: "#E0E0E0",
      "& fieldset": {
        borderColor: "#E0E0E0", // Default border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C5D2CB", // Border color when focused
      },
      "&.Mui-error fieldset": {
        borderColor: "red", // Border color when there is an error
      },
      paddingRight: "10px", // Add padding to prevent overlap of label and input content
      "&.Mui-disabled fieldset": {
        borderColor: "#787878", // Border color when disabled (black)
      },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "Inter",
      fontSize: "13px",
      maxWidth: "100%", // Allow label to take the full width and wrap if necessary
      whiteSpace: "nowrap", // Ensure that the text doesn’t overflow the container
      overflow: "hidden",
      textOverflow: "ellipsis",
      transform: "translate(13px, 14px) scale(1)", // Adjust the label position
      color: "#787878",
      "&.Mui-disabled": {
        color: "#787878", // Label color when disabled (black)
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Inter",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(13px, -6px) scale(0.85)", // Adjust the label position when focused to leave room for longer text
      maxWidth: "calc(100% - 24px)", // Prevent shrinking too much when focused
    },
    "& .MuiFormHelperText-root": {
      color: "red", // Custom helper text color
    },
    "& .MuiInputBase-input": {
      fontFamily: "Inter",
      borderColor: "#EEEEEE",
      maxHeight: "40px",
      fontSize: "14px",
      padding: "13px 12px", // Adjust the padding to reduce the size
      "&.Mui-disabled": {
        color: "#212121", // Input text color when disabled (black)
        "-webkit-text-fill-color": "#212121", // For Safari to ensure proper color when disabled
      },
    },
    "& .Mui-error": {
      "& .MuiInputLabel-root": {
        color: "red", // Label color when there is an error
      },
      "& .MuiInputBase-input": {
        borderColor: "red", // Input border when there is an error
      },
    },
  };
  