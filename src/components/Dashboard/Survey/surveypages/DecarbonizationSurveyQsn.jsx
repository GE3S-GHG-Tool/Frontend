import { Typography, Button, Box } from "@mui/material";
import { useState } from "react";
import questions from "../../../../assets/data/questions";
import QuestionBox from "./QuestionBox";
import { useNavigate } from "react-router-dom";

function SurveyQuestionSection() {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  console.log(selectedAnswers);
  console.log(selectedAnswers.length);
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
        <button
          disabled={selectedAnswers.length < 34}
          onClick={handleStartSurvey}
          style={{
            borderRadius: "32px",
            textTransform: "capitalize",
            background:
              selectedAnswers.length < 34
                ? "#E7E7E7"
                : "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
            padding: "11px 25px",
            fontSize: "13px",
            fontWeight: "400",
            color: selectedAnswers.length < 34 ? "#838383" : "#fff",
            border: "none",
            cursor: selectedAnswers.length < 34 ? "not-allowed" : "pointer",
          }}
        >
          Submit Survey
        </button>
      </Box>
    </>
  );
}

export default SurveyQuestionSection;
