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
        border: "1px solid #00191D",
        width: "100%",
        mt:'4rem'
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "left",
              background: "#F7FFFC",
              fontSize: "14px",
              border: "1px solid #00191D",
              color: '#28814D',
            }}
          >
            LPD (W/m2)
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              background: "#F7FFFC",
              fontSize: "14px",
              border: "1px solid #00191D",
              color: '#28814D',
            }}
          >
            Common Space Types
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              width: "30vh",
              background: "#F7FFFC",
              fontSize: "14px",
              border: "1px solid #00191D",
              color: '#28814D',
            }}
          >
            Building Specific Space Types
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              background: "#F7FFFC",
              fontSize: "14px",
              border: "1px solid #00191D",
              color: '#28814D',
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Motion Picture Theater
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            13
          </TableCell>
          <TableCell
            // colSpan={2}
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Emergency
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Transportation
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Recovery
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Atrium-First Three Floors
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            6
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Nurse station
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Atrium-Each Additional Floor
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            2
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Exam/Treatment
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Lounge / Recreation
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            19
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Pharmacy
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Hospital
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            9
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Patient Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Dining Area
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            10
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Operating Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Peniteniary
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            14
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Nursery
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Hotel
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Medical Supply
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Motel
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            13
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Physical Therapy
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Bar Lounge/Leisure Dining
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            15
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Radiology
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Family Dining
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            23
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Laundry.Washing
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Food Preperation
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            13
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Laundry.Washing
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            8
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Laboratory
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            15
          </TableCell>
          <TableCell
            colSpan={2} // This makes the cell span across two columns
            sx={{
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Restrooms
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            10
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Low Bay(25 ft Floor to Ceiling Height)
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Dressing /Locker/ Fitting Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            6
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            High Bay(.25 ft floor to Ceiling Height)
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Corridor/ Transition
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            5
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Detailed Manufacturing
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Hospital
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            11
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Equipment Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            For Manufacturing Facility
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            6
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Control Room
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Stairs - Active
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            9
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Hotel / Motel Guest Rooms
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Active Storage
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            10
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Museum
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            Inactive storage
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            3
          </TableCell>
          <TableCell
            sx={{
              width: "30vh",
              textAlign: "left",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
            }}
          >
            General Exhibition
          </TableCell>
          <TableCell
            sx={{
              width: "20vh",
              textAlign: "center",
              fontWeight:"normal",
              fontSize: "12px",
              border: "1px solid #00191D",
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
