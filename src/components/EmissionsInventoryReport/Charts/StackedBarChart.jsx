import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';

const defaultMargin = { top: 20, right: 0, bottom: 20, left: 60 };
const defaultColors = ['#FFAC9F', '#FF9989', '#F26D58'];

const StackedBarChart = ({ data, height = 300, margin = defaultMargin }) => {
  const [width, setWidth] = useState(800);
  const containerRef = useRef(null);
  const {
    showTooltip,
    hideTooltip,
    tooltipTop = 0,
    tooltipLeft = 0,
    tooltipData,
  } = useTooltip();

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setWidth(containerWidth > 1300 ? 1300 : (containerWidth < 800 ? 800 : containerWidth));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
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
                      width={xScale.bandwidth() - 25}
                      fill={colorScale(key)}
                      onMouseEnter={() => {
                        showTooltip({
                          tooltipData: d,
                          tooltipTop: barY + margin.top,
                          tooltipLeft: xScale(d.name) + xScale.bandwidth() / 2 + margin.left
                        });
                      }}
                      onMouseLeave={() => hideTooltip()}
                    />
                  );
                })}
              </Group>
            );
          })}
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            transform: 'translate(-50%, -100%)',
            minWidth:'160px'
          }}
        >
          {['building', 'vehicle', 'equipment'].map((key) => (
            <div style={{ display: 'flex', gap: '1rem', alignItems:'center' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: colorScale(key) }}></div>
              <span key={key} style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: '#BDBDBD', fontWeight: '400' , textTransform:'-moz-initial'}}>
                {key}: {tooltipData[key]} tCO2e
              </span>
            </div>
          ))}
        </Tooltip>
      )}
    </div>
  );
};

export default StackedBarChart;