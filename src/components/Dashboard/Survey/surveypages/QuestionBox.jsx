import { Box, Grid2, Paper, Typography, Button } from "@mui/material";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import info_icon from "../../../../assets/images/info_icon.svg";
const QuestionBox = ({ questionText, logo, heading, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});

  const handleButtonClick = (answer, qsnId) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [qsnId]: answer,
    }));
    onAnswerSelect(qsnId, answer);
  };
  return (
    <Box
      sx={{
        borderRight: "1px solid #E4E4E4",
        borderRadius: "5px",
        borderTop: "5px solid #369D9C",
        borderLeft: "1px solid #E4E4E4",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "none",
        // background: "blue",
      }}
    >
      {/* Heading Section */}
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          mt: "16px",
          ml: "16px",
          alignItems: "center",
          // width: "800px",
        }}
      >
        {logo && <img src={logo} alt="logo" width="18px" />}
        <Typography fontSize="16px" fontWeight="600" color="#000">
          {heading}
        </Typography>
        <Tooltip title="Dummy Text" placement="top" arrow>
          {info_icon && <img src={info_icon} alt="logo" width="16px" />}
        </Tooltip>
      </Grid2>

      {/* Questions and Buttons */}
      {questionText.map((q, index) => (
        <div key={index}>
          {/* Question Text */}
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              ml: "15px",
              mb: "15px",
              // width: "900px"
            }}
          >
            <Box
              sx={{
                width: "37px",
                height: "34px",
                backgroundColor: "#f7f7f7",
                padding: "7px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="#5B5B5B" fontSize="14px" fontWeight="400">
                Q.{index + 1}
              </Typography>
            </Box>
            <Typography fontSize="14px" fontWeight="normal" color="#000">
              {q.qsnText}
            </Typography>
          </Grid2>
          <div
            style={{
              borderTop: "1px solid #E4E4E4",
              borderBottom: "1px solid #E4E4E4",
              padding: "14px",
              borderRadius: "4px",
            }}
          >
            {/* Buttons */}
            {["Yes", "No", "N/A"].map((answer, i) => (
              <Button
                key={i}
                onClick={() => handleButtonClick(answer, q.qsnId)}
                sx={{
                  background:
                    selectedAnswer[q.qsnId] === answer
                      ? ` linear-gradient(102deg, #369D9C 0%, #28814D 100%)`
                      : "#FFF",
                  color:
                    selectedAnswer[q.qsnId] === answer ? "#FFF" : "#474747",
                  border:
                    selectedAnswer[q.qsnId] === answer
                      ? "1px solid #369D9C"
                      : "1px solid #369D9C",
                  padding: "4px 22px",
                  borderRadius: "32px",
                  textTransform: "capitalize",
                  transition: "background 0.3s ease",
                  ml: "12px",
                }}
              >
                <Typography fontSize="14px" fontWeight="500">
                  {answer}
                </Typography>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </Box>
  );
};

export default QuestionBox;
