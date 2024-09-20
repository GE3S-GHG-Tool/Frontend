import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";

const BasicFacility = ({ activeStep, setActiveStep }) => {
  return (
    <div className="basic_facilty_page">
      <h1>Enter facility basic details</h1>

      <Box>
        <div className="facilty_basic_box">
          <div className="report_input">
            <label htmlFor="">Facility name</label>

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type Facility Name"
            />
          </div>
          <div className="report_input">&nbsp;</div>
        </div>

        <div className="facilty_basic_box">
          <div className="report_input">
            <label>Industry</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
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
          <div className="report_input">
            <label>Sector</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
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
        <div className="facilty_basic_box">
          <div className="report_input">
            <label>Country</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
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
          <div className="report_input">
            <label>State</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
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
        <div className="facilty_basic_box">
          <div className="report_input">
            <label>City</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
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
          <div className="report_input">
            <label>Area</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={year}
                onChange={(e) => {
                  //   setYear(e.target.value);
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
      </Box>
      <div className="faciltyBtn_content">
        <button onClick={() => setActiveStep(2)} className="ge3s_button_2">
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicFacility;
