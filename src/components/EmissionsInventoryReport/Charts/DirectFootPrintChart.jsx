import React from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Box, Typography } from '@mui/material';


const tooltipStyles = {
    ...defaultStyles,
    minWidth: 140,
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#000',
};

const DirectFootPrintChart = ({
    width = 400,
    height = 400,
    data,
    margin = { top: 20, right: 20, bottom: 20, left: 20 }
}) => {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    const radius = Math.min(width, height) / 2;
    const centerY = height / 2;
    const centerX = width / 2;

    const colorScale = scaleOrdinal({
        domain: data.map(d => d.label),
        range: data.map(d => d.color),
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
                <Group top={centerY} left={centerX}>
                    <Pie
                        data={data}
                        pieValue={(d) => d.value}
                        outerRadius={radius}
                        innerRadius={radius - 120}
                    >
                        {(pie) => (
                            <Group>
                                {pie.arcs.map((arc) => (
                                    <g
                                        key={arc.data.label}
                                        onMouseEnter={(event) => handleMouseOver(event, arc.data)}
                                        onMouseLeave={hideTooltip}
                                    >
                                        <path d={pie.path(arc)} fill={arc.data.color} />
                                    </g>
                                ))}
                                {pie.arcs.map((arc, index) => {
                                    const [centroidX, centroidY] = pie.path.centroid(arc);
                                    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                                    return hasSpaceForLabel ? (
                                        <text
                                            key={`label-${index}`}
                                            x={centroidX}
                                            y={centroidY}
                                            dy=".33em"
                                            fill="#ffffff"
                                            fontSize={14}
                                            textAnchor="middle"
                                            pointerEvents="none"
                                        >
                                            {/* {arc.data.key} */}
                                        </text>
                                    ) : null;
                                })}
                            </Group>
                        )}
                    </Pie>
                </Group>
            </svg>
            {tooltipOpen && tooltipData && (
               <></>
            )}
        </Box>
    );
};

export default DirectFootPrintChart;