import { useState } from "react";
import { Button, Grid2, Typography } from "@mui/material";
import lock_Logo from "../../assets/images/Lock.svg";
import { useNavigate } from "react-router-dom";
import Scope1 from "./tabs/Scope1";
import Scope2 from "./tabs/Scope2";
import Scope3 from "./tabs/Scope3";

function ReportStateEmpty() {
  const [activeTab, setActiveTab] = useState("scope1"); // Track active tab
  const navigate = useNavigate();

  // Array to define the tab details
  const tabs = [
    {
      id: "scope1",
      title: "Scope 1",
      description:
        "Your carbon footprint includes emissions from buildings and vehicles.",
      content: <Scope1 />,
      isLocked: false,
    },
    {
      id: "scope2",
      title: "Scope 2",
      description:
        "Indirect emissions from purchased utilities impact carbon footprint.",
      content: <Scope2 />,
      isLocked: true,
    },
    {
      id: "scope3",
      title: "Scope 3",
      description:
        "Carbon footprint includes value chain supplier and customer emissions.",
      content: <Scope3 />,
      isLocked: true,
    },
  ];

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const nextIndex = currentIndex + 1;

    if (nextIndex < tabs.length) {
      setActiveTab(tabs[nextIndex].id);
    } else {
      // If on the last tab, navigate to a different page or handle it as needed
      console.log("All tabs completed");
      // You can navigate to a new page or reset the tabs if needed
      // navigate("/ghgreport");  // Uncomment this line if needed
    }
  };

  const isLastTab = activeTab === tabs[tabs.length - 1].id;

  return (
    <div
      style={{
        backgroundColor: "#F8F8F8",
      }}
    >
      <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "34px" }}>
        <Grid2
          sx={{
            padding: "25px 70px 0px 70px",
            width: "100%",
            height: "125px",
            bgcolor: "#ffffff",
            display: "flex",
            flexDirection: "column",
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
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "33.89px",
              }}
            >
              Q3 2024 Report
            </Typography>
            <Typography
              variant="p"
              style={{
                fontSize: "18px",
                fontWeight: "400",
                lineHeight: "33.89px",
              }}
            >
              I Delhi
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <Button
                sx={{
                  borderRadius: "32px",
                  border: "1px solid #28814D",
                  padding: "12px 28px 12px 28px",
                  height: "38px",
                  fontWeight: "400",
                  fontSize: "12px",
                  width: "135px",
                  textTransform: "capitalize",
                  color: "#28814D",
                }}
              >
                Add member
              </Button>
            </div>
          </Grid2>

          {/* Mapping through tabs */}
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "55px",
            }}
          >
            {tabs.map((tab) => (
              <Grid2
                key={tab.id}
                sx={{
                  width: "29%",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  mt: "6px",
                  gap: "2px",
                  height: "50px",
                  backgroundColor: activeTab === tab.id ? "#F9FFFC" : "",
                  cursor: "pointer",
                  borderBottom:
                    activeTab === tab.id
                      ? "3px solid #369D9C"
                      : "3px solid transparent",
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "18px",
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
                        width: "10px",
                        height: "16px",
                        display: "inline-block",
                      }}
                    />
                  )}
                  {tab.title}
                </Typography>

                <Typography
                  variant="body1"
                  fontSize="9px"
                  fontWeight="400"
                  lineHeight="14px"
                  color="#808080"
                >
                  {tab.description}
                </Typography>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* Conditionally render content based on the active tab */}
        <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>

        <Grid2
          sx={{
            padding: "25px 70px 0px 70px",
            width: "100%",
            height: "125px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end", // This moves the buttons to the right
          }}
        >
          <Button
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
            }}
          >
            Cancel
          </Button>
          {!isLastTab ? (
            <Button
              // onClick={() => navigate("/ghgreport")}
              onClick={handleNextTab}
              sx={{
                borderRadius: "32px",
                padding: "8px 18px",
                height: "38px",
                fontWeight: "400",
                fontSize: "12px",
                width: "100px",
                background: "#369D9C",
                textTransform: "capitalize",
                color: "#FFFFFF",
              }}
            >
              Next
            </Button>
          ) : null}

          {isLastTab && (
            <Button
              onClick={() => navigate("/emissionreport")}
              // onClick={handleNextTab}
              sx={{
                borderRadius: "32px",
                padding: "8px 18px",
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
          )}
        </Grid2>
      </Grid2>
    </div>
  );
}

export default ReportStateEmpty;
