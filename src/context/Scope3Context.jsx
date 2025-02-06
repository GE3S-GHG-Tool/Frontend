import { createContext, useState, useContext } from "react";

// Create a Context for the Scope 3 data
const Scope3Context = createContext();

// Create a provider component
export const Scope3Provider = ({ children }) => {
  const [capitalGoods, setCapitalGoods] = useState(
    localStorage.getItem("capitalGoodsData")
      ? JSON.parse(localStorage.getItem("capitalGoodsData"))
      : []
  );
  const [investements, setInvestements] = useState(
    localStorage.getItem("investements")
      ? JSON.parse(localStorage.getItem("investements"))
      : []
  );
  const [business, setBusiness] = useState(
    localStorage.getItem("business")
      ? JSON.parse(localStorage.getItem("business"))
      : []
  );
  const [employeecommuting, setEmployeeCommuting] = useState(
    localStorage.getItem("commuting")
      ? JSON.parse(localStorage.getItem("commuting"))
      : []
  );
  const [fuelData, setFuelData] = useState(
    localStorage.getItem("fuel") ? JSON.parse(localStorage.getItem("fuel")) : []
  );
  const [upStreamData, setUpStreamData] = useState(
    localStorage.getItem("upStreamData")
      ? JSON.parse(localStorage.getItem("upStreamData"))
      : []
  );
  const [downStreamData, setDownStreamData] = useState(
    localStorage.getItem("downStreamData")
      ? JSON.parse(localStorage.getItem("downStreamData"))
      : []
  );
  const [wasteData, setWasteData] = useState(
    localStorage.getItem("wasteData")
      ? JSON.parse(localStorage.getItem("wasteData"))
      : []
  );
  const [goods, setGoods] = useState(
    localStorage.getItem("goods")
      ? JSON.parse(localStorage.getItem("goods"))
      : []
  );
  const [consumption, setConsumption] = useState(
    localStorage.getItem("consumption")
      ? JSON.parse(localStorage.getItem("consumption"))
      : []
  );

  const [refrigerent, setRefrigerent] = useState(
    localStorage.getItem("refrigerent")
      ? JSON.parse(localStorage.getItem("refrigerent"))
      : []
  );

  const [emission, setEmission] = useState(
    localStorage.getItem("processEmissionData")
      ? JSON.parse(localStorage.getItem("processEmissionData"))
      : []
  );

  const [universalScopeData, setUniversalScopeData] = useState({});

  const resetScopeData = () => {
    setCapitalGoods([]);
    setInvestements([]);
    setBusiness([]);
    setEmployeeCommuting([])
    setFuelData([])
    setDownStreamData([])
    setUpStreamData([])
    setWasteData([]);
    setGoods([])
    setRefrigerent([])
    setConsumption([])
    setEmission([])
    setUniversalScopeData({})
  }

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
    setBusiness,
    business,
    setEmission,
    emission,
    universalScopeData,
    setUniversalScopeData,
    resetScopeData,

  };
  return (
    <Scope3Context.Provider value={value}>{children}</Scope3Context.Provider>
  );
};

// Custom hook to use the Scope 3 context
export const useScope3 = () => {
  return useContext(Scope3Context);
};
