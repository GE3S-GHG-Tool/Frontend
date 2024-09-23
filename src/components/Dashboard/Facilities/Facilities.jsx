import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import FacilityList from "./FacilityList/FacilityList";
import AddFacilityStepper from "./AddFacilityStepper";
import "./Facilities.css";
import EditFacilityModal from "./EditFacilityModal";
const Facilities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          my: "1rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.20rem",
            fontWeight: 600,
          }}
        >
          List of Facility
        </Typography>

        <Button
          variant="contained"
          sx={{
            boxShadow: "none",
            textTransform: "none",
            borderRadius: "52px",
            fontSize: "0.7rem",
            padding: "0.6rem 1.7rem",
            background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
          }}
          onClick={() => setOpenModal(true)}
        >
          Add Facility
        </Button>
      </Box>
      <FacilityList
        searchQuery={searchQuery}
        setOpenEditModal={setOpenEditModal}
      />
      <EditFacilityModal open={openEditModal} setOpenModal={setOpenEditModal} />
      <AddFacilityStepper open={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Facilities;
