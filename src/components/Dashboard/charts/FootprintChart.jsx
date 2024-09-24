import React from "react";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { animated, useTransition } from "@react-spring/web";
const barData = [
  { quarter: "Q1 2023", sox: 0, nox: 10 },
  { quarter: "Q2 2023", sox: 20, nox: 30 },
  { quarter: "Q3 2023", sox: 25, nox: 35 },
  { quarter: "Q4 2023", sox: 10, nox: 40 },
  { quarter: "Q1 2024", sox: 30, nox: 50 },
  { quarter: "Q2 2024", sox: 15, nox: 40 },
];
const defaultMargin = { top: 30, right: 0, bottom: 30, left: 40 };
const FootprintChart = ({
  data = barData,
  colors,
  width = 500,
  height = 500,
  margin = defaultMargin,
  animate = true,
  labelLeft = "Emissions (in %)",
}) => {
  // Tooltip setup
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

  if (width < 10) return null;

  const keys = ["sox", "nox"];
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const x0Scale = scaleBand({
    domain: data.map((d) => d.quarter),
    padding: 0.3, // Increase padding between groups
    range: [0, xMax],
  });

  const x1Scale = scaleBand({
    domain: keys,
    padding: 0.1, // Add padding between bars within the same group
    range: [0, x0Scale.bandwidth()],
  });

  const yScale = scaleLinear({
    domain: [0, 80],
    nice: true,
    range: [yMax, 0],
  });

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors,
  });

  return (
    <div>
      <div style={{ position: "relative" }}>
        <svg width={width} height={height} ref={containerRef}>
          <Group top={margin.top} left={margin.left}>
            {/* Left Label */}
            {/* <text
            x={-yMax / 2} // Center label vertically along the axis
            y={-margin.left + 20} // Adjust label position relative to the margin
            transform="rotate(-90)" // Rotate the label
            fontSize={9}
            fill="#333"
            textAnchor="middle"
            fontWeight={600}
          >
            {labelLeft}
          </text> */}

            <BarGroup
              data={data}
              keys={keys}
              height={yMax}
              x0={(d) => d.quarter}
              x0Scale={x0Scale}
              x1Scale={x1Scale}
              yScale={yScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <AnimatedBar
                        key={`bar-group-bar-${barGroup.index}-${bar.index}`}
                        bar={bar}
                        animate={animate}
                        onMouseMove={(event) => {
                          const eventSvgCoords = localPoint(event);
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: eventSvgCoords.y + 10,
                            tooltipLeft: eventSvgCoords.x + 10,
                          });
                        }}
                        onMouseLeave={() => {
                          hideTooltip();
                        }}
                        onClick={() => alert(`Clicked: ${JSON.stringify(bar)}`)}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
            <AxisLeft
              hideAxisLine
              tickLineProps={{ display: "none" }}
              scale={yScale}
              tickValues={[0, 20, 40, 60, 80]}
              stroke="#333"
              label={labelLeft}
              tickStroke="#333"
              labelProps={{
                dx: "1.15em",
              }}
              tickLabelProps={() => ({
                fill: "#333",
                fontSize: 9,
                textAnchor: "end",
                dy: "0.33em",
              })}
            />
            <AxisBottom
              tickLineProps={{ display: "none" }}
              hideAxisLine
              top={yMax}
              scale={x0Scale}
              stroke="#333"
              tickStroke="#333"
              tickLabelProps={() => ({
                fill: "#333",
                fontSize: 9,
                textAnchor: "middle",
              })}
            />
          </Group>
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
            <div>{tooltipData.value}</div>
          </TooltipInPortal>
        )}
      </div>
    </div>
  );
};

export default FootprintChart;

function AnimatedBar({ bar, animate, onMouseMove, onMouseLeave, onClick }) {
  const transitions = useTransition(bar.height, {
    from: { height: 0, y: bar.y + bar.height },
    enter: { height: bar.height, y: bar.y },
    update: { height: bar.height, y: bar.y },
    leave: { height: 0, y: bar.y + bar.height },
  });

  return transitions((props, item, state, key) => (
    <animated.rect
      key={key}
      x={bar.x}
      y={props.y}
      width={bar.width}
      height={props.height}
      fill={bar.color}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  ));
}
