import { useEffect, useState } from "react";
import { DialogContent, Button, Typography, Grid2, Box } from "@mui/material";
import emisson_logo from "../../../../assets/images/emisson_logo.svg";
import x_logo from "../../../../assets/images/X_logo.svg";
import Gas1PopupEmisson from "./Gas1PopupEmisson";
import { useAuth } from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";
import { getscope1draft } from "../../../../api/drafts";
import { useScope3 } from "../../../../context/Scope3Context";

function ProcessEmissionReports({ onClose, setTableData }) {
  const { setEmission } = useScope3();
  const [processEmissionData, setProcessEmissionData] = useState(
    localStorage.getItem("processEmissionData")
      ? JSON.parse(localStorage.getItem("processEmissionData"))
      : [{ id: Date.now(), type: {} }]
  );

  const addData = () => {
    const newData = { id: Date.now(), type: "" };
    setProcessEmissionData([...processEmissionData, newData]);
  };
  const deleteData = (id) => {
    setProcessEmissionData(
      processEmissionData.filter((data) => data.id !== id)
    );
  };
  const updateData = (id, updatedData) => {
    setProcessEmissionData(
      processEmissionData.map((data) =>
        data.id === id ? { ...data, ...updatedData } : data
      )
    );
  };
  useEffect(() => {
    setEmission(processEmissionData);
    setTableData(processEmissionData);
    localStorage.setItem(
      "processEmissionData",
      JSON.stringify(processEmissionData)
    );
  }, [processEmissionData, setTableData, setEmission]);

  return (
    <div>
      <DialogContent
        sx={{
          maxHeight: "90vh",
        }}
      >
        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "6px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <img
                src={emisson_logo}
                height="15px"
                width="10px"
                alt="fuel-logo"
              />
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "28px",
                  color: "#000000",
                  margin: 0,
                }}
              >
                Process Emission
              </h2>
            </div>
            <img
              src={x_logo}
              onClick={onClose}
              alt="dot-icon"
              height="24px"
              width="24px"
              style={{
                marginBottom: "30px",
                marginRight: "25px",
                position: "absolute",
                right: "0",
                cursor: "pointer",
              }}
            />
          </div>
          <Typography mb={1} fontSize="12px" color="#717171">
            Record the type of industrial process and the quantity of product
            processed to calculate emissions directly related to production
            activities.
          </Typography>

          {processEmissionData.map((data) => (
            <Gas1PopupEmisson
              key={data.id}
              data={data}
              onDelete={deleteData}
              onUpdate={updateData}
            />
          ))}
        </Box>

        <Grid2
          sx={{
            padding: "25px 70px 0px 70px",
            width: "100%",
            height: "125px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "50px",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={addData}
            sx={{
              borderRadius: "32px",
              border: "1px solid #28814D",
              height: "38px",
              fontWeight: "400",
              fontSize: "12px",
              width: "100px",
              textTransform: "capitalize",
              color: "#28814D",
            }}
          >
            Add Data
          </Button>
          <Button
            onClick={onClose}
            sx={{
              borderRadius: "32px",
              border: "1px solid #28814D",
              height: "38px",
              fontWeight: "400",
              fontSize: "12px",
              width: "100px",
              textTransform: "capitalize",
              color: "#28814D",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              localStorage.setItem(
                "processEmissionData",
                JSON.stringify(processEmissionData)
              );
              onClose();
            }}
            sx={{
              borderRadius: "32px",
              height: "38px",
              fontWeight: "400",
              fontSize: "12px",
              width: "100px",
              background: "#369D9C",
              textTransform: "capitalize",
              color: "#FFFFFF",
            }}
          >
            Proceed
          </Button>
        </Grid2>
      </DialogContent>
    </div>
  );
}

export default ProcessEmissionReports;
