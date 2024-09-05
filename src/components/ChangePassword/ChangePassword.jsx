import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./ChangePassword.css";
import SuccessModal from './SuccessModal';
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const isFormValid = password && confirmPassword;

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate("/home");
    };

    const handleChangePassword = () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }
        setErrorMessage("");
        setOpenModal(true);
    };

    return (
        <Wrapper>
            <div className="change-password-container">
                <div>
                    <img src={logo} alt="GE3S Logo" className="ge3s_logo" />
                    <h1>Change your password</h1>
                    <p className="text-align">Enter a new password below to change your password</p>

                    <div className="input_password">
                        <p>Password</p>
                        <div className="password-container">
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <g clip-path="url(#clip0_1214_40689)">
                                        <path d="M12.5 6.89258C18.5 6.89258 23.375 11.9238 23.375 11.9238C23.375 11.9238 18.5 16.9551 12.5 16.9551C6.5 16.9551 1.625 11.9238 1.625 11.9238C1.625 11.9238 6.5 6.89258 12.5 6.89258Z" stroke="#969696" stroke-miterlimit="10" />
                                        <path d="M12.5 16.9551C15.3995 16.9551 17.75 14.7025 17.75 11.9238C17.75 9.14515 15.3995 6.89258 12.5 6.89258C9.60051 6.89258 7.25 9.14515 7.25 11.9238C7.25 14.7025 9.60051 16.9551 12.5 16.9551Z" stroke="#969696" stroke-miterlimit="10" />
                                        <path d="M12.5 12.6426C12.9142 12.6426 13.25 12.3208 13.25 11.9238C13.25 11.5269 12.9142 11.2051 12.5 11.2051C12.0858 11.2051 11.75 11.5269 11.75 11.9238C11.75 12.3208 12.0858 12.6426 12.5 12.6426Z" stroke="#969696" stroke-width="2" stroke-miterlimit="10" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1214_40689">
                                            <rect width="24" height="23" fill="white" transform="translate(0.5 0.423828)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="input_password">
                        <p>Confirm Password</p>
                        <div className="password-container">
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setErrorMessage("")
                                }}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                    <g clip-path="url(#clip0_1214_40689)">
                                        <path d="M12.5 6.89258C18.5 6.89258 23.375 11.9238 23.375 11.9238C23.375 11.9238 18.5 16.9551 12.5 16.9551C6.5 16.9551 1.625 11.9238 1.625 11.9238C1.625 11.9238 6.5 6.89258 12.5 6.89258Z" stroke="#969696" stroke-miterlimit="10" />
                                        <path d="M12.5 16.9551C15.3995 16.9551 17.75 14.7025 17.75 11.9238C17.75 9.14515 15.3995 6.89258 12.5 6.89258C9.60051 6.89258 7.25 9.14515 7.25 11.9238C7.25 14.7025 9.60051 16.9551 12.5 16.9551Z" stroke="#969696" stroke-miterlimit="10" />
                                        <path d="M12.5 12.6426C12.9142 12.6426 13.25 12.3208 13.25 11.9238C13.25 11.5269 12.9142 11.2051 12.5 11.2051C12.0858 11.2051 11.75 11.5269 11.75 11.9238C11.75 12.3208 12.0858 12.6426 12.5 12.6426Z" stroke="#969696" stroke-width="2" stroke-miterlimit="10" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1214_40689">
                                            <rect width="24" height="23" fill="white" transform="translate(0.5 0.423828)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                        </div>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button
                        onClick={handleChangePassword}
                        disabled={!isFormValid}
                        className={isFormValid ? "change-password-button-active" : "change-password-button-disabled"}
                    >
                        Change Password
                    </button>
                    <SuccessModal open={openModal} handleClose={handleCloseModal} />
                </div>
            </div>
        </Wrapper>
    );
}
