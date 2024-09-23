import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

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

      <Box sx={{ marginTop: "1rem" }}>
        {value === 0 && <ReportList searchQuery={searchQuery} />}
        {value === 1 && <DraftList searchQuery={searchQuery} />}
      </Box>
    </>
  );
}

export default Report;
