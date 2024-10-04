import ReusableTableSection from "../scope3/ReusableTableComponent";
import wasteGenerated from "../../../assets/images/wasteGenerated.svg";
import PurchasedGoods from "../scope3/PurchasedGoods";
import goodicon from "../../../assets/images/capitalGoods.svg";
import fuelRelated from "../../../assets/images/fuelActivities.svg";
import Investments from "../scope3/Investments";
import EmployeeCommuting from "../scope3/EmployeeCommuting";
import DownstreamAssets from "../scope3/DownstreamAssets";
import WasteGeneratedPopup from "../scope3/WasteGeneratedPopup";
import BusinessTravelPopup from "../scope3/BusinessTravelPopup";
import CapitalGoodsPopup from "../scope3/CapitalGoodsPopup";
import FuelRelatedPopup from "../scope3/FuelRelatedPopup";
import upstream from "../../../assets/images/upstream.svg";
import downstream from "../../../assets/images/downstream.svg";
import UpstreamLeasedPopup from "../scope3/UpstreamLeasedPopup";
import plane from "../../../assets/images/aeroplane.svg";
import { Box, Button } from "@mui/material";
import { saveScope3Report } from "../../../api/createReport";
import { useEffect, useState } from "react";
import { useScope3 } from "../../../context/Scope3Context";
import { useNavigate } from "react-router-dom";

const wasteHeadings = [
  "Waste Type",
  "Waste Category",
  "Disposal Method",
  "Distance of the landfill from pickup point",
  "Fuel Type of Pickup Vehicle",
  "Number of Trips",
  "Quantity of Waste",
];

const businessHeadings = [
  "Travel Class",
  "Origin",
  "Connections",
  "Destination",
  "Number of Trips",
];

const businessData = [
  {
    "Travel Class": "Business",
    Origin: "New York",
    Connections: "Direct",
    Destination: "London",
    "Number of Trips": 3,
  },
  {
    "Travel Class": "Economy",
    Origin: "San Francisco",
    Connections: "1 Stop",
    Destination: "Tokyo",
    "Number of Trips": 2,
  },
  {
    "Travel Class": "First Class",
    Origin: "Los Angeles",
    Connections: "Direct",
    Destination: "Paris",
    "Number of Trips": 1,
  },
];

const capitalGoodsHeadings = [
  "Asset Type",
  "Asset Category",
  "Expenses",
  "Currency",
];

const fuelRelatedHeadings = [
  "Category",
  "Sub Category",
  "Sub Sub Category",
  "Quantity",
  "Unit",
];

const leasedDataHeadings = ["Asset Type", "Source Of energy", "Value", "Unit"];

const Scope3 = () => {
  const reportid = localStorage.getItem("reportId");
  const [waste, setwaste] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [capitalData, setCapitalData] = useState([]);
  const [investData, setInvestData] = useState([]);
  const [comutingData, setComutingData] = useState([]);
  const [fuelArray, setFuelArray] = useState([]);
  const [upstreamArray, setUpstreamArray] = useState([]);
  const [downstreamArray, setDownstreamArray] = useState([]);
  const navigate = useNavigate();
  const {
    capitalGoods,
    fuelData,
    upStreamData,
    wasteData,
    goods,
    investements,
    employeecommuting,
    downStreamData,
  } = useScope3();

  useEffect(() => {
    setwaste(wasteData ? wasteData : []);
    console.log("wasteData instant:", wasteData); // Verify the table gets updated
  }, [wasteData]);
  useEffect(() => {
    setPurchaseData(goods ? goods : []);
    console.log("goods instant:", goods); // Verify the table gets updated
  }, [goods]);

  useEffect(() => {
    setCapitalData(capitalGoods ? capitalGoods : []);
    console.log("capitalGoods instant:", capitalGoods); // Verify the table gets updated
  }, [capitalGoods]);
  useEffect(() => {
    setInvestData(investements ? investements : []);
    console.log("investements instant:", investements); // Verify the table gets updated
  }, [investements]);
  useEffect(() => {
    setComutingData(employeecommuting ? employeecommuting : []);
    console.log("employeecommuting instant:", employeecommuting); // Verify the table gets updated
  }, [employeecommuting]);
  useEffect(() => {
    setFuelArray(fuelData ? fuelData : []);
    console.log("fuelData instant:", fuelData); // Verify the table gets updated
  }, [fuelData]);
  useEffect(() => {
    setUpstreamArray(upStreamData ? upStreamData : []);
    console.log("upStreamData instant:", upStreamData); // Verify the table gets updated
  }, [upStreamData]);
  useEffect(() => {
    setDownstreamArray(downStreamData ? downStreamData : []);
    console.log("upStreamData instant:", downStreamData); // Verify the table gets updated
  }, [downStreamData]);

  const submit = async (type) => {
    const convertedWasteArray = waste.slice(0, -1).map((item) => ({
      category: item.wasteCategory || "",
      sub_category: item.subCategory || "",
      disposal_method: item.disposalMethod || "",
      fuel_type: item.fuelType || "",
      distance_km: item.distanceToLandfill || "",
      num_trips: item.numberOfTrips || "",
      quantity: item.quantityOfWaste ? parseInt(item.quantityOfWaste, 10) : 0,
    }));
    const capitalArray = capitalData
      .slice(0, -1)
      .filter((item) => item.assetType) // Removes the empty item
      .map((item) => ({
        asset_category: item.assetType.asset_category,
        asset_type: item.assetType.asset_type,
        expense_value: parseInt(item.expenses, 10), // Convert expenses to integer
      }));
    const convertedFuelArray = fuelArray
      .slice(0, -1)
      .filter((item) => item.category) // Filter out empty or invalid items
      .map((item) => ({
        category: item.category,
        sub_category: item.subCategory || "",
        sub_sub_category: item.subsubCategory || "",
        quantity: item.quantity ? parseInt(item.quantity, 10) : 0,
        unit: item.unit || "",
      }));
    // console.log("upstreamArray", upstreamArray);
    const convertedUpstreamArray = upstreamArray
      .slice(0, -1) // Filter out empty or invalid items
      .map((item) => ({
        asset_type: item.assetType,
        source_energy: item.sourceOfEnergy, // Change source_energy to LPG
        quantity: item.quantity, // Set quantity to 1000
      }));
    // console.log("convertedUpstreamArray", convertedUpstreamArray);
    const payload = {
      wasteGenerated: convertedWasteArray,
      businessTravel: [
        {
          travel_class: "Economy",
          distance_km: 1200,
          num_trips: 3,
        },
        {
          travel_class: "Business",
          distance_km: 5000,
          num_trips: 1,
        },
      ],
      purchasedGoods: purchaseData.slice(0, -1),
      capitalGoods: capitalArray,
      investments: investData,
      employeeCommuting: comutingData.slice(0, -1),
      fuelRelatedActivities: convertedFuelArray,
      upstreamLeasedAssets: convertedUpstreamArray,
      downstreamLeasedAssets: downstreamArray,
      report_type: type,
      main_report_id: reportid,
    };
    console.log(payload);
    const response = await saveScope3Report(payload);
    console.log(response);
    if (response.status === 201) {
      navigate("/emissionreport");
    } else {
      alert("Something went wrong");
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
      <ReusableTableSection
        title={"Waste Generated"}
        description={
          "Record the type and amount of waste produced, along with the disposal method, to assess emissions from waste processing."
        }
        icon={wasteGenerated}
        headings={wasteHeadings}
        DialogContentComponent={WasteGeneratedPopup}
      />

      <ReusableTableSection
        title={"Business Travel"}
        description={
          "Enter details about travel type, details of airport, and class (business, economy, first) to calculate emissions from business-related travel."
        }
        icon={plane}
        headings={businessHeadings}
        tableData={businessData}
        DialogContentComponent={BusinessTravelPopup}
      />

      <PurchasedGoods />

      <ReusableTableSection
        title={"Capital Goods"}
        description={
          "Record expenses and details about capital goods purchased to estimate lifecycle emissions from these assets."
        }
        icon={goodicon}
        headings={capitalGoodsHeadings}
        DialogContentComponent={CapitalGoodsPopup}
      />

      <Investments />

      <EmployeeCommuting />

      <ReusableTableSection
        title={"Fuel Related Activities"}
        description={
          "Purchased Goods is a key performance indicator that measures the value of goods acquired from external suppliers by an organization."
        }
        icon={fuelRelated}
        headings={fuelRelatedHeadings}
        DialogContentComponent={FuelRelatedPopup}
      />

      <ReusableTableSection
        title={"Upstream Leased Assets"}
        description={
          "Enter energy consumption details for leased assets used in operations to estimate upstream emissions."
        }
        icon={upstream}
        headings={leasedDataHeadings}
        DialogContentComponent={UpstreamLeasedPopup}
      />

      <DownstreamAssets />

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
          Previous
        </Button>

        <Button
          onClick={() => submit("final")}
          sx={{
            borderRadius: "32px",
            padding: "8px 18px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
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
      </Box>
    </div>
  );
};

export default Scope3;
