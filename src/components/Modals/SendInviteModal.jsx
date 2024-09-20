import { Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  styled,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35vw",
  bgcolor: "#fff",
  px: 4,
  py: 3,
  borderRadius: 2,
  border: "1px solid #fff",
};

const buttonStyle2 = {
  textTransform: "none",
  borderRadius: "100px",
  border: "1px solid #369D9C",
  color: "#fff",
  padding: "6px 18px",
  fontSize: "12px",
  marginTop: "20px",
  background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
};
const textbox = {
  paddingBottom: "8px",
  color: "#717171",
  fontSize: "0.8rem",
  display: "block",
};
const CloseButton = styled(IconButton)({
  position: "absolute",
  right: "5px",
  top: "5px",
  color: "#717171",
});
const SendInviteModal = ({ open, setOpenModal }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <CloseButton onClick={() => setOpenModal(false)}>
          <Close color={"#000"} />
        </CloseButton>{" "}
        <Typography
          sx={{
            fontWeight: 500,
            marginBottom: "1rem",
            fontSize: "16px",
          }}
        >
          Send invite
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <label style={textbox}>Email</label>
            <TextField fullWidth variant="outlined" size="small" />
          </div>
          <div className="invite_textfield">
            <label style={textbox}>Access</label>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
                }}
                size="small"
              >
                <MenuItem value={1}>Edit</MenuItem>
                <MenuItem value={2}>View</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button sx={buttonStyle2}>Send Invite</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SendInviteModal;
