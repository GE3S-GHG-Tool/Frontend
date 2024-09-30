import React, { useEffect, useRef, useState } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
// import { Grid, GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import dot from "../../../assets/images/dot.svg"
const colors = ["#FFAC9F", "#FF9989","#F26D58" ];
// Tooltip styles

export const purple3 = "#464646";
export const background = "#fff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 40 }; // Increased left margin for label space

// accessors
const getQuarter = (d) => d.name;

let tooltipTimeout;


const StackedBarChart = ({
  data,
  //   colors,
  events = false,
  //   width = "1000",
  height = 200,
  margin = defaultMargin,
    // animate = true,
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
    domain: [0, 80],
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
    <div ref={box} style={{ position: "relative", width: "100%" }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} />

        <Group left={margin.left} top={margin.top}>
          <BarStack
            data={data}
            keys={["Equipment", "Vehicle", "Building"]}
            x={getQuarter}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  const isTopBar = barStack.index === 2;
                  const barWidth = bar.width;
                  const barHeight = bar.height;
                  const barX = bar.x;
                  const barY = bar.y;
                  const radius = 2;
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
            fontSize: 11,
            color:purple3
          }}
        />
        <AxisLeft
          hideTicks
          hideAxisLine
          left={margin.left}
          top={margin.top}
          scale={temperatureScale}
          tickValues={[0, 20, 40, 60, 80]}
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
          tickFormat={(value) => `${value}`}
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
            .filter((key) => key !== "name")
            .map((key, index, array) => (
              <div
                key={key}
                style={{
                  marginBottom: index === array.length - 1 ? 0 : 8, // Set marginBottom to 0 for the last item
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
                </div><img src={dot} width={3} height={3} alt="dot" style={{ flexShrink: 0 }} />
                <div style={{color:'#717171'}}>{tooltipData.bar.data[key]} tCO2e</div>
              </div>
            ))}
        </TooltipInPortal>
      )}
    </div>
  );
};

export default StackedBarChart;
