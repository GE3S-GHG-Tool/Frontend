import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { ParentSize } from '@visx/responsive';
import dot from "../../../assets/images/dot.svg"
import { formatIndianNumber } from '../../../util/utils';

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
  if (maxValue <= 10) return 2;
  if (maxValue <= 20) return 4;
  if (maxValue <= 50) return 10;
  if (maxValue <= 100) return 20;
  
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
  const normalized = maxValue / magnitude;
  
  if (normalized <= 1.5) return magnitude / 2;
  if (normalized <= 3) return magnitude;
  if (normalized <= 7) return magnitude * 2;
  return magnitude * 5;
};

// Function to format number with appropriate precision
const formatLabel = (value, isThousands) => {
  if (value === 0) return '0.00';
  if (isThousands) {
    const thousands = value / 1000;
    if (thousands >= 10) return `${Math.round(thousands)}K`;
    return `${thousands.toFixed(1)}K`;
  }
  if (value < 1) return value.toFixed(2);
  if (value < 10) return value.toFixed(1);
  return Math.round(value).toString();
};

// Function to generate nice tick values
const generateNiceTicks = (maxValue) => {
  const stepSize = getNiceStepSize(maxValue);
  const niceMax = Math.ceil(maxValue / stepSize) * stepSize;
  const isThousands = maxValue >= 1000;
  
  // Calculate number of steps
  const numSteps = Math.min(5, Math.max(3, Math.floor(niceMax / stepSize)));
  const adjustedStepSize = niceMax / numSteps;
  
  const ticks = [];
  let currentValue = 0;
  
  // Always start with 0
  ticks.push({
    value: 0,
    label: '0.00'
  });
  
  // Generate remaining ticks
  for (let i = 1; i <= numSteps; i++) {
    currentValue = adjustedStepSize * i;
    if (currentValue <= maxValue * 1.1) { // Add 10% buffer
      ticks.push({
        value: currentValue,
        label: formatLabel(currentValue, isThousands)
      });
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
            x={margin.left +30}
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
              {formatIndianNumber(tooltipData.value)}&nbsp;
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