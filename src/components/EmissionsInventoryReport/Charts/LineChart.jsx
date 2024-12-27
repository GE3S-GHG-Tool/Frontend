import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from '../../../api';

const LineChart = ({ reportId }) => {
  console.log(reportId)
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.post('/report/fetch_total_emissions', {
          reportId: reportId
        });

        const scopeColors = {
          scope1: {
            baseColor: '#01533A',
            gradientColors: ['#01533A', '#028A60', '#02A673']
          },
          scope2: {
            baseColor: '#087A91',
            gradientColors: ['#087A91', '#098DA7', '#0CA1BF', '#10BBDD']
          },
          scope3: {
            baseColor: '#F26D58',
            gradientColors: ['#F26D58', '#FF7863', '#FF8977', '#FF9989', '#FFAC9F', '#FFBBB0', '#FFC8BF', '#FFD3CD', '#FFE6E3']
          }
        };

        const transformedData = Object.keys(response.data.emissions).map(scope => ({
          label: `Scope ${scope.slice(-1)}`,
          value: response.data.emissions[scope].value.toLocaleString(),
          percentage: parseFloat(response.data.emissions[scope].percentage),
          baseColor: scopeColors[scope].baseColor,
          gradientColors: scopeColors[scope].gradientColors
        }));

        setChartData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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