import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const MyTable = () => {
  return (
    <>
      <Typography fontSize="13px" fontWeight="500" mb="15px" mt="15px">
        Internal Lighting - Space by Space Method
      </Typography>
      <Table
        sx={{
          borderCollapse: "collapse",
          border: "1px solid #00191D",
          width: "100%",
        }}
      >
        <TableHead>
          <TableRow sx={{ background: "#F7FFFC" }}>
            <TableCell
              sx={{
                textAlign: "center",
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
                fontSize: "14px",
                border: "1px solid #00191D",
                color: '#28814D',
              }}
            >
              LPD (W/m²)
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontSize: "14px",
                border: "1px solid #00191D",
                color: '#28814D',
              }}
            >
              Building Specific Space Types
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontSize: "14px",
                border: "1px solid #00191D",
                color: '#28814D',
              }}
            >
              LPD (W/m²)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Office - Enclosed
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              12
            </TableCell>
            <TableCell
              colSpan={2} // This makes the cell span across two columns
              sx={{
                textAlign: "left",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Gymnasium/Exercise Center
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              sx={{
                textAlign: "left",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Office -Open Plan
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
            Playing Area
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
               fontWeight: "normal",
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
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Conference/Meeting/Multipurpose
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              14
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Exercise Area
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Classroom/Lecture/Training
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              15
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Courthouse/Police Station/Penitentiary
            </TableCell>
            {/* <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            ></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                textAlign: "left",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              For Penitentiary
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              14
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Courtroom
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              20
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                textAlign: "left",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Lobby
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
               fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              14
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
              fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Confinement Cells
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
               fontWeight: "normal",
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
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              For Hotel
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Judges Chambers
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              14
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
              For Performing Arts Theater
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              36
            </TableCell>
            <TableCell
            colSpan={2}
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Fire Stations
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
              For Motion Picture Theater
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Fire Station Engine room
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Audience/Scaling Area
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Sleeping Quarters
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              3
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
              For Gymnasium
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              4
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Post Office - Sorting Area
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              For Exercise Center
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Convention Center-Exhibit Space
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              14
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
              For Convention Center
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              8
            </TableCell>
            <TableCell
            colSpan={2}
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Library
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
              For Penitentiary
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              8
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Card File Cataloguing
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              For Religious Buildings
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              18
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Stacks
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              For Sports Arena
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              4
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Reading Area
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              For Performing Arts Theater
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              28
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              Hospital
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight:"normal",
                fontSize: "12px",
                border: "1px solid #00191D",
              }}
            >
              13
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default MyTable;
