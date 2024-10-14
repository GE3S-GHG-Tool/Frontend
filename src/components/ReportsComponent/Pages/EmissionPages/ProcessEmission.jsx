import { Grid2, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import porces_Logo from "../../../../assets/images/emisson_logo.svg";
import dot_Icon from "../../../../assets/images/DotsThreeVertical.svg";
import TablesData from "../TablesData";
import edit_icon from "../../../../assets/images/edit_icon.svg";
import del_icon from "../../../../assets/images/del_icon.svg";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import ProcessEmissionReports from "./ProcessEmissionReports";
import { useParams } from "react-router-dom";
import { getscope1draft } from "../../../../api/drafts";
import { getCategoriesforDraft } from "../../../../api/createReport";
import { useScope3 } from "../../../../context/Scope3Context";
function ProcessEmission() {
  const { id } = useParams();
  const { setEmission } = useScope3();
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(
    JSON.parse(localStorage.getItem("processEmissionData"))
  );
  const fetchEditData = async (id) => {
    try {
      const response = await getscope1draft(id);
      // console.log("response:", response);

      // Use Promise.all to wait for all API calls to finish
      const transformedData = await Promise.all(
        response?.data?.processEmissions?.map(async (item) => {
          // Fetch all the category data
          const type = await getCategoriesforDraft(item.type?._id); // Fetch for type._id
          const type2 = await getCategoriesforDraft(item.category?._id); // Fetch for category._id
          const type3 = await getCategoriesforDraft(item.subCategory?._id); // Fetch for subCategory._id
          const type4 = await getCategoriesforDraft(item.subsubCategory?._id); // Fetch for subsubCategory._id
          const type5 = await getCategoriesforDraft(
            item.subsubsubCategory?._id
          ); // Fetch for subsubsubCategory._id
          // console.log(type, type2, type3, type4, type5);
          return {
            id: Date.now(),
            type: type || {}, // Set the fetched data for type
            type2: type2 || {}, // Set the fetched data for type2
            type3: type3 || {}, // Set the fetched data for type3
            type4: type4 || {}, // Set the fetched data for type4
            type5: type5 || {}, // Set the fetched data for type5
            quantity: item.quantity || "",
            quantity_2: item.quantity_2 || "",
          };
        })
      );

      // Store the transformed data in localStorage
      localStorage.setItem(
        "processEmissionData",
        JSON.stringify(transformedData)
      );
      // console.log("transformedData", transformedData);
      setEmission(transformedData);
      setTableData(transformedData); // Update the table with the new data
    } catch (error) {
      console.error("Error in fetchEditData:", error);
    }
  };

  useEffect(() => {
    if (id) fetchEditData(id);
  }, [id]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDotClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    // console.log("Edit clicked");
    setIsDropdownOpen(false);
  };

  const handleClearAll = () => {
    localStorage.removeItem("processEmissionData");
    setEmission([]);
    setTableData([]);
    setIsDropdownOpen(false);
  };

  const headings = [
    "Type of Process Emission",
    "Category",
    "Sub Category",
    "Sub Sub Category",
    "Sub Sub Sub Category",
    "Quantity",
    "Quantity2",
  ];

  // const tableData = [
  //   [
  //     "Waste Gas Disposal",
  //     "Flaringy",
  //     "Heavy oil/ cold bitumen Production",
  //     "-",
  //     "-",
  //     "56 10^3*m3",
  //   ],
  //   ["Waste Gas Disposal", "Flaringy", "Refining", "-", "-", "12 10^3*m3"],
  //   [
  //     "Process and Vented",
  //     "Oil and Gas Exploration",
  //     "Well Completion",
  //     "Offshore",
  //     "Gas",
  //     "45",
  //   ],
  //   [
  //     "Process and Vented",
  //     "Natural Gas Processing",
  //     "Natural G...",
  //     "Gas-Driv...",
  //     "Gas",
  //     "68",
  //   ],
  // ];

  return (
    <div>
      {/* Main Grid */}
      <Grid2
        sx={{
          padding: "25px 45px 25px 45px",
          width: "90%",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          borderRadius: "16px",
        }}
      >
        {/* inner main */}
        <Grid2
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* grid header */}
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "6px",
                width: "100%", // Adjust as needed
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <img src={porces_Logo} width={18} height={20} alt="fuel-logo" />
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    color: "#000000",
                    margin: 0, // Removes default margin
                  }}
                >
                  Process Emission
                </h2>
              </div>
              <div style={{ position: "relative" }}>
                <img
                  src={dot_Icon}
                  alt="dot-icon"
                  height="24px"
                  width="24px"
                  onClick={handleDotClick}
                  style={{ cursor: "pointer" }}
                />
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      backgroundColor: "#FFF",
                      zIndex: 1,
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div
                      onClick={handleClickOpen}
                      style={{
                        padding: "5px 10px",
                        width: "8rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <img
                        src={edit_icon}
                        alt="dot-icon"
                        height="18px"
                        width="18px"
                      />{" "}
                      Edit
                    </div>
                    <div
                      onClick={handleClearAll}
                      style={{
                        padding: "5px 10px",
                        width: "8rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        color: "#FF9A9A",
                        gap: "4px",
                      }}
                    >
                      <img
                        src={del_icon}
                        alt="dot-icon"
                        height="18px"
                        width="18px"
                      />{" "}
                      Clear All
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Typography
                fontSize="12px"
                fontWeight="400"
                lineHeight="22.4px"
                color="#717171"
              >
                Record the type of industrial process and the quantity of
                product processed to calculate emissions directly related to
                production activities.
              </Typography>
            </div>
          </Grid2>
          {/* grid second */}
          <TablesData data={tableData} headings={headings} />
          <Grid2>
            <Button
              sx={{
                borderRadius: "32px",
                border: "1px solid #28814D",
                padding: "4px 12px",
                height: "36px",
                fontWeight: "400",
                fontSize: "12px",
                width: "100px",
                textTransform: "capitalize",
                color: "#28814D",
              }}
              onClick={handleClickOpen} // Open the dialog on button click
            >
              Add Data
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* Popup Dialog Component */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "1100px",
            maxWidth: "1000px",
            maxHeight: "89vh",
            borderRadius: "16px",
          },
        }}
      >
        <ProcessEmissionReports
          onClose={handleClose}
          setTableData={setTableData}
        />
      </Dialog>
    </div>
  );
}

export default ProcessEmission;
