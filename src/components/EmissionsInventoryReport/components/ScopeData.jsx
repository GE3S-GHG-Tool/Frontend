import React from "react";
import { Typography } from "@mui/material";
import DirectFootPrintChart from "../Charts/DirectFootPrintChart";
import {
  formatIndianNumber,
  parseStringAndRoundOff,
} from "../../../util/utils";

const styles = {
  container: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns for the first row
    gridAutoFlow: "row", // Flow cards into the next row
    width: "100%",
    background: "#fbfbfb",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    background: "white",
  },
  secondRow: {
    gridColumn: "span 4", // This ensures the second row takes full width
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 5 cards in the second row
    gap: "1rem",
  },
  "@media (max-width: 900px)": {
    container: {
      gridTemplateColumns: "repeat(2, 1fr)", // 2 columns per row for smaller screens
    },
    secondRow: {
      gridTemplateColumns: "repeat(2, 1fr)", // 2 cards per row for smaller screens
    },
  },
  "@media (max-width: 600px)": {
    container: {
      gridTemplateColumns: "1fr", // 1 column per row for very small screens
    },
    secondRow: {
      gridTemplateColumns: "1fr", // 1 card per row for very small screens
    },
  },
};

const ScopeData = ({ title, desc, data, svgs, type }) => {

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "1rem",
          ...(type === "scope-3"
            ? {
                background: "white",
                borderRadius: "16px",
                paddingRight: "2rem",
              }
            : {}),
        }}
      >
        <div
          style={{
            width: "80%",
            background: "white",
            padding: "2rem",
            borderRadius: "16px",
          }}
        >
          <div>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "1.6rem",
                fontWeight: "600",
                wordSpacing: "0px",
                padding: "1rem 0",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "0.875rem",
                fontWeight: "500",
                wordSpacing: "0px",
                color: "#717171",
                width: "40%",
              }}
            >
              {desc}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            {type === "scope-3" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "4rem",
                  gap: "0.6rem",
                  width: "35%",
                }}
              >
                {data.map((item, index) =>
                  index <= 3 ? (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.8rem",
                        borderBottom: "1px solid rgba(217, 217, 217, 0.40)",
                      }}
                    >
                      <div
                        style={{
                          width: "1rem",
                          height: "1rem",
                          background: item.color,
                        }}
                      ></div>
                      <Typography
                        sx={{
                          fontFamily: "Inter",
                          fontSize: "1rem",
                          fontWeight: "600",
                          wordSpacing: "0px",
                        }}
                      >
                        {item.label} : {parseStringAndRoundOff(item.key)}%
                      </Typography>
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "4rem",
                  gap: "0.6rem",
                  width: "35%",
                }}
              >
                {data.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.8rem",
                      borderBottom: "1px solid rgba(217, 217, 217, 0.40)",
                    }}
                  >
                    <div
                      style={{
                        width: "1rem",
                        height: "1rem",
                        background: item.color,
                      }}
                    ></div>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "1rem",
                        fontWeight: "600",
                        wordSpacing: "0px",
                      }}
                    >
                      {item.label} : {parseStringAndRoundOff(item.key)}%
                    </Typography>
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "65%",
              }}
            >
              <DirectFootPrintChart data={data} />
            </div>
          </div>
        </div>
        {type === "scope-3" ? (
          <>
            <div style={{ width: "30%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "12.8rem",
                  gap: "0.6rem",
                }}
              >
                {data.map((item, index) =>
                  index > 3 ? (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.8rem",
                        borderBottom: "1px solid rgba(217, 217, 217, 0.40)",
                      }}
                    >
                      <div
                        style={{
                          width: "1rem",
                          height: "1rem",
                          background: item.color,
                        }}
                      ></div>
                      <Typography
                        sx={{
                          fontFamily: "Inter",
                          fontSize: "1rem",
                          fontWeight: "600",
                          wordSpacing: "0px",
                        }}
                      >
                        {item.label} : {parseStringAndRoundOff(item.key)}%
                      </Typography>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ width: "20%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                justifyContent: "space-between",
                // paddingTop:'1rem',
                height: "100%",
              }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                    background: "white",
                    padding: "1.5rem 1.5rem",
                    borderRadius: "16px",
                  }}
                >
                  <div>
                    {svgs[index]}
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        wordSpacing: "0px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      wordSpacing: "0px",
                    }}
                  >
                    {formatIndianNumber(item.value)} tCO2e
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {type === "scope-3" ? (
        <div style={{ marginTop: "3rem" }}>
          <div style={styles.container}>
            {data.slice(0, 4).map((item, index) => (
              <div key={index} style={styles.card}>
                <div>
                  {svgs[index]}
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      wordSpacing: "0px",
                    }}
                  >
                    {item.label}
                  </Typography>
                </div>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    wordSpacing: "0px",
                  }}
                >
                  {formatIndianNumber(item.value)} tCO2e
                </Typography>
              </div>
            ))}

            <div style={styles.secondRow}>
              {data.slice(4).map((item, index) => (
                <div key={index} style={styles.card}>
                  <div>
                    {svgs[index + 4]}
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        wordSpacing: "0px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "1.6rem",
                      fontWeight: "600",
                      wordSpacing: "0px",
                    }}
                  >
                    {formatIndianNumber(item.value)} tCO2e
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ScopeData;
