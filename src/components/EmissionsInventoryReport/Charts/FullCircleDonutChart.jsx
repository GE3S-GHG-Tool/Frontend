import React, { useState, useRef } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Box, Paper } from "@mui/material";
import dot from "../../../assets/images/dot.svg";

const ChartTooltip = ({ data }) => (
  <Paper sx={{ zIndex: "100000", whiteSpace: "nowrap", padding: "5px" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.2rem",
        padding: "7px",
      }}
    >
      <Box sx={{ width: 12, height: 12, backgroundColor: data.color, mr: 1 }} />
      <span style={{ color: "#BDBDBD", fontSize: "0.785rem" }}>
        {data.label}
      </span>
      <img src={dot} width={3} height={3} alt="dot" />
      <span
        style={{
          fontFamily: "Inter",
          fontSize: "0.785rem",
          color: "#717171",
          fontWeight: "500",
        }}
      >
        {data.key}
      </span>
      <img src={dot} width={3} height={3} alt="dot" />
      <span
        style={{ fontFamily: "Inter", fontSize: "0.785rem", fontWeight: "500" }}
      >
        {data.value.toLocaleString()} tCO2e
      </span>
    </Box>
  </Paper>
);

const FullCircleDonutChart = ({ width = 300, height = 300, data }) => {
  const [activeArc, setActiveArc] = useState(null);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);
  const svgRef = useRef(null);

  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;

  const colorScale = scaleOrdinal({
    domain: data.map((d) => d.label),
    range: data.map((d) => d.color),
  });

  const handleMouseEnter = (event, arc) => {
    setActiveArc(arc);
    updateTooltipPosition(event);
  };

  const handleMouseMove = (event) => {
    updateTooltipPosition(event);
  };

  const handleMouseLeave = () => {
    setActiveArc(null);
  };

  const updateTooltipPosition = (event) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    setTooltipLeft(event.clientX - svgRect.left);
    setTooltipTop(event.clientY - svgRect.top);
  };

  return (
    <Box position="relative">
      <svg width={width} height={height} ref={svgRef}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius - 30}
            innerRadius={radius - 85}
          >
            {(pie) => (
              <Group>
                {pie.arcs.map((arc, index) => {
                  const arcPath = pie.path(arc);
                  const arcFill = colorScale(arc.data.label);
                  return (
                    <path
                      key={`arc-${index}`}
                      d={arcPath}
                      fill={arcFill}
                      onMouseEnter={(event) => handleMouseEnter(event, arc)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </Group>
            )}
          </Pie>
        </Group>
      </svg>
      {activeArc && (
        <Box
          sx={{
            position: "absolute",
            top: tooltipTop,
            left: tooltipLeft,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
        >
          <ChartTooltip data={activeArc.data} />
        </Box>
      )}
    </Box>
  );
};

export default FullCircleDonutChart;
