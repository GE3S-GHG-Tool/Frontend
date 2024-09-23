import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "420px",
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
    padding: "10px 3rem",
    fontSize: "12px",
    marginTop: "16px",
    background: "#fff",
    textTransform: 'none'
};
const buttonStyle2 = {
    borderRadius: "100px",
    border: "1px solid #369D9C",
    color: "#fff",
    padding: "10px 3rem",
    fontSize: "12px",
    marginTop: "16px",
    background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
    textTransform: 'none'
};
const ConfirmEditReportModal = ({ open, setOpenModal }) => {
    const navigate = useNavigate();
    return (
        <Modal
            open={open}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography
                    sx={{ fontWeight: 500, marginBottom: "8px", fontSize: "1.4rem" }}
                >
                    Confirm Report Edit
                </Typography>

                <Typography
                    sx={{ fontWeight: 400, color: '#717171', marginBottom: "8px", fontSize: "0.8rem" }}
                >
                    Are you sure you want to edit this report? Please note that credits will be deducted upon confirmation.
                </Typography>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "35px",
                    }}
                >
                    <Button onClick={() => setOpenModal(false)} sx={buttonStyle}>
                        Cancel
                    </Button>
                    <Button onClick={() => setOpenModal(false)} sx={buttonStyle2}>
                        Confirm
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmEditReportModal;
