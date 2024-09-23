import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Box, Typography } from '@mui/material';


const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#000',
};

const FuelConsumptionChart = ({
    width = 550,
    height = 300,
    data,
    margin = { top: 40, right: 30, bottom: 20, left: 50 }
}) => {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    // Dimensions
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // Scales
    const xScale = scaleLinear({
        domain: [0, Math.max(...data.map(d => d.value))],
        range: [0, xMax],
    });

    const yScale = scaleBand({
        domain: data.map(d => d.fuel),
        range: [0, yMax],
        padding: 0.2,
    });

    const handleMouseOver = (event, datum) => {
        const coords = localPoint(event.target.ownerSVGElement, event);
        showTooltip({
            tooltipData: datum,
            tooltipLeft: coords.x,
            tooltipTop: coords.y,
        });
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <Group left={margin.left} top={margin.top}>
                    {data.map((d) => {
                        const barWidth = xScale(d.value);
                        const barHeight = yScale.bandwidth();
                        const barY = yScale(d.fuel);
                        return (
                            <Group key={`bar-${d.fuel}`}>
                                <Bar
                                    x={0}
                                    y={barY}
                                    rx={4} // Adding border radius
                                    ry={4} // Adding border radius
                                    width={barWidth}
                                    height={barHeight}
                                    fill={d.color}
                                    onMouseOver={(event) => handleMouseOver(event, d)}
                                    onMouseOut={hideTooltip}

                                />
                                <Text
                                    x={-10}
                                    y={barY + barHeight / 2}
                                    textAnchor="end"
                                    dy=".33em"
                                    fontSize={11}
                                    fill="#000000"
                                >
                                    {d.fuel}
                                </Text>
                            </Group>
                        );
                    })}
                </Group>
            </svg>
            {tooltipOpen && tooltipData && (
                <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ width: 12, height: 12, backgroundColor: tooltipData.color, display: 'inline-block', marginRight: 5 }} />
                        <div style={{ color: tooltipData.color }}>
                            <strong>{tooltipData.fuel}</strong>
                        </div>
                        <div>{tooltipData.value} Gallons</div>
                    </div>

                </Tooltip>
            )}
        </Box>
    );
};
export default FuelConsumptionChart;