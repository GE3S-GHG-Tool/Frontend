import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createReport } from "../../api/createReport";
import { getEmissionCountries } from "../../api/auth";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vw",
  bgcolor: "#fff",
  px: 3,
  py: 4,
  borderRadius: 2,
  border: "1px solid #fff",
};

const quarterMenu = [
  { id: 1, name: "Q1" },
  { id: 2, name: "Q2" },
  { id: 3, name: "Q3" },
  { id: 4, name: "Q4" },
];
const halfyearlyMenu = [
  { id: 1, name: "H1" },
  { id: 2, name: "H2" },
];
const monthlyMenu = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "November" },
  { id: 11, name: "October" },
  { id: 12, name: "December" },
];

const StartReportModal = ({ open, setOpenModal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [revenue, setRevenue] = useState("");
  const [totalEmployees, setTotalEmployees] = useState("");
  const [totalProduction, setTotalProduction] = useState("");

  const menuItems =
    period == "Monthly"
      ? monthlyMenu
      : period == "Quartely"
        ? quarterMenu
        : period == "Half-Yearly"
          ? halfyearlyMenu
          : null;

  const isFormComplete =
    name &&
    year &&
    period &&
    (period === "Yearly" || value) &&
    floorArea &&
    revenue &&
    totalEmployees &&
    country &&
    totalProduction;

  const onSubmit = async () => {
    const payload = {
      organization_id: user?.organization?.id,
      name: name,
      year: Number(year),
      time_period: period,
      periodicity: period === "Yearly" ? "yearly" : value || "",
      country: country,
      floor_area: Number(floorArea),
      revenue: Number(revenue),
      total_employees: Number(totalEmployees),
      total_production: Number(totalProduction),
    };
    console.log(payload);
    const response = await createReport(payload);
    console.log(response);
    if (response?.status === 200) {
      // console.log(response.data.reportId);
      localStorage.setItem("reportId", response.data.reportId);
      navigate("/reportgenerator");
    } else {
      alert(response?.data?.message);
    }
  };
  const fetchData = async () => {
    const response = await getEmissionCountries();
    // console.log("response list:", response.data?.countries);
    setCountryList(response?.data?.countries);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Modal
      open={open}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{
            fontWeight: 600,
            marginBottom: "8px",
            fontSize: ".9rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            style={{ marginRight: "5px" }}
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M26.0013 5.33464H22.0013V3.33464C22.0013 3.15782 21.9311 2.98826 21.806 2.86323C21.681 2.73821 21.5114 2.66797 21.3346 2.66797C21.1578 2.66797 20.9883 2.73821 20.8632 2.86323C20.7382 2.98826 20.668 3.15782 20.668 3.33464V5.33464H11.3346V3.33464C11.3346 3.15782 11.2644 2.98826 11.1394 2.86323C11.0143 2.73821 10.8448 2.66797 10.668 2.66797C10.4912 2.66797 10.3216 2.73821 10.1966 2.86323C10.0715 2.98826 10.0013 3.15782 10.0013 3.33464V5.33464H6.0013C5.11757 5.33569 4.27034 5.68722 3.64545 6.31212C3.02056 6.93701 2.66903 7.78424 2.66797 8.66797V26.0013C2.66903 26.885 3.02056 27.7323 3.64545 28.3572C4.27034 28.982 5.11757 29.3336 6.0013 29.3346H26.0013C26.8851 29.3339 27.7326 28.9825 28.3575 28.3575C28.9825 27.7326 29.3339 26.8851 29.3346 26.0013V8.66797C29.3339 7.78413 28.9825 6.93669 28.3575 6.31173C27.7326 5.68676 26.8851 5.33534 26.0013 5.33464ZM28.0013 26.0013C28.0013 26.5317 27.7906 27.0404 27.4155 27.4155C27.0404 27.7906 26.5317 28.0013 26.0013 28.0013H6.0013C5.47087 28.0013 4.96216 27.7906 4.58709 27.4155C4.21202 27.0404 4.0013 26.5317 4.0013 26.0013V14.668H28.0013V26.0013ZM28.0013 13.3346H4.0013V8.66797C4.0013 7.56397 4.89464 6.66797 6.0013 6.66797H10.0013V8.66797C10.0013 8.84478 10.0715 9.01435 10.1966 9.13937C10.3216 9.2644 10.4912 9.33464 10.668 9.33464C10.8448 9.33464 11.0143 9.2644 11.1394 9.13937C11.2644 9.01435 11.3346 8.84478 11.3346 8.66797V6.66797H20.668V8.66797C20.668 8.84478 20.7382 9.01435 20.8632 9.13937C20.9883 9.2644 21.1578 9.33464 21.3346 9.33464C21.5114 9.33464 21.681 9.2644 21.806 9.13937C21.9311 9.01435 22.0013 8.84478 22.0013 8.66797V6.66797H26.0013C26.5317 6.66797 27.0404 6.87868 27.4155 7.25376C27.7906 7.62883 28.0013 8.13754 28.0013 8.66797V13.3346Z"
              fill="#369D9C"
            />
          </svg>
          Fill in the required data to generate your comprehensive GHG emission
          report.
        </Typography>

        <div className="report_input_2">
          <div className="report_input">
            <label>Report Name</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="report_input">
            <label>Country</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                size="small"
              >
                {countryList?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="report_input_2">
          <div className="report_input">
            <label>Year</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                size="small"
              >
                <MenuItem value={"2021"}>2021</MenuItem>
                <MenuItem value={"2022"}>2022</MenuItem>
                <MenuItem value={"2023"}>2023</MenuItem>
                <MenuItem value={"2024"}>2024</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="report_input">
            <label>Period</label>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                }}
                size="small"
              >
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Quartely"}>Quarterly</MenuItem>
                <MenuItem value={"Half-Yearly"}>Half-Yearly</MenuItem>
                <MenuItem value={"Yearly"}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>
          {period !== "Yearly" && period !== "" && (
            <div className="report_input">
              <label>
                {period == "Monthly"
                  ? "Month"
                  : period == "Quartely"
                    ? "Quarter"
                    : period == "Half-Yearly"
                      ? "Half-Yearly"
                      : null}
              </label>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  size="small"
                >
                  {menuItems?.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        </div>
        <div className="report_input_2">
          <div className="report_input">
            <label>Floor Area (Square Meter)</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Add Floor Area"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
            />
          </div>
          <div className="report_input">
            <label>Revenue(in USD)</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Add Revenue"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>
        </div>
        <div className="report_input_2">
          <div className="report_input">
            <label>Total Employees</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Add Total Employees"
              value={totalEmployees}
              onChange={(e) => setTotalEmployees(e.target.value)}
            />
          </div>
          <div className="report_input">
            <label>Total Production (in Tonne)</label>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Add Total Production"
              value={totalProduction}
              onChange={(e) => setTotalProduction(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "15px",
          }}
        >
          <button
            className="ge3s_button"
            disabled={!isFormComplete}
            onClick={onSubmit}
          >
            Confirm
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default StartReportModal;
