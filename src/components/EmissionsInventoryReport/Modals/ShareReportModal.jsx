import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessShareReportModal from "./SuccessShareReportModal";
import axios from "axios";
import { MultiPageGHGReportGenerator } from "../ReportGenerator/generatePDFReport";
import { useAuth } from "../../../context/AuthContext";

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
    textTransform: 'none',
    "&:disabled": {
        color: "#fff",
    }
};

const ShareReportModal = ({ open, setOpenModal, reportId }) => {
    const [email, setEmail] = useState("");
    const [openSuccessModal, setSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSend = async () => {
        setError("");

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            // Generate PDF with compression
            const generator = new MultiPageGHGReportGenerator();
            const pdf = await generator.generateReport(reportId);
            
            // Get PDF as blob with compression
            const pdfBlob = pdf.output('blob', {
                compress: true,
                compressPdf: true,
                optimization: true
            });

            // Create FormData
            const formData = new FormData();
            formData.append('email', email);
            formData.append('clientname', user?.name);
            formData.append('pdfFile', pdfBlob, 'report.pdf');

            // Send request with properly configured axios
            const response = await axios.post(
                'https://backend.ghg.ge3s.org/api/report/send_pdf_report',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    maxContentLength: 50 * 1024 * 1024, // 50MB
                    maxBodyLength: 50 * 1024 * 1024,    // 50MB
                    timeout: 30000, // 30 second timeout
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log('Upload progress:', percentCompleted);
                    }
                }
            );

            if (response.data.success) {
                setOpenModal(false);
                setSuccessModal(true);
            } else {
                setError(response.data.message || "Failed to send report");
            }
        } catch (error) {
            console.error('Error sending report:', error);
            if (error.response?.status === 413) {
                setError("The report file is too large. Please try downloading it instead.");
            } else if (error.code === 'ECONNABORTED') {
                setError("The request timed out. Please try again.");
            } else {
                setError(error.response?.data?.message || "An error occurred while sending the report");
            }
        } finally {
            setLoading(false);
        }
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

                    <TextField
                        fullWidth
                        label="Enter Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        helperText={error}
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
                        <Button
                            onClick={handleSend}
                            sx={buttonStyle2}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send"}
                        </Button>
                    </div>
                </Box>
            </Modal>
            <SuccessShareReportModal
                open={openSuccessModal}
                setOpenModal={setSuccessModal}
            />
        </>
    );
};

export default ShareReportModal;