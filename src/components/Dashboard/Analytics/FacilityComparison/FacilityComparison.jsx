import React, { useState } from "react";
import { Grid2, Paper, Typography, Select, MenuItem, Button, Avatar } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FacilityDataComparisonTable from "./FacilityDataComparisonTable";
import FacilityFilter from './FacilityFilter';

const companyData = [
  {
    id: 1,
    name: "Lamborghini Pvt. Ltd",
    logo: "https://static.cdnlogo.com/logos/l/54/lamborghini.svg",
    data: {
      fuelConsumption: {
        diesel: "234 tCO2e",
        gasoline: "233 tCO2e",
        HFO: "454 tCO2e",
        LPG: "455 tCO2e",
        CNG: "456 tCO2e",
      },
      refrigerantData: {
        R410: "448 tCO2e",
        R22: "449 tCO2e",
        R134a: "450 tCO2e",
        HFC32: "451 tCO2e",
        HCFC: "452 tCO2e",
      },
      processEmissions: {
        wasteDisposal: "1024 tCO2e",
        processEmission: "1234 tCO2e",
        fugitive: "1354 tCO2e",
      },
      electricityConsumption: {
        emissions: "456 tCO2e"
      },
      chilledWaterConsumption: {
        emissions: "490 tCO2e"
      },
      heatConsumption: {
        emissions: "467 tCO2e"
      },
    },
  },
  {
    id: 2,
    name: "McDonalds Pvt. Ltd",
    logo: "https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png",
    data: {
      fuelConsumption: {
        diesel: "324 tCO2e",
        gasoline: "323 tCO2e",
        HFO: "454 tCO2e",
        LPG: "455 tCO2e",
        CNG: "456 tCO2e",
      },
      refrigerantData: {
        R410: "448 tCO2e",
        R22: "449 tCO2e",
        R134a: "450 tCO2e",
        HFC32: "451 tCO2e",
        HCFC: "452 tCO2e",
      },
      processEmissions: {
        wasteDisposal: "1124 tCO2e",
        processEmission: "1134 tCO2e",
        fugitive: "1154 tCO2e",
      },
      electricityConsumption: {
        emissions: "456 tCO2e"
      },
      chilledWaterConsumption: {
        emissions: "490 tCO2e"
      },
      heatConsumption: {
        emissions: "467 tCO2e"
      },
    },
  },
  {
    id: 3,
    name: "Royal Car Ltd",
    logo: "https://graphicsfamily.com/wp-content/uploads/edd/2022/11/Royal-Cars-Logo-Design-scaled.jpg",
    data: {
      fuelConsumption: {
        diesel: "224 tCO2e",
        gasoline: "223 tCO2e",
        HFO: "454 tCO2e",
        LPG: "455 tCO2e",
        CNG: "456 tCO2e",
      },
      refrigerantData: {
        R410: "448 tCO2e",
        R22: "449 tCO2e",
        R134a: "450 tCO2e",
        HFC32: "451 tCO2e",
        HCFC: "452 tCO2e",
      },
      processEmissions: {
        wasteDisposal: "1025 tCO2e",
        processEmission: "1235 tCO2e",
        fugitive: "1355 tCO2e",
      },
      electricityConsumption: {
        emissions: "456 tCO2e"
      },
      chilledWaterConsumption: {
        emissions: "490 tCO2e"
      },
      heatConsumption: {
        emissions: "467 tCO2e"
      },
    },
  },
];



const FacilityComparison = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([null, null, null]);
  const [showComparison, setShowComparison] = useState(false);

  const handleSelect = (index, value) => {
    const updatedCompanies = [...selectedCompanies];
    updatedCompanies[index] = companyData.find((company) => company.id === value);
    setSelectedCompanies(updatedCompanies);
    setShowComparison(false);
  };

  const isCompareEnabled = selectedCompanies.every((company) => company !== null);

  const handleCompare = () => {
    if (isCompareEnabled) {
      setShowComparison(true);
      console.log("Comparing companies", selectedCompanies);
    }
  };

  const handleApplyFilter = (filterData) => {
    console.log('Applied filter:', filterData);
    // Apply the filter to your data
  };

  const handleCancelFilter = () => {
    console.log('Filter cancelled');
    // Reset any applied filters
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: '600',
            fontFamily: 'Inter',
            padding: '0.5rem',
          }}
        >
          Facility Comparison
        </Typography>
        <FacilityFilter onApply={handleApplyFilter} onCancel={handleCancelFilter} />
      </div>
      {!showComparison && (
        <>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-between' }}>
            {selectedCompanies.map((company, index) => (
              <div key={index} style={{ width: '32%', border: '1px solid rgba(217, 217, 217, 0.40)', borderRadius: '8px', padding: '1.4rem' }}>
                <div style={{ display: 'flex', gap: '1.2rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {company ? (
                    <>
                      <Avatar
                        alt={company.name}
                        src={company.logo}
                        sx={{ width: 60, height: 60, margin: "0 auto" }}
                      />
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 89 88" fill="none">
                        <rect x="1.11111" y="0.611111" width="86.7778" height="86.7778" rx="43.3889" stroke="#717171" stroke-width="1.22222" stroke-dasharray="2.44 2.44" />
                        <path d="M31.0586 44H57.9475" stroke="#717171" stroke-width="1.22222" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M44.5 30.5547V57.4436" stroke="#717171" stroke-width="1.22222" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </>
                  )}
                  <Typography style={{ color: '#717171', fontSize: '1rem', fontFamily: 'Inter', fontWeight: '400' }}>
                    Select Facility for Comparison
                  </Typography>
                  <Select
                    value={company ? company.id : ""}
                    onChange={(e) => handleSelect(index, e.target.value)}
                    fullWidth
                    displayEmpty
                    placeholder="Select Facility"
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      margin: '0',
                      border: '1px solid rgba(217, 217, 217, 0.40)',
                      borderRadius: '5px',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(217, 217, 217, 0.40)',
                      },
                      '& .MuiSelect-select': {
                        padding: '12px 16px',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <span style={{ color: '#717171' }}>Select Facility</span>
                    </MenuItem>
                    {companyData.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>

                </div>
              </div>
            ))}
          </div>
          {/* Compare Button */}
          <Grid2 item xs={12} sx={{ textAlign: "center", marginTop: 4 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#369D9C',
                textTransform: 'none',
                borderRadius: '52px',
                padding: '0.7rem 1.8rem',
                background: !isCompareEnabled ? '#717171' : 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                '&:hover': { backgroundColor: '#28814D' },
                color: 'white'
              }}
              disabled={!isCompareEnabled}
              onClick={handleCompare}
            >
              Compare now
            </Button>
          </Grid2>
        </>
      )
      }


      {/* Data display for comparison */}
      {showComparison && (
        <div style={{ display: 'flex', border: '1px solid rgba(217, 217, 217, 0.40)' }}>
          <div style={{ width: '30%' }}>
            <Typography variant="h5" sx={{ margin: 3 }}>
              Data Points
            </Typography>
          </div>
          <div style={{ display: 'flex', width: '70%' }}>
            {selectedCompanies.map((company, index) => (
              <div key={index} style={{ padding: '1.4rem', width: '100%' }}>
                <div >
                  {company && (
                    <>
                      <Avatar
                        alt={company.name}
                        src={company.logo}
                        sx={{ width: 60, height: 60 }}
                      />
                      <Typography style={{ color: '#717171', fontSize: '1rem', fontFamily: 'Inter', fontWeight: '400', marginTop: '1.2rem' }}>
                        {company.name}
                      </Typography>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showComparison && (
        <>
          <FacilityDataComparisonTable title="Fuel Consumption" svg={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11.6361 1.65767L11.9716 2.12635L12.1358 2.35814L12.4572 2.81621L12.6143 3.04289L12.9207 3.49075L13.2181 3.93232L13.5057 4.36682L13.7838 4.79503L13.919 5.00639L14.1826 5.424L14.4368 5.83492L14.6815 6.23878L14.9161 6.63635C15.1384 7.01631 15.3543 7.40005 15.5635 7.78742L15.7599 8.15789L15.8546 8.34057L16.0369 8.70082C17.1306 10.9008 17.6775 12.7146 17.6775 14.1427C17.6775 17.8312 14.6874 20.8212 10.9989 20.8212C7.31035 20.8212 4.32031 17.8312 4.32031 14.1427C4.32031 12.7146 4.86717 10.9008 5.96088 8.70082L6.14317 8.34057L6.23746 8.15789L6.43428 7.78782C6.64347 7.40031 6.85932 7.01644 7.08171 6.63635L7.31624 6.23878L7.56099 5.83492L7.81517 5.424L8.07838 5.00639L8.21392 4.79464L8.49206 4.36682L8.77963 3.93232L9.07703 3.49114L9.38346 3.04328L9.7001 2.58796L9.86196 2.35814L10.1927 1.89299L10.3617 1.65807C10.4345 1.55714 10.5302 1.47496 10.641 1.41827C10.7518 1.36159 10.8744 1.33203 10.9989 1.33203C11.1233 1.33203 11.246 1.36159 11.3568 1.41827C11.4676 1.47496 11.5633 1.55714 11.6361 1.65807M10.9989 3.47346L10.6885 3.92014L10.3876 4.35935L10.0965 4.7915L9.95467 5.00482L9.67849 5.42596L9.41174 5.83964L9.1552 6.24624L9.03028 6.4466L8.78828 6.84221L8.67121 7.03746L8.44335 7.42167L8.2261 7.79882C8.11963 7.98503 8.01671 8.16889 7.91771 8.35L7.72442 8.70789L7.54096 9.05871C7.48124 9.17421 7.4231 9.28853 7.36692 9.40167L7.2031 9.73678L7.04871 10.0648C6.94892 10.2809 6.85581 10.4915 6.76899 10.6973L6.64328 11.0014C6.14199 12.2542 5.89174 13.3043 5.89174 14.1427C5.89174 16.9634 8.17817 19.2498 10.9989 19.2498C13.8196 19.2498 16.106 16.9634 16.106 14.1427C16.106 13.3043 15.8562 12.2542 15.3541 11.001L15.2288 10.6965C15.1423 10.4911 15.0488 10.2801 14.9491 10.064L14.7947 9.73639L14.6308 9.40128C14.5736 9.28657 14.5156 9.17224 14.4568 9.05832L14.2733 8.7075L14.0801 8.3496C13.9811 8.16889 13.8781 7.98464 13.7717 7.79803L13.554 7.42128L13.3266 7.03707L13.0897 6.645C13.0078 6.51163 12.9255 6.37858 12.8426 6.24585L12.586 5.83925L12.3193 5.42557L12.0431 5.00442L11.9017 4.7911L11.6102 4.35896L11.3096 3.91974C11.2075 3.77203 11.1042 3.62314 10.9989 3.47307M15.1125 13.7856C15.1141 13.8111 15.1137 13.8366 15.1113 13.8618C14.9856 15.2006 14.5566 16.2358 13.8243 16.9681C13.1227 17.6701 12.1425 18.0932 10.8838 18.2378L10.718 18.2551C10.6471 18.2618 10.5757 18.253 10.5085 18.2294C10.4414 18.2058 10.3801 18.168 10.329 18.1185C10.2779 18.069 10.238 18.009 10.2123 17.9427C10.1865 17.8763 10.1754 17.8052 10.1798 17.7342C10.1881 17.5966 10.2502 17.4677 10.3526 17.3755C10.4551 17.2833 10.5897 17.235 10.7274 17.2411C11.6129 17.2804 12.4057 16.9504 13.1062 16.25C13.7748 15.5813 14.1064 14.8286 14.1005 13.991L14.0973 13.8712C14.0911 13.7334 14.1393 13.5987 14.2316 13.4962C14.3238 13.3936 14.4527 13.3315 14.5904 13.3232C14.6551 13.3192 14.7199 13.328 14.7812 13.3491C14.8424 13.3702 14.899 13.4031 14.9475 13.4461C14.996 13.489 15.0356 13.5411 15.064 13.5993C15.0924 13.6576 15.1086 13.7209 15.1125 13.7856Z" fill="url(#paint0_linear_1214_53714)" />
            <defs>
              <linearGradient id="paint0_linear_1214_53714" x1="4.32031" y1="1.33203" x2="20.1318" y2="3.58333" gradientUnits="userSpaceOnUse">
                <stop stop-color="#369D9C" />
                <stop offset="1" stop-color="#28814D" />
              </linearGradient>
            </defs>
          </svg>} data={selectedCompanies.map(c => c.data.fuelConsumption)} selectedCompanies={selectedCompanies} />
          <FacilityDataComparisonTable title="Refrigerant Data" svg={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
              <g clip-path="url(#clip0_1214_53784)">
                <path d="M6.42634 0.642578L8.99777 3.21401M8.99777 3.21401L11.5692 0.642578M8.99777 3.21401V14.7854M0.640625 11.5711L3.21205 8.99972M3.21205 8.99972L0.640625 6.42829M3.21205 8.99972H14.7835M11.5692 17.3569L8.99777 14.7854M8.99777 14.7854L6.42634 17.3569M17.3549 6.42829L14.7835 8.99972M14.7835 8.99972L17.3549 11.5711M4.49777 4.49972L6.42634 6.42829M6.42634 11.5711L4.49777 13.4997M13.4978 4.49972L11.5692 6.42829M11.5692 11.5711L13.4978 13.4997" stroke="url(#paint0_linear_1214_53784)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_1214_53784" x1="0.640625" y1="0.642578" x2="19.9921" y2="4.66284" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#369D9C" />
                  <stop offset="1" stop-color="#28814D" />
                </linearGradient>
                <clipPath id="clip0_1214_53784">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          } data={selectedCompanies.map(c => c.data.refrigerantData)} selectedCompanies={selectedCompanies} />
          <FacilityDataComparisonTable title="Process Emissions" svg={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
            <g clip-path="url(#clip0_1214_53852)">
              <path d="M6.42634 0.642578L8.99777 3.21401M8.99777 3.21401L11.5692 0.642578M8.99777 3.21401V14.7854M0.640625 11.5711L3.21205 8.99972M3.21205 8.99972L0.640625 6.42829M3.21205 8.99972H14.7835M11.5692 17.3569L8.99777 14.7854M8.99777 14.7854L6.42634 17.3569M17.3549 6.42829L14.7835 8.99972M14.7835 8.99972L17.3549 11.5711M4.49777 4.49972L6.42634 6.42829M6.42634 11.5711L4.49777 13.4997M13.4978 4.49972L11.5692 6.42829M11.5692 11.5711L13.4978 13.4997" stroke="url(#paint0_linear_1214_53852)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <linearGradient id="paint0_linear_1214_53852" x1="0.640625" y1="0.642578" x2="19.9921" y2="4.66284" gradientUnits="userSpaceOnUse">
                <stop stop-color="#369D9C" />
                <stop offset="1" stop-color="#28814D" />
              </linearGradient>
              <clipPath id="clip0_1214_53852">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>} data={selectedCompanies.map(c => c.data.processEmissions)} selectedCompanies={selectedCompanies} />
          <FacilityDataComparisonTable title="Electricity Consumption" svg={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4995 7.65H10.0678L12.1135 2.8773C12.1428 2.80882 12.1547 2.73413 12.1481 2.65992C12.1415 2.58571 12.1165 2.51431 12.0755 2.45213C12.0344 2.38995 11.9786 2.33893 11.913 2.30365C11.8473 2.26837 11.774 2.24993 11.6995 2.25H7.19949C7.11136 2.24992 7.02515 2.27572 6.95155 2.3242C6.87795 2.37268 6.82021 2.4417 6.78549 2.5227L4.08549 8.8227C4.05613 8.89118 4.04424 8.96587 4.05088 9.04008C4.05751 9.11429 4.08247 9.18569 4.12351 9.24787C4.16455 9.31005 4.22038 9.36107 4.286 9.39635C4.35163 9.43163 4.42498 9.45007 4.49949 9.45H6.72609L4.08189 16.0326C3.90189 16.4799 4.45719 16.8588 4.80819 16.5276L9.32979 12.2589L13.792 8.442C13.8619 8.38221 13.9118 8.30243 13.935 8.21341C13.9582 8.12439 13.9535 8.03039 13.9217 7.9441C13.8898 7.8578 13.8322 7.78335 13.7567 7.73076C13.6813 7.67818 13.5915 7.64999 13.4995 7.65ZM9.38559 8.55H12.2809L8.72769 11.5902L5.68119 14.4657L7.80969 9.1674C7.83705 9.09912 7.84726 9.02518 7.83942 8.95205C7.83158 8.87891 7.80593 8.80881 7.76472 8.74788C7.72351 8.68696 7.668 8.63706 7.60303 8.60256C7.53807 8.56806 7.46564 8.55002 7.39209 8.55H5.18169L7.49649 3.15H11.0173L8.97159 7.9227C8.94223 7.99118 8.93034 8.06587 8.93697 8.14008C8.94361 8.21429 8.96857 8.28569 9.00961 8.34787C9.05065 8.41005 9.10648 8.46107 9.17211 8.49635C9.23773 8.53163 9.31108 8.55007 9.38559 8.55Z" fill="url(#paint0_linear_1214_53554)" />
            <defs>
              <linearGradient id="paint0_linear_1214_53554" x1="4.04688" y1="2.25" x2="15.7677" y2="3.92413" gradientUnits="userSpaceOnUse">
                <stop stop-color="#369D9C" />
                <stop offset="1" stop-color="#28814D" />
              </linearGradient>
            </defs>
          </svg>} data={selectedCompanies.map(c => c.data.electricityConsumption)} selectedCompanies={selectedCompanies} />
          <FacilityDataComparisonTable title="Chilled Water Consumption" svg={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 14.2503C7.11975 14.2503 5.9385 13.2415 5.15025 12.292C4.82025 11.8945 4.19025 11.9005 3.9015 12.3243C3.37575 13.0968 2.763 13.8093 1.5 14.0898M16.5 14.0898C15.309 13.8258 14.697 13.1778 14.19 12.4563C13.872 12.0048 13.1737 12.0318 12.8287 12.466C12.5212 12.853 12.1545 13.2085 11.7113 13.5003M9 6.75026C10.8802 6.75026 12.0615 5.74151 12.8505 4.79201C13.1798 4.39451 13.8105 4.40051 14.0985 4.82426C14.6243 5.59676 15.237 6.30926 16.5 6.58976M1.5 6.58976C2.691 6.32576 3.303 5.67776 3.81 4.95626C4.12725 4.50476 4.82625 4.53251 5.1705 4.96601C5.478 5.35226 5.8455 5.70851 6.28875 6.00026M16.5 10.3398C15.309 10.0758 14.697 9.42776 14.19 8.70626C13.872 8.25476 13.1737 8.28176 12.8287 8.71601C12.0412 9.70751 10.8637 10.5003 9 10.5003C7.11975 10.5003 5.9385 9.49151 5.15025 8.54201C4.82025 8.14451 4.19025 8.15051 3.9015 8.57426C3.37575 9.34676 2.763 10.0593 1.5 10.3398" fill="url(#paint0_linear_1214_53583)" />
            <path d="M9 14.2503C7.11975 14.2503 5.9385 13.2415 5.15025 12.292C4.82025 11.8945 4.19025 11.9005 3.9015 12.3243C3.37575 13.0968 2.763 13.8093 1.5 14.0898M16.5 14.0898C15.309 13.8258 14.697 13.1778 14.19 12.4563C13.872 12.0048 13.1737 12.0318 12.8287 12.466C12.5212 12.853 12.1545 13.2085 11.7112 13.5003M9 6.75026C10.8802 6.75026 12.0615 5.74151 12.8505 4.79201C13.1798 4.39451 13.8105 4.40051 14.0985 4.82426C14.6243 5.59676 15.237 6.30926 16.5 6.58976M1.5 6.58976C2.691 6.32576 3.303 5.67776 3.81 4.95626C4.12725 4.50476 4.82625 4.53251 5.1705 4.96601C5.478 5.35226 5.8455 5.70851 6.28875 6.00026M16.5 10.3398C15.309 10.0758 14.697 9.42776 14.19 8.70626C13.872 8.25476 13.1737 8.28176 12.8287 8.71601C12.0412 9.70751 10.8637 10.5003 9 10.5003C7.11975 10.5003 5.9385 9.49151 5.15025 8.54201C4.82025 8.14451 4.19025 8.15051 3.9015 8.57426C3.37575 9.34676 2.763 10.0593 1.5 10.3398" stroke="url(#paint1_linear_1214_53583)" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
              <linearGradient id="paint0_linear_1214_53583" x1="1.5" y1="4.5" x2="17.9372" y2="9.75344" gradientUnits="userSpaceOnUse">
                <stop stop-color="#369D9C" />
                <stop offset="1" stop-color="#28814D" />
              </linearGradient>
              <linearGradient id="paint1_linear_1214_53583" x1="1.5" y1="4.5" x2="17.9372" y2="9.75344" gradientUnits="userSpaceOnUse">
                <stop stop-color="#369D9C" />
                <stop offset="1" stop-color="#28814D" />
              </linearGradient>
            </defs>
          </svg>} data={selectedCompanies.map(c => c.data.chilledWaterConsumption)} selectedCompanies={selectedCompanies} />
          <FacilityDataComparisonTable title="Heat Consumption" svg={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none">
            <path d="M5.74038 12.5022C5.13181 11.8774 4.58338 11.1876 4.10888 10.4466L4.078 10.3946C3.389 9.0255 2.98519 7.41106 2.98519 5.70238C2.98519 4.95081 3.06319 4.21712 3.21188 3.51025L3.19969 3.57931C3.20375 3.55412 3.20538 3.52488 3.20538 3.49563C3.20538 3.15925 2.93238 2.88625 2.596 2.88625C2.28319 2.88625 2.02563 3.12188 1.99069 3.42575V3.42819C1.84769 4.11637 1.76562 4.90775 1.76562 5.71781C1.76562 7.6475 2.23119 9.4675 3.05588 11.0738L3.025 11.008C3.57588 11.8782 4.17388 12.6346 4.84094 13.3228L4.83769 13.3188C5.33413 13.8404 5.80131 14.4034 6.22869 14.9974L6.26119 15.0445C7.11188 16.3526 7.61725 17.9524 7.61725 19.6709C7.61725 20.589 7.47263 21.4738 7.20531 22.3034L7.22238 22.2424C7.20531 22.2969 7.19475 22.3586 7.19475 22.4236C7.19475 22.6958 7.37269 22.9258 7.61888 23.0046L7.62294 23.0054C7.67738 23.0216 7.73913 23.0322 7.80331 23.0322H7.80413C8.0755 23.0322 8.30625 22.8542 8.38344 22.6081L8.38425 22.604C8.67675 21.7224 8.84494 20.7076 8.84494 19.6538C8.84494 17.6851 8.25669 15.8529 7.24675 14.3246L7.2695 14.3604C6.7755 13.6689 6.27338 13.0628 5.73306 12.4932L5.74038 12.5006V12.5022ZM13.4226 12.5509C12.6864 11.7945 12.0226 10.9593 11.4482 10.0623L11.4108 9.99969C10.5731 8.33975 10.0824 6.38163 10.0824 4.30894C10.0824 3.40138 10.1766 2.51575 10.3554 1.66181L10.3408 1.7455C10.3432 1.726 10.344 1.70325 10.344 1.67969C10.344 1.34331 10.071 1.07031 9.73463 1.07031C9.42831 1.07031 9.17481 1.29619 9.13175 1.59113V1.59438C8.96031 2.415 8.86281 3.35831 8.86281 4.32438C8.86281 6.61806 9.41531 8.78256 10.3944 10.6919L10.3578 10.6131C11.0151 11.6507 11.7285 12.5518 12.5239 13.3732L12.5199 13.3691C13.1187 13.9988 13.6818 14.6772 14.1977 15.3931L14.2367 15.4499C15.2694 17.0392 15.8828 18.9827 15.8828 21.0692C15.8828 22.1847 15.7073 23.2597 15.3823 24.2672L15.4026 24.1932C15.3856 24.2469 15.375 24.3094 15.375 24.3736C15.375 24.6458 15.5529 24.8766 15.7991 24.9554L15.8032 24.9562C15.8576 24.9733 15.9194 24.983 15.9836 24.983C16.2558 24.983 16.4865 24.8051 16.5645 24.5589L16.5653 24.5548C16.9123 23.5083 17.1121 22.3034 17.1121 21.0513C17.1121 18.7138 16.415 16.5387 15.2174 14.7236L15.2442 14.7666C14.6551 13.9436 14.0571 13.2204 13.4128 12.5412L13.4209 12.5501L13.4226 12.5509ZM22.6038 14.5237C22.1098 13.8331 21.6085 13.2269 21.0682 12.6574L21.0755 12.6647C20.4669 12.0391 19.9185 11.3484 19.4432 10.6066L19.4123 10.5546C18.7225 9.18638 18.3187 7.57275 18.3187 5.86406C18.3187 5.1125 18.3967 4.37963 18.5454 3.67194L18.5332 3.741C18.5364 3.71825 18.5381 3.69144 18.5381 3.66462C18.5381 3.32825 18.2651 3.05525 17.9287 3.05525C17.6191 3.05525 17.3632 3.286 17.3242 3.585V3.58825C17.1804 4.27644 17.0983 5.06781 17.0983 5.87869C17.0983 7.80756 17.5639 9.62838 18.3894 11.2331L18.3585 11.1672C18.9094 12.0391 19.5074 12.7963 20.1761 13.4853L20.1728 13.4821C20.6693 14.0037 21.1356 14.5651 21.5622 15.1583L21.5947 15.2054C22.4446 16.5127 22.9508 18.1125 22.9508 19.8301C22.9508 20.7491 22.8061 21.6339 22.538 22.4642L22.5551 22.4033C22.538 22.4569 22.5274 22.5195 22.5274 22.5837C22.5274 22.8559 22.7054 23.0866 22.9516 23.1654L22.9556 23.1663C23.0084 23.1833 23.0694 23.1931 23.1328 23.1931C23.1344 23.1931 23.1352 23.1931 23.1368 23.1931C23.409 23.1931 23.6398 23.0151 23.7178 22.7689L23.7186 22.7649C24.0103 21.8841 24.1784 20.8701 24.1784 19.8163C24.1784 17.8468 23.5902 16.0146 22.5811 14.4855L22.6038 14.5221V14.5237Z" fill="url(#paint0_linear_1214_53617)" />
            <defs>
              <linearGradient id="paint0_linear_1214_53617" x1="1.76563" y1="1.07031" x2="27.8458" y2="6.14863" gradientUnits="userSpaceOnUse">
                <stop stop-color="#369D9C" />
                <stop offset="1" stop-color="#28814D" />
              </linearGradient>
            </defs>
          </svg>} data={selectedCompanies.map(c => c.data.heatConsumption)} selectedCompanies={selectedCompanies} />
        </>
      )}
    </div>
  );
};

export default FacilityComparison;
