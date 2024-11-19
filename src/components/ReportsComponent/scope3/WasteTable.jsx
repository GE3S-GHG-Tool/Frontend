import { Grid2, Typography } from "@mui/material";

function WasteTable({ headings = [], data }) {
  // console.log("WasteTable", data);
  const filteredData = data?.slice(0, -1);

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
                {item?.wasteCategory}
              </td>
              <td
                style={{
                  textAlign: "left",
                  // fontWeight: "bold",
                  padding: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.subCategory}
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "12px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {item.disposalMethod}
              </td>
              <td
                style={{
                  textAlign: "left",
                  // fontWeight: "bold",
                  padding: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {item.distanceToLandfill}
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
                {item.fuelType}
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
                {item.numberOfTrips}
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
                {item.quantityOfWaste}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Grid2>
  );
}

export default WasteTable;
