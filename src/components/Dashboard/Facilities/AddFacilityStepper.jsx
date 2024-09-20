import { Modal, Box, styled, IconButton } from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import AddLogo from "./AddLogo";
import BasicFacility from "./BasicFacility";
import AdditonalFacilities from "./AdditonalFacilities";
import AssignFacility from "./AssignFacility";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55vw",
  bgcolor: "#fff",
  p: 3,
  borderRadius: 2,
};
const CloseButton = styled(IconButton)({
  position: "absolute",
  right: "10px",
  top: "10px",
  color: "#717171",
});

const AddFacilityStepper = ({ open, setOpenModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Modal open={open} onClose={() => setOpenModal(false)}>
      <Box sx={style}>
        <CloseButton onClick={() => setOpenModal(false)}>
          <Close />
        </CloseButton>{" "}
        <h4>
          Create New Facility: Seamlessly Add and Manage Locations for Emission
          Tracking
        </h4>
        <Box className="stepper_facility">
          <Box className="stepper_box_facility">
            {activeStep === 0 && (
              <AddLogo activeStep={activeStep} setActiveStep={setActiveStep} />
            )}
            {activeStep === 1 && (
              <BasicFacility
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep === 2 && (
              <AdditonalFacilities
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep === 3 && <AssignFacility setOpenModal={setOpenModal} />}
          </Box>

          <div className="stepper_comp" style={{ margin: 0 }}>
            <span className={activeStep >= 0 ? "current_step" : "circle"}>
              1
            </span>
            <p>Add Logo</p>
            <div className="lines"></div>
            <span className={activeStep >= 1 ? "current_step" : "circle"}>
              2
            </span>
            <p>Basic Details</p>
            <div className="lines"></div>
            <span className={activeStep >= 2 ? "current_step" : "circle"}>
              3
            </span>
            <p>Additional Details</p>
            <div className="lines"></div>
            <span className={activeStep >= 3 ? "current_step" : "circle"}>
              4
            </span>
            <p>Assign</p>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFacilityStepper;
