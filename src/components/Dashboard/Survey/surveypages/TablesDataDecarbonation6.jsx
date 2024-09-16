import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const MyTable6 = () => {
  return (
    <Table
      sx={{
        borderCollapse: "collapse",
        border: "1px solid #F4F4F4",
        width: "100%",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "left",
              fontWeight: 600,
              background: "#F7FFFC",
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            LPD (W/m2)
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              background: "#F7FFFC",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Common Space Types
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              width: "30vh",
              fontWeight: 600,
              background: "#F7FFFC",
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Building Specific Space Types
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              background: "#F7FFFC",
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            LPD (W/m2)
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Motion Picture Theater
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            13
          </TableCell>
          <TableCell
            // colSpan={2}
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Emergency
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            29
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Transportation
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Recovery
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            9
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Atrium-First Three Floors
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            6
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Nurse station
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            11
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Atrium-Each Additional Floor
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            2
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Exam/Treatment
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            16
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Lounge / Recreation
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            19
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Pharmacy
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            13
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Hospital
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            9
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Patient Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            8
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Dining Area
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            10
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Operating Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            24
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Peniteniary
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            14
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Nursery
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            6
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Hotel
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Medical Supply
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            15
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Motel
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            13
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Physical Therapy
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            10
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Bar Lounge/Leisure Dining
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            15
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Radiology
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            4
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Family Dining
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            23
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Laundry.Washing
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            6
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Food Preperation
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            13
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Laundry.Washing
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            8
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Laboratory
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            15
          </TableCell>
          <TableCell
            colSpan={2} // This makes the cell span across two columns
            sx={{
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Manufacturing
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Restrooms
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            10
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Low Bay(25 ft Floor to Ceiling Height)
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            13
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Dressing /Locker/ Fitting Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            6
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            High Bay(.25 ft floor to Ceiling Height)
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            18
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Corridor/ Transition
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Detailed Manufacturing
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            23
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Hospital
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            11
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Equipment Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            11
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            For Manufacturing Facility
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Control Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            5
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Stairs - Active
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            6
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Hotel / Motel Guest Rooms
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            12
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Active Storage
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            9
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Museum
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            12
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            Inactive storage
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            3
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            General Exhibition
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight: 600,
              fontSize: "12px",
              border: "1px solid #F4F4F4",
            }}
          >
            11
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default MyTable6;
