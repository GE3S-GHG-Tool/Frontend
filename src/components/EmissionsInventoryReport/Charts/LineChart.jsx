import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTooltip, defaultStyles, TooltipWithBounds } from "@visx/tooltip";
import dot from "../../../assets/images/dot.svg";
import { formatIndianNumber, parseStringAndRoundOff } from "../../../util/utils";

const LineChart = ({ chartData, scopeData }) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
  };

  const styles = {
    bar: {
      width: "100%",
      display: "flex",
      overflow: "hidden",
    },
    segment: {
      height: "100%",
      position: "relative",
      overflow: "hidden",
      marginRight: "1.5px",
      gap: "8px",
      display: "flex",
      flexDirection: "column",
      marginBottom: "16px",
    },
    gradientStripe: {
      height: "100%",
      float: "left",
      display: "flex",
    },
    legendContainer: {
      display: "flex",
      gap: "24px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    colorBox: {
      width: "16px",
      height: "16px",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
    },
  };

  return (
    <Box sx={styles.bar}>
      {chartData.map((item, index) => (
        <Box
          key={index}
          sx={{
            ...styles.segment,
            flex: [1.3, 1.5, 1.9][index],
          }}
        >
          <Box sx={{ height: "12px", display: "flex" }}>
            {scopeData[item.index].map((scope, scopeIndex) => (
              <Box
                key={scopeIndex}
                sx={{
                  ...styles.gradientStripe,
                  flex: scope?.key,
                  backgroundColor: scope.color,
                }}
                onMouseLeave={hideTooltip}
                onMouseEnter={(e) => {
                  showTooltip({
                    tooltipData: scope,
                    tooltipTop: e.pageY,
                    tooltipLeft: e.pageX,
                  });
                }}
              />
            ))}
          </Box>
          <Box key={index}>
            <Typography>
              {`${item.label} (${item.percentage}%)`}
            </Typography>
            <Typography>{item.value} tCO2e</Typography>
          </Box>
        </Box>
      ))}
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          offsetLeft={0}
          offsetTop={0}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: tooltipData.color,
                display: "inline-block",
                marginRight: 5,
              }}
            />
            <div style={{ color: "#717171" }}>
              <span>{tooltipData.label}</span>
            </div>
            <img src={dot} width={3} height={3} alt="dot" />
            <div style={{ color: "#717171" }}>
              <span>{parseStringAndRoundOff(tooltipData.key)}%</span>
            </div>
            <img src={dot} width={3} height={3} alt="dot" />
            <div>
              {formatIndianNumber(tooltipData.value)} tCO2e
            </div>
          </div>
        </TooltipWithBounds>
      )}
    </Box>
  );
};

export default LineChart;
