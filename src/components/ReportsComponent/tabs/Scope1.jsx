import FuelConsumption from "../Pages/FuelConsumption";
import RefrigerantData from "../Pages/RefrigerantData";
import ProcessEmission from "../Pages/EmissionPages/ProcessEmission";
import { Box, Button } from "@mui/material";
import { useScope3 } from "../../../context/Scope3Context";
import { useEffect, useState } from "react";
import {
  saveScope1Report,
  updateScope1Report,
} from "../../../api/createReport";
import { useNavigate, useParams } from "react-router-dom";

const Scope1 = ({ setActiveTab }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reportid = localStorage.getItem("reportId");
  const [processData, setProcessData] = useState(() => {
    return JSON.parse(localStorage.getItem("processEmissionData")) || [];
  });
  // const refrigerentArray = JSON.parse(localStorage.getItem("refrigerent"));
  const { consumption, refrigerent, emission } = useScope3();
  const [consumptionArray, setConsumptionArray] = useState([]);
  const [refrigerentArray, setRefrigerentArray] = useState(
    JSON.parse(localStorage.getItem("refrigerent")) || []
  );

  useEffect(() => {
    setConsumptionArray(consumption ? consumption : []);
  }, [consumption]);

  useEffect(() => {
    setRefrigerentArray(refrigerent ? refrigerent : []);
  }, [refrigerent]);

  useEffect(() => {
    setProcessData(emission ? emission : []);
  }, [emission]);

  // console.log("processData", processData);
  const submit = async (type) => {
    const transformedData = processData?.map((item) => ({
      type: item?.type?._id || "",

      quantity: Number(item?.quantity) || "",
      quantity_2: Number(item?.quantity2) || 1,

      category: item?.type2?._id || "",
      ...(item?.type3 &&
        Object.keys(item.type3).length > 0 && {
          subCategory: item?.type3?._id,
        }),
      ...(item?.type4 &&
        Object.keys(item.type4).length > 0 && {
          subsubCategory: item?.type4?._id || "",
        }),
      ...(item?.type5 &&
        Object.keys(item.type5).length > 0 && {
          subsubsubCategory: item?.type5?._id || "",
        }),
    }));
    const payload = {
      main_report_id: reportid,
      fuelEntries: consumptionArray.slice(0, -1),
      refrigerantEntries: refrigerentArray.slice(0, -1),
      processEmissions: transformedData,
      report_type: type,
    };
    const updatePayload = {
      fuelEntries: consumptionArray.slice(0, -1),
      refrigerantEntries: refrigerentArray.slice(0, -1),
      processEmissions: transformedData,
      report_type: type,
    };
    console.log("ss1", updatePayload);

    let response;

    if (id) {
      response = await updateScope1Report(updatePayload, id);
      if (response.status === 200) {
        localStorage.removeItem("refrigerent");
        localStorage.removeItem("consumption");
        localStorage.removeItem("processEmissionData");
        if (type === "final") {
          setActiveTab("scope2");
        } else {
          navigate("/");
        }
      }
    } else {
      response = await saveScope1Report(payload);
      if (response.status === 201) {
        localStorage.removeItem("refrigerent");
        localStorage.removeItem("consumption");
        localStorage.removeItem("processEmissionData");
        if (type === "final") {
          setActiveTab("scope2");
        } else {
          navigate("/");
        }
      }
    }
    console.log("ss1 res", response);
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
