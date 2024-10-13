import { Grid2, Paper, Typography, Box } from "@mui/material";
import calculator from "../../../../../assets/images/calculator-bill 1.svg";
import Tooltip from "@mui/material/Tooltip";
import info_icon from "../../../../../assets/images/info_icon.svg";

function DecarbonizationQsnAnsWithUi4({ answer }) {
  return (
    <Grid2
      sx={{
        flexDirection: "column",
        display: "flex",
        border: "1px solid #E4E4E4",
        borderRadius: "5px",
        borderTop: "5px solid #369D9C",
        gap: "20px",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxShadow: "none",
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            mt: "16px",
            ml: "16px",
            alignItems: "center",
          }}
        >
          <img src={calculator} alt="lg" />
          <Typography fontSize="16px" fontWeight="600" color="#000">
            Optimal System Sizing - HVAC
          </Typography>
          <Tooltip title="Dummy Text" placement="top" arrow>
            {info_icon && <img src={info_icon} alt="logo" width="16px" />}
          </Tooltip>
        </Grid2>
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            ml: "15px",
          }}
        >
          <Box
            sx={{
              width: "37px",
              height: "34px",
              backgroundColor: "#F7F7F7",
              padding: "7px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="#5B5B5B" fontSize="14px" fontWeight="400">
              Q.1
            </Typography>
          </Box>
          <Typography fontSize="0.875rem" fontWeight="normal" color="#000">
            Have you evaluated the potential impact of different HVAC systems on
            energy efficiency and operating costs to inform your selection?
          </Typography>
        </Grid2>
        {answer.answer === "No" ? (
          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              padding: "20px",
              borderRadius: "5px",
              borderBottom: "1px solid #E4E4E4",
            }}
          >
            <Grid2
              sx={{
                border: "1px solid #D9D9D9",
                background: "#F7FFFC",
                borderRadius: "5px",
              }}
            >
              <Typography fontSize="0.85rem" fontWeight="400">
                <ol style={{ padding: "5px 20px 5px 40px" }}>
                  <li style={{ lineHeight: "1.5rem" }}>
                    Zoning the condition area.
                  </li>
                  <li style={{ lineHeight: "1.5rem" }}>
                    Perform the Heat load calculations.
                  </li>
                  <li style={{ lineHeight: "1.5rem" }}>
                    Select the Air- Conditioning equipment
                  </li>
                  <li style={{ lineHeight: "1.5rem" }}>
                    Design consideration of heat recovery units. Ventilation
                    calculation should be carried out and the results of such
                    calculations should be used for sizing the fresh air
                    systems, exhaust systems and Energy Recovery Units etc.
                  </li>
                </ol>
              </Typography>
            </Grid2>
          </Grid2>
        ) : (
          <div style={{ paddingBottom: "10px" }}></div>
        )}
      </Paper>
    </Grid2>
  );
}

export default DecarbonizationQsnAnsWithUi4;
