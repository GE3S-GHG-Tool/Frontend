import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";

const StyledTable = styled(Table)({
  minWidth: 650,
  borderCollapse: "collapse",
});

// Table Body cells remain the same
const StyledTableCell = styled(TableCell)({
  border: "1px solid #ddd", // Border around the cell
  padding: "8px", // Default padding for body cells
  textAlign: "center",
  fontSize: "14px",
  height: "20px", // Height for body cells
  lineHeight: "2",
});

// Header cells with reduced height and padding
const StyledTableHeadCell = styled(TableCell)({
  background: "#F7FFFF",
  fontWeight: "bold",
  textAlign: "center",
  border: "1px solid var(--Grey-4, #F4F4F4)",
  height: "25px", // Reduced height for header cells
  padding: "4px", // Reduced padding for header cells
  lineHeight: "1.2", // Adjusted line height for text alignment
});

// Define styled components with specific widths
const StyledTableCellNarrow = styled(TableCell)(({ theme }) => ({
  width: "10%", // Adjusted width to 10% for the "S.No" and "Chiller Type"
  border: "1px solid #E4E4E4",
  textAlign: "center",
}));

const StyledTableCellWide = styled(TableCell)(({ theme }) => ({
  width: "20%", // Adjusted width to 20% for other columns
  border: "1px solid #E4E4E4",
  textAlign: "center",
}));

const StyledTableCellMedium = styled(TableCell)(({ theme }) => ({
  width: "30%", // Adjusted width to 30% for the "Chiller Type" description
  border: "1px solid #E4E4E4",
  textAlign: "left",
}));

const MyTable7 = () => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow:'none'}}>
      <StyledTable aria-label="efficiency table">
        <TableHead>
          <TableRow>
            <StyledTableHeadCell rowSpan={2}>S.No</StyledTableHeadCell>
            <StyledTableHeadCell rowSpan={2}>Area / Zone</StyledTableHeadCell>
            <StyledTableHeadCell colSpan={3}>
              Light Power Density (LPD)
            </StyledTableHeadCell>
          </TableRow>
          <TableRow>
            <StyledTableHeadCell>w/ m²</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell>1</StyledTableCell>
            <StyledTableCell sx={{ textAlign: "left" }}>
              Canopies and overhangs
            </StyledTableCell>
            <StyledTableCell>5.0</StyledTableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default MyTable7;
