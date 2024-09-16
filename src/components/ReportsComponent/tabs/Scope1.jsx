import React from "react";
import FuelConsumption from "../Pages/FuelConsumption";
import RefrigerantData from "../Pages/RefrigerantData";
import ProcessEmission from "../Pages/EmissionPages/ProcessEmission";

const Scope1 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      <FuelConsumption />
      <RefrigerantData />
      <ProcessEmission />
    </div>
  );
};

export default Scope1;
