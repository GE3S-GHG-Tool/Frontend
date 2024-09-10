import { useState } from "react";
import "./Goals.css";
import Radio from "@mui/material/Radio";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Goals({ setActiveStep }) {
  const [selectedValue, setSelectedValue] = useState("e");
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onChange = (event) => {
    setAge(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const isFormComplete = () => {
    return selectedValue && age;
  };
  return (
    <div className="goals">
      <div className="heading">
        <img src={logo} alt="" className="ge3s_logo1" />
        <h1>What are your Goals? Let us help you out.</h1>
      </div>
      <div className="para_select_det">
        <p>What are your sustainability goals?</p>
        <FormControl size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            onChange={onChange}
            placeholder="Employee Count"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>
              I want to make my Organization more Green
            </MenuItem>
            <MenuItem value={2}>My Investors are asking for a report</MenuItem>
            <MenuItem value={3}>I want to make sustainability claims</MenuItem>
          </Select>
        </FormControl>
      </div>
      <p>Have you ever calculated carbon footprint before ?</p>
      <div className="options">
        <div
          className="radio_button_goals"
          style={{
            backgroundColor: selectedValue === "e" ? "#E9F3EE" : "transparent",
            borderColor: selectedValue === "e" ? "#3CB477" : "#bdbdbd",
          }}
        >
          <Radio
            {...controlProps("e")}
            sx={{
              color: "#3CB477",
              "&.Mui-checked": {
                color: "#3CB477",
              },
            }}
          />
          <h1>No,Never</h1>
        </div>
        <div
          className="radio_button_goals"
          style={{
            backgroundColor: selectedValue === "f" ? "#E9F3EE" : "transparent",
            borderColor: selectedValue === "f" ? "#3CB477" : "#bdbdbd",
          }}
        >
          <Radio
            {...controlProps("f")}
            sx={{
              color: "#3CB477",
              "&.Mui-checked": {
                color: "#3CB477",
              },
            }}
          />
          <h1>Once or Twice</h1>
        </div>
        <div
          className="radio_button_goals"
          style={{
            backgroundColor: selectedValue === "g" ? "#E9F3EE" : "transparent",
            borderColor: selectedValue === "g" ? "#3CB477" : "#bdbdbd",
          }}
        >
          <Radio
            {...controlProps("g")}
            sx={{
              color: "#3CB477",
              "&.Mui-checked": {
                color: "#3CB477",
              },
            }}
          />
          <h1>Ferquently</h1>
        </div>
      </div>
      <button
        className="ge3s_button"
        disabled={!isFormComplete()}
        onClick={() => {
          setActiveStep(3);
        }}
      >
        Next
      </button>
    </div>
  );
}
