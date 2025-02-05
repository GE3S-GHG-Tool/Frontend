import { Modal, Box, Typography } from "@mui/material";
import { Close } from '@mui/icons-material';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
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

export default function SuccessShareReportModal({ open, setOpenModal, email }) {
    return (
        <Modal
            open={open}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <button 
                    style={{
                        position: 'absolute',
                        right: '-40px',
                        top: '-15px',
                        color: '#000',
                        border: "none",
                        background: 'transparent'
                    }} 
                    onClick={() => setOpenModal(false)}
                >
                    <Close />
                </button>
                {/* SVG Icon */}
                <div style={svgStyle}>
                    <svg width="96" height="96" viewBox="0 0 112 112" fill="none">
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
                <Typography
                    sx={{ fontWeight: "500", marginBottom: "16px", fontSize:'1rem' }}
                >
                    {email ? `Report sent to ${email} successfully.` : 'Report sent successfully.'}
                </Typography>
            </Box>
        </Modal>
    );
}