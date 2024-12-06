import React from 'react';
import alert from "../../../assets/graphimgs/alert.svg"
import { useNavigate } from 'react-router-dom';

export const NoDataAvailableWrapper = ({ isPremium = false, children, title, desc, reportid }) => {

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
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#00191D'
  };

  const descriptionStyles = {
    fontSize: '16px',
    color: "#666"
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
              <img src={alert} width={160} style={{color:'black'}} />
              <h3 style={titleStyles}>{title}</h3>
              <p style={descriptionStyles}>
                {desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
