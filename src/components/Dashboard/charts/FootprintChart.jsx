import React, { useEffect, useRef, useState } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { formatIndianNumber } from "../../../util/utils";

const colors = ["#B1E9D8", "#AFC6FF", "#FFC8BF"];
const background = "#fff";
const defaultMargin = { top: 40, right: 40, bottom: 0, left: 40 };
const MAX_BAR_WIDTH = 50;

const getQuarter = (d) => d.quarter;

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

const FootprintChart = ({
  data = [],
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
  const [width, setWidth] = useState(1200);

  // Create a full 12-period array with empty values for missing periods
  const normalizedData = React.useMemo(() => {
    const emptyPeriod = {
      quarter: "",
      Scope1: 0,
      Scope2: 0,
      Scope3: 0,
    };

    const fullData = Array(12).fill(emptyPeriod);

    data.forEach((item, index) => {
      if (index < 12) {
        fullData[index] = item;
      }
    });

    return fullData;
  }, [data]);

  // Calculate maximum total value for y-axis
  const maxValue = React.useMemo(() => {
    return Math.max(
      ...normalizedData.map(
        (d) => (d.Scope1 || 0) + (d.Scope2 || 0) + (d.Scope3 || 0)
      )
    );
  }, [normalizedData]);

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

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - 30;

  const dateScale = scaleBand({
    domain: normalizedData.map(getQuarter),
    padding: 0.2,
    range: [0, xMax],
  });

  const calculatedBarWidth = Math.min(dateScale.bandwidth(), MAX_BAR_WIDTH);
  const totalBarsWidth = calculatedBarWidth * normalizedData.length;
  const extraSpace = xMax - totalBarsWidth;
  const startOffset = Math.max(0, extraSpace / 2);

  dateScale.range([startOffset, startOffset + totalBarsWidth]);

  const temperatureScale = scaleLinear({
    domain: [0, yAxisTicks[yAxisTicks.length - 1]],
    nice: true,
    range: [yMax, 0],
  });

  const colorScale = scaleOrdinal({
    domain: ["Scope1", "Scope2", "Scope3"],
    range: colors,
  });

  // Format tick labels
  const formatTickLabel = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toFixed(value < 10 ? 1 : 0);
  };

  return (
    <div ref={box} style={{ position: "relative", width: "100%" }}>
      <div className="scope_box">
        <p>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" fill="#B1E9D8" />
          </svg>
          Scope1
        </p>
        <p>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" fill="#AFC6FF" />
          </svg>
          Scope2
        </p>
        <p>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
            <rect y="0.5" width="16" height="16" fill="#FFC8BF" />
          </svg>
          Scope3
        </p>
      </div>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} />
        <Group left={margin.left} top={margin.top}>
          <BarStack
            data={normalizedData}
            keys={["Scope1", "Scope2", "Scope3"]}
            x={getQuarter}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  const isTopBar = barStack.index === 2;
                  const barWidth = Math.min(bar.width, MAX_BAR_WIDTH);
                  const barHeight = bar.height;
                  const barX = bar.x + (bar.width - barWidth) / 2;
                  const barY = bar.y;
                  const radius = 6;
                  const path = isTopBar
                    ? `
                      M ${barX},${barY + barHeight} 
                      L ${barX},${barY + radius} 
                      Q ${barX},${barY} ${barX + radius},${barY} 
                      L ${barX + barWidth - radius},${barY} 
                      Q ${barX + barWidth},${barY} ${barX + barWidth},${barY + radius} 
                      L ${barX + barWidth},${barY + barHeight} 
                      Z
                    `
                    : `
                      M ${barX},${barY + barHeight} 
                      L ${barX},${barY} 
                      L ${barX + barWidth},${barY} 
                      L ${barX + barWidth},${barY + barHeight} 
                      Z
                    `;
                  return (
                    <path
                      key={`bar-stack-${barStack.index}-${bar.index}`}
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
                        const left = barX + barWidth / 2;
                        showTooltip({
                          tooltipData: bar,
                          tooltipTop: eventSvgCoords?.y + 10,
                          tooltipLeft: left - 30,
                        });
                      }}
                    />
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
          numTicks={12}
          tickLabelProps={{
            fontSize: 9,
            textAnchor: 'middle',
          }}
        />
        <AxisLeft
          hideTicks
          hideAxisLine
          left={margin.left+30}
          top={margin.top}
          scale={temperatureScale}
          tickValues={yAxisTicks}
          label={leftLabel}
          labelProps={{
            dx: "-1em",
            fontWeight: 600,
            fontSize: 12,
          }}
          tickLabelProps={{
            dx: "0.5em",
            fontSize: 12,
          }}
          tickFormat={formatTickLabel}
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
            .filter((key) => key !== "quarter")
            .map((key, index, array) => (
              <div
                key={key}
                style={{
                  marginBottom: index === array.length - 1 ? 0 : 8,
                  display: "flex",
                  justifyContent: "start",
                  gap: "10px",
                  alignItems: "start",
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
                  <span>{key}</span>
                </div>
                <div>{formatIndianNumber(tooltipData.bar.data[key])} tCO2e</div>
              </div>
            ))}
        </TooltipInPortal>
      )}
    </div>
  );
};

export default FootprintChart;