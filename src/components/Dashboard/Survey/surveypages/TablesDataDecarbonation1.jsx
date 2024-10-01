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
import { styled } from "@mui/system";
import Grid2 from "@mui/material/Grid2";

// Custom styled components for consistent appearance
const StyledTable = styled(Table)({
  minWidth: 650,
  borderCollapse: "collapse",
});

const StyledTableCell = styled(TableCell)({
  border: "1px solid #00191D", // Border around the cell
  padding: "8px",
  textAlign: "center",
  fontSize: "14px",
  height: "20px",
  lineHeight: "2",
});
const StyledTableHeadCell = styled(TableCell)({
  background: "#F7FFFF",
  textAlign: "center",
  border: "1px solid  #00191D",
  height: "40px", // Set the height of the header cells
  lineHeight: "1px", // Align text vertically within the header cells
  color: '#28814D'
});

// Define styled components with specific widths
const StyledTableCellNarrow = styled(TableCell)(({ theme }) => ({
  width: "10%", // Adjusted width to 10% for the "S.No" and "Chiller Type"
  border: "1px solid #00191D",
  textAlign: "center",
}));

const StyledTableCellWide = styled(TableCell)(({ theme }) => ({
  width: "20%", // Adjusted width to 20% for other columns
  border: "1px solid #00191D",
  textAlign: "center",
}));

const StyledTableCellMedium = styled(TableCell)(({ theme }) => ({
  width: "30%", // Adjusted width to 30% for the "Chiller Type" description
  border: "1px solid #00191D",
  textAlign: "left",
}));

function EfficiencyTable() {
  return (
    <>
      <h2 style={{ fontSize: "16px", fontWeight: "400", color: "#000000", padding: '20px 0' }}>
        Air Cooled Chillers
      </h2>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <StyledTable aria-label="efficiency table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell rowSpan={2}>S.No</StyledTableHeadCell>
              <StyledTableHeadCell rowSpan={2}>Capacities</StyledTableHeadCell>
              <StyledTableHeadCell colSpan={3}>
                Minimum Efficiency
              </StyledTableHeadCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>Full Load, EER</StyledTableHeadCell>
              <StyledTableHeadCell>Full Load, CoP</StyledTableHeadCell>
              <StyledTableHeadCell>IPLV</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>1</StyledTableCell>
              <StyledTableCell>&lt;150 TR</StyledTableCell>
              <StyledTableCell>&gt;9.562</StyledTableCell>
              <StyledTableCell>&gt;2.803</StyledTableCell>
              <StyledTableCell>&gt;12.5</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>2</StyledTableCell>
              <StyledTableCell>&gt;150 TR</StyledTableCell>
              <StyledTableCell>&gt;9.562</StyledTableCell>
              <StyledTableCell>&gt;2.803</StyledTableCell>
              <StyledTableCell>&gt;12.5</StyledTableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>

      <h2
        style={{
          fontSize: "16px",
          fontWeight: "400",
          color: "#000000",
          padding: '20px 0'
        }}
      >
        Water Cooled Chillers
      </h2>
      <Grid2>
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <StyledTable aria-label="efficiency table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell rowSpan={2}>S.No</StyledTableHeadCell>
                <StyledTableHeadCell rowSpan={2}>
                  Chiller Type
                </StyledTableHeadCell>{" "}
                {/* New column header */}
                <StyledTableHeadCell rowSpan={2}>
                  Capacities
                </StyledTableHeadCell>
                <StyledTableHeadCell colSpan={3}>
                  Minimum Efficiency
                </StyledTableHeadCell>
              </TableRow>
              <TableRow>
                <StyledTableHeadCell>Full Load, CoP</StyledTableHeadCell>
                <StyledTableHeadCell>IPLV</StyledTableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <StyledTableCellNarrow rowSpan={3}>1</StyledTableCellNarrow>{" "}
                {/* Spans three rows */}
                <StyledTableCellMedium rowSpan={3}>
                  Water cooled, electrically operated, positive displacement
                  (rotary screw & scroll)
                </StyledTableCellMedium>{" "}
                {/* Spans three rows */}
                <StyledTableCellWide>150 TR</StyledTableCellWide>
                <StyledTableCellWide>&gt;4.45</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.20</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>150 TR and &lt; 300 TR</StyledTableCellWide>
                <StyledTableCellWide>&gt;4.90</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.60</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>300 TR</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.50</StyledTableCellWide>
                <StyledTableCellWide>&gt;6.15</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellNarrow rowSpan={3}>2</StyledTableCellNarrow>{" "}
                {/* Spans three rows */}
                <StyledTableCellMedium rowSpan={3}>
                  Water cooled, electrically operated, centrifugal
                </StyledTableCellMedium>{" "}
                {/* Spans three rows */}
                <StyledTableCellWide>150 TR</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.00</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.25</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>150 TR and &lt; 300 TR</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.55</StyledTableCellWide>
                <StyledTableCellWide>&gt;5.90</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>300 TR</StyledTableCellWide>
                <StyledTableCellWide>&gt;6.10</StyledTableCellWide>
                <StyledTableCellWide>&gt;6.40</StyledTableCellWide>
              </TableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Grid2>
    </>
  );
}

export default EfficiencyTable;
