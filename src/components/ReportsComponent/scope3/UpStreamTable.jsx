import { Grid2, Typography } from "@mui/material";

function UpStreamTable({ headings = [], data }) {
  // console.log("UpStreamTable", data);
  const filteredData = data?.filter((item) => {
    return Object.values(item).every((value) => value !== "");
  });

  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #EEEEEE",
        padding: "9px",
        borderRadius: "8px",
        background: "#ffffff",
        gap: "14px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  background: "#E6F8F2",
                  padding: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography fontWeight="400" fontSize="12px">
                  {heading}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, index) => (
            <tr key={index} style={{ border: "1px solid #EEEEEE" }}>
              <td
                style={{
                  textAlign: "left",
                  padding: "12px",
                  marginRight: "10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {item?.assetType || item?.asset_type}
              </td>
              <td
                style={{
                  textAlign: "left",
                  // fontWeight: "bold",
                  padding: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.sourceOfEnergy || item?.source_energy}
              </td>
              <td
                style={{
                  textAlign: "left",
                  // fontWeight: "bold",
                  padding: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.quantity}
              </td>
              <td
                style={{
                  textAlign: "left",
                  textOverflow: "ellipsis",
                  maxWidth: "100px",
                  // fontWeight: "bold",
                  padding: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.unit || 'Gallons'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Grid2>
  );
}

export default UpStreamTable;
