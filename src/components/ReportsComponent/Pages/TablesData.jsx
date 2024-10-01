import React from "react";
import { Grid2, Typography, Tooltip } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

function TablesData({ headings, data }) {
  const { table } = useAuth();
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
                  <Typography fontWeight="500" fontSize="12px">
                    {heading}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Table Data */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "5px",
            overflow: "hidden",
            tableLayout: "fixed", // Ensures equal column width
          }}
        >
          <tbody>
            {table?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {row?.type?.name ? row?.type?.name : "--"}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {row?.type2?.name ? row?.type2?.name : "--"}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {row?.type3?.name ? row?.type3?.name : "--"}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {row?.type4?.name ? row?.type4?.name : "--"}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {row?.type5?.name ? row?.type5?.name : "--"}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "12px",
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                  }}
                >
                  {row?.quantity ? row?.quantity : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid2>
    </div>
  );
}

export default TablesData;
