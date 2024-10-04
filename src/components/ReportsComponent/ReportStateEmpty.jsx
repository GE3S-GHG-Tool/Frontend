import { useEffect, useState } from "react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import lock_Logo from "../../assets/images/Lock.svg";
import { useNavigate } from "react-router-dom";
import Scope1 from "./tabs/Scope1";
import Scope2 from "./tabs/Scope2";
import Scope3 from "./tabs/Scope3";
// Array to define the tab details

function ReportStateEmpty() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [activeTab]);

  const [activeTab, setActiveTab] = useState("scope1");
  const navigate = useNavigate();
  const tabs = [
    {
      id: "scope1",
      title: "Scope 1",
      description:
        "Your carbon footprint includes emissions from buildings and vehicles.",
      content: <Scope1 setActiveTab={setActiveTab} />,
      isLocked: false,
    },
    {
      id: "scope2",
      title: "Scope 2",
      description:
        "Indirect emissions from purchased utilities impact carbon footprint.",
      content: <Scope2 setActiveTab={setActiveTab} />,
      isLocked: true,
    },
    {
      id: "scope3",
      title: "Scope 3",
      description:
        "Carbon footprint includes value chain supplier and customer emissions.",
      content: <Scope3 setActiveTab={setActiveTab} />,
      isLocked: true,
    },
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const nextIndex = currentIndex + 1;

    if (nextIndex < tabs.length) {
      setActiveTab(tabs[nextIndex].id);
    } else {
      console.log("All tabs completed");
    }
  };

  const handlePrevTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      setActiveTab(tabs[prevIndex].id);
    } else {
      console.log("At first tab");
    }
  };

  const isFirstTab = activeTab === tabs[0].id;
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
              Q3 2024 Report
            </Typography>
            <Typography
              variant="p"
              style={{
                fontSize: "1.4rem",
                fontWeight: "400",
                lineHeight: "33.89px",
              }}
            >
              &nbsp;I &nbsp;Delhi
            </Typography>
            {/* <div style={{ marginLeft: "auto" }}>
              <Button
                sx={{
                  borderRadius: "32px",
                  border: "1px solid #28814D",
                  // padding: "12px 12px 12px 12px",
                  height: "38px",
                  fontWeight: "400",
                  fontSize: "11px",
                  width: "135px",
                  textTransform: "unset",
                  color: "#28814D",
                }}
              >
                Add member
              </Button>
            </div> */}
          </Grid2>

          {/* Mapping through tabs */}
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
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab(tab.id)}
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
                {activeTab === tab.id ? (
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

        {/* Conditionally render content based on the active tab */}
        <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>

        {/* <Grid2
          sx={{
            padding: "25px 6rem 0px 6rem",
            width: "100%",
            height: "125px",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          {isFirstTab ? (
            <Button
              onClick={() => navigate("/")} // Redirect to home page
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
          ) : (
            <Button
              onClick={handlePrevTab}
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
          )}

          {!isLastTab ? (
            <Button
              onClick={handleNextTab}
              sx={{
                borderRadius: "32px",
                padding: "8px 18px",
                height: "38px",
                fontWeight: "400",
                fontSize: "12px",
                width: "100px",
                background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
                  boxShadow: "none",
                },
                textTransform: "capitalize",
                color: "#FFFFFF",
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/emissionreport")}
              sx={{
                borderRadius: "32px",
                padding: "8px 18px",
                height: "38px",
                fontWeight: "400",
                fontSize: "12px",
                width: "150px",
                background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
                  boxShadow: "none",
                },
                textTransform: "capitalize",
                color: "#FFFFFF",
              }}
            >
              Generate Report
            </Button>
          )}
        </Grid2> */}
      </Grid2>
    </div>
  );
}

export default ReportStateEmpty;
