import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const svgStyle = {
  marginBottom: '24px',
};

const buttonStyle = {
  border: '2px solid #28814d',
  color: '#28814d',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '30px',
  background:"#fff",
};

export default function SuccessModal({ open, handleClose }) {
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
          <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
            <circle cx="56" cy="56" r="56" fill="url(#paint0_linear_1214_40631)" />
            <path d="M33.5957 55.8007L48.5854 70.7904L78.4071 40.9688" stroke="white" strokeWidth="8.83606" />
            <defs>
              <linearGradient id="paint0_linear_1214_40631" x1="0" y1="0" x2="129.671" y2="26.9392" gradientUnits="userSpaceOnUse">
                <stop stopColor="#51ADAC" />
                <stop offset="1" stopColor="#4FA874" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Success Text */}
        <Typography id="modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Password Changed!
        </Typography>
        <Typography id="modal-description" sx={{ fontSize: '16px', color: '#6C757D', marginBottom: '16px' }}>
          Your password has been changed successfully.
        </Typography>

        {/* OK Button */}
        <Button onClick={handleClose} sx={buttonStyle}>
          Go to Dashboard
        </Button>
      </Box>
    </Modal>
  );
}
