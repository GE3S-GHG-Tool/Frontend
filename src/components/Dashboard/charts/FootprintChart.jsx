import React, { useEffect, useRef, useState } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
// import { Grid, GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
const colors = ["#02B880", "#6c5efb", "#c998ff"];
// Tooltip styles
const purple1 = "#6c5efb";
const purple2 = "#c998ff";
export const purple3 = "#a44afe";
export const background = "#fff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 40 }; // Increased left margin for label space
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 100,
  backgroundColor: "white",
  color: "black",
};

// accessors
const getQuarter = (d) => d.quarter;

let tooltipTimeout;
const barData = [
  { quarter: "January", sox: 2000, nox: 1000, tox: 1000 },
  { quarter: "February", sox: 2000, nox: 3000, tox: 1000 },
  { quarter: "March", sox: 2500, nox: 3500, tox: 1000 },
  { quarter: "April", sox: 1000, nox: 4000, tox: 1000 },
  { quarter: "May", sox: 1000, nox: 4000, tox: 1000 },
  { quarter: "June", sox: 3000, nox: 1000, tox: 1000 },
  { quarter: "July", sox: 1500, nox: 1000, tox: 1000 },
  { quarter: "August", sox: 3500, nox: 1000, tox: 1000 },
  { quarter: "September", sox: 1000, nox: 1000, tox: 1000 },
  { quarter: "October", sox: 1000, nox: 1000, tox: 1000 },
  { quarter: "November", sox: 1000, nox: 1000, tox: 1000 },
  { quarter: "December", sox: 3000, nox: 1000, tox: 1000 },
];
const FootprintChart = ({
  data = barData,
  //   colors,
  events = false,
  //   width = "1000",
  height = 300,
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
  const [width, setWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      if (box.current) {
        console.log("currr", box.current.offsetWidth);
        setWidth(box.current.offsetWidth);
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
    domain: [0, 8000], // Adjust this based on the maximum possible value in the data
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: ["sox", "nox"], // Stack both "sox" and "nox"
    range: colors,
  });

  // bounds
  const xMax = width - margin.left;
  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return (
    <div ref={box} style={{ position: "relative", width: "100%" }}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />

        <Group left={margin.left} top={margin.top}>
          <BarStack
            data={data}
            keys={["sox", "nox", "tox"]} // Stack both "sox" and "nox"
            x={getQuarter}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  const isTopBar = barStack.index === 2;
                  return (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      // width={"50"}
                      rx={isTopBar ? 6 : 0} // Add border radius only to the top bar
                      ry={isTopBar ? 6 : 0} // Add border radius only to the top bar
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
          tickValues={[0, 2000, 4000, 6000, 8000]}
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
            width: 100,
            padding: 12,
            backgroundColor: "white",
            color: "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          {/* <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}</div>
          <div>
            <small>{tooltipData.bar.data.quarter}</small>
          </div> */}
          <div
            style={{
              backgroundColor: colorScale(tooltipData.key),
              height: 15,
              width: 15,
            }}
          ></div>
          <div>
            <span>{tooltipData.key}</span>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}</div>
        </TooltipInPortal>
      )}
    </div>
  );
};

export default FootprintChart;
