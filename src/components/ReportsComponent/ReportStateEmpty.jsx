// import { useEffect, useState } from "react";
// import { Grid2, Typography } from "@mui/material";
// import lock_Logo from "../../assets/images/Lock.svg";
// import Scope1 from "./tabs/Scope1";
// import Scope2 from "./tabs/Scope2";
// import Scope3 from "./tabs/Scope3";
// import { getReportWithID } from "../../api/reports.apis";
// import { useAuth } from "../../context/AuthContext";

// function ReportStateEmpty() {
//   const reportid = localStorage.getItem("reportId");
//   const [activeTab, setActiveTab] = useState("scope1");
//   const [reportData, setReportData] = useState({});
//   const { user } = useAuth();
//   // console.log(user?.organization?.premiumPlan?.name);

//   const tabs = [
//     {
//       id: "scope1",
//       title: "Scope 1",
//       description:
//         "Your carbon footprint includes emissions from buildings and vehicles.",
//       content: <Scope1 setActiveTab={setActiveTab} />,
//       isLocked: false,
//     },
//     {
//       id: "scope2",
//       title: "Scope 2",
//       description:
//         "Indirect emissions from purchased utilities impact carbon footprint.",
//       content: <Scope2 setActiveTab={setActiveTab} />,
//       isLocked: true,
//     },
//     {
//       id: "scope3",
//       title: "Scope 3",
//       description:
//         "Carbon footprint includes value chain supplier and customer emissions.",
//       content: <Scope3 setActiveTab={setActiveTab} />,
//       isLocked: true,
//     },
//   ];
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, [activeTab]);
//   const fetchData = async () => {
//     const response = await getReportWithID(reportid);

//     if (response.data.success) {
//       console.log(response?.data?.report)
//       setReportData(response?.data?.report);
//     } else {
//       alert("Couldnt Fetch Report Details");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [reportid]);

//   return (
//     <div
//       style={{
//         backgroundColor: "#F8F8F8",
//       }}
//     >
//       <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "34px" }}>
//         <Grid2
//           sx={{
//             padding: "2.2rem 6rem 0px 6rem",
//             width: "100%",
//             height: "170px",
//             bgcolor: "#ffffff",
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//           }}
//         >
//           <Grid2
//             sx={{
//               width: "100%",
//               height: "48px",
//               display: "flex",
//               flexDirection: "row",
//               gap: "8px",
//             }}
//           >
//             <Typography
//               variant="h1"
//               style={{
//                 fontSize: "1.4rem",
//                 fontWeight: "600",
//                 lineHeight: "33.89px",
//               }}
//             >
//               {reportData?.year} {reportData?.name}
//             </Typography>
//             <Typography
//               variant="p"
//               style={{
//                 fontSize: "1.4rem",
//                 fontWeight: "400",
//                 lineHeight: "33.89px",
//               }}
//             >
//               &nbsp;| &nbsp;{reportData?.country}
//             </Typography>
//             {/* <div style={{ marginLeft: "auto" }}>
//               <Button
//                 sx={{
//                   borderRadius: "32px",
//                   border: "1px solid #28814D",
//                   // padding: "12px 12px 12px 12px",
//                   height: "38px",
//                   fontWeight: "400",
//                   fontSize: "11px",
//                   width: "135px",
//                   textTransform: "unset",
//                   color: "#28814D",
//                 }}
//               >
//                 Add member
//               </Button>
//             </div> */}
//           </Grid2>

//           {/* Mapping through tabs */}
//           <Grid2
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//             }}
//           >
//             {tabs.map((tab) => (
//               <Grid2
//                 key={tab.id}
//                 sx={{
//                   width: "33%",
//                   textAlign: "center",
//                   justifyContent: "center",
//                   display: "flex",
//                   flexDirection: "column",
//                   mt: "6px",
//                   gap: "0.5rem",
//                   paddingBottom: "10px",
//                   position: "relative",
//                   height: "4.5rem",
//                   backgroundColor: activeTab === tab.id ? "#F9FFFC" : "",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontSize: "0.9rem",
//                     fontWeight: "600",
//                     color: activeTab === tab.id ? "#369D9C" : "#808080",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: "5px",
//                   }}
//                 >
//                   {tab.isLocked && (
//                     <img
//                       src={lock_Logo}
//                       alt="Lock Logo"
//                       style={{
//                         width: "12px",
//                         height: "15px",
//                         display: "inline-block",
//                         padding: "0",
//                       }}
//                     />
//                   )}
//                   {tab.title}
//                 </Typography>

//                 <Typography
//                   variant="body1"
//                   fontSize="0.72rem"
//                   fontWeight="300"
//                   color="#808080"
//                 >
//                   {tab.description}
//                 </Typography>
//                 {activeTab === tab.id ? (
//                   <div
//                     style={{
//                       height: "4px",
//                       width: "100%",
//                       background: "#369D9C",
//                       border: "none",
//                       position: "absolute",
//                       bottom: "0",
//                       borderTopLeftRadius: "8px",
//                       borderTopRightRadius: "8px",
//                     }}
//                   ></div>
//                 ) : null}
//               </Grid2>
//             ))}
//           </Grid2>
//         </Grid2>

//         {/* Conditionally render content based on the active tab */}
//         <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
//       </Grid2>
//     </div>
//   );
// }

// export default ReportStateEmpty;

import { useEffect, useState } from "react";
import { Grid2, Typography } from "@mui/material";
import { Modal, Box } from "@mui/material";
import lock_Logo from "../../assets/images/Lock.svg";
import Scope1 from "./tabs/Scope1";
import Scope2 from "./tabs/Scope2";
import Scope3 from "./tabs/Scope3";
import { getReportWithID } from "../../api/reports.apis";
import { useAuth } from "../../context/AuthContext";

function ReportStateEmpty() {
  const reportid = localStorage.getItem("reportId");
  const [activeTab, setActiveTab] = useState("scope1");
  const [reportData, setReportData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const premiumPlan = user?.organization?.premiumPlan?.name;

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
      content: <Scope1 setActiveTab={setActiveTab} />,
      isLocked: !getTabAccessibility("scope1"),
    },
    {
      id: "scope2",
      title: "Scope 2",
      description:
        "Indirect emissions from purchased utilities impact carbon footprint.",
      content: <Scope2 setActiveTab={setActiveTab} />,
      isLocked: !getTabAccessibility("scope2"),
    },
    {
      id: "scope3",
      title: "Scope 3",
      description:
        "Carbon footprint includes value chain supplier and customer emissions.",
      content: <Scope3 setActiveTab={setActiveTab} />,
      isLocked: !getTabAccessibility("scope3"),
    },
  ];

  const handleTabClick = (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab.isLocked) {
      setIsModalOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  const fetchData = async () => {
    const response = await getReportWithID(reportid);
    if (response.data.success) {
      setReportData(response?.data?.report);
    } else {
      alert("Couldn't Fetch Report Details");
    }
  };

  useEffect(() => {
    fetchData();
  }, [reportid]);

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
                onClick={() => handleTabClick(tab.id)}
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
              This feature is locked. Please upgrade your plan to access this scope.
              Your current plan is: {premiumPlan}
            </Typography>
          </Box>
        </Modal>
      </Grid2>
    </div>
  );
}

export default ReportStateEmpty;
