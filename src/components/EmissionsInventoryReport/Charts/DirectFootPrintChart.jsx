// import React from "react";
// import { Pie } from "@visx/shape";
// import { Group } from "@visx/group";
// import { scaleOrdinal } from "@visx/scale";
// import { useTooltip, Tooltip, defaultStyles } from "@visx/tooltip";
// import { localPoint } from "@visx/event";
// import { Box, Typography } from "@mui/material";

// const tooltipStyles = {
//   ...defaultStyles,
//   minWidth: 140,
//   backgroundColor: "rgba(255,255,255,0.9)",
//   color: "#000",
// };

// const DirectFootPrintChart = ({
//   width = 360,
//   height = 360,
//   data,
//   margin = { top: 20, right: 20, bottom: 20, left: 20 },
// }) => {
//   const {
//     tooltipData,
//     tooltipLeft,
//     tooltipTop,
//     tooltipOpen,
//     showTooltip,
//     hideTooltip,
//   } = useTooltip();

//   const radius = Math.min(width, height) / 2;
//   const centerY = height / 2;
//   const centerX = width / 2;

//   const colorScale = scaleOrdinal({
//     domain: data.map((d) => d.label),
//     range: data.map((d) => d.color),
//   });

//   const handleMouseOver = (event, datum) => {
//     const coords = localPoint(event.target.ownerSVGElement, event);
//     showTooltip({
//       tooltipData: datum,
//       tooltipLeft: coords.x,
//       tooltipTop: coords.y,
//     });
//   };
// //   console.log(data);
//   return (
//     <Box sx={{ position: "relative" }}>
//       <svg width={width} height={height}>
//         <Group top={centerY} left={centerX}>
//           <Pie
//             data={data}
//             pieValue={(d) => d.value}
//             outerRadius={radius}
//             innerRadius={radius - 110}
//           >
//             {(pie) => (
//               <Group>
//                 {pie.arcs.map((arc) => (
//                   <g
//                     key={arc.data.label}
//                     onMouseEnter={(event) => handleMouseOver(event, arc.data)}
//                     onMouseLeave={hideTooltip}
//                   >
//                     <path d={pie.path(arc)} fill={arc.data.color} />
//                   </g>
//                 ))}
//                 {pie.arcs.map((arc, index) => {
//                   const [centroidX, centroidY] = pie.path.centroid(arc);
//                   const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
//                   return hasSpaceForLabel ? (
//                     <text
//                       key={`label-${index}`}
//                       x={centroidX}
//                       y={centroidY}
//                       dy=".33em"
//                       fill="#ffffff"
//                       fontSize={14}
//                       textAnchor="middle"
//                       pointerEvents="none"
//                     >
//                       {/* {arc.data.key} */}
//                     </text>
//                   ) : null;
//                 })}
//               </Group>
//             )}
//           </Pie>
//         </Group>
//       </svg>
//       {tooltipOpen && tooltipData && <></>}
//     </Box>
//   );
// };

// export default DirectFootPrintChart;

import React, { useState, useRef } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Box, Paper } from "@mui/material";
import { localPoint } from "@visx/event";
import dot from "../../../assets/images/dot.svg";

const ChartTooltip = ({ data }) => (
  <Paper sx={{ zIndex: 100000, whiteSpace: "nowrap", padding: "5px" }}>
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
        {data.value.toFixed(4)} tCO2e
      </span>
    </Box>
  </Paper>
);

const DirectFootPrintChart = ({
  width = 360,
  height = 360,
  data,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
}) => {
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
    setActiveArc(arc.data);
    updateTooltipPosition(event);
  };

  const handleMouseMove = (event) => {
    updateTooltipPosition(event);
  };

  const handleMouseLeave = () => {
    setActiveArc(null);
  };

  const updateTooltipPosition = (event) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    if (coords) {
      setTooltipLeft(coords.x);
      setTooltipTop(coords.y);
    }
  };

  return (
    <Box position="relative">
      <svg width={width} height={height} ref={svgRef}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius}
            innerRadius={radius - 110}
          >
            {(pie) => (
              <Group>
                {pie.arcs.map((arc, index) => (
                  <g
                    key={`arc-${index}`}
                    onMouseEnter={(event) => handleMouseEnter(event, arc)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color} />
                  </g>
                ))}
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
          <ChartTooltip data={activeArc} />
        </Box>
      )}
    </Box>
  );
};

export default DirectFootPrintChart;
