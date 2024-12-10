import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { ParentSize } from '@visx/responsive';
import dot from "../../../assets/images/dot.svg"

const margin = { top: 20, right: 0, bottom: 60, left: 50 };
const defaultHeight = 300;

// Expected categories for validation
const expectedCategories = [
  "R410a",
  "R22",
  "R134a",
  "HFC-23",
  "HFC-245fa"
];

// Accessors
const getLabel = (d) => d.label;
const getValue = (d) => (d.value !== undefined && d.value !== null ? d.value : 0);
const getColor = (d) => d.color;

// Function to determine nice step size
const getNiceStepSize = (maxValue) => {
  // For very small numbers (0-10)
  if (maxValue <= 20) return 4;
  
  // For small numbers (10-50)
  if (maxValue <= 50) return 5;
  
  // For medium numbers (50-100)
  if (maxValue <= 100) return 20;
  
  // For larger numbers, use a power of 10 based step
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
  
  if (maxValue / magnitude <= 2) return magnitude / 2;
  if (maxValue / magnitude <= 5) return magnitude;
  return magnitude * 2;
};

// Function to generate nice tick values
const generateNiceTicks = (maxValue) => {
  const stepSize = getNiceStepSize(maxValue);
  const niceMax = Math.ceil(maxValue / stepSize) * stepSize;
  const isThousands = niceMax >= 1000;
  
  const ticks = [];
  for (let i = 0; i <= niceMax; i += stepSize) {
    if (i <= maxValue * 1.1) { // Add 10% buffer
      ticks.push({
        value: i,
        label: i === 0 ? '0.00' : isThousands ? `${(i/1000).toFixed(0)}K` : i.toString()
      });
    }
  }
  
  // Ensure we have at least 3 ticks but no more than 6
  while (ticks.length < 3 || ticks.length > 6) {
    if (ticks.length < 3) {
      const lastValue = ticks[ticks.length - 1].value;
      ticks.push({
        value: lastValue + stepSize,
        label: lastValue + stepSize >= 1000 ? 
          `${((lastValue + stepSize)/1000).toFixed(0)}K` : 
          (lastValue + stepSize).toString()
      });
    }
    if (ticks.length > 6) {
      ticks.pop();
    }
  }
  
  return ticks;
};

const Chart = ({ data, width, type }) => {
  const height = defaultHeight;
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  // Ensure all categories are present
  const safeData = expectedCategories.map(category => {
    const existingData = data?.find(d => d.label === category);
    return existingData || {
      label: category,
      value: 0,
      color: data?.find(d => d.label === category)?.color || "#cccccc"
    };
  });

  // Find the maximum value in the data
  const maxValue = Math.max(...safeData.map(getValue));
  
  // Generate tick values based on data
  const yAxisTicks = generateNiceTicks(maxValue);

  // Scales
  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: safeData.map(getLabel),
    padding: 0.5,
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(yAxisTicks[yAxisTicks.length - 1].value, maxValue * 1.1)],
    nice: true,
  });

  return (
    <>
      <svg width={width} height={height}>
        {/* Y-axis labels */}
        {yAxisTicks.map(({ value, label }) => (
          <Text
            key={value}
            x={margin.left + 20}
            y={yScale(value)}
            textAnchor="end"
            verticalAnchor="middle"
            fontSize={11}
            fontFamily="Arial"
            fill="#717171"
          >
            {label}
          </Text>
        ))}

        <Group>
          {safeData.map((d) => {
            const label = getLabel(d);
            const value = getValue(d);
            const barWidth = xScale.bandwidth()-8;
            const barHeight = height - margin.bottom - yScale(value);
            const barX = xScale(label);
            const barY = height - margin.bottom - barHeight;

            return (
              <React.Fragment key={`bar-${label}`}>
                <Bar
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
                  rx={4}
                  ry={4}
                />
                {value === 0 && (
                  <Text
                    x={barX + barWidth / 2}
                    y={height - margin.bottom - 20}
                    textAnchor="middle"
                    verticalAnchor="middle"
                    fontSize={10}
                    fill="#717171"
                  >
                    
                  </Text>
                )}
              </React.Fragment>
            );
          })}
        </Group>

        {/* X-axis labels */}
        {safeData.map((d) => (
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
            <span style={{ color: '#717171' }}>{getLabel(tooltipData)}</span>
            <img src={dot} width={3} height={3} alt="dot"/>
            <div>
              {getValue(tooltipData)}&nbsp;
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