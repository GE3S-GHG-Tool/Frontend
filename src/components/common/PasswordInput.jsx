import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";

const PasswordInput = ({ value, onChange, error, helperText, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      size="small"
      type={showPassword ? "text" : "password"}
      label={placeholder}
      variant="outlined"
      fullWidth
      required
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{
        fontSize: "14px",
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#369D9C",
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "rgba(0, 0, 0, 0.60)",
          fontFamily: "Inter",
        },
        "& .MuiFormHelperText-root": {
          color: "red", // Custom helper text color
        },
        "& .MuiInputBase-input": {
          fontFamily: "Inter",
        },
        "& .MuiInputLabel-root": {
          fontFamily: "Inter",
          fontSize: "14px",
        },
        input: {
          fontSize: "14px",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <g clipPath="url(#clip0_1214_40689)">
                    <path
                      d="M12.5 6.89258C18.5 6.89258 23.375 11.9238 23.375 11.9238C23.375 11.9238 18.5 16.9551 12.5 16.9551C6.5 16.9551 1.625 11.9238 1.625 11.9238C1.625 11.9238 6.5 6.89258 12.5 6.89258Z"
                      stroke="#969696"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M12.5 16.9551C15.3995 16.9551 17.75 14.7025 17.75 11.9238C17.75 9.14515 15.3995 6.89258 12.5 6.89258C9.60051 6.89258 7.25 9.14515 7.25 11.9238C7.25 14.7025 9.60051 16.9551 12.5 16.9551Z"
                      stroke="#969696"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M12.5 12.6426C12.9142 12.6426 13.25 12.3208 13.25 11.9238C13.25 11.5269 12.9142 11.2051 12.5 11.2051C12.0858 11.2051 11.75 11.5269 11.75 11.9238C11.75 12.3208 12.0858 12.6426 12.5 12.6426Z"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1214_40689">
                      <rect
                        width="24"
                        height="23"
                        fill="white"
                        transform="translate(0.5 0.423828)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <g clipPath="url(#clip0_1214_40689)">
                    <path
                      d="M12.5 6.89258C18.5 6.89258 23.375 11.9238 23.375 11.9238C23.375 11.9238 18.5 16.9551 12.5 16.9551C6.5 16.9551 1.625 11.9238 1.625 11.9238C1.625 11.9238 6.5 6.89258 12.5 6.89258Z"
                      stroke="#969696"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M12.5 16.9551C15.3995 16.9551 17.75 14.7025 17.75 11.9238C17.75 9.14515 15.3995 6.89258 12.5 6.89258C9.60051 6.89258 7.25 9.14515 7.25 11.9238C7.25 14.7025 9.60051 16.9551 12.5 16.9551Z"
                      stroke="#969696"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M12.5 12.6426C12.9142 12.6426 13.25 12.3208 13.25 11.9238C13.25 11.5269 12.9142 11.2051 12.5 11.2051C12.0858 11.2051 11.75 11.5269 11.75 11.9238C11.75 12.3208 12.0858 12.6426 12.5 12.6426Z"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1214_40689">
                      <rect
                        width="24"
                        height="23"
                        fill="white"
                        transform="translate(0.5 0.423828)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
