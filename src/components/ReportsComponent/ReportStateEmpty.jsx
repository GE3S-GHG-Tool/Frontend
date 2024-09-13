import { Button, Grid2, Typography } from "@mui/material";
import lock_Logo from "../../assets/images/Lock.svg";
import FuelConsumption from "./Pages/FuelConsumption";
import RefrigerantData from "./Pages/RefrigerantData";
import ProcessEmission from "./Pages/EmissionPages/ProcessEmission";
import { useNavigate } from "react-router-dom";

function ReportStateEmpty() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#F8F8F8",
      }}
    >
      <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "34px" }}>
        <Grid2
          sx={{
            padding: "25px 70px 0px 70px",
            width: "100%",
            height: "125px",
            bgcolor: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid2
            sx={{
              width: "100%",
              height: "48px",
              display: "flex",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <Typography
              variant="h1"
              style={{
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "33.89px",
              }}
            >
              Q3 2024 Report
            </Typography>
            <Typography
              variant="p"
              style={{
                fontSize: "18px",
                fontWeight: "400",
                lineHeight: "33.89px",
              }}
            >
              I Delhi
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <Button
                sx={{
                  borderRadius: "32px",
                  border: "1px solid #28814D",
                  padding: "12px 28px 12px 28px",
                  height: "38px",
                  fontWeight: "400",
                  fontSize: "12px",
                  width: "135px",
                  textTransform: "capitalize",
                  color: "#28814D",
                }}
              >
                Add member
              </Button>
            </div>
          </Grid2>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "55px",
            }}
          >
            <Grid2
              sx={{
                width: "29%",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                mt: "6px",
                gap: "2px",
                height: "50px",
                backgroundColor: "#F9FFFC",
                cursor: "pointer",
                borderBottom: "3px solid #369D9C",
              }}
            >
              <Typography
                variant="h1"
                fontSize="12px"
                fontWeight="600"
                lineHeight="18px"
                color="#369D9C"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="3px"
                height="20px"
              >
                Scope 1
              </Typography>

              <Typography
                variant="body1"
                fontSize="9px"
                fontWeight="400"
                lineHeight="14px"
                color="#808080"
                mb="9px"
              >
                Your carbon footprint includes emissions from buildings and
                vehicles.
              </Typography>
            </Grid2>
            <Grid2
              sx={{
                width: "29%",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                mt: "6px",
                gap: "2px",
                height: "50px",
                // backgroundColor: "#F9FFFC",
                cursor: "pointer",
                // borderBottom: "3px solid #369D9C",
              }}
            >
              <Typography
                variant="h1"
                fontSize="12px"
                fontWeight="600"
                lineHeight="18px"
                color="#369D9C"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="5px"
              >
                <img
                  src={lock_Logo}
                  alt="Lock Logo"
                  style={{
                    width: "10px",
                    height: "16px",
                    display: "inline-block",
                  }}
                />
                Scope 2
              </Typography>

              <Typography
                variant="body1"
                fontSize="9px"
                fontWeight="400"
                lineHeight="14px"
                color="#808080"
                mb="13px"
              >
                Indirect emissions from purchased utilities impact carbon
                footprint.
              </Typography>
            </Grid2>
            <Grid2
              sx={{
                width: "29%",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                mt: "6px",
                gap: "2px",
                height: "50px",
                // backgroundColor: "#F9FFFC",
                cursor: "pointer",
                // borderBottom: "3px solid #369D9C",
              }}
            >
              <Typography
                variant="h1"
                fontSize="12px"
                fontWeight="600"
                lineHeight="18px"
                color="#369D9C"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="5px"
              >
                <img
                  src={lock_Logo}
                  alt="Lock Logo"
                  style={{
                    width: "10px",
                    height: "16px",
                    display: "inline-block",
                  }}
                />
                Scope 3
              </Typography>

              <Typography
                variant="body1"
                fontSize="9px"
                fontWeight="400"
                lineHeight="14px"
                color="#808080"
                mb="13px"
              >
                Carbon footprint includes value chain supplier and customer
                emissions.
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
        <FuelConsumption />
        <RefrigerantData />
        <ProcessEmission />
      </Grid2>
      <Grid2
        sx={{
          padding: "25px 70px 0px 70px",
          width: "100%",
          height: "125px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "flex-end", // This moves the buttons to the right
        }}
      >
        <Button
          sx={{
            borderRadius: "32px",
            border: "1px solid #28814D",
            padding: "8px 18px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            textTransform: "capitalize",
            color: "#28814D",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => navigate("/ghgreport")}
          sx={{
            borderRadius: "32px",
            padding: "8px 18px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            background: "#369D9C",
            textTransform: "capitalize",
            color: "#FFFFFF",
          }}
        >
          Proceed
        </Button>
      </Grid2>
    </div>
  );
}

export default ReportStateEmpty;
