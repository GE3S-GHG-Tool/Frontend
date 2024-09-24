import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";

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
      placeholder={placeholder}
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
            // borderColor: "#369D9C",
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
            <div
              style={{ margin: "auto", paddingTop: "5px" }}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <svg
                  style={{ cursor: "pointer" }}
                  width="24"
                  height="23"
                  viewBox="0 0 25 24"
                  fill="none"
                >
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
                <svg
                  style={{ cursor: "pointer" }}
                  width="24"
                  height="23"
                  viewBox="0 0 24 23"
                  fill="none"
                >
                  <path
                    d="M12 6.46875C18 6.46875 22.875 11.5 22.875 11.5C22.875 11.5 18 16.5312 12 16.5312C6 16.5312 1.125 11.5 1.125 11.5C1.125 11.5 6 6.46875 12 6.46875Z"
                    stroke="#969696"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M12 16.5312C14.8995 16.5312 17.25 14.2787 17.25 11.5C17.25 8.72132 14.8995 6.46875 12 6.46875C9.10051 6.46875 6.75 8.72132 6.75 11.5C6.75 14.2787 9.10051 16.5312 12 16.5312Z"
                    stroke="#969696"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M5 4L19 20"
                    stroke="#969696"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
