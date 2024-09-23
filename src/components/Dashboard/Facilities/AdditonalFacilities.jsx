import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";
const AdditonalFacilities = ({ activeStep, setActiveStep }) => {
  return (
    <div className="basic_facilty_page">
      <h1>Enter facility additional details</h1>

      <Box>
        <div className="facilty_basic_box">
          <div className="report_input">
            <label htmlFor="">Floor Area(Per Sq m)</label>

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type Floor Area"
            />
          </div>
          <div className="report_input">
            {" "}
            <label htmlFor="">Revenue(in USD)</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type Revenue"
            />
          </div>
        </div>
        <div className="facilty_basic_box">
          <div className="report_input">
            <label htmlFor="">Total Employees</label>

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type Total employees"
            />
          </div>
          <div className="report_input">
            <label htmlFor="">Total Production(per tonne)</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type Total Production"
            />
          </div>
        </div>
      </Box>
      <div className="faciltyBtn_content">
        <button onClick={() => setActiveStep(3)} className="ge3s_button_2">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditonalFacilities;
