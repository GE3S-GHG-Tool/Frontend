import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const tableData = [
  {
    header: "Industry Structure (Non-Conditional Space)",
    rows: [
      {
        element: "External Walls",
        parameter: "U-value (Max)",
        requirement: "0.45 W/m2k",
      },
      {
        element: "Roof",
        parameter: "U-value (Max)",
        requirement: "0.42 W/m2k",
      },
    ],
  },
  {
    header: "Industry Structure (Conditional Space)",
    rows: [
      {
        element: "External Walls",
        parameter: "U-value (Max)",
        requirement: "0.32 W/m2k",
      },
      {
        element: "Roof",
        parameter: "U-value (Max)",
        requirement: "0.20 W/m2k",
      },
      {
        element: "Floors",
        parameter: "U-value (Max)",
        requirement: "3.73 W/m2k",
      },
    ],
  },
  {
    header: "Common to Both",
    rows: [
      {
        element: "Vertical Glazing",
        parameter: "U-value (Max)",
        requirement: "1.9 W/m2k",
      },
      {
        element: "",
        parameter: "Shadding Coefficient (Max)",
        requirement: "0.26",
      },
      { element: "", parameter: "SHGC (Max)", requirement: "0.23" },
      { element: "", parameter: "VLT (Min)", requirement: "25%" },
      {
        element: "Skylight (maximum 3% of Roof Area)",
        parameter: "U-value (Max)",
        requirement: "3.80 W/m2-0c",
      },
      {
        element: "",
        parameter: "Shadding Coefficient (Max)",
        requirement: "0.35",
      },
      { element: "", parameter: "SHGC (Max)", requirement: "0.30" },
      { element: "", parameter: "VLT (Min)", requirement: "60% to 70%" },
    ],
  },
];

function IndustryTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ textAlign: "center" }}>
            <TableCell
              sx={{
                bgcolor: "#F7FFFC",
                color: "black",
                textAlign: "center",
                border: "1px solid #F4F4F4",
                width: "33.33%",
              }}
              colSpan={1}
            >
              Industry Envelope Element
            </TableCell>
            <TableCell
              sx={{
                bgcolor: "#F7FFFC",
                color: "black",
                textAlign: "center",
                border: "1px solid #F4F4F4",
                width: "33.33%",
              }}
            >
              Parameter
            </TableCell>
            <TableCell
              sx={{
                bgcolor: "#F7FFFC",
                color: "black",
                textAlign: "center",
                border: "1px solid #F4F4F4",
                width: "33.33%",
              }}
            >
              Requirements
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: "#EDFCF7",
                    color: "#000",
                    border: "1px solid #F4F4F4",
                    width: "33.33%",
                  }}
                  colSpan={1}
                >
                  {section.header}
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: "#EDFCF7",
                    color: "#000",
                    border: "1px solid #F4F4F4",
                    width: "33.33%",
                  }}
                />
                <TableCell
                  sx={{
                    bgcolor: "#EDFCF7",
                    color: "#000",
                    border: "1px solid #F4F4F4",
                    width: "33.33%",
                  }}
                />
              </TableRow>
              {section.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #F4F4F4",
                      width: "33.33%",
                    }}
                  >
                    {row.element}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #F4F4F4",
                      width: "33.33%",
                    }}
                  >
                    {row.parameter}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #F4F4F4",
                      width: "33.33%",
                    }}
                  >
                    {row.requirement}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IndustryTable;
