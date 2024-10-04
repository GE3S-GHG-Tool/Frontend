import { createContext, useState, useContext, useEffect } from "react";

// Create a Context for the Scope 3 data
const Scope3Context = createContext();

// Create a provider component
export const Scope3Provider = ({ children }) => {
  const [capitalGoods, setCapitalGoods] = useState([]);
  const [investements, setInvestements] = useState(null);
  const [employeecommuting, setEmployeeCommuting] = useState(null);
  const [fuelData, setFuelData] = useState(null);
  const [upStreamData, setUpStreamData] = useState(null);
  const [downStreamData, setDownStreamData] = useState(null);
  const [wasteData, setWasteData] = useState(null);
  const [goods, setGoods] = useState(null);
  const [consumption, setConsumption] = useState(null);
  const [refrigerent, setRefrigerent] = useState(null);

  const value = {
    capitalGoods,
    setCapitalGoods,
    setInvestements,
    investements,
    setEmployeeCommuting,
    employeecommuting,
    setFuelData,
    fuelData,
    upStreamData,
    setUpStreamData,
    setWasteData,
    wasteData,
    setGoods,
    goods,
    setDownStreamData,
    downStreamData,
    setRefrigerent,
    refrigerent,
    consumption,
    setConsumption,
  };
  return (
    <Scope3Context.Provider value={value}>{children}</Scope3Context.Provider>
  );
};

// Custom hook to use the Scope 3 context
export const useScope3 = () => {
  return useContext(Scope3Context);
};
