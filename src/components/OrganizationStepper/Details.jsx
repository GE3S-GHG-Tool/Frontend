import { useState, useEffect } from "react";
import "./Details.css";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled, TextField } from "@mui/material";
import { useSignup } from "../../context/User-signup";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip
    placement="top-end"
    arrow
    {...props}
    classes={{ popper: className }}
  />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    fontFamily: "Inter",
    maxWidth: 300,
    padding: "8px",
    fontSize: ".68rem",
    border: "none",
    borderRadius: "8px",
    lineHeight: "15px",
    fontWeight:'400',
    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff",
  },
}));

export default function Details({ activeStep, setActiveStep }) {
  const {
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
  } = useSignup();

  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 1979 },
      (_, index) => currentYear - index
    );
    setYearOptions(years);
  }, []);

  const isFormComplete = () => {
    return (
      organizationFiscalYear &&
      organizationStartingYear &&
      organizationEmployeeCount &&
      organizationBaselineYear &&
      organizationBaselineMonth
    );
  };

  return (
    <div className="details">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop:'-20px', marginBottom:'60px' }}>
        <img src={logo} alt="" className="ge3s_logo1" style={{ width: '50px', height: '50px' }} />
        <h1 style={{ fontSize: '1.3rem', fontWeight: '600' }}>Now it&apos;s time to enter <br /> some details</h1>
      </div>
      <div className="select_fields">
        <div className="para_select">
          <p>
            Start of Fiscal Year{" "}
            <HtmlTooltip
              title={
                <>
                  The fiscal year start date aligns GHG emissions data with your
                  reporting period for accurate tracking
                </>
              }
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12.4V9"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 5.60001H9.008"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ my: 1, minWidth: 220 }} size="small">
            <Select
              labelId="fiscal-year-label"
              id="fiscal-year-select"
              value={organizationFiscalYear}
              onChange={(event) =>
                setOrganizationFiscalYear(event.target.value)
              }
              placeholder="Fiscal Year"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>
            First Reporting year{" "}
            <HtmlTooltip
              title={
                <>
                  The first reporting year sets the baseline for tracking and
                  comparing your GHG emissions over time
                </>
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12.4V9"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 5.60001H9.008"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ my: 1, minWidth: 220  }} size="small">
            <Select
              labelId="reporting-year-label"
              id="reporting-year-select"
              value={organizationStartingYear}
              onChange={(e) => setOrganizationStartingYear(e.target.value)}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="select_fields">
        <div className="para_select">
          <p>
            Baseline Year{" "}
            <HtmlTooltip
              title={
                <>
                  The baseline year establishes a reference point to measure and
                  track your emissions reduction progress.
                </>
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12.4V9"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 5.60001H9.008"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ my: 1, minWidth: 220 }} size="small">
            <Select
              labelId="baseline-year-label"
              id="baseline-year-select"
              value={organizationBaselineYear}
              onChange={(e) => setOrganizationBaselineYear(e.target.value)}
              placeholder="Baseline Year"
              size="small"
              // sx={{
              //   margin: "0",
              //   border: "1px solid rgba(217, 217, 217, 0.0)",
              //   borderRadius: "5px",
              //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              //     borderColor: "rgba(217, 217, 217, 0.30)",
              //   },
              //   "& .MuiSelect-select": {
              //     padding: "9px 16px",
              //   },
              // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>
            Baseline Month{" "}
            <HtmlTooltip
              title={
                <>
                  The baseline month refines your starting point for tracking
                  emissions within the baseline year
                </>
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12.4V9"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 5.60001H9.008"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ my: 1, minWidth: 220  }} size="small">
            <Select
              labelId="baseline-month-label"
              id="baseline-month-select"
              value={organizationBaselineMonth}
              onChange={(e) => setOrganizationBaselineMonth(e.target.value)}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="count_input">
        <p>Employee Count</p>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Employee Count"
          value={organizationEmployeeCount}
          onChange={(e) => setOrganizationEmployeeCount(e.target.value)}
        />
      </div>
      <button
        disabled={!isFormComplete()}
        className="ge3s_button"
        onClick={() => {
          setActiveStep(activeStep + 1);
        }}
      >
        Proceed
      </button>
    </div>
  );
}
