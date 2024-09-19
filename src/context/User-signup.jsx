/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationCountry, setOrganizationCountry] = useState("");
  const [organizationState, setOrganizationState] = useState("");
  const [organizationCity, setOrganizationCity] = useState("");
  const [organizationSector, setOrganizationSector] = useState("");
  const [organizationIndustry, setOrganizationIndustry] = useState("");
  const [organizationFiscalYear, setOrganizationFiscalYear] = useState("");
  const [organizationStartingYear, setOrganizationStartingYear] = useState("");
  const [organizationBaselineYear, setOrganizationBaselineYear] = useState("");
  const [organizationBaselineMonth, setOrganizationBaselineMonth] =
    useState("");
  const [organizationEmployeeCount, setOrganizationEmployeeCount] =
    useState("");
  const [organizationSustainabilityGoals, setOrganizationSustainabilityGoals] =
    useState([]);

  const contextValue = {
    email,
    setEmail,
    fullname,
    setFullname,
    imageUrl,
    setImageUrl,
    password,
    setPassword,
    organizationName,
    setOrganizationName,
    organizationCountry,
    setOrganizationCountry,
    organizationState,
    setOrganizationState,
    organizationCity,
    setOrganizationCity,
    organizationSector,
    setOrganizationSector,
    organizationIndustry,
    setOrganizationIndustry,
    organizationFiscalYear,
    setOrganizationFiscalYear,
    organizationStartingYear,
    setOrganizationStartingYear,
    organizationBaselineYear,
    setOrganizationBaselineYear,
    organizationBaselineMonth,
    setOrganizationBaselineMonth,
    organizationEmployeeCount,
    setOrganizationEmployeeCount,
    organizationSustainabilityGoals,
    setOrganizationSustainabilityGoals,
  };

  return (
    <SignupContext.Provider value={contextValue}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
