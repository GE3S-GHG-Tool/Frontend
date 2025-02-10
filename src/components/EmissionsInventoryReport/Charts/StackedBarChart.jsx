import React, { useEffect, useRef, useState } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import dot from "../../../assets/images/dot.svg"

const colors = ["#FFAC9F", "#FF9989", "#F26D58"];
const purple3 = "#464646";
const background = "#fff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 60 }; // Increased left margin

const expectedCategories = [
  "Diesel",
  "Gasoline/Petrol",
  "HFO",
  "LPG",
  "CNG",
  "Electricity",
  "Chilled Water",
  "Heat"
];

const getQuarter = (d) => d.name;

let tooltipTimeout;

// Function to determine nice step size
const getNiceStepSize = (maxValue) => {
  if (maxValue <= 10) return 2;
  if (maxValue <= 50) return 10;
  if (maxValue <= 100) return 20;
  
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
  
  if (maxValue / magnitude <= 2) return magnitude / 2;
  if (maxValue / magnitude <= 5) return magnitude;
  return magnitude * 2;
};

// Function to format number with appropriate precision
const formatNumber = (value) => {
  if (value === 0) return '0.00';
  if (value >= 1000) return `${(value/1000).toFixed(0)}k`;
  if (value < 1) return value.toFixed(2);
  if (value < 10) return value.toFixed(1);
  return value.toFixed(0);
};

// Function to generate nice tick values
const generateNiceTicks = (maxValue) => {
  const stepSize = getNiceStepSize(maxValue);
  const niceMax = Math.ceil(maxValue / stepSize) * stepSize;
  const tickCount = Math.min(6, Math.max(3, Math.floor(niceMax / stepSize)));
  
  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const value = (i * niceMax) / tickCount;
    ticks.push(value);
  }
  
  return ticks;
};

const StackedBarChart = ({
  data,
  events = false,
  height = 200,
  margin = defaultMargin,
  leftLabel = "tCO2e",
}) => {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  
  const box = useRef(null);
  const [width, setWidth] = useState(500);

  // Ensure all categories have values
  const safeData = expectedCategories.map(category => {
    const existingData = data?.find(d => d.name === category);
    return existingData || {
      name: category,
      Building: 0,
      Vehicle: 0,
      Equipment: 0
    };
  });

  // Calculate maximum value for y-axis
  const maxValue = React.useMemo(() => {
    return Math.max(1, Math.max(...safeData.map(d => 
      d.Building + d.Vehicle + d.Equipment
    )));
  }, [safeData]);

  // Generate y-axis ticks
  const yAxisTicks = React.useMemo(() => {
    return generateNiceTicks(maxValue);
  }, [maxValue]);

  useEffect(() => {
    const handleResize = () => {
      if (box.current) {
        const containerWidth = box.current.offsetWidth;
        const padding = parseFloat(getComputedStyle(box.current).paddingLeft) * 2;
        setWidth(containerWidth - padding);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width < 10) return null;

  // Scales
  const dateScale = scaleBand({
    domain: safeData.map(getQuarter),
    padding: 0.5,
  });

  const yMax = height - margin.top - 30;
  const temperatureScale = scaleLinear({
    domain: [0, yAxisTicks[yAxisTicks.length - 1]],
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: ["Equipment", "Vehicle", "Building"],
    range: colors,
  });

  // bounds
  const xMax = width - margin.left;
  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return (
    <div ref={box} style={{ position: "relative", width: "100%", minWidth:'600px' }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} />
        <Group left={margin.left} top={margin.top}>
          <BarStack
            data={safeData}
            keys={["Equipment", "Vehicle", "Building"]}
            x={getQuarter}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  const barWidth = bar.width;
                  const barHeight = bar.height;
                  const barX = bar.x;
                  const barY = bar.y;
                  const radius = 0; // Consistent radius for all bars
                  
                  // Apply rounded corners to all bars
                  const path = `
                    M ${barX},${barY + barHeight} 
                    L ${barX},${barY + radius} 
                    Q ${barX},${barY} ${barX + radius},${barY} 
                    L ${barX + barWidth - radius},${barY} 
                    Q ${barX + barWidth},${barY} ${barX + barWidth},${barY + radius} 
                    L ${barX + barWidth},${barY + barHeight} 
                    Z
                  `;

                  return (
                    <React.Fragment key={`bar-stack-${barStack.index}-${bar.index}`}>
                      <path
                        d={path}
                        fill={bar.color}
                        onClick={() => {
                          if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = window.setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={(event) => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const eventSvgCoords = localPoint(event);
                          const left = bar.x + bar.width / 2;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: eventSvgCoords?.y + 10,
                            tooltipLeft: left - 30,
                          });
                        }}
                      />
                      {barHeight === 0 && (
                        <text
                          x={barX + barWidth / 2}
                          y={barY - 5}
                          textAnchor="middle"
                          fontSize={10}
                          fill="#717171"
                        >
                          
                        </text>
                      )}
                    </React.Fragment>
                  );
                })
              )
            }
          </BarStack>
        </Group>

        <AxisBottom
          hideTicks
          hideAxisLine
          top={yMax + margin.top}
          left={margin.left}
          scale={dateScale}
          numTicks={width > 520 ? 10 : 5}
          tickLabelProps={{
            fontSize: 11,
            color: purple3
          }}
        />
        <AxisLeft
          hideTicks
          hideAxisLine
          left={margin.left}
          top={margin.top}
          scale={temperatureScale}
          tickValues={yAxisTicks}
          label={leftLabel}
          labelProps={{
            dx: "0.2",
            dy: "-1em",
            fontWeight: 600,
            fontSize: 12,
          }}
          tickLabelProps={{
            dx: "1em",
            fontSize: 12,
            textAnchor: "end",
          }}
          tickFormat={formatNumber}
        />
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            width: "fit-content",
            padding: 12,
            borderRadius: 5,
            backgroundColor: "white",
            color: "#000",
            fontSize: 12,
          }}
        >
          {Object.keys(tooltipData.bar.data)
            .filter((key) => key !== "name")
            .map((key, index, array) => (
              <div
                key={key}
                style={{
                  marginBottom: index === array.length - 1 ? 0 : 8,
                  display: "flex",
                  justifyContent: "start",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: colorScale(key),
                    height: 15,
                    width: 15,
                  }}
                ></div>
                <div style={{ minWidth: "45px" }}>
                  <span style={{color:"#BDBDBD"}}>{key}</span>
                </div>
                <img src={dot} width={3} height={3} alt="dot" style={{ flexShrink: 0 }} />
                <div style={{color:'#717171'}}>{ parseFloat(tooltipData.bar.data[key]).toLocaleString('en-IN')} tCO2e</div>
              </div>
            ))}
        </TooltipInPortal>
      )}
    </div>
  );
};

export default StackedBarChart;