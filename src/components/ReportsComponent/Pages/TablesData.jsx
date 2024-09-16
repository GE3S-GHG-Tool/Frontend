import React from "react";
import { Grid2, Typography } from "@mui/material";

function TablesData({ headings, data }) {
  return (
    <div>
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
                  }}
                >
                  <Typography fontWeight="400" fontSize="10px">
                    {heading}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Table Data */}
        {data.map((row, rowIndex) => (
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
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Typography fontWeight="400" fontSize="10px">
                      {cell}
                    </Typography>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
      </Grid2>
    </div>
  );
}

export default TablesData;
