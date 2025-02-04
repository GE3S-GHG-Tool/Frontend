import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Box, Typography } from '@mui/material';
import dot from "../../../assets/images/dot.svg"

// Expected fuel types
const expectedFuels = [
    "Diesel",
    "HFO",
    "CNG",
    "LPG",
    "Gasoline/Petrol"
];

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#000',
};

const FuelConsumptionChart = ({
    width = 500,
    height = 300,
    data,
    margin = { top: 40, right: 30, bottom: 20, left: 41 }
}) => {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    // Ensure all fuel types are present
    const safeData = expectedFuels.map(fuel => {
        const existingData = data?.find(d => d.fuel === fuel);
        return existingData || {
            fuel,
            value: 0,
            color: data?.find(d => d.fuel === fuel)?.color || '#CCCCCC' // Fallback color if needed
        };
    });

    // Dimensions
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // Scales
    const xScale = scaleLinear({
        domain: [0, Math.max(1, Math.max(...safeData.map(d => d.value)))],
        range: [0, xMax],
    });

    const yScale = scaleBand({
        domain: safeData.map(d => d.fuel),
        range: [0, yMax],
        padding: 0.2,
    });

    const handleMouseOver = (event, datum) => {
        // const coords = localPoint(event.target.ownerSVGElement, event);
        // showTooltip({
        //     tooltipData: datum,
        //     tooltipLeft: coords.x,
        //     tooltipTop: coords.y,
        // });

        const barWidth = xScale(datum.value);
        const barHeight = yScale.bandwidth();
        const barY = yScale(datum.fuel);

        const tooltipLeft = margin.left + barWidth / 2;
        const tooltipTop = margin.top + barY + barHeight / 2;

        showTooltip({
            tooltipData: datum,
            tooltipLeft,
            tooltipTop,
        });
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <Group left={margin.left} top={margin.top}>
                    {safeData.map((d) => {
                        const barWidth = xScale(d.value);
                        const barHeight = yScale.bandwidth();
                        const barY = yScale(d.fuel);
                        return (
                            <Group key={`bar-${d.fuel}`}>
                                <Bar
                                    x={0}
                                    y={barY}
                                    rx={4}
                                    ry={4}
                                    width={barWidth} // Show 1px width for zero values
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
                                {d.value === 0 && (
                                    <Text
                                        x={10}
                                        y={barY + barHeight / 2}
                                        textAnchor="start"
                                        dy=".33em"
                                        fontSize={11}
                                        fill="#fff"
                                    >

                                    </Text>
                                )}
                            </Group>
                        );
                    })}
                </Group>
            </svg>
            {tooltipOpen && tooltipData && (
                <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                        <div style={{ width: 12, height: 12, backgroundColor: tooltipData.color, display: 'inline-block', marginRight: 5 }} />
                        <div style={{ color: "#BDBDBD" }}>
                            <span>{tooltipData.fuel}</span>
                        </div>
                        <img src={dot} width={3} height={3} alt="dot" />
                        <div>{tooltipData.value} {tooltipData.unit}</div>
                    </div>
                </Tooltip>
            )}
        </Box>
    );
};

export default FuelConsumptionChart;