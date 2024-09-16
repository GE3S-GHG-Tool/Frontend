import React, { useState } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import FacilityList from './FacilityList/FacilityList';
// import CustomModal from './CustomModal/customModal';

const Facilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddFacility = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0rem',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '1.5rem 0rem'
            }}
          >
            <div>
              <Typography
                sx={{
                  color: '#000000',
                  fontSize: '1.20rem',
                  fontWeight: '600',
                  fontFamily:'Inter',
                  lineHeight: '150%',
                }}
              >
                List of Facility
              </Typography>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#369D9C',
                  textTransform: 'none',
                  borderRadius: '32px',
                  fontSize: '0.7rem',
                  padding: '0.6rem 1.6rem',
                  background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                  '&:hover': { backgroundColor: '#28814D' },
                }}
                onClick={handleOpenModal}
              >
                Add Facility
              </Button>
            </Box>
          </Box>
          <FacilityList searchQuery={searchQuery} />
        </Box>
      </Box>
      {/* <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Unlock extra facilities by choosing an addon plan."
        description="Add facility"
        actionText="Get Started"
        onAction={handleAddFacility}
        price={20}
        type="facilities"
        planContains="Add more facilities"
      /> */}
    </>
  );
};

export default Facilities;
