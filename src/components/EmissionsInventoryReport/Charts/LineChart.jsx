import { Typography } from "@mui/material";

const LineChart = () => {
  return (
    <div style={{ display: "flex", gap: "0.2rem" }}>
      <div style={{ width: "30%" }}>
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{ height: "10px", background: "#01533A", width: "50%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#028A60", width: "25%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#02A673", width: "25%" }}
          ></div>
        </div>
        <div>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "0.85rem",
              fontWeight: "600",
              wordSpacing: "0px",
              marginTop: "0.4rem",
            }}
          >
            Scope 1 (30%)
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "0.85rem",
              fontWeight: "600",
              wordSpacing: "0px",
              marginTop: "0.2rem",
            }}
          >
            2324 tCO2e
          </Typography>
        </div>
      </div>
      <div style={{ width: "30%" }}>
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{ height: "10px", background: "#087A91", width: "20%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#098DA7", width: "40%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#0CA1BF", width: "20%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#10BBDD", width: "20%" }}
          ></div>
        </div>
        <div>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "0.85rem",
              fontWeight: "600",
              wordSpacing: "0px",
              marginTop: "0.4rem",
            }}
          >
            Scope 2 (30%)
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "0.85rem",
              fontWeight: "600",
              wordSpacing: "0px",
              marginTop: "0.2rem",
            }}
          >
            232124 tCO2e
          </Typography>
        </div>
      </div>
      <div style={{ width: "40%" }}>
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{ height: "10px", background: "#F26D58", width: "10%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FF7863", width: "10%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FF8977", width: "10%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FF9989", width: "10%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FFAC9F", width: "15%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FFBBB0", width: "20%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FFC8BF", width: "10%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FFD3CD", width: "10%" }}
          ></div>
          <div
            style={{ height: "10px", background: "#FFE6E3", width: "5%" }}
          ></div>
        </div>
        <div>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "0.85rem",
              fontWeight: "600",
              wordSpacing: "0px",
              marginTop: "0.4rem",
            }}
          >
            Scope 3 (40%)
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "0.85rem",
              fontWeight: "600",
              wordSpacing: "0px",
              marginTop: "0.2rem",
            }}
          >
            233424 tCO2e
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
