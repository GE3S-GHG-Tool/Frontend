import ElecticityConsumption from "../Pages/ElecticityConsumption";
import ChilledWaterConsumption from "../Pages/ChilledWaterConsumption";
import DesalinatedWater from "../Pages/DesalinatedWater";
import HeatConsumption from "../Pages/HeatConsumption";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { saveScope2Report } from "../../../api/createReport";
import { useEffect } from "react";
import { getscope2draft } from "../../../api/drafts";
import { useNavigate, useParams } from "react-router-dom";
import { validateScopeReport } from "../../../util/utils";
import { useScope3 } from "../../../context/Scope3Context";

const Scope2 = ({ setActiveTab }) => {
  const { scope2Data, user } = useAuth();
  const { scope1Payload, scope2Payload, setScope2Payload } = useScope3();
  const reportid = localStorage.getItem("reportId");
  const navigate = useNavigate();

  useEffect(() => {
    setScope2Payload(getProcessData("draft"));
  }, [scope2Data]);

  const getProcessData = (type) => {
    return {
      organizationId: user?.organization?.id,
      report_type: type,
      main_report_id: reportid,
      electricityConsumption: scope2Data?.electricity
        ? [{ unit: "KWh", quantity: scope2Data.electricity }]
        : [],
      chilledWaterConsumption: scope2Data?.water
        ? [{ unit: "ton-hour", quantity: scope2Data.water }]
        : [],
      heatConsumption: scope2Data?.heat
        ? [{ unit: "MMBtu", quantity: scope2Data.heat }]
        : [],
      purchasedDesalinatedWaterConsumption: scope2Data?.desalinated
        ? [{ unit: "m3", quantity: scope2Data.desalinated }]
        : [],
    };
  };

  const submit = async (type) => {
    const payload = { ...scope2Payload, report_type: type };

    if (
      type === "final" &&
      !validateScopeReport(
        [
          "fuelEntries",
          "refrigerantEntries",
          "processEmissions",
          "electricityConsumption",
          "chilledWaterConsumption",
          "heatConsumption",
          "purchasedDesalinatedWaterConsumption",
        ],
        {
          ...scope1Payload,
          ...payload,
        }
      )
    ) {
      return alert("Please enter some data");
    }

    const response = await saveScope2Report(payload);

    if (type === "draft") {
      setActiveTab("scope3");
    } else {
      localStorage.removeItem("refrigerent");
      localStorage.removeItem("consumption");
      localStorage.removeItem("processEmissionData");
      localStorage.removeItem("scope2Data");
      navigate(`/emissionreport/${reportid}`);
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
      <ElecticityConsumption />
      <ChilledWaterConsumption />
      <DesalinatedWater />
      <HeatConsumption />
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
          onClick={() => setActiveTab("scope1")}
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
          Previous
        </Button>

        {user?.organization?.premiumPlan?.name === "OffSet" ? (
          <Button
            onClick={() => submit("final")}
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
            onClick={() => submit("draft")}
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

export default Scope2;
