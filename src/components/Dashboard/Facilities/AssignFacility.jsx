import { FormControl, MenuItem, Select } from "@mui/material";

const AssignFacility = ({ setOpenModal }) => {
  return (
    <div className="facility_logo_page">
      <div className="assignee_box">
        <h2>Assign member to facility</h2>
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
        <button className="ge3s_button_2" onClick={() => setOpenModal(false)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AssignFacility;
