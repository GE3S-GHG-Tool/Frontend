import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./CreateAccount.css";
import Radio from "@mui/material/Radio";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/ge3s_logo.png";
import PasswordInput from "../common/PasswordInput";
import { validatePassword } from "../../util/utils";
import { useSignup } from "../../context/User-signup";
import axiosInstance from "../../util/axiosInstance";

export default function CreateAccount() {
  const [selectedValue, setSelectedValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { email, imageUrl, fullname, password, setPassword } = useSignup();

  console.log("ImageFile From Password Page", imageUrl);

  const [helperText, setHelperText] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const passwordsMatch = password === confirmPassword;
    const isPasswordValid = validatePassword(password);

    setHelperText({
      password:
        password.trim() !== "" && !isPasswordValid
          ? "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
          : "",
      confirmPassword:
        confirmPassword.trim() !== "" && !passwordsMatch
          ? "Passwords don't match"
          : "",
    });

    setError({
      password: password.trim() !== "" && !isPasswordValid,
      confirmPassword: confirmPassword.trim() !== "" && !passwordsMatch,
    });

    setIsFormValid(isPasswordValid && passwordsMatch && password.trim() !== "");
  }, [password, confirmPassword]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    if (isFormValid) {
      try {
        const formData = new FormData();
        formData.append("user_name", fullname);
        formData.append("user_password", password);

        if (imageUrl instanceof File) {
          formData.append("user_profileImage", imageUrl, imageUrl.name);
        }

        const response = await axiosInstance.post("/api/user/1", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Account created successfully:", response.data);
        navigate("/organizationstepper");
      } catch (error) {
        console.error("Error creating account:", error);
      }
    }
  };

  return (
    <Wrapper>
      <div className="createacc">
        <img src={logo} alt="logo" width={45} />
        <h1>Start creating your account</h1>
        <div>
          <div className="input">
            <p>Verified Email Address</p>
            <TextField
              value={email}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: " #3CB477",
                },
              }}
            />
          </div>
          <div className="input">
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={error.password}
              helperText={helperText.password}
              placeholder={"Password"}
            />
          </div>
          <div className="input">
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error.confirmPassword}
              helperText={helperText.confirmPassword}
              placeholder={"Re-enter Password"}
            />
          </div>
        </div>
        <div className="radio_field">
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
            size="small"
            sx={{
              color: "#ddd",
              "&.Mui-checked": {
                color: "#3CB477",
              },
            }}
          />
          <span>I agree to the </span>
          <span className="colored">Terms and conditions</span>
        </div>
        <button
          disabled={!isFormValid}
          className="ge3s_button"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>

        <div
          style={{
            width: "80%",
            height: "16vh",
            borderRadius: "50%",
            margin: "0 auto",
            position: "absolute",
            bottom: "-20px",
            left: "10%",
            background: "#598483",
            filter: "blur(20px)",
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>
      </div>
    </Wrapper>
  );
}
