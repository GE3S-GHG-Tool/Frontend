import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';

// Define chart dimensions and margins
const width = 750;
const height = 300;
const margin = { top: 20, right: 20, bottom: 60, left: 60 };

// Accessors
const getRefrigerant = (d) => d.refrigerant;
const getConsumption = (d) => d.consumption;

const RefrigerantConsumptionChart = ({ data }) => {
    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

    // Scales
    const xScale = scaleBand({
        range: [margin.left, width - margin.right],
        domain: data.map(getRefrigerant),
        padding: 0.5, // Increased padding to make bars thinner
    });

    const yScale = scaleLinear({
        range: [height - margin.bottom, margin.top],
        domain: [0, Math.max(...data.map(getConsumption))],
        nice: true,
    });

    // Color scale
    const colorScale = (refrigerant) => {
        const colors = {
            'R410a': '#006D4F',
            'R22': '#00A86B',
            'R134a': '#7FFFD4',
            'HFC-23': '#E0FFFF',
            'HFC-245fa': '#B0E0E6',
        };
        return colors[refrigerant] || '#000000';
    };

    return (
        <>
            <svg width={width} height={height}>
                <Group>
                    {data.map((d) => {
                        const refrigerant = getRefrigerant(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = height - margin.bottom - yScale(getConsumption(d));
                        const barX = xScale(refrigerant);
                        const barY = height - margin.bottom - barHeight;

                        return (
                            <Bar
                                key={`bar-${refrigerant}`}
                                x={barX}
                                y={barY}
                                width={1 * barWidth}
                                height={barHeight}
                                fill={colorScale(refrigerant)}
                                rx={4} // Adding border radius
                                ry={4} // Adding border radius
                                onMouseEnter={() => {
                                    showTooltip({
                                        tooltipData: d,
                                        tooltipTop: barY,
                                        tooltipLeft: barX + barWidth / 2,
                                    });
                                }}
                                onMouseLeave={hideTooltip}
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
                        key={getRefrigerant(d)}
                        x={xScale(getRefrigerant(d)) + xScale.bandwidth() / 2}
                        y={height - margin.bottom + 10}
                        textAnchor="middle"
                        verticalAnchor="start"
                        fontSize={10}
                    >
                        {getRefrigerant(d)}
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
                    Kg
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
                        borderRadius: '4px',
                    }}
                >
                    <div style={{display:'flex', gap:'0.7rem', fontSize:'0.8rem'}}>
                        <span style={{color:'#717171'}}>{getRefrigerant(tooltipData)}</span>
                        <div>{getConsumption(tooltipData).toFixed(1)/1000 + 'K'} Kg</div>
                    </div>
                </Tooltip>
            )}
        </>
    );
};

export default RefrigerantConsumptionChart;