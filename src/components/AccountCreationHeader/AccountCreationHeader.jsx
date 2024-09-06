// import React from "react";
// import TextField from "@mui/material/TextField";
// import "./AccountCreationHeader.css";
// import Wrapper from "../Wrapper/Wrapper";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/images/ge3s_logo.png";
// import { PiUploadLight } from "react-icons/pi";

// export default function AccountCreationHeader() {
//   const navigate = useNavigate();

//   return (
//     <Wrapper>
//       <div className="main-container">
//         <div className="logo-container">
//           <img src={logo} alt="Logo" className="logo" />
//           <h1 className="header">Start creating your account</h1>
//         </div>

//         <div className="middle-container">
//           <div className="profile-section">
//             <img
//               src="\src\assets\images\profile-logo.png"
//               alt="Profile Icon"
//               className="profile-icon"
//             />
//             <button class="upload-button">
//               <PiUploadLight class="icon" />
//               <span class="text">Upload Photo</span>
//             </button>
//           </div>

//           <div className="input">
//             <TextField
//               id="outlined-size-small"
//               label=""
//               variant="outlined"
//               size="small"
//               fullWidth
//               placeholder="FullName"
//             />
//           </div>
//         </div>

//         <button
//           onClick={() => {
//             navigate("");
//           }}
//           className="create-account-btn"
//         >
//           Create Account
//         </button>
//       </div>
//     </Wrapper>
//   );
// }

import React from "react";
import "./AccountCreationHeader.css";
import profile from "../../assets/images/profile.svg";
import TextField from "@mui/material/TextField";
import logo from "../../assets/images/ge3s_logo.png";
import upload from "../../assets/images/Upload.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

function AccountCreationHeader() {
  const handleButtonClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        alert("File selected: " + file.name);
      }
    };
    fileInput.click();
  };
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Check if the email field is not empty
  const isFormValid = email.trim() !== "";
  return (
    <Wrapper>
      <div className="form-container">
        <div className="form-card">
          {/* Header Section */}
          <div className="header-section">
            <img src={logo} alt="logo" className="header-logo" />
            <h2 className="header-title">Start creating your account</h2>
          </div>
          {/* Profile Section */}
          <div className="profile-section">
            <img src={profile} alt="profile" className="profile-image" />
            <button className="upload-button" onClick={handleButtonClick}>
              <img src={upload} className="upload-icon" />
              <span className="upload-text">Upload Photo</span>
            </button>
            <div className="input_login">
              <TextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
                required
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    style: { paddingLeft: "10px" },
                  },
                }}
              />
            </div>
            <button
              onClick={() => navigate("/account-Intro")}
              disabled={!isFormValid}
              className={
                isFormValid ? "acc-button-active" : "acc-button-disabled"
              }
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AccountCreationHeader;
