import { Avatar, Box, Button, TextField } from "@mui/material";
import ImageModal from "../common/ImageModal";
import { useRef, useState } from "react";
import Wrapper from "../Wrapper/Wrapper";
import user from "../../assets/images/defaultUser.png";
import logo from "../../assets/images/ge3s_logo.png";
import "./PersonalInfo.css";
import { useNavigate } from "react-router-dom";
const PersonalInfo = () => {
  const imageInput = useRef();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [imageApi, setImageApi] = useState(null);
  const [fullName, setFullName] = useState("");
  const [openImageResizer, SetOpenImageResizer] = useState(false);
  const [key, setKey] = useState(0);
  const clickInput = () => {
    imageInput.current && imageInput.current.click();
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUserProfile(reader.result?.toString() || "");
        SetOpenImageResizer(true);
      });
      reader.readAsDataURL(e.target.files[0]);

      // Reset the file input
      e.target.value = "";
      setKey((prevKey) => prevKey + 1);
    }
  };
  const handleSubmit = () => {};
  return (
    <Wrapper>
      <div className="presonalinfo_page">
        <div className="presonalinfo_page_image">
          <img src={logo} alt="logo" className="brand_logo2" />
        </div>
        <h1>Start creating your account</h1>
        <Box>
          <ImageModal
            open={openImageResizer}
            setOpen={SetOpenImageResizer}
            imageUrl={userProfile}
            setImageUrl={setUserProfile}
            setImageApi={setImageApi}
          />
          <Avatar
            onClick={clickInput}
            alt="placeholder"
            src={!imageApi ? user : imageApi}
            sx={{
              width: 65,
              height: 65,
              border: "1px solid #43BAB9",
              cursor: "pointer",
            }}
          />
          <Button
            variant="outlined"
            sx={{
              color: "#26203B",
              border: "1px solid rgba(70, 95, 241, 0.40)",
              borderRadius: "8px",
              fontWeight: "500",
              fontFamily: "Inter",
              height: "max-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".5rem",
              p: ".25rem .9rem",
              textTransform: "none",
              mt: "1.25rem",
              mb: "1.5rem",
              fontSize: "14px",
            }}
            onClick={clickInput}
          >
            <svg width="19" height="19" viewBox="0 0 25 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.868 8.79442C8.282 8.79442 8.618 9.13042 8.618 9.54442C8.618 9.95842 8.282 10.2944 7.868 10.2944H6.935C5.316 10.2944 4 11.6104 4 13.2284V18.1034C4 19.7224 5.316 21.0384 6.935 21.0384H18.065C19.683 21.0384 21 19.7224 21 18.1034V13.2194C21 11.6064 19.688 10.2944 18.076 10.2944H17.133C16.719 10.2944 16.383 9.95842 16.383 9.54442C16.383 9.13042 16.719 8.79442 17.133 8.79442H18.076C20.515 8.79442 22.5 10.7794 22.5 13.2194V18.1034C22.5 20.5494 20.51 22.5384 18.065 22.5384H6.935C4.49 22.5384 2.5 20.5494 2.5 18.1034V13.2284C2.5 10.7834 4.49 8.79442 6.935 8.79442H7.868ZM13.0306 2.22202L15.9466 5.15002C16.2386 5.44402 16.2376 5.91802 15.9446 6.21002C15.6506 6.50202 15.1766 6.50202 14.8846 6.20802L13.249 4.56677L13.2496 15.5413H11.7496L11.749 4.56677L10.1156 6.20802C9.9696 6.35602 9.7766 6.42902 9.5846 6.42902C9.3936 6.42902 9.2016 6.35602 9.0556 6.21002C8.7626 5.91802 8.7606 5.44402 9.0536 5.15002L11.9686 2.22202C12.2496 1.93902 12.7496 1.93902 13.0306 2.22202Z"
                fill="#26203B"
              />
            </svg>
            {userProfile ? "Re upload photo" : "Upload photo"}
            <input
              key={key}
              type="file"
              hidden
              accept="image/png, image/jpeg"
              ref={imageInput}
              onChange={onFileChange}
            />
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            required
            size="small"
            value={fullName}
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
            // error={error.fullName}
            // helperText={helperText.fullName}
          />

          <button
            type="submit"
            // disabled={!isFormValid}
            className="green_button"
            onClick={() => navigate("/createaccount")}
          >
            Create Account
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default PersonalInfo;