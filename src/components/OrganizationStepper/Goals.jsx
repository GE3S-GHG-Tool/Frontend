import { useEffect, useState } from "react";
import "./Goals.css";
import Radio from "@mui/material/Radio";
import logo from "../../assets/images/ge3s_logo.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSignup } from "../../context/User-signup";
import axiosInstance from "../../util/axiosInstance";

export default function Goals({ setActiveStep }) {
  const {
    organizationName,
    organizationCountry,
    organizationState,
    organizationCity,
    organizationIndustry,
    organizationSector,
    organizationFiscalYear,
    organizationStartingYear,
    organizationBaselineYear,
    organizationBaselineMonth,
    organizationEmployeeCount,
    organizationSustainabilityGoals,
    setOrganizationSustainabilityGoals,
  } = useSignup();

  console.log(
    organizationName,
    organizationCountry,
    organizationState,
    organizationCity,
    organizationIndustry,
    organizationSector,
    organizationFiscalYear,
    organizationStartingYear,
    organizationBaselineYear,
    organizationBaselineMonth,
    organizationEmployeeCount,
    organizationSustainabilityGoals,
    setOrganizationSustainabilityGoals
  );
  const [selectedValue, setSelectedValue] = useState("e");
  const [age, setAge] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  useEffect(() => {
    fetchSustainabilityGoals();
  }, []);

  const fetchSustainabilityGoals = async () => {
    try {
      const response = await axiosInstance.get("/api/sustainabilitygoal/");
      setOrganizationSustainabilityGoals(response.data);
    } catch (error) {
      console.error("Error fetching sustainability goals:", error);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleGoalChange = (event) => {
    setSelectedGoal(event.target.value);
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
    return selectedValue && selectedGoal;
  };

  const handleNextClick = async () => {
    const carbonFootprintMap = {
      e: "No",
      f: "Yes",
      g: "Frequently",
    };
    try {
      const payload = {
        organization_name: organizationName,
        organization_country: organizationCountry,
        organization_state: organizationState,
        organization_city: organizationCity,
        organization_sector: organizationSector,
        organization_industry: organizationIndustry,
        organization_fiscalyear: organizationFiscalYear,
        organization_startingyear: organizationStartingYear,
        organization_baselineyear: organizationBaselineYear,
        organization_baselinemonth: organizationBaselineMonth,
        organization_sustainabilitygoals: selectedGoal,
        organization_employeecount: organizationEmployeeCount,
        organization_carbonfootprint: carbonFootprintMap[selectedValue],
      };

      const response = await axiosInstance.post("/api/user/3", payload);
      console.log("API response:", response.data);
      setActiveStep(3);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
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
            value={selectedGoal}
            onChange={handleGoalChange}
            placeholder="Select your goal"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {organizationSustainabilityGoals.map((goal) => (
              <MenuItem key={goal.id} value={goal.id}>
                {goal.name}
              </MenuItem>
            ))}
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
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}
