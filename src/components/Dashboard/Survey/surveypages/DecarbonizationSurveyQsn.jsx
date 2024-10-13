import { Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import questions from "../../../../assets/data/questions";
import QuestionBox from "./QuestionBox";
import { useNavigate } from "react-router-dom";

function SurveyQuestionSection() {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerSelect = (qsnId, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const answerIndex = updatedAnswers.findIndex(
        (item) => item.qsnId === qsnId
      );

      if (answerIndex !== -1) {
        updatedAnswers[answerIndex] = { qsnId, answer };
      } else {
        updatedAnswers.push({ qsnId, answer });
      }

      return updatedAnswers;
    });

    // console.log(`Question ${qsnId} selected answer: ${answer}`);
  };

  const handleStartSurvey = () => {
    navigate("/survey2 ", { state: selectedAnswers });
  };

  return (
    <>
      <Box
        sx={{
          // background: "red",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {questions.map((q) => (
          <QuestionBox
            key={q.id}
            questionNumber={q.id}
            questionText={q.text}
            logo={q.logo}
            heading={q.heading}
            onAnswerSelect={handleAnswerSelect}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: "45px",
        }}
      >
        <Button
          onClick={handleStartSurvey}
          sx={{
            borderRadius: "32px",
            textTransform: "capitalize",
            justifyContent: "center",
            alignItems: "center",
            background: " linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
            padding: "11px 25px",
            "&:hover": {
              background: "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
            },
          }}
        >
          <Typography color="#fff" fontSize="13px" fontWeight="normal">
            Submit Survey
          </Typography>
        </Button>
      </Box>
    </>
  );
}

export default SurveyQuestionSection;
