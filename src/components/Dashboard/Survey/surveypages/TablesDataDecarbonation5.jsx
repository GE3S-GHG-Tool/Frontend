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
      <Typography fontSize="12px" fontWeight="600" mb="15px">
        Internal Lighting - Space by Space Method
      </Typography>
      <Table
        sx={{
          borderCollapse: "collapse",
          border: "1px solid #F4F4F4",
          width: "100%",
        }}
      >
        <TableHead>
          <TableRow sx={{ background: "#F7FFFC" }}>
            <TableCell
              sx={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid #F4F4F4",
              }}
            >
              Common Space Types
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid #F4F4F4",
              }}
            >
              LPD (W/m²)
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid #F4F4F4",
              }}
            >
              Building Specific Space Types
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid #F4F4F4",
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
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Office - Enclosed
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              12
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
              Gymnasium/Exercise Center
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
              Office -Open Plan
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Exercise Area
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Conference/Meeting/Multipurpose
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Exercise Area
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            ></TableCell>
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
              Classroom/Lecture/Training
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
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Courthouse/Police Station/Penitentiary
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            ></TableCell>
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
              For Penitentiary
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Courtroom
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              20
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
              Lobby
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Confinement Cells
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Judges Chambers
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              14
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
              For Performing Arts Theater
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              36
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Fire Stations
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            ></TableCell>
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
              For Motion Picture Theater
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Fire Station Engine room
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Audience/Scaling Area
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              12
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Sleeping Quarters
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              3
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
              For Gymnasium
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              4
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Post Office - Sorting Area
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              For Exercise Center
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Convention Center-Exhibit Space
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              14
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
              For Convention Center
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Library
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            ></TableCell>
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
              For Penitentiary
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              8
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Card File Cataloguing
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              For Religious Buildings
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              18
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Stacks
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              For Sports Arena
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              4
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Reading Area
            </TableCell>
            <TableCell
              sx={{
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
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              For Performing Arts Theater
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              28
            </TableCell>
            <TableCell
              sx={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
              }}
            >
              Hospital
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "12px",
                border: "1px solid #F4F4F4",
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
