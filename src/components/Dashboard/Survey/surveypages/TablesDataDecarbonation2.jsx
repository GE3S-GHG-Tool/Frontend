// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/system";

// const StyledTableCell = styled(TableCell)({
//   border: "1px solid #ddd", // Border around the cell
//   padding: "8px",
//   textAlign: "center",
//   fontSize: "14px",
//   background: " #F7FFFF",
// });

// const StyledTableHeadCell = styled(TableCell)({
//   background: "#F7FFFF",
//   fontWeight: "bold",
//   textAlign: "center",
//   border: "1px solid var(--Grey-4, #F4F4F4)",
//   height: "40px", // Set the height of the header cells
//   lineHeight: "2px", // Align text vertically within the header cells
// });

// function createData(sNo, chillerType, capacities, fullLoadCop, iplv) {
//   return { sNo, chillerType, capacities, fullLoadCop, iplv };
// }
// const airCooledRows = [
//   {
//     sNo: 1,
//     capacities: "<150 TR",
//     fullLoadEer: ">9.562",
//     fullLoadCop: ">2.803",
//     iplv: ">12.5",
//   },
//   {
//     sNo: 2,
//     capacities: ">150 TR",
//     fullLoadEer: ">9.562",
//     fullLoadCop: ">2.803",
//     iplv: ">12.5",
//   },
// ];

// // const waterCooledRows = [
// //   createData(
// //     1,
// //     "Water cooled, electrically operated, positive displacement (rotary screw & scroll)",
// //     "150 TR",
// //     ">4.45",
// //     ">5.20"
// //   ),
// //   createData(
// //     1,
// //     "Water cooled, electrically operated, positive displacement (rotary screw & scroll)",
// //     "150 TR and < 300 TR",
// //     ">4.90",
// //     ">5.60"
// //   ),
// //   createData(
// //     1,
// //     "Water cooled, electrically operated, positive displacement (rotary screw & scroll)",
// //     "300 TR",
// //     ">5.50",
// //     ">6.15"
// //   ),
// //   createData(
// //     2,
// //     "Water cooled, electrically operated, centrifugal",
// //     "150 TR",
// //     ">5.00",
// //     ">5.25"
// //   ),
// //   createData(
// //     2,
// //     "Water cooled, electrically operated, centrifugal",
// //     "150 TR and < 300 TR",
// //     ">5.55",
// //     ">5.90"
// //   ),
// //   createData(
// //     2,
// //     "Water cooled, electrically operated, centrifugal",
// //     "300 TR",
// //     ">6.10",
// //     ">6.40"
// //   ),
// // ];

// export default function BasicTable2() {
//   return (
//     <div>
//       <h2 style={{ fontSize: "16px", fontWeight: "400", color: "#000000" }}>
//         Air Cooled Chillers
//       </h2>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <StyledTableHeadCell rowSpan={2}>S.No</StyledTableHeadCell>
//               <StyledTableHeadCell rowSpan={2}>Capacities</StyledTableHeadCell>
//               <StyledTableHeadCell colSpan={3}>
//                 Minimum Efficiency
//               </StyledTableHeadCell>
//             </TableRow>
//             <TableRow>
//               <StyledTableHeadCell>Full Load, EER</StyledTableHeadCell>
//               <StyledTableHeadCell>Full Load, CoP</StyledTableHeadCell>
//               <StyledTableHeadCell>IPLV</StyledTableHeadCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {airCooledRows.map((row) => (
//               <TableRow
//                 key={row.sNo}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell
//                   component="th"
//                   scope="row"
//                   sx={{
//                     border: "1px solid var(--Grey-4, #F4F4F4)",
//                     textAlign: "center", // Center-align text
//                   }}
//                 >
//                   {row.sNo}
//                 </TableCell>
//                 <TableCell
//                   align="center" // Center-align text
//                   sx={{ border: "1px solid var(--Grey-4, #F4F4F4)" }}
//                 >
//                   {row.capacities}
//                 </TableCell>
//                 <TableCell
//                   align="center" // Center-align text
//                   sx={{ border: "1px solid var(--Grey-4, #F4F4F4)" }}
//                 >
//                   {row.fullLoadEer}
//                 </TableCell>
//                 <TableCell
//                   align="center" // Center-align text
//                   sx={{ border: "1px solid var(--Grey-4, #F4F4F4)" }}
//                 >
//                   {row.fullLoadCop}
//                 </TableCell>
//                 <TableCell
//                   align="center" // Center-align text
//                   sx={{ border: "1px solid var(--Grey-4, #F4F4F4)" }}
//                 >
//                   {row.iplv}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }




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
  border: "1px solid #ddd", // Border around the cell
  padding: "8px",
  textAlign: "center",
  fontSize: "14px",
  height: "20px",
  lineHeight: "2",
});
const StyledTableHeadCell = styled(TableCell)({
  background: "#F7FFFF",
  fontWeight: "bold",
  textAlign: "center",
  border: "1px solid var(--Grey-4, #F4F4F4)",
  height: "40px", // Set the height of the header cells
  lineHeight: "1px", // Align text vertically within the header cells
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

function EfficiencyTable() {
  return (
    <>
      <h2 style={{ fontSize: "16px", fontWeight: "400", color: "#000000" }}>
        Air Cooled Chillers
      </h2>
      <TableContainer component={Paper}>
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
          marginTop: "30px",
        }}
      >
        Water Cooled Chillers
      </h2>
      <Grid2 sx={{ marginTop: "30px" }}>
        <TableContainer component={Paper}>
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
                <StyledTableCellWide>&gt;9.562</StyledTableCellWide>
                <StyledTableCellWide>&gt;2.803</StyledTableCellWide>
                <StyledTableCellWide>&gt;12.5</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>&gt;9.562</StyledTableCellWide>
                <StyledTableCellWide>&gt;2.803</StyledTableCellWide>
                <StyledTableCellWide>&gt;12.5</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>&gt;9.562</StyledTableCellWide>
                <StyledTableCellWide>&gt;2.803</StyledTableCellWide>
                <StyledTableCellWide>&gt;12.5</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellNarrow rowSpan={3}>2</StyledTableCellNarrow>{" "}
                {/* Spans three rows */}
                <StyledTableCellNarrow rowSpan={3}>
                  Water cooled, electrically operated, centrifugal
                </StyledTableCellNarrow>{" "}
                {/* Spans three rows */}
                <StyledTableCellWide>&gt;9.562</StyledTableCellWide>
                <StyledTableCellWide>&gt;2.803</StyledTableCellWide>
                <StyledTableCellWide>&gt;12.5</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>&gt;9.562</StyledTableCellWide>
                <StyledTableCellWide>&gt;2.803</StyledTableCellWide>
                <StyledTableCellWide>&gt;12.5</StyledTableCellWide>
              </TableRow>
              <TableRow>
                <StyledTableCellWide>&gt;9.562</StyledTableCellWide>
                <StyledTableCellWide>&gt;2.803</StyledTableCellWide>
                <StyledTableCellWide>&gt;12.5</StyledTableCellWide>
              </TableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Grid2>
    </>
  );
}

export default EfficiencyTable;
