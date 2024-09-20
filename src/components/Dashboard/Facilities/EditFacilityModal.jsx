import {
  Modal,
  Box,
  styled,
  IconButton,
  Menu,
  MenuItem,
  Button,
  FormControl,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import ImageModal from "../../common/ImageModal";
import { Avatar } from "@mui/material";
import user from "../../../assets/images/Group 2.png";
import AddMemberCard from "./AddMemberCard";
import ConfirmationModal from "../../Modals/ConfirmationModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  overflow: "auto",
  height: "90vh",
  bgcolor: "#fff",
  px: 5,
  py: 3,
  borderRadius: 2,
};
const CloseButton = styled(IconButton)({
  position: "absolute",
  right: "0px",
  top: "0px",
  color: "#717171",
});
const EditFacilityModal = ({ open, setOpenModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menu = Boolean(anchorEl);
  const imageInput = useRef();
  const [imageApi, setImageApi] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [openImageResizer, SetOpenImageResizer] = useState(false);
  const [openconfirmModal, setOpenConfirmModal] = useState(false);
  const [key, setKey] = useState(0);
  const clickInput = () => {
    imageInput.current && imageInput.current.click();
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setUserProfile(reader.result?.toString() || "");
        SetOpenImageResizer(true);
      });
      reader.readAsDataURL(e.target.files[0]);

      // Reset the file input
      e.target.value = "";
      setKey((prevKey) => prevKey + 1);
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenConfirmModal(true);
  };
  const handleConfirmation = () => {
    console.log("yes delete");
    setOpenConfirmModal(false);
  };
  return (
    <Modal open={open} onClose={() => setOpenModal(false)}>
      <Box sx={style}>
        <CloseButton onClick={() => setOpenModal(false)}>
          <Close />
        </CloseButton>{" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <h4
            style={{
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
          >
            Edit Facility Details
          </h4>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
              <g clipPath="url(#clip0_1214_48805)">
                <path
                  d="M24 12.748C24.8284 12.748 25.5 12.0765 25.5 11.248C25.5 10.4196 24.8284 9.74805 24 9.74805C23.1716 9.74805 22.5 10.4196 22.5 11.248C22.5 12.0765 23.1716 12.748 24 12.748Z"
                  fill="black"
                />
                <path
                  d="M24 25.498C24.8284 25.498 25.5 24.8265 25.5 23.998C25.5 23.1696 24.8284 22.498 24 22.498C23.1716 22.498 22.5 23.1696 22.5 23.998C22.5 24.8265 23.1716 25.498 24 25.498Z"
                  fill="black"
                />
                <path
                  d="M24 38.248C24.8284 38.248 25.5 37.5765 25.5 36.748C25.5 35.9196 24.8284 35.248 24 35.248C23.1716 35.248 22.5 35.9196 22.5 36.748C22.5 37.5765 23.1716 38.248 24 38.248Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1214_48805">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
        </Box>
        <Box className="facility_update_content">
          <Box className="facility_logo">
            <Box>
              <p style={{ fontWeight: 500, marginBottom: "15px" }}>
                Chnage facility logo
              </p>
              <ImageModal
                open={openImageResizer}
                setOpen={SetOpenImageResizer}
                imageUrl={userProfile}
                setImageUrl={setUserProfile}
                setImageApi={setImageApi}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <Avatar
                  onClick={clickInput}
                  alt="facility_logo"
                  src={!imageApi ? user : imageApi}
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    color: "#000",
                    border: "1px solid rgba(70, 95, 241, 0.40)",
                    borderRadius: "8px",
                    // background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
                    fontWeight: "500",
                    fontFamily: "Inter",
                    height: "max-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                    p: ".25rem .9rem",
                    textTransform: "none",
                    mt: "1.25rem",
                    mb: "1.5rem",
                    fontSize: "14px",
                  }}
                  onClick={clickInput}
                >
                  <svg width="19" height="19" viewBox="0 0 25 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.868 8.79442C8.282 8.79442 8.618 9.13042 8.618 9.54442C8.618 9.95842 8.282 10.2944 7.868 10.2944H6.935C5.316 10.2944 4 11.6104 4 13.2284V18.1034C4 19.7224 5.316 21.0384 6.935 21.0384H18.065C19.683 21.0384 21 19.7224 21 18.1034V13.2194C21 11.6064 19.688 10.2944 18.076 10.2944H17.133C16.719 10.2944 16.383 9.95842 16.383 9.54442C16.383 9.13042 16.719 8.79442 17.133 8.79442H18.076C20.515 8.79442 22.5 10.7794 22.5 13.2194V18.1034C22.5 20.5494 20.51 22.5384 18.065 22.5384H6.935C4.49 22.5384 2.5 20.5494 2.5 18.1034V13.2284C2.5 10.7834 4.49 8.79442 6.935 8.79442H7.868ZM13.0306 2.22202L15.9466 5.15002C16.2386 5.44402 16.2376 5.91802 15.9446 6.21002C15.6506 6.50202 15.1766 6.50202 14.8846 6.20802L13.249 4.56677L13.2496 15.5413H11.7496L11.749 4.56677L10.1156 6.20802C9.9696 6.35602 9.7766 6.42902 9.5846 6.42902C9.3936 6.42902 9.2016 6.35602 9.0556 6.21002C8.7626 5.91802 8.7606 5.44402 9.0536 5.15002L11.9686 2.22202C12.2496 1.93902 12.7496 1.93902 13.0306 2.22202Z"
                      fill="#000"
                    />
                  </svg>
                  {userProfile ? "Re upload photo" : "Upload photo"}
                  <input
                    key={key}
                    type="file"
                    hidden
                    accept="image/png, image/jpeg"
                    ref={imageInput}
                    onChange={onFileChange}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="add_member_box">
            <AddMemberCard />
          </Box>
        </Box>
        <Box className="facilty_input_box">
          <h2>Facility Details</h2>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={3}>
              <label htmlFor="">Facility name</label>

              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type Facility Name"
              />
            </Grid>
            <Grid size={3}>
              {" "}
              <label>Industry</label>
              <FormControl fullWidth size="small">
                <Select
                  variant="outlined"
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
            </Grid>
            <Grid size={3}>
              {" "}
              <label>Sector</label>
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
            </Grid>{" "}
            <Grid size={3}></Grid>
            <Grid size={3}>
              {" "}
              <label>Country</label>
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
            </Grid>
            <Grid size={3}>
              <label>State</label>
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
            </Grid>
            <Grid size={3}>
              {" "}
              <label>City</label>
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
            </Grid>
            <Grid size={3}>
              {" "}
              <label>Area</label>
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
            </Grid>
          </Grid>
          <h2 style={{ marginTop: "15px" }}>Additional Details</h2>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={3}>
              <label htmlFor="">Floor Area(Per Sq m)</label>

              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type Floor Area"
              />
            </Grid>
            <Grid size={3}>
              <label htmlFor="">Revenue(in USD)</label>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type Revenue"
              />
            </Grid>
            <Grid size={3}>
              <label htmlFor="">Total Employees</label>

              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type Total employees"
              />
            </Grid>
            <Grid size={3}>
              <label htmlFor="">Total Production(per tonne)</label>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type Total Production"
              />
            </Grid>
          </Grid>
        </Box>
        <div style={{ textAlign: "right" }}>
          <button className="facilty_input_box_button">Save</button>
        </div>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={menu}
          disableGutters
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M5.25 1.75H8.75M1.75 3.5H12.25M11.0833 3.5L10.6742 9.63625C10.6129 10.5569 10.5822 11.0172 10.3833 11.3663C10.2083 11.6735 9.94422 11.9206 9.62597 12.0748C9.26448 12.25 8.80314 12.25 7.88045 12.25H6.11955C5.19686 12.25 4.73552 12.25 4.37403 12.0748C4.05577 11.9206 3.79172 11.6735 3.61666 11.3663C3.41781 11.0172 3.38713 10.5569 3.32575 9.63625L2.91667 3.5M5.83333 6.125V9.04167M8.16667 6.125V9.04167"
                stroke="#EC4458"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{ color: "#EC4458", fontWeight: 500, marginLeft: "10px" }}
            >
              Delete
            </span>
          </MenuItem>
        </Menu>
        <ConfirmationModal
          open={openconfirmModal}
          setOpenModal={setOpenConfirmModal}
          confirm={handleConfirmation}
          title={"Are you sure want delete the facility?"}
        />
      </Box>
    </Modal>
  );
};

export default EditFacilityModal;
