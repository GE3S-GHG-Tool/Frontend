import { TextField } from "@mui/material";
import logo from "../../assets/images/ge3s_logo.png";
import PricingModal from "./PricingModal";
import { useState } from "react";
const Invite = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="invite_Page">
      <div className="heading">
        <img src={logo} alt="" className="ge3s_logo1" />
        <h1>Invite your team members and collaborate</h1>
      </div>
      <h3>
        You can invite upto “n” team members and work together to generate
        Reports.
      </h3>

      <div>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          placeholder="Enter Email Address"
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          placeholder="Enter Email Address"
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          placeholder="Enter Email Address"
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          placeholder="Enter Email Address"
        />
      </div>

      <div className="flex_box_invite">
        <button className="skip" onClick={handleOpen}>
          Skip
        </button>
        <button className="accept">Invite All</button>
      </div>

      <PricingModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Invite;
