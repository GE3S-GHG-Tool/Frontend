import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const FillContentWrapper = ({ isPremium = false, children, title, desc, reportid }) => {

    const navigate=useNavigate();

  const overlayStyles = {
    position: 'relative',
    width: '100%'
  };

  const contentStyles = {
    filter: !isPremium ? 'blur(10px)' : 'none',
    transition: 'filter 0.3s ease'
  };

  const lockOverlayStyles = {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
  };

  const upgradeCardStyles = {
    backgroundColor: 'transparent',
    padding: '32px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center'
  };

  const titleStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00191D',
  };

  const descriptionStyles = {
    fontSize: '12px',
    color: '#00191D'
  };

  const buttonStyles = {
    background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 34px',
    borderRadius: '24px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    outline: 'none',
    textTransform: 'none',
    marginTop: '0.5rem'
  };

  return (
    <>
      <div style={overlayStyles}>
        <div style={contentStyles}>
          {children}
        </div>

        {!isPremium && (
          <div style={lockOverlayStyles}>
            <div style={upgradeCardStyles}>
              {/* <img src={Lock} width={40} /> */}
              <h3 style={titleStyles}>{title}</h3>
              <p style={descriptionStyles}>
                {desc}
              </p>
              <Button
                sx={buttonStyles}
                onMouseOver={(e) => e.target.style.background = 'linear-gradient(102deg, #369D9C 0%, #0F4124 100%)'}
                onMouseOut={(e) => e.target.style.background = 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)'}
                onClick={() => navigate(`/editreport/${reportid}`)}
              >
                Enter Data Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
