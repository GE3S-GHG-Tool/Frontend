import FuelConsumption from "../Pages/FuelConsumption";
import RefrigerantData from "../Pages/RefrigerantData";
import ProcessEmission from "../Pages/EmissionPages/ProcessEmission";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useScope3 } from "../../../context/Scope3Context";
import { useEffect, useState } from "react";
import { saveScope1Report } from "../../../api/createReport";

const Scope1 = ({ setActiveTab }) => {
  const reportid = localStorage.getItem("reportId");
  const navigate = useNavigate();
  const { consumption, refrigerent } = useScope3();
  const [consumptionArray, setConsumptionArray] = useState([]);
  const [refrigerentArray, setRefrigerentArray] = useState([]);
  useEffect(() => {
    setConsumptionArray(consumption ? consumption : []);
    console.log("consumption instant:", consumption); // Verify the table gets updated
  }, [consumption]);
  useEffect(() => {
    setRefrigerentArray(refrigerent ? refrigerent : []);
    console.log("refrigerent instant:", refrigerent); // Verify the table gets updated
  }, [refrigerent]);

  const submit = async (type) => {
    const payload = {
      main_report_id: reportid,
      fuelEntries: consumptionArray.slice(0, -1),
      refrigerantEntries: refrigerentArray.slice(0, -1),
      processEmissions: [
        {
          type: "66f6aa9f7d6f3c015a12ddf3",
          category: "66f6aa9f7d6f3c015a12ddf1",
          subCategory: "66f6aa9f7d6f3c015a12dde8",
          quantity: 27,
        },
      ],
      report_type: type,
    };
    console.log(payload);
    const response = await saveScope1Report(payload);
    console.log(response);
    if (response.status === 201) {
      setActiveTab("scope2");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
        padding: "0 1rem",
      }}
    >
      <FuelConsumption />
      <RefrigerantData />
      <ProcessEmission />

      <Box
        sx={{
          padding: "25px 5rem 0px 6rem",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          mb: "2rem",
        }}
      >
        <Button
          onClick={() => submit("draft")}
          sx={{
            borderRadius: "32px",
            border: "1px solid #28814D",
            padding: "8px 18px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            textTransform: "capitalize",
            color: "#28814D",
            "&:hover": {
              background: "rgba(177, 233, 216, 0.30)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={() => submit("final")}
          sx={{
            borderRadius: "32px",
            padding: "8px 18px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
            "&:hover": {
              background: "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
              boxShadow: "none",
            },
            textTransform: "capitalize",
            color: "#FFFFFF",
          }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default Scope1;
