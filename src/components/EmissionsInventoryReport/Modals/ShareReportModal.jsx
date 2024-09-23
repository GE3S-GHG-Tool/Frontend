import { Close } from "@mui/icons-material";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessShareReportModal from "./SuccessShareReportModal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
    bgcolor: "#fff",
    px: 3,
    py: 4,
    borderRadius: 2,
    textAlign: "center",
    border: "1px solid #fff",
};

const buttonStyle2 = {
    borderRadius: "100px",
    border: "1px solid #369D9C",
    color: "#fff",
    padding: "8px 2rem",
    fontSize: "12px",
    marginTop: "16px",
    background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
    textTransform: 'none'
};

const ShareReportModal = ({ open, setOpenModal }) => {
    const [email, setEmail] = useState(""); // state to track email input
    const [openSuccessModal, setSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSend = () => {
        // Handle the email sending logic here
        console.log("Email:", email);
        setOpenModal(false);
        setSuccessModal(true);
        // Close the modal after sending
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography
                        sx={{ fontWeight: 500, marginBottom: "8px", fontSize: "1rem", textAlign: 'start' }}
                    >
                        Share your report via Email
                    </Typography>

                    {/* Email Input */}
                    <TextField
                        fullWidth
                        label="Enter Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        sx={{ margin: "16px 0" }}
                        size="small"
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: "35px",
                        }}
                    >
                        <Button onClick={handleSend} sx={buttonStyle2}>
                            Send
                        </Button>
                    </div>
                </Box>
            </Modal>
            <SuccessShareReportModal open={openSuccessModal} setOpenModal={setSuccessModal} />
        </>
    );
};

export default ShareReportModal;
