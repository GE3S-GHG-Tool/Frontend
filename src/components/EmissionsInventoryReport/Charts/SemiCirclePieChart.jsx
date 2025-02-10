import React, { useState, useRef } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Box, Paper } from "@mui/material";
import dot from "../../../assets/images/dot.svg";
import {
  formatIndianNumber,
  parseStringAndRoundOff,
} from "../../../util/utils";

const ChartTooltip = ({ data, tooltipWidth }) => (
  <Paper sx={{ zIndex: 100, padding: "5px" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "7px",
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          backgroundColor: data.color,
          flexShrink: 0,
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
          flexGrow: 1,
          overflow: "hidden",
          flexWrap: "nowrap",
        }}
      >
        <span
          style={{
            color: "#BDBDBD",
            fontSize: "0.785rem",
            overflow: "hidden",
            flexShrink: 1,
            minWidth: tooltipWidth,
            textAlign: "start",
          }}
        >
          {data.label}
        </span>
        <img
          src={dot}
          width={3}
          height={3}
          alt="dot"
          style={{ flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "Inter",
            fontSize: "0.785rem",
            color: "#717171",
            fontWeight: "500",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {parseStringAndRoundOff(data.key)}%
        </span>
        <img
          src={dot}
          width={3}
          height={3}
          alt="dot"
          style={{ flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "Inter",
            fontSize: "0.785rem",
            fontWeight: "500",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {formatIndianNumber(data.value)} tCO2e
        </span>
      </Box>
    </Box>
  </Paper>
);

const SemiCirclePieChart = ({
  width = 400,
  height = 350,
  data,
  fixedTooltip = false,
  tooltipWidth,
}) => {
  const [activeSlice, setActiveSlice] = useState(null);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);
  const svgRef = useRef(null);

  const radius = Math.min(width, height) / 2;
  const centerY = height / 1.2;
  const centerX = width / 2;

  const colorScale = scaleOrdinal({
    domain: data.map((d) => d.label),
    range: data.map((d) => d.color),
  });

  const handleMouseEnter = (event, datum) => {
    setActiveSlice(datum);
    updateTooltipPosition(event);
  };

  const handleMouseMove = (event) => {
    if (activeSlice && !fixedTooltip) {
      updateTooltipPosition(event);
    }
  };

  const handleMouseLeave = () => {
    setActiveSlice(null);
  };

  const updateTooltipPosition = (event) => {
    const svgRect = svgRef.current.getBoundingClientRect();
    setTooltipLeft(event.clientX - svgRect.left);
    setTooltipTop(event.clientY - svgRect.top);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
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
              <Group>
                {pie.arcs.map((arc, index) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath = pie.path(arc);
                  const arcFill = colorScale(arc.data.label);
                  return (
                    <g
                      key={`arc-${index}`}
                      onMouseEnter={(e) => handleMouseEnter(e, arc.data)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
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
      {activeSlice && (
        <Box
          sx={{
            position: "absolute",
            top: tooltipTop,
            left: tooltipLeft,
            transform: "translate(-10%, -100%)",
            pointerEvents: "none",
          }}
        >
          <ChartTooltip data={activeSlice} tooltipWidth={tooltipWidth} />
        </Box>
      )}
    </Box>
  );
};

export default SemiCirclePieChart;
