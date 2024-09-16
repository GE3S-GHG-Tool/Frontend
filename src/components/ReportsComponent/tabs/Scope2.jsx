import React from "react";
import ElecticityConsumption from "../Pages/ElecticityConsumption";
import ChilledWaterConsumption from "../Pages/ChilledWaterConsumption";
import DesalinatedWater from "../Pages/DesalinatedWater";
import HeatConsumption from "../Pages/HeatConsumption";

const Scope2 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      <ElecticityConsumption />
      <ChilledWaterConsumption />
      <DesalinatedWater />
      <HeatConsumption />
    </div>
  );
};

export default Scope2;
