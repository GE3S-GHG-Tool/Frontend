import FuelConsumption from "../Pages/FuelConsumption";
import RefrigerantData from "../Pages/RefrigerantData";
import ProcessEmission from "../Pages/EmissionPages/ProcessEmission";
import { Box, Button } from "@mui/material";

const Scope1 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
        padding: "0 1rem",
      }}
    >
      <FuelConsumption />
      <RefrigerantData />
      <ProcessEmission />

      <Box
        sx={{
          padding: "25px 6rem 0px 6rem",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          // onClick={() => navigate("/")}
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
            "&:hover": {
              background: "rgba(177, 233, 216, 0.30)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          // onClick={() => navigate("/ghgreport")}
          sx={{
            borderRadius: "32px",
            padding: "8px 18px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
            "&:hover": {
              background: "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
              boxShadow: "none",
            },
            textTransform: "capitalize",
            color: "#FFFFFF",
          }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default Scope1;
