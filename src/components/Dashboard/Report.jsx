import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Button, InputBase } from "@mui/material";
import MemberList from "./MemberList/MemberList";
import CustomModal from "./CustomModal/customModal";

function Report() {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleInvite = () => {
    // Handle invite members logic here
    setIsModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs value={value} onChange={handleTabChange}>
          <Tab
            label="Generated Reports"
            sx={{
              textTransform: "none",
            }}
          />
          <Tab
            label="List of Drafts"
            sx={{
              textTransform: "none",
            }}
          />
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#fff",
              borderRadius: "6px",
              border: "1px solid rgba(217, 217, 217, 0.40)",
            }}
          >
            <svg
              width="19"
              height="19"
              style={{ paddingLeft: "5px" }}
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.16732 8.70801C3.16732 5.64743 5.64841 3.16634 8.70898 3.16634C11.7696 3.16634 14.2507 5.64743 14.2507 8.70801C14.2507 10.1991 13.6617 11.5527 12.7038 12.5488C12.6749 12.5707 12.6472 12.5947 12.6209 12.6211C12.5946 12.6473 12.5706 12.675 12.5488 12.7038C11.5527 13.6612 10.1996 14.2497 8.70898 14.2497C5.64841 14.2497 3.16732 11.7686 3.16732 8.70801ZM13.1557 14.2754C11.9369 15.2502 10.391 15.833 8.70898 15.833C4.77396 15.833 1.58398 12.643 1.58398 8.70801C1.58398 4.77298 4.77396 1.58301 8.70898 1.58301C12.644 1.58301 15.834 4.77298 15.834 8.70801C15.834 10.3906 15.2507 11.937 14.2754 13.156L17.1842 16.0648C17.4934 16.374 17.4934 16.8752 17.1842 17.1844C16.875 17.4936 16.3738 17.4936 16.0646 17.1844L13.1557 14.2754Z"
                fill="#1C1C1C"
                fill-opacity="0.2"
              />
            </svg>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                borderRadius: "6px",
                alignSelf: "stretch",
                background: "#fff",
                padding: "0.3rem 1rem",
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#369D9C",
              textTransform: "none",
              borderRadius: "32px",
              fontSize: "0.7rem",
              padding: "0.6rem 1.6rem",
              background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
              "&:hover": { backgroundColor: "#28814D" },
            }}
            onClick={handleOpenModal}
          >
            Add Members
          </Button>
        </Box>
      </Box>

      <Box sx={{ marginTop: "1rem" }}>
        {value === 0 && <MemberList searchQuery={searchQuery} />}
        {value === 1 && <MemberList searchQuery={searchQuery} />}
      </Box>

      <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Expand your team using our addon plan now."
        description="Invite member"
        price={10}
        type="member"
        onAction={handleInvite}
        planContains="Invite more members"
      />
    </>
  );
}

export default Report;
