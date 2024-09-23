import React, { useState } from "react";
import "./EmissionsInventoryReport.css";
import { Box, Button, Typography, Paper } from "@mui/material";
import logo from "../../assets/images/starbucksLogo.png"
import ge3s from "../../assets/images/ge3s.png"
import backgroundImage from "../../assets/images/sustainabilityHeading.png"
import SemiCirclePieChart from "./Charts/SemiCirclePieChart";
import DirectFootPrintChart from "./Charts/DirectFootPrintChart";
import RefrigerantConsumptionChart from "./Charts/RefrigerantConsumptionChart";
import FuelConsumptionChart from "./Charts/FuelConsumptionChart";
import RefrigerantEmissionsChart from "./Charts/RefrigerantEmissionsChart";
import ConfirmEditReportModal from "./Modals/ConfirmEditReportModal";
import ShareReportModal from "./Modals/ShareReportModal";


const FootPrintData = [
    { label: 'Food Consumption', value: 340345, color: '#028A60', key: '60%' },
    { label: 'Refrigerant Data', value: 245845, color: '#02B880', key: '25%' },
    { label: 'Process Emission', value: 681447, color: '#B1E9D8', key: '15%' },
];

const FuelTypeEmissionBreakdownData = [
    { label: 'Deisel', value: 150000, color: '#028A60', key: '15%' },
    { label: 'Petrol', value: 200000, color: '#02B880', key: '20%' },
    { label: 'HFO', value: 300000, color: '#A9DECE', key: '30%' },
    { label: 'CNG', value: 250000, color: '#D0FFF1', key: '25%' },
    { label: 'LPG', value: 100000, color: '#E9FFF8', key: '10%' }
]

const FuelConsumptionBreakdown = [
    { fuel: 'Diesel', value: 80, color: '#028A60' },
    { fuel: 'Petrol', value: 60, color: '#02B880' },
    { fuel: 'HFP', value: 100, color: '#ADE4D3' },
    { fuel: 'CNG', value: 40, color: '#D0FFF1' },
    { fuel: 'LPG', value: 90, color: '#EAFFF8' },
];

const ProcessEmissionBreakdownData = [
    { label: 'Water Gas Disposal', value: 400000, color: '#028A60', key: '40%' },
    { label: 'Fugitive', value: 200000, color: '#02B880', key: '20%' },
    { label: 'Process & Vented', value: 200000, color: '#A9DECE', key: '40%' },
]

const RefrigerantEmissionsData = [
    { label: 'R22', value: 3.1 },
    { label: 'R410a', value: 6.4 },
    { label: 'HFC-245fa', value: 5.2 },
    { label: 'HFC-23', value: 3.9 },
    { label: 'R134a', value: 4.5 },
]

const RefrigerantConsumptionData = [
    { refrigerant: 'R410a', consumption: 5200 },
    { refrigerant: 'R22', consumption: 8100 },
    { refrigerant: 'R134a', consumption: 3000 },
    { refrigerant: 'HFC-23', consumption: 8500 },
    { refrigerant: 'HFC-245fa', consumption: 5000 },
];

const EmissionsInventoryReport = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div>
            <div
                id="top-heading"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    borderBottom: '1px solid #eeeeee',
                    padding: '1rem 4rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: '#fff'
                }}
            >
                <Typography sx={{ fontWeight: '600', fontStyle: 'Inter', fontSize: '1.4rem', wordSpacing: '0px' }}>GHG Emissions Inventory Report</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.2rem', position: 'relative' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            border: '1px solid #369d9c',
                            textTransform: 'none',
                            color: '#369D9C',
                            borderRadius: '32px',
                            fontSize: '0.7rem',
                            padding: '0.5rem 1.2rem'
                        }}
                        onClick={() => setOpenEditModal(prev => !prev)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#369D9C',
                            textTransform: 'none',
                            borderRadius: '5rem',
                            fontSize: '0.7rem',
                            padding: '0.6rem 1.6rem',
                            background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                            '&:hover': { backgroundColor: '#28814D' },
                        }}
                    >
                        Go to home
                    </Button>
                    <button
                        style={{
                            border: 'none',
                            background: 'transparent',
                            padding: '0',
                            verticalAlign: 'center'
                        }}
                        onClick={toggleDropdown}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_1214_49777)">
                                <path d="M12.75 7.875C13.5784 7.875 14.25 7.20343 14.25 6.375C14.25 5.54657 13.5784 4.875 12.75 4.875C11.9216 4.875 11.25 5.54657 11.25 6.375C11.25 7.20343 11.9216 7.875 12.75 7.875Z" fill="black" />
                                <path d="M12.75 14.25C13.5784 14.25 14.25 13.5784 14.25 12.75C14.25 11.9216 13.5784 11.25 12.75 11.25C11.9216 11.25 11.25 11.9216 11.25 12.75C11.25 13.5784 11.9216 14.25 12.75 14.25Z" fill="black" />
                                <path d="M12.75 20.625C13.5784 20.625 14.25 19.9534 14.25 19.125C14.25 18.2966 13.5784 17.625 12.75 17.625C11.9216 17.625 11.25 18.2966 11.25 19.125C11.25 19.9534 11.9216 20.625 12.75 20.625Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1214_49777">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <Paper
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                right: '-30px',
                                mt: 1,
                                zIndex: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid #d2d2d294',
                                borderRadius: '6px',
                                boxShadow: 'none',
                                width: '140px',
                                padding: '8px 0'
                            }}
                        >
                            <span
                                variant="text"
                                style={{ textTransform: 'none', fontSize: '0.875rem', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '0.5rem', cursor: 'pointer' }}
                                onClick={() => {
                                    setOpenShareModal(prev => !prev)
                                    setDropdownOpen((prev) => !prev)
                                }}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 24 25" fill="none">
                                        <g clip-path="url(#clip0_1214_42954)">
                                            <path d="M13.9778 7.37109L8.52344 10.8773" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.52344 14.1211L13.9778 17.6273" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 15.5C7.65685 15.5 9 14.1569 9 12.5C9 10.8431 7.65685 9.5 6 9.5C4.34315 9.5 3 10.8431 3 12.5C3 14.1569 4.34315 15.5 6 15.5Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.5 22.25C18.1569 22.25 19.5 20.9069 19.5 19.25C19.5 17.5931 18.1569 16.25 16.5 16.25C14.8431 16.25 13.5 17.5931 13.5 19.25C13.5 20.9069 14.8431 22.25 16.5 22.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.5 8.75C18.1569 8.75 19.5 7.40685 19.5 5.75C19.5 4.09315 18.1569 2.75 16.5 2.75C14.8431 2.75 13.5 4.09315 13.5 5.75C13.5 7.40685 14.8431 8.75 16.5 8.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1214_42954">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <span>
                                    Share
                                </span>
                            </span>
                            <span
                                variant="text"
                                style={{ textTransform: 'none', fontSize: '0.875rem', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '0.5rem', cursor: 'pointer' }}
                                onClick={() => console.log('Share button clicked')}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 24 25" fill="none">
                                        <g clip-path="url(#clip0_1214_42964)">
                                            <path d="M12 14V3.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20.25 14V20H3.75V14" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.75 10.25L12 14L8.25 10.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1214_42964">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <span>
                                    Download
                                </span>
                            </span>
                            <span
                                variant="text"
                                style={{ textTransform: 'none', fontSize: '0.875rem', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '0.5rem', cursor: 'pointer' }}
                                onClick={() => console.log('Share button clicked')}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 24 25" fill="none">
                                        <g clip-path="url(#clip0_1214_42972)">
                                            <path d="M6 8V4.25H18V8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M18 14.75H6V20.75H18V14.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 17H2.25V9.5C2.25 8.67125 2.9775 8 3.87469 8H20.1253C21.0225 8 21.75 8.67125 21.75 9.5V17H18" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17.625 12.125C18.0392 12.125 18.375 11.7892 18.375 11.375C18.375 10.9608 18.0392 10.625 17.625 10.625C17.2108 10.625 16.875 10.9608 16.875 11.375C16.875 11.7892 17.2108 12.125 17.625 12.125Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1214_42972">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <span>
                                    Print
                                </span>
                            </span>
                        </Paper>
                    )}

                </Box>
            </div>
            <div style={{ padding: '2.2rem 90px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    <div style={{
                        padding: '40px 0px',
                        overflow: 'hidden',
                        backgroundSize: 'contain',
                        position: 'relative',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'white',
                        backgroundImage: `url(${backgroundImage})`
                    }}>
                        <div className="sustainability-heading" style={{
                            padding: '0 2.4rem', display: 'flex', alignItems: 'center', gap: '1.2rem'

                        }}>
                            <img
                                src={logo}
                                height={65}
                                width={65}
                                alt="Company Logo"
                                style={{
                                    border: "1px solid #ace6e6",
                                    borderRadius: "100%",
                                }}
                            />
                            <div className="sustainability-heading_title">
                                <h1>
                                    Star Bucks
                                </h1>{" "}
                                <h2>I</h2>{" "}
                                <h2>
                                    Delhi For Q3 2024
                                </h2>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center', position: 'absolute', right: '2rem', gap:'0.8rem' }}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: '600' }}>Powered by</Typography>
                            <img
                                src={ge3s}
                                width={60}
                                alt="ge3s Logo"
                            />
                        </div>
                    </div>
                    <div style={{ padding: '1rem 2.2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <Typography sx={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: '500', wordSpacing: '0px' }}>GHG Emission Distribution</Typography>
                            </div>
                            <div>
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <div style={{ height: '10px', background: '#01533A', width: '33.3%' }}></div>
                                    <div style={{ height: '10px', background: '#028A60', width: '33.3%' }}></div>
                                    <div style={{ height: '10px', background: '#02A673', width: '33.3%' }}></div>
                                </div>
                                <div>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: '600', wordSpacing: '0px', marginTop: '0.4rem' }}>Scope 1 (30%)</Typography>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: '600', wordSpacing: '0px', marginTop: '0.2rem' }}>2324 tCO2e</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '2.6rem 2.2rem', display: 'flex' }}>
                            <div style={{ width: '80%' }}>
                                <div>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.6rem', fontWeight: '600', wordSpacing: '0px' }}>Scope 1 Emissions: Your Direct Footprint</Typography>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '0.875rem', fontWeight: '500', wordSpacing: '0px', color: '#717171', width: '35%' }}>
                                        Your carbon footprint includes direct emissions from your operations, like your buildings and vehicles.
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4rem', gap: '0.8rem', width: '30%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderBottom: '1px solid rgba(217, 217, 217, 0.40)' }}>
                                            <div style={{ width: '1rem', height: '1rem', background: '#028A60' }}></div>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: '600', wordSpacing: '0px' }}>Food Consumption : 60%</Typography>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderBottom: '1px solid rgba(217, 217, 217, 0.40)' }}>
                                            <div style={{ width: '1rem', height: '1rem', background: '#02B880' }}></div>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: '600', wordSpacing: '0px' }}>Refrigent data : 25%</Typography>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderBottom: '1px solid rgba(217, 217, 217, 0.40)' }}>
                                            <div style={{ width: '1rem', height: '1rem', background: '#B1E9D8' }}></div>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: '600', wordSpacing: '0px' }}>Process Emission : 15%</Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70%' }}>
                                        <DirectFootPrintChart data={FootPrintData} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '20%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '7rem', justifyContent: "space-between", }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 22 32" fill="none">
                                                <path d="M12.0495 0.534683L12.6021 1.30422L12.8726 1.6848L13.4019 2.43692L13.6607 2.80911L14.1654 3.54447L14.6552 4.2695L15.1289 4.98292L15.587 5.68602L15.8096 6.03305L16.2438 6.71873L16.6624 7.39345L17.0655 8.05656L17.4518 8.70934C17.8181 9.3332 18.1736 9.96329 18.5182 10.5993L18.8417 11.2076L18.9976 11.5076L19.2979 12.0991C21.0993 15.7113 22 18.6895 22 21.0342C22 27.0906 17.0752 32 11 32C4.92476 32 0 27.0906 0 21.0342C0 18.6895 0.900706 15.7113 2.70212 12.0991L3.00235 11.5076L3.15765 11.2076L3.48182 10.6C3.82638 9.96372 4.18189 9.33342 4.54818 8.70934L4.93447 8.05656L5.33759 7.39345L5.75624 6.71873L6.18976 6.03305L6.413 5.68537L6.87112 4.98292L7.34476 4.2695L7.83459 3.54511L8.33929 2.80976L8.86082 2.06215L9.12741 1.6848L9.67224 0.921065L9.95047 0.535328C10.0704 0.369619 10.2281 0.234674 10.4105 0.141603C10.593 0.0485331 10.795 0 11 0C11.205 0 11.407 0.0485331 11.5895 0.141603C11.7719 0.234674 11.9296 0.368974 12.0495 0.534683ZM11 3.51608L10.4888 4.2495L9.99318 4.97066L9.51371 5.68021L9.28012 6.03047L8.82524 6.72196L8.38588 7.40119L7.96335 8.06881L7.75759 8.39779L7.359 9.04735L7.16618 9.36794L6.79088 9.99879L6.43306 10.618C6.25771 10.9238 6.08818 11.2257 5.92512 11.523L5.60677 12.1107L5.30459 12.6867C5.20624 12.8763 5.11047 13.064 5.01794 13.2498L4.74812 13.8L4.49382 14.3387C4.32947 14.6934 4.17612 15.0392 4.03312 15.3772L3.82606 15.8764C3.00041 17.9335 2.58824 19.6577 2.58824 21.0342C2.58824 25.6657 6.35412 29.4198 11 29.4198C15.6459 29.4198 19.4118 25.6657 19.4118 21.0342C19.4118 19.6577 19.0002 17.9335 18.1733 15.8758L17.9669 15.3759C17.8245 15.0385 17.6705 14.6921 17.5062 14.3374L17.2519 13.7994L16.9821 13.2492C16.8878 13.0608 16.7922 12.8731 16.6954 12.6861L16.3932 12.11L16.0749 11.5224C15.9118 11.2257 15.7423 10.9231 15.5669 10.6167L15.2085 9.99815L14.8338 9.36729L14.4436 8.72354C14.3088 8.50455 14.1732 8.28609 14.0366 8.06817L13.6141 7.40055L13.1748 6.72131L12.7199 6.02983L12.4869 5.67957L12.0068 4.97002L11.5118 4.24885C11.3436 4.00632 11.1734 3.76249 11 3.51608ZM17.7754 20.4479C17.7779 20.4898 17.7773 20.5317 17.7734 20.573C17.5664 22.7713 16.8598 24.471 15.6536 25.6734C14.498 26.8261 12.8836 27.5208 10.8104 27.7582L10.5374 27.7866C10.4207 27.7975 10.303 27.7831 10.1924 27.7444C10.0818 27.7057 9.98089 27.6435 9.89667 27.5623C9.81244 27.481 9.74686 27.3825 9.70443 27.2736C9.66201 27.1647 9.64374 27.0479 9.65088 26.9312C9.66459 26.7053 9.76684 26.4938 9.93559 26.3423C10.1043 26.1909 10.326 26.1116 10.5529 26.1217C12.0114 26.1862 13.3171 25.6444 14.4708 24.4943C15.5721 23.3964 16.1182 22.1605 16.1085 20.7852L16.1034 20.5885C16.0931 20.3623 16.1725 20.1411 16.3244 19.9727C16.4764 19.8044 16.6886 19.7023 16.9154 19.6887C17.0219 19.6821 17.1287 19.6966 17.2296 19.7312C17.3306 19.7658 17.4237 19.8199 17.5036 19.8904C17.5835 19.9609 17.6487 20.0465 17.6955 20.1421C17.7422 20.2378 17.7689 20.3417 17.7754 20.4479Z" fill="#028A60" />
                                            </svg>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.8rem', fontWeight: '600', wordSpacing: '0px' }}>Food Consumption</Typography>
                                        </div>
                                        <Typography sx={{ fontFamily: 'Inter', fontSize: '1.6rem', fontWeight: '600', wordSpacing: '0px' }}>344tCO2e</Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 31 32" fill="none">
                                                <path d="M11.3846 0.939453L16 5.55484M16 5.55484L20.6154 0.939453M16 5.55484V26.3241M1 20.5548L5.61538 15.9395M5.61538 15.9395L1 11.3241M5.61538 15.9395H26.3846M20.6154 30.9395L16 26.3241M16 26.3241L11.3846 30.9395M31 11.3241L26.3846 15.9395M26.3846 15.9395L31 20.5548M7.92308 7.86253L11.3846 11.3241M11.3846 20.5548L7.92308 24.0164M24.0769 7.86253L20.6154 11.3241M20.6154 20.5548L24.0769 24.0164" stroke="#02B880" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.8rem', fontWeight: '600', wordSpacing: '0px' }}>Refrigerant Data</Typography></div>
                                        <Typography sx={{ fontFamily: 'Inter', fontSize: '1.6rem', fontWeight: '600', wordSpacing: '0px' }}>100tCO2e</Typography>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="27" viewBox="0 0 20 31" fill="none">
                                                <g clip-path="url(#clip0_1214_49609)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07772 16.2891L0 15.5298L6.69681 0.878906H15.8524L10.6611 9.28467L20 10.3174L2.85714 30.8789L8.07772 16.2891Z" fill="#B1E9D8" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1214_49609">
                                                        <rect width="20" height="30" fill="white" transform="translate(0 0.878906)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <Typography sx={{ fontFamily: 'Inter', fontSize: '0.8rem', fontWeight: '600', wordSpacing: '0px' }}>Process Emission</Typography>
                                        </div>
                                        <Typography sx={{ fontFamily: 'Inter', fontSize: '1.6rem', fontWeight: '600', wordSpacing: '0px' }}>456tCO2e</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '2.6rem 2.2rem 0 2.2rem' }}>
                            <div style={{ display: 'flex', gap: '4rem', justifyContent: 'space-between', overflow: 'hidden' }}>
                                <div style={{ width: '32%', padding: '0', position: 'relative' }}>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: '600', wordSpacing: '0px' }}>Fuel Type Emissions Breakdown</Typography>
                                    <SemiCirclePieChart data={FuelTypeEmissionBreakdownData} />
                                </div>
                                <div style={{ width: '32%', padding: '0', position: 'relative' }}>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: '600', wordSpacing: '0px' }}>Refrigerant Emissions by Type</Typography>
                                    <RefrigerantEmissionsChart data={RefrigerantEmissionsData} />
                                </div>
                                <div style={{ width: '32%', padding: '0', position: 'relative' }}>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: '600', wordSpacing: '0px' }}>Process Emission Breakdown</Typography>
                                    <SemiCirclePieChart data={ProcessEmissionBreakdownData} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: '35%' }}>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: '600', wordSpacing: '0px' }}>Fuel Consumption Breakdown</Typography>
                                    <FuelConsumptionChart data={FuelConsumptionBreakdown} />
                                </div>
                                <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0', position: 'relative' }}>
                                    <Typography sx={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: '600', wordSpacing: '0px' }}>Refrigerant Consumption Breakdown</Typography>
                                    <RefrigerantConsumptionChart data={RefrigerantConsumptionData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmEditReportModal open={openEditModal} setOpenModal={setOpenEditModal} />
            <ShareReportModal open={openShareModal} setOpenModal={setOpenShareModal} />
            
        </div>
    );
};

export default EmissionsInventoryReport;
