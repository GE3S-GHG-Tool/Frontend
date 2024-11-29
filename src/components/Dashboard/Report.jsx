import { useState } from "react";
import { Tabs, Tab, Box, TextField, InputAdornment } from "@mui/material";

import ReportList from "./ReportList/ReportList";
import DraftList from "./ReportList/DraftList";

function Report() {
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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
        <Tabs
          value={value}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#369D9C",
            },
          }}
        >
          <Tab
            label="Generated Reports"
            sx={{
              textTransform: "none",
              color: "#666666",
              fontWeight: 500,
              "&.Mui-selected": {
                color: "#369D9C",
              },
            }}
          />
          <Tab
            label="List of Drafts"
            sx={{
              textTransform: "none",
              color: "#666666",
              fontWeight: 500,
              "&.Mui-selected": {
                color: "#369D9C",
              },
            }}
          />
        </Tabs>

        <TextField
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.16732 8.70898C3.16732 5.64841 5.64841 3.16732 8.70898 3.16732C11.7696 3.16732 14.2507 5.64841 14.2507 8.70898C14.2507 10.2001 13.6617 11.5537 12.7038 12.5498C12.6749 12.5716 12.6472 12.5957 12.6209 12.622C12.5946 12.6483 12.5706 12.676 12.5488 12.7048C11.5527 13.6621 10.1996 14.2507 8.70898 14.2507C5.64841 14.2507 3.16732 11.7696 3.16732 8.70898ZM13.1557 14.2764C11.9369 15.2511 10.391 15.834 8.70898 15.834C4.77396 15.834 1.58398 12.644 1.58398 8.70898C1.58398 4.77396 4.77396 1.58398 8.70898 1.58398C12.644 1.58398 15.834 4.77396 15.834 8.70898C15.834 10.3916 15.2507 11.938 14.2754 13.157L17.1842 16.0658C17.4934 16.3749 17.4934 16.8762 17.1842 17.1854C16.875 17.4945 16.3738 17.4945 16.0646 17.1854L13.1557 14.2764Z"
                      fill="#1C1C1C"
                      fillOpacity="0.2"
                    />
                  </svg>
                </InputAdornment>
              ),
              placeholder:'Search reports'
            },
          }}
        />
      </Box>
      <Box sx={{ marginTop: "1rem" }}>
        {value === 0 && <ReportList searchQuery={searchQuery} />}
        {value === 1 && <DraftList searchQuery={searchQuery} />}
      </Box>
    </>
  );
}

export default Report;
