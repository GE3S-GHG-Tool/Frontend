import "./Organization.css";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Organization({ activeStep, setActiveStep }) {
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [sector, setSector] = useState("");

  const handleChange1 = (event) => {
    setCountry(event.target.value);
  };
  const handleChange2 = (event) => {
    setState(event.target.value);
  };
  const handleChange3 = (event) => {
    setCity(event.target.value);
  };
  const handleChange4 = (event) => {
    setIndustry(event.target.value);
  };
  const handleChange5 = (event) => {
    setSector(event.target.value);
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
        />
      </div>
      <div className="select_emp_cou">
        <div className="para_select">
          <p>Country</p>
          <FormControl size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={country}
              onChange={handleChange1}
              placeholder="Employee Count"
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>less than 20</MenuItem>
              <MenuItem value={20}>21 - 50</MenuItem>
              <MenuItem value={30}>51 - 100</MenuItem>
              <MenuItem value={30}>101 - 200</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>State</p>
          <FormControl size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={state}
              onChange={handleChange2}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="para_select">
          <p>City</p>
          <FormControl size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={city}
              onChange={handleChange3}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Harayana</MenuItem>
              <MenuItem value={20}>Kolkata</MenuItem>
              <MenuItem value={30}>DHaka</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <p>Industry</p>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={industry}
          onChange={handleChange4}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <p>Sector</p>
      <FormControl fullWidth sx={{ margin: "10px 0" }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={sector}
          onChange={handleChange5}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <button
        onClick={() => {
          setActiveStep(activeStep + 1);
        }}
      >
        Save & Next
      </button>
    </div>
  );
}
