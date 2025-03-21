import { useEffect, useState } from "react";
import { Grid2, Typography, Modal, Box } from "@mui/material";
import lock_Logo from "../../assets/images/Lock.svg";
import Scope1 from "./tabs/Scope1";
import Scope2 from "./tabs/Scope2";
import Scope3 from "./tabs/Scope3";
import { useParams } from "react-router-dom";
import { getscope1draft } from "../../api/drafts";
import { useAuth } from "../../context/AuthContext";
import { getReportWithID } from "../../api/reports.apis";
import ScopeWrapper from "./ScopeWrapper";
import { useScope3 } from "../../context/Scope3Context";
import {
  saveScope1Report,
  saveScope2Report,
  saveScope3Report,
} from "../../api/createReport";

function EditReport() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("scope1");
  const [reportData, setReportData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { scope1Payload, scope2Payload, scope3Payload } = useScope3();
  const premiumPlan = user?.organization?.premiumPlan?.name;

  const fetchEditData = async (id) => {
    const response = await getscope1draft(id);
  };

  const fetchReportData = async () => {
    localStorage.setItem("reportId", id);
    const response = await getReportWithID(id);
    if (response.data.success) {
      setReportData(response?.data?.report);
    } else {
      alert("Couldn't Fetch Report Details");
    }
  };

  useEffect(() => {
    if (id) {
      fetchEditData(id);
      fetchReportData();
    }
  }, [id]);

  const getTabAccessibility = (tabId) => {
    switch (premiumPlan) {
      case "FootPrint":
        return tabId === "scope1";
      case "OffSet":
        return tabId === "scope1" || tabId === "scope2";
      case "CarbonZero":
        return true;
      default:
        return tabId === "scope1"; // Default to basic access
    }
  };

  const tabs = [
    {
      id: "scope1",
      title: "Scope 1",
      description:
        "Your carbon footprint includes emissions from buildings and vehicles.",
      content: (
        <ScopeWrapper
          isDisabled={
            !(premiumPlan === "CarbonZero") &&
            reportData?.scope1 &&
            reportData?.report_type === "final"
          }
          scopeNumber={1}
        >
          <Scope1 setActiveTab={setActiveTab} />
        </ScopeWrapper>
      ),
      isLocked: !getTabAccessibility("scope1"),
    },
    {
      id: "scope2",
      title: "Scope 2",
      description:
        "Indirect emissions from purchased utilities impact carbon footprint.",
      content: (
        <ScopeWrapper
          isDisabled={
            !(premiumPlan === "CarbonZero") &&
            reportData?.scope2 &&
            reportData?.report_type === "final"
          }
          scopeNumber={1}
        >
          <Scope2 setActiveTab={setActiveTab} />
        </ScopeWrapper>
      ),
      isLocked: !getTabAccessibility("scope2"),
    },
    {
      id: "scope3",
      title: "Scope 3",
      description:
        "Carbon footprint includes value chain supplier and customer emissions.",
      content: (
        <ScopeWrapper
          isDisabled={
            !(premiumPlan === "CarbonZero") &&
            reportData?.scope3 &&
            reportData?.report_type === "final"
          }
          scopeNumber={1}
        >
          <Scope3 setActiveTab={setActiveTab} />
        </ScopeWrapper>
      ),
      isLocked: !getTabAccessibility("scope3"),
    },
  ];

  const handleTabClick = (tabId, prevTab) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab.isLocked) {
      setIsModalOpen(true);
    } else {
      setActiveTab(tabId);
      if (prevTab === "scope1") {
        saveScope1Report(scope1Payload);
      } else if (prevTab === "scope2") {
        saveScope2Report(scope2Payload);
      } else {
        saveScope3Report(scope3Payload);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "34px" }}>
        <Grid2
          sx={{
            padding: "2.2rem 6rem 0px 6rem",
            width: "100%",
            height: "170px",
            bgcolor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Grid2
            sx={{
              width: "100%",
              height: "48px",
              display: "flex",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <Typography
              variant="h1"
              style={{
                fontSize: "1.4rem",
                fontWeight: "600",
                lineHeight: "33.89px",
              }}
            >
              {reportData?.year} {reportData?.name}
            </Typography>
            <Typography
              variant="p"
              style={{
                fontSize: "1.4rem",
                fontWeight: "400",
                lineHeight: "33.89px",
              }}
            >
              &nbsp;| &nbsp;{reportData?.country}
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {tabs.map((tab) => (
              <Grid2
                key={tab.id}
                sx={{
                  width: "33%",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  mt: "6px",
                  gap: "0.5rem",
                  paddingBottom: "10px",
                  position: "relative",
                  height: "4.5rem",
                  backgroundColor: activeTab === tab.id ? "#F9FFFC" : "",
                  cursor: tab.isLocked ? "not-allowed" : "pointer",
                  opacity: tab.isLocked ? 0.7 : 1,
                }}
                onClick={() => handleTabClick(tab.id, activeTab)}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: activeTab === tab.id ? "#369D9C" : "#808080",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  {tab.isLocked && (
                    <img
                      src={lock_Logo}
                      alt="Lock Logo"
                      style={{
                        width: "12px",
                        height: "15px",
                        display: "inline-block",
                        padding: "0",
                      }}
                    />
                  )}
                  {tab.title}
                </Typography>

                <Typography
                  variant="body1"
                  fontSize="0.72rem"
                  fontWeight="300"
                  color="#808080"
                >
                  {tab.description}
                </Typography>
                {activeTab === tab.id && !tab.isLocked ? (
                  <div
                    style={{
                      height: "4px",
                      width: "100%",
                      background: "#369D9C",
                      border: "none",
                      position: "absolute",
                      bottom: "0",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  ></div>
                ) : null}
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>

        {/* Upgrade Modal */}
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="upgrade-modal-title"
          aria-describedby="upgrade-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="upgrade-modal-title" variant="h6" component="h2">
              Upgrade Required
            </Typography>
            <Typography id="upgrade-modal-description" sx={{ mt: 2 }}>
              This feature is locked. Please upgrade your plan to access this
              scope. Your current plan is: {premiumPlan}
            </Typography>
          </Box>
        </Modal>
      </Grid2>
    </div>
  );
}

export default EditReport;
