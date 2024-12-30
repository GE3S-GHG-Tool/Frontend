import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from '../../../api';

const LineChart = ({chartData}) => {
  const styles = {
    container: {
      width: '100%',
      maxWidth: '100%',
    },
    barContainer: {
      position: 'relative',
      width: '100%',
    },
    bar: {
      width: '100%',
      height: '12px',
      display: 'flex',
      overflow: 'hidden',
    },
    segment: {
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      marginLeft: '1.5px'
    },
    gradientStripe: {
      height: '100%',
      float: 'left',
    },
    legendContainer: {
      display: 'flex',
      gap: '24px',
      marginTop: '20px',
      flexWrap: 'wrap',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    colorBox: {
      width: '16px',
      height: '16px',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.barContainer}>
        {/* The bar */}
        <Box sx={styles.bar}>
          {chartData.map((item, index) => (
            <Box
              key={index}
              sx={{
                ...styles.segment,
                width: `${item.percentage}%`,
              }}
            >
              {item.gradientColors.map((color, colorIndex) => (
                <Box
                  key={colorIndex}
                  sx={{
                    ...styles.gradientStripe,
                    width: `${100 / item.gradientColors.length}%`,
                    backgroundColor: color,
                  }}
                />
              ))}
            </Box>
          ))}
        </Box>

        {/* Legend Row */}
        <Box sx={styles.legendContainer}>
          {chartData.map((item, index) => (
            <Box key={index} sx={styles.legendItem}>
              <Box
                sx={{
                  ...styles.colorBox,
                  backgroundColor: item.baseColor
                }}
              />
              <Typography>
                {`${item.label} (${item.percentage.toFixed(6)}%)`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LineChart;