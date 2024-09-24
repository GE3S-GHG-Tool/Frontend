import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { ParentSize } from '@visx/responsive';

const defaultMargin = { top: 20, right: 20, bottom: 40, left: 60 };
const defaultColors = ['#FFAC9F', '#FF9989', '#F26D58'];

const StackedBarChart = ({ data, height = 300, margin = defaultMargin }) => {
  const [toggle, setTooltip] = useState(false);
  const {
    showTooltip,
    hideTooltip,
    tooltipTop = 0,
    tooltipLeft = 0,
    tooltipData,
  } = useTooltip();

  const Chart = ({ width }) => {
    // Bound dimensions
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // Scales
    const xScale = useMemo(
      () => scaleBand({ range: [0, xMax], domain: data.map((d) => d.name), padding: 0.2 }),
      [xMax, data]
    );
    const yScale = useMemo(() => {
      const maxValue = Math.max(...data.map((d) => d.building + d.vehicle + d.equipment));
      return scaleLinear({ range: [yMax, 0], domain: [0, maxValue], nice: true });
    }, [yMax, data]);

    const colorScale = scaleOrdinal({
      domain: ['building', 'vehicle', 'equipment'],
      range: defaultColors,
    });

    return (
      <>
        <svg width={width} height={height}>
          <Group left={margin.left} top={margin.top}>
            <AxisBottom
              top={yMax}
              scale={xScale}
              hideTicks
              hideAxisLine
              tickLabelProps={() => ({
                fill: '#666666',
                fontSize: 11,
                textAnchor: 'middle',
              })}
            />
            <AxisLeft
              scale={yScale}
              hideTicks
              hideAxisLine
              tickLabelProps={() => ({
                fill: '#666666',
                fontSize: 11,
                textAnchor: 'end',
                dx: '-0.25em',
                dy: '0.25em',
              })}
              label="tCO2e"
              labelProps={{
                fill: '#666666',
                textAnchor: 'middle',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            />
            {data.map((d) => {
              let y0 = 0;
              return (
                <Group key={`bar-${d.name}`}>
                  {['building', 'vehicle', 'equipment'].map((key) => {
                    const barHeight = yMax - yScale(d[key]);
                    const barY = yMax - barHeight - y0;
                    y0 += barHeight;
                    return (
                      <Bar
                        key={`bar-${d.name}-${key}`}
                        x={xScale(d.name)}
                        y={barY}
                        height={barHeight}
                        width={xScale.bandwidth() - 16}
                        fill={colorScale(key)}
                        onMouseEnter={() => {
                          showTooltip({
                            tooltipData: d,
                            tooltipTop: barY + margin.top,
                            tooltipLeft: xScale(d.name) + xScale.bandwidth() / 2 + margin.left
                          })
                        }}
                        onMouseLeave={() => setTooltip(prev => !prev)}
                      />
                    );
                  })}
                </Group>
              );
            })}
          </Group>
        </svg>
        {toggle && tooltipData && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              backgroundColor: 'white',
              padding: '0.5rem',
              borderRadius: '4px',
              transform: 'translate(-50%, -100%)',
              minWidth: '160px'
            }}
          >
            {['building', 'vehicle', 'equipment'].map((key) => (
              <div key={key} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: colorScale(key) }}></div>
                <span style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: '#BDBDBD', fontWeight: '400', textTransform: 'capitalize' }}>
                  {key}: {tooltipData[key]} tCO2e
                </span>
              </div>
            ))}
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
      <ParentSize>
        {({ width }) => <Chart width={width} />}
      </ParentSize>
    </div>
  );
};

export default StackedBarChart;