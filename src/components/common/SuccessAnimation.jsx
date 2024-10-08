import { Close } from "@mui/icons-material";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const svgStyle = {
  marginBottom: "24px",
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

const SuccessAnimation = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {/* SVG Icon */}
        <div style={svgStyle}>
          <svg width="85" height="85" viewBox="0 0 112 112" fill="none">
            <circle
              cx="56"
              cy="56"
              r="56"
              fill="url(#paint0_linear_1214_40631)"
            />
            <path
              d="M33.5957 55.8007L48.5854 70.7904L78.4071 40.9688"
              stroke="white"
              strokeWidth="8.83606"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1214_40631"
                x1="0"
                y1="0"
                x2="129.671"
                y2="26.9392"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#51ADAC" />
                <stop offset="1" stopColor="#4FA874" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 5,
            right: 10,
            color: "#000",
          }}
        >
          <Close />
        </IconButton>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: "500", marginBottom: "12px" }}
        >
          Invitation has been sent successfully.
        </Typography>

        <Button onClick={handleClose} sx={buttonStyle}>
          Go to Dashboard
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessAnimation;
