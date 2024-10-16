/* eslint-disable no-unused-vars */
import "./Organization.css";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useSignup } from "../../context/User-signup";
import {
  fetchCities,
  fetchStates,
  getCountries,
  getIndustries,
  getSectors,
} from "../../api/auth";

export default function Organization({ activeStep, setActiveStep }) {
  const {
    organizationName,
    setOrganizationName,
    organizationCountry,
    setOrganizationCountry,
    organizationState,
    setOrganizationState,
    organizationCity,
    setOrganizationCity,
    organizationIndustry,
    setOrganizationIndustry,
    organizationSector,
    setOrganizationSector,
  } = useSignup();

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);

  const [error, setError] = useState(null);
  // console.log("sectorOptions", sectorOptions);
  // console.log("organizationState", organizationState);
  // console.log("organizationCity", organizationCity);
  // console.log("stateOptions", stateOptions);
  // console.log("cityOptions", cityOptions);
  useEffect(() => {
    // const loadInitialData = async () => {
    //   try {
    //     const { countries, industries, sectors } =
    //       await fetchInitialOrganizationData();
    //     console.log("countries", countries);
    //     console.log("industries", industries);
    //     console.log("sectors", sectors);
    //     setCountryOptions(countries);
    //     setIndustryOptions(industries);
    //     setSectorOptions(sectors);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };

    // loadInitialData();
    getAllCountries();
    getAllSectors();
    // getAllIndustries();
  }, []);
  useEffect(() => {
    if (organizationSector.length) getAllIndustries(organizationSector);
  }, [organizationSector]);

  async function getAllCountries() {
    const response = await getCountries();
    if (response?.status === 200) {
      console.log(response);
      const sortedData = response?.data.sort((a, b) => {
        if (a.countryName < b.countryName) return -1;
        if (a.countryName > b.countryName) return 1;
        return 0;
      });
      setCountryOptions(sortedData);
      // setCountryOptions(response.data);
    }
  }
  async function getAllSectors() {
    const response = await getSectors();
    if (response?.status === 200) {
      console.log(response);
      setSectorOptions(response.data);
    }
  }
  async function getAllIndustries(id) {
    const response = await getIndustries(id);
    if (response?.status === 200) {
      console.log(response);
      setIndustryOptions(response.data);
    }
  }

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;

    setOrganizationCountry(selectedCountry);
    setOrganizationState("");
    setOrganizationCity("");
    setStateOptions([]);
    setCityOptions([]);

    try {
      const states = await fetchStates(selectedCountry.geonameId);

      setStateOptions(states);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    console.log("selectedState", selectedState);
    setOrganizationState(selectedState);
    setOrganizationCity("");
    setCityOptions([]);

    try {
      const cities = await fetchCities(selectedState.geonameId);
      setCityOptions(cities);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCityChange = (event) => setOrganizationCity(event.target.value);

  const handleIndustryChange = (event) => {
    console.log(event.target.value);
    setOrganizationIndustry(event.target.value);
  };

  const handleSectorChange = (event) => {
    console.log("organizationSector", event.target.value);
    setOrganizationSector(event.target.value);
  };

  const handleCompanyNameChange = (event) =>
    setOrganizationName(event.target.value);

  const isFormComplete = () => {
    return (
      organizationName &&
      organizationCountry &&
      organizationState &&
      organizationCity &&
      organizationIndustry &&
      organizationSector
    );
  };

  const handleSaveAndNext = () => {
    if (isFormComplete()) {
      setActiveStep(activeStep + 1);
    } else {
      setError("Please fill in all fields before proceeding.");
    }
  };

  const selectStyles = {
    fontSize: "14px",
    "&:before": {
      borderColor: "#D9D9D9",
    },
    "&:after": {
      borderColor: "#D9D9D9",
    },
  };

  const menuItemStyles = {
    fontSize: "14px",
    color: "black",
  };

  return (
    <div className="organzation">
      <div className="heading">
        <img src={logo} alt="" className="ge3s_logo1" />
        <h1>Time to enter your organization details </h1>
      </div>
      <p>Company Name</p>
      <div className="comp_name">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Company Name"
          value={organizationName}
          onChange={handleCompanyNameChange}
          sx={selectStyles}
        />
      </div>
      <div className="select_emp_cou">
        <div className="para_select">
          <p>Country</p>
          <FormControl size="small" fullWidth>
            <Select
              value={organizationCountry}
              onChange={handleCountryChange}
              sx={selectStyles}
            >
              {countryOptions.map((country, index) => (
                <MenuItem key={index} value={country} sx={menuItemStyles}>
                  {country.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>State</p>
          <FormControl size="small" fullWidth>
            <Select
              value={organizationState}
              onChange={handleStateChange}
              disabled={!organizationCountry}
              sx={selectStyles}
            >
              {stateOptions.map((state, index) => (
                <MenuItem key={index} value={state} sx={menuItemStyles}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>City</p>
          <FormControl size="small" fullWidth>
            <Select
              value={organizationCity}
              onChange={handleCityChange}
              disabled={!organizationState}
              sx={selectStyles}
            >
              {cityOptions.map((city, index) => (
                <MenuItem key={index} value={city} sx={menuItemStyles}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <p>Sector</p>
      <FormControl fullWidth size="small">
        <Select
          value={organizationSector}
          onChange={handleSectorChange}
          sx={selectStyles}
        >
          {sectorOptions.map((sector) => (
            <MenuItem key={sector.id} value={sector.id} sx={menuItemStyles}>
              {sector.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>Industry</p>
      <FormControl fullWidth size="small">
        <Select
          value={organizationIndustry}
          onChange={handleIndustryChange}
          sx={selectStyles}
        >
          {industryOptions.map((industry, index) => (
            <MenuItem key={index} value={industry._id} sx={menuItemStyles}>
              {industry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button
        className="ge3s_button"
        disabled={!isFormComplete()}
        onClick={handleSaveAndNext}
      >
        Save & Next
      </button>
    </div>
  );
}
