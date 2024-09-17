import React from "react";
import ReusableTableSection from "../scope3/ReusableTableComponent";
import wasteGenerated from "../../../assets/images/wasteGenerated.svg";
import PurchasedGoods from "../scope3/PurchasedGoods";
import capitalGoods from "../../../assets/images/capitalGoods.svg";
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

const Dummy = () => {
  return <p>Hello</p>;
};

const Scope3 = () => {
  const wasteHeadings = [
    "Waste Type",
    "Waste Category",
    "Disposal Method",
    "Distance of the landfill from pickup point",
    "Fuel Type of Pickup Vehicle",
    "Number of Trips",
    "Quantity of Waste",
  ];

  const wasteData = [
    {
      "Waste Type": "Plastic",
      "Waste Category": "Non-Hazardous",
      "Disposal Method": "Recycling",
      "Distance of the landfill from pickup point": "50 km",
      "Fuel Type of Pickup Vehicle": "Diesel",
      "Number of Trips": 5,
      "Quantity of Waste": "500 kg",
    },
    {
      "Waste Type": "Organic",
      "Waste Category": "Compostable",
      "Disposal Method": "Composting",
      "Distance of the landfill from pickup point": "20 km",
      "Fuel Type of Pickup Vehicle": "Electric",
      "Number of Trips": 2,
      "Quantity of Waste": "300 kg",
    },
    {
      "Waste Type": "Glass",
      "Waste Category": "Non-Hazardous",
      "Disposal Method": "Landfill",
      "Distance of the landfill from pickup point": "30 km",
      "Fuel Type of Pickup Vehicle": "Gasoline",
      "Number of Trips": 3,
      "Quantity of Waste": "200 kg",
    },
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

  const capitalGoodsData = [
    {
      "Asset Type": "Machinery",
      "Asset Category": "Industrial Equipment",
      Expenses: 500000,
      Currency: "USD",
    },
    {
      "Asset Type": "Vehicles",
      "Asset Category": "Transportation",
      Expenses: 150000,
      Currency: "EUR",
    },
    {
      "Asset Type": "Computers",
      "Asset Category": "Office Equipment",
      Expenses: 20000,
      Currency: "USD",
    },
    {
      "Asset Type": "Building",
      "Asset Category": "Real Estate",
      Expenses: 1200000,
      Currency: "GBP",
    },
    {
      "Asset Type": "Furniture",
      "Asset Category": "Office Equipment",
      Expenses: 30000,
      Currency: "USD",
    },
  ];

  const fuelRelatedHeadings = [
    "Category",
    "Sub Category",
    "Sub Sub Category",
    "Quantity",
    "Unit",
  ];

  const fuelRelatedData = [
    {
      Category: "Transportation",
      "Sub Category": "Passenger Vehicles",
      "Sub Sub Category": "",
      Quantity: 1500,
      Unit: "Liters",
    },
    {
      Category: "Transportation",
      "Sub Category": "Freight Vehicles",
      "Sub Sub Category": "Diesel",
      Quantity: 2000,
      Unit: "Liters",
    },
    {
      Category: "Electricity Generation",
      "Sub Category": "Power Plant",
      "Sub Sub Category": "Natural Gas",
      Quantity: 50000,
      Unit: "Cubic Meters",
    },
  ];

  const leasedDataHeadings = [
    "Asset Type",
    "Source Of energy",
    "Value",
    "Unit",
  ];

  const leasedData = [
    {
      "Asset Type": "Building",
      "Source Of energy": "Electricity",
      Value: 50000,
      Unit: "kWh",
    },
    {
      "Asset Type": "Vehicle Fleet",
      "Source Of energy": "Diesel",
      Value: 15000,
      Unit: "Liters",
    },
    {
      "Asset Type": "Machinery",
      "Source Of energy": "Natural Gas",
      Value: 8000,
      Unit: "Cubic Meters",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      <ReusableTableSection
        title={"Waste Generated"}
        description={
          "Record the type and amount of waste produced, along with the disposal method, to assess emissions from waste processing."
        }
        icon={wasteGenerated}
        headings={wasteHeadings}
        tableData={wasteData}
        DialogContentComponent={WasteGeneratedPopup}
        // CREATE SEPARATE COMPONENTS LIKE DUMMY FOR THE DIALOG FORMS
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
        icon={capitalGoods}
        headings={capitalGoodsHeadings}
        tableData={capitalGoodsData}
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
        tableData={fuelRelatedData}
        DialogContentComponent={FuelRelatedPopup}
      />

      <ReusableTableSection
        title={"Upstream Leased Assets"}
        description={
          "Enter energy consumption details for leased assets used in operations to estimate upstream emissions."
        }
        icon={upstream}
        headings={leasedDataHeadings}
        tableData={leasedData}
        DialogContentComponent={UpstreamLeasedPopup}
      />

      <DownstreamAssets />
    </div>
  );
};

export default Scope3;
