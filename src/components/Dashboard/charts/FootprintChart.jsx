import React, { useEffect, useRef, useState } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
// import { Grid, GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
const colors = ["#B1E9D8", "#AFC6FF", " #FFC8BF"];
// Tooltip styles

export const purple3 = "#a44afe";
export const background = "#fff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 40 };

// accessors
const getQuarter = (d) => d.quarter;

let tooltipTimeout;
const barData = [
  { quarter: "January", Scope1: 2000, Scope2: 1000, Scope3: 1000 },
  { quarter: "February", Scope1: 2000, Scope2: 3000, Scope3: 1000 },
  { quarter: "March", Scope1: 2500, Scope2: 3500, Scope3: 1000 },
  { quarter: "April", Scope1: 1000, Scope2: 4000, Scope3: 1000 },
  { quarter: "May", Scope1: 1000, Scope2: 4000, Scope3: 1000 },
  { quarter: "June", Scope1: 3000, Scope2: 1000, Scope3: 1000 },
  { quarter: "July", Scope1: 1500, Scope2: 1000, Scope3: 1000 },
  { quarter: "August", Scope1: 3500, Scope2: 1000, Scope3: 1000 },
  { quarter: "September", Scope1: 1000, Scope2: 1000, Scope3: 1000 },
  { quarter: "October", Scope1: 1000, Scope2: 1000, Scope3: 1000 },
  { quarter: "November", Scope1: 1000, Scope2: 1000, Scope3: 1000 },
  { quarter: "December", Scope1: 3000, Scope2: 1000, Scope3: 1000 },
];
const FootprintChart = ({
  data = barData,
  //   colors,
  events = false,
  height = 200,
  margin = defaultMargin,
  //   animate = true,
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

  useEffect(() => {
    const handleResize = () => {
      if (box.current) {
        const containerWidth = box.current.offsetWidth;
        const padding =
          parseFloat(getComputedStyle(box.current).paddingLeft) * 2;
        setWidth(containerWidth - padding);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //   const containerRef = useRef(null);
  if (width < 10 || data.length === 0) return null;

  // Scales
  const dateScale = scaleBand({
    domain: data.map(getQuarter),
    padding: 0.5,
  });

  const yMax = height - margin.top - 30;
  const temperatureScale = scaleLinear({
    domain: [0, 20000], // Adjust this based on the maximum possible value in the data
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: ["Scope1", "Scope2", "Scope3"], // Stack both "Scope1" and "Scope2"
    range: colors,
  });

  // bounds
  const xMax = width - margin.left;
  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

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
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.5" width="16" height="16" fill="#FFC8BF" />
          </svg>
          Scope3
        </p>
      </div>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} />

        <Group left={margin.left} top={margin.top}>
          <BarStack
            data={data}
            keys={["Scope1", "Scope2", "Scope3"]} // Stack both "Scope1" and "Scope2"
            x={getQuarter}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  // console.log("bar", barStack);
                  const isTopBar = barStack.index === 2; // Topmost bar in the stack
                  const barWidth = bar.width;
                  const barHeight = bar.height;
                  const barX = bar.x;
                  const barY = bar.y;
                  const radius = 6; // Define the corner radius
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
                        const left = bar.x + bar.width / 2;
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
          numTicks={width > 520 ? 10 : 5}
          tickLabelProps={{
            fontSize: 9,
          }}
        />
        <AxisLeft
          hideTicks
          hideAxisLine
          left={margin.left}
          top={margin.top}
          scale={temperatureScale}
          tickValues={[0, 4000, 8000, 12000, 16000]}
          // numTicks={data.length}
          label={leftLabel}
          labelProps={{
            dx: "1.15em",
            fontWeight: 600,
            fontSize: 12,
          }}
          tickLabelProps={{
            dx: "0.5em",
            fontSize: 12,
          }}
          tickFormat={(value) => `${value / 1000}k`}
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
            // display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            fontSize: 12,
          }}
        >
          {Object.keys(tooltipData.bar.data)
            .filter((key) => key !== "quarter")
            .map((key, index, array) => (
              <div
                key={key}
                style={{
                  marginBottom: index === array.length - 1 ? 0 : 8, // Set marginBottom to 0 for the last item
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
                <div>{tooltipData.bar.data[key] / 1000}k tCO2e</div>
              </div>
            ))}
        </TooltipInPortal>
      )}
    </div>
  );
};

export default FootprintChart;
