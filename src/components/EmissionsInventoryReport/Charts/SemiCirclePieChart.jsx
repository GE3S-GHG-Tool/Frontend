import React, { useState, useRef, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { Box, Paper } from '@mui/material';

const ChartTooltip = ({ data }) => (
  <Paper sx={{ zIndex: '1000000', whiteSpace: 'nowrap', padding: '5px' }}>
    {data.map((item, i) => (
      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '7px' }}>
        <Box sx={{ width: 12, height: 12, backgroundColor: item.color, mr: 1 }} />
        <span style={{
          color: '#BDBDBD', fontSize: '0.6rem',
        }}>{item.label}</span>
        <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: '#717171', fontWeight: '500' }}>
          {item.key}
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', fontWeight: '500' }}>
          {item.value.toLocaleString()} tCO2e
        </span>
      </Box>
    ))}
  </Paper>
);

const SemiCirclePieChart = ({ width = 350, height = 350, data, fixedTooltip = false }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);
  const svgRef = useRef(null);

  const radius = Math.min(width, height) / 2;
  const centerY = height / 1.5; // Adjusted to center the semi-circle more evenly
  const centerX = width / 2;

  const colorScale = scaleOrdinal({
    domain: data.map(d => d.label),
    range: data.map(d => d.color),
  });

  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  const handleMouseMove = (event) => {
    if (!fixedTooltip) {
      const { clientX, clientY } = event;
      const svgRect = svgRef.current.getBoundingClientRect();

      setTooltipLeft(clientX - svgRect.left);
      setTooltipTop(clientY - svgRect.top);
    }
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        width="100%" // Adjust to ensure it scales with the container
        height="100%"
        viewBox={`0 0 ${width} ${height}`} // Adjust for better scaling
      >
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius - 20}
            innerRadius={radius - 85}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
            padAngle={0}
          >
            {(pie) => (
              <Group
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {pie.arcs.map((arc, index) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath = pie.path(arc);
                  const arcFill = colorScale(arc.data.label);
                  return (
                    <g key={`arc-${index}`}>
                      <path d={arcPath} fill={arcFill} />
                      {hasSpaceForLabel && (
                        <text
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          fontSize={16}
                          textAnchor="middle"
                          fill="#ffffff"
                        >
                          {/* {arc.data.key} */}
                        </text>
                      )}
                    </g>
                  );
                })}
              </Group>
            )}
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: tooltipTop,
            left: tooltipLeft,
            transform: 'translate(-10%, -100%)',
            pointerEvents: 'none',
          }}
        >
          <ChartTooltip data={data} />
        </Box>
      )}
    </Box>
  );
};


export default SemiCirclePieChart;
