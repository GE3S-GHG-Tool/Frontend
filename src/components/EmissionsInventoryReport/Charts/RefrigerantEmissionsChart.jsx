import React, { useState } from "react";
import { Group } from "@visx/group";
import { LineRadial, Line } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Point } from "@visx/point";
import dot from "../../../assets/images/dot.svg";

// Colors
const orange = "#60B59B";
const pumpkin = "#60B59B";
const black = "#000";
const silver = "#d9d9d9";
const background = "#fff";
const tooltipBg = "rgba(255, 255, 255, 0.9)";
const tooltipColor = "#333";

const degrees = 360;

// Utility functions
const y = (d) => d.value;

const genAngles = (length) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length),
  }));

const genPoints = (length, radius) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: -radius * Math.cos(i * step), // Negative to flip the pentagon
  }));
};

function genPolygonPoints(dataArray, scale, getValue) {
  const step = (Math.PI * 2) / dataArray.length;
  const points = new Array(dataArray.length).fill({ x: 0, y: 0 });
  const pointString = new Array(dataArray.length + 1)
    .fill("")
    .reduce((res, _, i) => {
      if (i > dataArray.length) return res;
      const dataIndex = i % dataArray.length; // Use modulo to wrap around for the last point
      const xVal = scale(getValue(dataArray[dataIndex])) * Math.sin(i * step);
      const yVal = -scale(getValue(dataArray[dataIndex])) * Math.cos(i * step); // Negative to flip the pentagon
      points[dataIndex] = { x: xVal, y: yVal };
      res += `${xVal},${yVal} `;
      return res;
    });

  return { points, pointString };
}

const defaultMargin = { top: 0, left: 80, right: 40, bottom: 0 };

const RefrigerantEmissionsChart = ({
  width = 350,
  height = 280,
  levels = 5,
  margin = defaultMargin,
  data,
}) => {
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip();

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom - 100;
  const radius = Math.min(xMax, yMax) / 2;

  const radialScale = scaleLinear({
    range: [0, 2 * Math.PI],
    domain: [0, degrees],
  });

  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, Math.max(...data.map(y))],
  });

  const webs = genAngles(data.length);
  const points = genPoints(data.length, radius);
  const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, y);
  const zeroPoint = new Point({ x: 0, y: 0 });

  const handleMouseMove = (event, datum) => {
    const coords = localPoint(event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum,
    });
  };

  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <rect fill={background} width={width} height={height} rx={14} />
        <Group top={height / 2} left={width / 1.8}>
          {/* Background webs */}
          {[...new Array(levels)].map((_, i) => (
            <LineRadial
              key={`web-${i}`}
              data={webs}
              angle={(d) => (d.angle * Math.PI) / 180} // Convert angle to radians
              radius={((i + 1) * radius) / levels}
              fill="none"
              stroke={silver}
              strokeWidth={1}
              strokeOpacity={2}
              // strokeLinecap="round"
            />
          ))}

          {/* Lines to points */}
          {points.map((point, i) => (
            <Line
              key={`radar-line-${i}`}
              from={zeroPoint}
              to={point}
              stroke={silver}
              strokeWidth={0.7}
            />
          ))}

          {/* Polygon (radar area) */}
          <polygon
            points={polygonPoints.pointString}
            fill={orange}
            fillOpacity={0.5}
            stroke={orange}
            strokeWidth={1.3}
          />

          {/* Points on the radar */}
          {polygonPoints.points.map((point, i) => (
            <circle
              key={`radar-point-${i}`}
              cx={point.x}
              cy={point.y}
              r={2}
              fill={pumpkin}
              onMouseMove={(event) => handleMouseMove(event, data[i])}
              onMouseLeave={hideTooltip}
            />
          ))}

          {/* Labels */}
          {data.map((d, i) => {
            const angle = (i / data.length) * 2 * Math.PI - Math.PI / 2;
            const labelRadius = radius + 30;
            return (
              <text
                key={`label-${i}`}
                x={labelRadius * Math.cos(angle)}
                y={labelRadius * Math.sin(angle)}
                dy={
                  angle > Math.PI / 1.3 || angle < -Math.PI / 1
                    ? "0.3em"
                    : "-0em"
                }
                textAnchor="middle"
                fill={"#000"}
                fontSize={14}
              >
                {d.label}
              </text>
            );
          })}
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            backgroundColor: tooltipBg,
            color: tooltipColor,
            padding: "0.5rem",
            borderRadius: "4px",
            boxShadow: "0 1px 10px rgba(0,0,0,0.1)",
            fontSize: "14px",
            lineHeight: "1.4",
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: "0.1rem", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "rgb(96, 181, 155)",
                }}
              ></div>{" "}
              &nbsp;
              <span style={{ color: "#BDBDBD", fontSize: "0.785rem" }}>
                {tooltipData.label}
              </span>
              <img src={dot} width={3} height={3} />
            </div>
            <span style={{ color: "#717171", fontSize: "0.785rem" }}>
              {tooltipData.value}k tCO2e
            </span>
          </div>
        </TooltipWithBounds>
      )}
    </>
  );
};

export default RefrigerantEmissionsChart;
