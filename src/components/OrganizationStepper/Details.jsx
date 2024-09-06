import "./Details.css";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled, TextField, Typography } from "@mui/material";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip
    placement="top-end"
    arrow
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    fontFamity: "Inter",
    maxWidth: 300,
    padding: "10px",
    fontSize: ".8rem",
    border: "none",
    borderRadius: "8px",
    lineHeight: "20px",
    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff", // This sets the arrow color to white
  },
}));
export default function Details({ activeStep, setActiveStep }) {
  const [age, setAge] = useState("");
  const [year, setYear] = useState("");
  const [baseMonth, setBaseMonth] = useState("");
  const [reportYear, setReportYear] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="details">
      <div className="heading">
        <img src={logo} alt="" className="ge3s_logo1" />
        <h1>Now it’s time to enter some details</h1>
      </div>
      <div className="select_det">
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
                <g clipPath="url(#clip0_1214_40409)">
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12V9M9 6H9.0075"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1214_40409">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
              }}
              placeholder="Employee Count"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>2023</MenuItem>
              <MenuItem value={2}>2022</MenuItem>
              <MenuItem value={3}>2021</MenuItem>
            </Select>
          </FormControl>
        </div>{" "}
        <div className="para_select">
          <p>
            First Reporting Year{" "}
            <HtmlTooltip
              title={
                <>
                  The fiscal year start date aligns GHG emissions data with your
                  reporting period for accurate tracking
                </>
              }
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_1214_40409)">
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12V9M9 6H9.0075"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1214_40409">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={reportYear}
              onChange={(e) => {
                setReportYear(e.target.value);
              }}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>2023</MenuItem>
              <MenuItem value={2}>2022</MenuItem>
              <MenuItem value={3}>2021</MenuItem>
            </Select>
          </FormControl>
        </div>{" "}
      </div>
      <div className="select_det">
        <div className="para_select">
          <p>
            Baseline Year{" "}
            <HtmlTooltip
              title={
                <>
                  The baseline year establishes a reference point to measure and
                  track your emissions reduction progress
                </>
              }
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_1214_40409)">
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12V9M9 6H9.0075"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1214_40409">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={age}
              onChange={handleChange}
              placeholder="Employee Count"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>India</MenuItem>
              <MenuItem value={20}>America</MenuItem>
              <MenuItem value={30}>UAE</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>
            BaseLine Month{" "}
            <HtmlTooltip
              title={
                <>
                  The fiscal year start date aligns GHG emissions data with your
                  reporting period for accurate tracking
                </>
              }
            >
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_1214_40409)">
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12V9M9 6H9.0075"
                    stroke="#BDBDBD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1214_40409">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </HtmlTooltip>
          </p>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={baseMonth}
              onChange={(e) => {
                setBaseMonth(e.target.value);
              }}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
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
        />
      </div>
      <button
        onClick={() => {
          setActiveStep(activeStep + 1);
        }}
      >
        Proceed
      </button>
    </div>
  );
}
