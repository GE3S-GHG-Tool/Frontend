import { TextField } from "@mui/material";
import logo from "../../assets/images/ge3s_logo.png";
import PricingModal from "./PricingModal";
import { useState } from "react";
import SuccessAnimation from "../common/SuccessAnimation";
import { useNavigate } from "react-router-dom";
const Invite = () => {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [emails, setEmails] = useState(["", "", "", ""]);
  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/");
  };
  const handleChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };
  const isAnyInputFilled = () => {
    return emails.some((email) => email.trim() !== "");
  };
  return (
    <div className="invite_Page">
      <div className="heading">
        <img src={logo} alt="" className="ge3s_logo1" />
        <h1>Invite your team members and collaborate</h1>
      </div>

      <>
        {screen ? (
          <>
            <h3>Invitations sent to</h3>

            <div className="email_list">
              <div className="email_item">
                <p>unmoy@growht.in</p>
                <svg width="20" height="20" viewBox="0 0 24 25" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5 12.5003C1.50036 7.49102 5.03917 3.17959 9.95224 2.20266C14.8653 1.22573 19.7843 3.85539 21.701 8.48346C23.6177 13.1115 21.9982 18.449 17.833 21.2318C13.6678 24.0146 8.1169 23.4675 4.575 19.9253C2.60591 17.956 1.4998 15.2851 1.5 12.5003Z"
                    stroke="#3CB477"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.75 12.4995L10.2495 15.999L17.25 9"
                    stroke="#3CB477"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="email_item">
                <p>unmoy@growht.in</p>
                <svg width="20" height="20" viewBox="0 0 24 25" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5 12.5003C1.50036 7.49102 5.03917 3.17959 9.95224 2.20266C14.8653 1.22573 19.7843 3.85539 21.701 8.48346C23.6177 13.1115 21.9982 18.449 17.833 21.2318C13.6678 24.0146 8.1169 23.4675 4.575 19.9253C2.60591 17.956 1.4998 15.2851 1.5 12.5003Z"
                    stroke="#3CB477"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.75 12.4995L10.2495 15.999L17.25 9"
                    stroke="#3CB477"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="email_item">
                <p>unmoy@growht.in</p>
                <svg width="20" height="20" viewBox="0 0 24 25" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.5 12.5003C1.50036 7.49102 5.03917 3.17959 9.95224 2.20266C14.8653 1.22573 19.7843 3.85539 21.701 8.48346C23.6177 13.1115 21.9982 18.449 17.833 21.2318C13.6678 24.0146 8.1169 23.4675 4.575 19.9253C2.60591 17.956 1.4998 15.2851 1.5 12.5003Z"
                    stroke="#3CB477"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.75 12.4995L10.2495 15.999L17.25 9"
                    stroke="#3CB477"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="finish_invte">
              <button className="accept" onClick={() => setOpenModal(true)}>
                Finish
              </button>
            </div>
            <SuccessAnimation open={openModal} handleClose={handleCloseModal} />
          </>
        ) : (
          <>
            <h3>
              You can invite upto “n” team members and work together to generate
              Reports.
            </h3>
            <div>
              {emails.map((email, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="normal"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(event) => handleChange(index, event)}
                />
              ))}
            </div>
            <div className="flex_box_invite">
              <button className="skip" onClick={handleOpen}>
                Skip
              </button>
              <button
                className="accept"
                disabled={!isAnyInputFilled()}
                onClick={() => setScreen(true)}
              >
                Invite All
              </button>
            </div>
          </>
        )}
      </>

      <PricingModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Invite;
