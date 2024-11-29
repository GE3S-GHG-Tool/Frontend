import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 10,
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBox: {
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  disabledContent: {
    opacity: 1,
    pointerEvents: 'none',
  }
};

const ScopeWrapper = ({ children, isDisabled, scopeNumber }) => {
  if (isDisabled) {
    return (
      <Box sx={styles.wrapper}>
        {/* Overlay with message */}
        <Box sx={styles.overlay}>
        </Box>
        {/* Original content with reduced opacity */}
        <Box sx={styles.disabledContent}>
          {children}
        </Box>
      </Box>
    );
  }

  return children;
};

export default ScopeWrapper;