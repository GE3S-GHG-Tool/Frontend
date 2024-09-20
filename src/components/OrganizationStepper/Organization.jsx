// import "./Organization.css";
// import logo from "../../assets/images/ge3s_logo.png";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
// import { useState, useEffect } from "react";
// import { useSignup } from "../../context/User-signup";
// import axiosInstance from "../../util/axiosInstance";

// export default function Organization({ activeStep, setActiveStep }) {
//   const {
//     organizationName,
//     setOrganizationName,
//     organizationCountry,
//     setOrganizationCountry,
//     organizationState,
//     setOrganizationState,
//     organizationCity,
//     setOrganizationCity,
//     organizationIndustry,
//     setOrganizationIndustry,
//     organizationSector,
//     setOrganizationSector,
//   } = useSignup();

//   const [industryOptions, setIndustryOptions] = useState([]);
//   const [sectorOptions, setSectorOptions] = useState([]);
//   const [industryOpen, setIndustryOpen] = useState(false);
//   const [sectorOpen, setSectorOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [industryResponse, sectorResponse] = await Promise.all([
//           axiosInstance.get("api/industry"),
//           axiosInstance.get("api/sector"),
//         ]);
//         setIndustryOptions(industryResponse.data);
//         setSectorOptions(sectorResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange1 = (event) => setOrganizationCountry(event.target.value);
//   const handleChange2 = (event) => setOrganizationState(event.target.value);
//   const handleChange3 = (event) => setOrganizationCity(event.target.value);
//   const handleChange4 = (event) => {
//     setOrganizationIndustry(event.target.value);
//     setIndustryOpen(false);
//   };
//   const handleChange5 = (event) => {
//     setOrganizationSector(event.target.value);
//     setSectorOpen(false);
//   };
//   const handleCompanyNameChange = (event) =>
//     setOrganizationName(event.target.value);

//   const isFormComplete = () => {
//     return (
//       organizationCountry &&
//       organizationState &&
//       organizationCity &&
//       organizationIndustry &&
//       organizationSector &&
//       organizationName
//     );
//   };

//   return (
//     <div className="organzation">
//       <div className="heading">
//         <img src={logo} alt="" className="ge3s_logo1" />
//         <h1>Time to enter your organization details </h1>
//       </div>
//       <p>Company Name</p>
//       <div className="comp_name">
//         <TextField
//           variant="outlined"
//           size="small"
//           fullWidth
//           placeholder="Company Name"
//           value={organizationName}
//           onChange={handleCompanyNameChange}
//         />
//       </div>
//       <div className="select_emp_cou">
//         <div className="para_select">
//           <p>Country</p>
//           <FormControl size="small">
//             <Select
//               labelId="demo-select-small-label"
//               id="demo-select-small"
//               value={organizationCountry}
//               onChange={handleChange1}
//               placeholder="Employee Count"
//               size="small"
//               displayEmpty
//               renderValue={(selected) => {
//                 if (selected.length === 0) {
//                   return (
//                     <span style={{ color: "#D9D9D9", fontSize: "14px" }}>
//                       Country
//                     </span>
//                   );
//                 }
//                 return selected;
//               }}
//             >
//               <MenuItem
//                 sx={{ color: "#D9D9D9", fontSize: "14px" }}
//                 value=""
//                 disabled
//               >
//                 <span>Country</span>
//               </MenuItem>
//               <MenuItem value={10}>less than 20</MenuItem>
//               <MenuItem value={20}>21 - 50</MenuItem>
//               <MenuItem value={30}>51 - 100</MenuItem>
//               <MenuItem value={40}>101 - 200</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//         <div className="para_select">
//           <p>State</p>
//           <FormControl size="small">
//             <Select
//               labelId="demo-select-small-label"
//               id="demo-select-small"
//               value={organizationState}
//               onChange={handleChange2}
//               displayEmpty
//               renderValue={(selected) => {
//                 if (selected.length === 0) {
//                   return (
//                     <span style={{ color: "#D9D9D9", fontSize: "14px" }}>
//                       State
//                     </span>
//                   );
//                 }
//                 return selected;
//               }}
//             >
//               <MenuItem
//                 sx={{ color: "#D9D9D9", fontSize: "14px" }}
//                 value=""
//                 disabled
//               >
//                 <span>State</span>
//               </MenuItem>
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//         <div className="para_select">
//           <p>City</p>
//           <FormControl size="small">
//             <Select
//               labelId="demo-select-small-label"
//               id="demo-select-small"
//               value={organizationCity}
//               onChange={handleChange3}
//               displayEmpty
//               renderValue={(selected) => {
//                 if (selected.length === 0) {
//                   return (
//                     <span style={{ color: "#D9D9D9", fontSize: "14px" }}>
//                       City
//                     </span>
//                   );
//                 }
//                 return selected;
//               }}
//             >
//               <MenuItem
//                 sx={{ color: "#D9D9D9", fontSize: "14px" }}
//                 value=""
//                 disabled
//               >
//                 <span>City</span>
//               </MenuItem>
//               <MenuItem value={10}>Harayana</MenuItem>
//               <MenuItem value={20}>Kolkata</MenuItem>
//               <MenuItem value={30}>Dhaka</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//       </div>
//       <p>Industry</p>
//       <FormControl fullWidth size="small">
//         <Select
//           labelId="demo-select-small-label"
//           id="demo-select-small"
//           value={organizationIndustry}
//           open={industryOpen}
//           onOpen={() => setIndustryOpen(true)}
//           onClose={() => setIndustryOpen(false)}
//           onChange={handleChange4}
//           displayEmpty
//           renderValue={(selected) => {
//             if (!selected) {
//               return (
//                 <span style={{ color: "gray", fontSize: "14px" }}>
//                   Industry
//                 </span>
//               );
//             }
//             const industry = industryOptions.find(
//               (option) => option.id === selected
//             );
//             return industry ? industry.name : "";
//           }}
//         >
//           <MenuItem sx={{ color: "gray", fontSize: "14px" }} value="" disabled>
//             <span>Industry</span>
//           </MenuItem>
//           {industryOptions.map((option) => (
//             <MenuItem key={option.id} value={option.id}>
//               {option.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <p>Sector</p>
//       <FormControl fullWidth sx={{ margin: "10px 0" }} size="small">
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={organizationSector}
//           open={sectorOpen}
//           onOpen={() => setSectorOpen(true)}
//           onClose={() => setSectorOpen(false)}
//           onChange={handleChange5}
//           displayEmpty
//           renderValue={(selected) => {
//             if (!selected) {
//               return (
//                 <span style={{ color: "gray", fontSize: "14px" }}>Sector</span>
//               );
//             }
//             const sector = sectorOptions.find(
//               (option) => option.id === selected
//             );
//             return sector ? sector.name : "";
//           }}
//         >
//           <MenuItem sx={{ color: "gray", fontSize: "14px" }} value="" disabled>
//             <span>Sector</span>
//           </MenuItem>
//           {sectorOptions.map((option) => (
//             <MenuItem key={option.id} value={option.id}>
//               {option.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <button
//         className="ge3s_button"
//         disabled={!isFormComplete()}
//         onClick={() => {
//           setActiveStep(activeStep + 1);
//         }}
//       >
//         Save & Next
//       </button>
//     </div>
//   );
// }

import "./Organization.css";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useSignup } from "../../context/User-signup";
import axiosInstance from "../../util/axiosInstance";

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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesResponse, industriesResponse, sectorsResponse] =
          await Promise.all([
            axiosInstance.get("api/user/getCountries"),
            axiosInstance.get("api/industry"),
            axiosInstance.get("api/sector"),
          ]);
        setCountryOptions(countriesResponse.data);
        setIndustryOptions(industriesResponse.data);
        setSectorOptions(sectorsResponse.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to load initial data. Please try again.");
      }
    };

    fetchInitialData();
  }, []);

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setOrganizationCountry(selectedCountry);
    setOrganizationState("");
    setOrganizationCity("");
    setStateOptions([]);
    setCityOptions([]);

    try {
      const response = await axiosInstance.get(
        `api/user/getstates/${selectedCountry}`
      );
      setStateOptions(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
      setError("Failed to load states. Please try again.");
    }
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setOrganizationState(selectedState);
    setOrganizationCity("");
    setCityOptions([]);

    try {
      const response = await axiosInstance.get(
        `api/user/getcities/${selectedState}`
      );
      setCityOptions(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to load cities. Please try again.");
    }
  };

  const handleCityChange = (event) => setOrganizationCity(event.target.value);
  const handleIndustryChange = (event) =>
    setOrganizationIndustry(event.target.value);
  const handleSectorChange = (event) =>
    setOrganizationSector(event.target.value);
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
      {error && <div className="error-message">{error}</div>}
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
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#D9D9D9" }}>Country</span>;
                }
                const selectedCountry = countryOptions.find(
                  (country) => country.geonameId === selected
                );
                return selectedCountry ? (
                  <span style={{ color: "black" }}>{selectedCountry.name}</span>
                ) : (
                  ""
                );
              }}
              sx={selectStyles}
            >
              <MenuItem
                value=""
                disabled
                sx={{ ...menuItemStyles, color: "#D9D9D9" }}
              >
                Country
              </MenuItem>
              {countryOptions.map((country) => (
                <MenuItem
                  key={country.geonameId}
                  value={country.geonameId}
                  sx={menuItemStyles}
                >
                  {country.name}
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
              displayEmpty
              disabled={!organizationCountry}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#D9D9D9" }}>State</span>;
                }
                const selectedState = stateOptions.find(
                  (state) => state.geonameId === selected
                );
                return selectedState ? (
                  <span style={{ color: "black" }}>{selectedState.name}</span>
                ) : (
                  ""
                );
              }}
              sx={selectStyles}
            >
              <MenuItem
                value=""
                disabled
                sx={{ ...menuItemStyles, color: "#D9D9D9" }}
              >
                State
              </MenuItem>
              {stateOptions.map((state) => (
                <MenuItem
                  key={state.geonameId}
                  value={state.geonameId}
                  sx={menuItemStyles}
                >
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
              displayEmpty
              disabled={!organizationState}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#D9D9D9" }}>City</span>;
                }
                const selectedCity = cityOptions.find(
                  (city) => city.geonameId === selected
                );
                return selectedCity ? (
                  <span style={{ color: "black" }}>{selectedCity.name}</span>
                ) : (
                  ""
                );
              }}
              sx={selectStyles}
            >
              <MenuItem
                value=""
                disabled
                sx={{ ...menuItemStyles, color: "#D9D9D9" }}
              >
                City
              </MenuItem>
              {cityOptions.map((city) => (
                <MenuItem
                  key={city.geonameId}
                  value={city.geonameId}
                  sx={menuItemStyles}
                >
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <p>Industry</p>
      <FormControl fullWidth size="small">
        <Select
          value={organizationIndustry}
          onChange={handleIndustryChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "#D9D9D9" }}>Industry</span>;
            }
            const selectedIndustry = industryOptions.find(
              (industry) => industry.id === selected
            );
            return selectedIndustry ? (
              <span style={{ color: "black" }}>{selectedIndustry.name}</span>
            ) : (
              ""
            );
          }}
          sx={selectStyles}
        >
          <MenuItem
            value=""
            disabled
            sx={{ ...menuItemStyles, color: "#D9D9D9" }}
          >
            Industry
          </MenuItem>
          {industryOptions.map((industry) => (
            <MenuItem key={industry.id} value={industry.id} sx={menuItemStyles}>
              {industry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>Sector</p>
      <FormControl fullWidth sx={{ margin: "10px 0" }} size="small">
        <Select
          value={organizationSector}
          onChange={handleSectorChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "#D9D9D9" }}>Sector</span>;
            }
            const selectedSector = sectorOptions.find(
              (sector) => sector.id === selected
            );
            return selectedSector ? (
              <span style={{ color: "black" }}>{selectedSector.name}</span>
            ) : (
              ""
            );
          }}
          sx={selectStyles}
        >
          <MenuItem
            value=""
            disabled
            sx={{ ...menuItemStyles, color: "#D9D9D9" }}
          >
            Sector
          </MenuItem>
          {sectorOptions.map((sector) => (
            <MenuItem key={sector.id} value={sector.id} sx={menuItemStyles}>
              {sector.name}
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
