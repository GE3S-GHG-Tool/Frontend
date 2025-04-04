import FuelConsumption from "../Pages/FuelConsumption";
import RefrigerantData from "../Pages/RefrigerantData";
import ProcessEmission from "../Pages/EmissionPages/ProcessEmission";
import { Box, Button } from "@mui/material";
import { useScope3 } from "../../../context/Scope3Context";
import { useEffect, useState } from "react";
import { saveScope1Report } from "../../../api/createReport";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { oilGasIndustryFlag, validateScopeReport } from "../../../util/utils";

const Scope1 = ({ setActiveTab }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const reportid = localStorage.getItem("reportId");
  const {
    consumption,
    refrigerent,
    emission,
    scope1Payload,
    setScope1Payload,
  } = useScope3();

  useEffect(() => {
    setScope1Payload(getProcessData("draft"));
  }, [consumption, refrigerent, emission]);

  const getProcessData = (type) => {
    const validProcessData = emission?.filter(
      (item) => item?.type?._id && item?.type2?._id
    );
    const transformedData = validProcessData?.map((item) => ({
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

    return {
      main_report_id: reportid,
      fuelEntries: consumption.slice(0, -1),
      refrigerantEntries: refrigerent.slice(0, -1),
      processEmissions: transformedData,
      report_type: type,
    };
  };

  const submit = async (type, btn) => {
    const payload = { ...scope1Payload, report_type: type };

    if (
      type === "final" &&
      !validateScopeReport(
        ["fuelEntries", "refrigerantEntries", "processEmissions"],
        payload
      )
    ) {
      return alert("Please enter some data");
    }

    let response = await saveScope1Report(payload);

    if (type === "draft" && btn !== "cancel") {
      setActiveTab("scope2");
    } else if (btn === "cancel") {
      localStorage.removeItem("refrigerent");
      localStorage.removeItem("consumption");
      localStorage.removeItem("processEmissionData");
      navigate("/");
    } else {
      localStorage.removeItem("refrigerent");
      localStorage.removeItem("consumption");
      localStorage.removeItem("processEmissionData");
      navigate(`/emissionreport/${reportid}`);
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
      {oilGasIndustryFlag[user?.organization?.industry?.id] ? (
        <ProcessEmission />
      ) : (
        <></>
      )}
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
          onClick={() => submit("draft", "cancel")}
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

        {user?.organization?.premiumPlan?.name === "FootPrint" ? (
          <Button
            onClick={() => submit("final", "final")}
            sx={{
              borderRadius: "32px",
              padding: "8px 18px",
              height: "38px",
              fontWeight: "400",
              fontSize: "12px",
              // width: "100px",
              background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
              "&:hover": {
                background: "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
                boxShadow: "none",
              },
              textTransform: "capitalize",
              color: "#FFFFFF",
            }}
          >
            Generate Report
          </Button>
        ) : (
          <Button
            onClick={() => submit("draft", "draft")}
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
        )}
      </Box>
    </div>
  );
};

export default Scope1;
