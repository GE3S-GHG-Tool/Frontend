import React from "react";
import { Grid2, Typography, Tooltip } from "@mui/material";

function TablesData({ headings = [], data }) {
  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #EEEEEE",
        padding: "9px",
        borderRadius: "8px",
        background: "#ffffff",
        gap: "14px",
      }}
    >
      {/* Table Headings */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "5px",
          overflow: "hidden",
          tableLayout: "fixed", // Ensures equal column width
        }}
      >
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "#E6F8F2",
                  padding: "10px",
                  marginRight: "10px",
                  whiteSpace: "nowrap", // Prevents wrapping
                  overflow: "hidden", // Hides overflowing text
                  textOverflow: "ellipsis", // Adds "..."
                  maxWidth: "100px", // Set your fixed width here
                }}
              >
                {/* Tooltip for hover */}
                
                  <Typography
                    fontWeight="400"
                    fontSize="12px"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                  <Tooltip title={heading} arrow>
                    {heading}
                    </Tooltip>
                  </Typography>
              </th>
            ))}
          </tr>

        </thead>
      </table>

      {/* Table Data */}
      {data?.map((row, rowIndex) => (
        <table
          key={rowIndex}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "5px",
            overflow: "hidden",
            tableLayout: "fixed", // Ensures equal column width
          }}
        >
          <tbody>
            <tr style={{ border: "1px solid  #EEEEEE" }}>
              {Object.entries(row).map(([key, value], cellIndex) => (
                <td
                  key={`${cellIndex}-${key}`}
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap", // Prevents wrapping
                    overflow: "hidden", // Hides overflowing text
                    textOverflow: "ellipsis", // Adds "..."
                    maxWidth: "100px", // Set fixed width
                  }}
                >
                  {/* Tooltip for hover */}

                  <Typography
                    fontWeight="500"
                    fontSize="12px"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Tooltip title={value === "" ? "-" : value} arrow>
                      {value === "" ? "-" : value}
                    </Tooltip>
                  </Typography>

                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </Grid2>
  );
}

export default TablesData;
