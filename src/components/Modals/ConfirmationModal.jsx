import { Close } from "@mui/icons-material";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
  bgcolor: "#fff",
  px: 3,
  py: 4,
  borderRadius: 2,
  textAlign: "center",
  border: "1px solid #fff",
};

const svgStyle = {
  marginBottom: "10px",
};

const buttonStyle = {
  borderRadius: "100px",
  border: "1px solid #369D9C",
  color: "#369D9C",
  padding: "8px 18px",
  fontSize: "12px",
  marginTop: "16px",
  background: "#fff",
};
const buttonStyle2 = {
  borderRadius: "100px",
  border: "1px solid #369D9C",
  color: "#fff",
  padding: "8px 18px",
  fontSize: "12px",
  marginTop: "16px",
  background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
};
const ConfirmationModal = ({ open, setOpenModal, title, confirm }) => {
  const navigate = useNavigate();
  return (
    <Modal
      open={open}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <div style={svgStyle}>
          <svg width="50" height="50" viewBox="0 0 47 47" fill="none">
            <path
              d="M23.5 34.7768C23.9512 34.7768 24.3293 34.6244 24.6341 34.3196C24.9372 34.0147 25.0887 33.6367 25.0887 33.1855C25.0887 32.736 24.9363 32.3588 24.6315 32.054C24.3267 31.7492 23.9495 31.5959 23.5 31.5942C23.0505 31.5924 22.6733 31.7449 22.3685 32.0514C22.0637 32.358 21.9112 32.7351 21.9112 33.1829C21.9112 33.6307 22.0637 34.0087 22.3685 34.317C22.6733 34.6253 23.0505 34.7803 23.5 34.7768ZM22.2083 26.2286H24.7917V10.7286H22.2083V26.2286ZM23.5077 46.5C20.2941 46.5 17.2716 45.8903 14.4402 44.671C11.6106 43.4499 9.14872 41.7932 7.0545 39.7007C4.96028 37.6082 3.30264 35.1488 2.08158 32.3227C0.860528 29.4965 0.25 26.4749 0.25 23.2577C0.25 20.0406 0.860528 17.0181 2.08158 14.1902C3.30092 11.3606 4.95511 8.89872 7.04417 6.8045C9.13322 4.71028 11.5934 3.05264 14.4248 1.83158C17.2561 0.610528 20.2786 0 23.4922 0C26.7059 0 29.7284 0.610528 32.5597 1.83158C35.3894 3.05092 37.8513 4.70597 39.9455 6.79675C42.0397 8.88753 43.6974 11.3477 44.9184 14.1773C46.1395 17.0069 46.75 20.0286 46.75 23.2422C46.75 26.4559 46.1403 29.4784 44.921 32.3097C43.7017 35.1411 42.0449 37.603 39.9507 39.6955C37.8564 41.788 35.3971 43.4456 32.5727 44.6684C29.7482 45.8912 26.7266 46.5017 23.5077 46.5ZM23.5 43.9167C29.2694 43.9167 34.1562 41.9146 38.1604 37.9104C42.1646 33.9062 44.1667 29.0194 44.1667 23.25C44.1667 17.4806 42.1646 12.5937 38.1604 8.58958C34.1562 4.58542 29.2694 2.58333 23.5 2.58333C17.7306 2.58333 12.8437 4.58542 8.83958 8.58958C4.83542 12.5937 2.83333 17.4806 2.83333 23.25C2.83333 29.0194 4.83542 33.9062 8.83958 37.9104C12.8437 41.9146 17.7306 43.9167 23.5 43.9167Z"
              fill="#FF5151"
            />
          </svg>
        </div>

        <Typography
          sx={{ fontWeight: 500, marginBottom: "8px", fontSize: "16px" }}
        >
          {title}
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button onClick={() => setOpenModal(false)} sx={buttonStyle}>
            Cancel
          </Button>
          <Button onClick={confirm} sx={buttonStyle2}>
            Confirm
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
