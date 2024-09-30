import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { ParentSize } from '@visx/responsive';
import dot from "../../../assets/images/dot.svg"

const margin = { top: 20, right: 0, bottom: 60, left: 0 };
const defaultHeight = 300; // Define a default height

// Accessors
const getLabel = (d) => d.label;
const getValue = (d) => d.value;
const getColor = (d) => d.color;

const Chart = ({ data, width, type }) => {
  const height = defaultHeight;
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  // Scales
  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: data.map(getLabel),
    padding: 0.5,
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map(getValue))],
    nice: true,
  });

  return (
    <>
      <svg width={width} height={height}>
        <Group>
          {data.map((d) => {
            const label = getLabel(d);
            const barWidth = xScale.bandwidth();
            const barHeight = height - margin.bottom - yScale(getValue(d));
            const barX = xScale(label);
            const barY = height - margin.bottom - barHeight;

            return (
              <Bar
                key={`bar-${label}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={getColor(d)}
                onMouseLeave={hideTooltip}
                onMouseEnter={() => {
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: barY + 30,
                    tooltipLeft: barX + 60,
                  });
                }}

              />
            );
          })}
        </Group>

        {/* Y-axis labels */}
        {yScale.ticks().filter(tick => tick % 1000 === 0 && (tick / 1000) % 2 === 0).map((tick) => (
          <Text
            key={tick}
            x={margin.left - 10}
            y={yScale(tick)}
            textAnchor="end"
            verticalAnchor="middle"
            fontSize={10}
          >
            {tick / 1000 + 'K'}
          </Text>
        ))}

        {/* X-axis labels */}
        {data.map((d) => (
          <Text
            key={getLabel(d)}
            x={xScale(getLabel(d)) + xScale.bandwidth() / 2}
            y={height - margin.bottom + 10}
            textAnchor="middle"
            verticalAnchor="start"
            fontSize={10}
          >
            {getLabel(d)}
          </Text>
        ))}

        {/* Y-axis label */}
        <Text
          x={-height / 2}
          y={15}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize={12}
        >
          {type === "scope-1" ? "Kg" : "tCO2e"}
        </Text>
      </svg>
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            borderRadius: '4px'
          }}
        >
          <div style={{ display: 'flex', gap: '0.3rem', fontSize: '0.8rem', alignItems: "center" }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: `${getColor(tooltipData)}` }}></div>
            <span style={{ color: '#717171' }}>{getLabel(tooltipData)}</span><img src={dot} width={3} height={3}/>
            <div>
              {getValue(tooltipData).toFixed(1) / 1000 + 'K'}&nbsp;
              {type === "scope-1" ? "Kg" : "tCO2e"}
            </div>
          </div>
        </Tooltip>
      )}
    </>
  );
};

const RefrigerantConsumptionChart = ({ data, type }) => {
  return (
    <div style={{ width: '100%', height: `${defaultHeight}px` }}>
      <ParentSize>
        {({ width }) => <Chart data={data} width={width} type={type} />}
      </ParentSize>
    </div>
  );
};

export default RefrigerantConsumptionChart;