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
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          borderRadius: "5px",
          overflow: "hidden",
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
                  whiteSpace: "nowrap",
                }}
              >
                <Typography fontWeight="400" fontSize="12px">
                  {heading}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ border: "1px solid #EEEEEE" }}>
              {headings.map((heading, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title={row[heading] === "" ? "-" : row[heading]} arrow>
                    <Typography
                      fontWeight="500"
                      fontSize="12px"
                      sx={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row[heading] === "" ? "-" : row[heading]}
                    </Typography>
                  </Tooltip>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Grid2>
  );
}

export default TablesData;