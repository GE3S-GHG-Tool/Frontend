import React from "react";
import { Grid2, Typography } from "@mui/material";

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
                    padding: "10px",
                    marginRight: "10px",
                  }}
                >
                  <Typography fontWeight="400" fontSize="10px">
                    {value === "" ? "-" : value}
                    {/* Display value or "-" if the value is empty */}
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
