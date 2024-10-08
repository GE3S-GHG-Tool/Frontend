import React from "react";
import { Box, Grid2, Paper, Typography, Button } from "@mui/material";
import ac_motors_logo from "../../../../assets/images/ac-motors_logo.svg";
import process_pumps_logo from "../../../../assets/images/process_pumps_logo.svg";
import process_fans_logo from "../../../../assets/images/process_fans_logo.svg";
import selection_cooling from "../../../../assets/images/selection_cooling.svg";
import en_c from "../../../../assets/images/en_c.svg";
import wind from "../../../../assets/images/wind.svg";
import boiler from "../../../../assets/images/boiler.svg";
import tempreture from "../../../../assets/images/temperature.svg";
import snowflakes from "../../../../assets/images/snowflakes.svg";
import warehouse from "../../../../assets/images/warehouse.svg";
import bolt from "../../../../assets/images/bolt.svg";
import r_bin from "../../../../assets/images/recycle-bin.svg";
import snow_blowing from "../../../../assets/images/snow-blowing.svg";
import meter_bolt from "../../../../assets/images/meter-bolt 1.svg";
import calculator_bill from "../../../../assets/images/calculator-bill 1.svg";
import hand_holding from "../../../../assets/images/hand-holding-water 1.svg";
import steam from "../../../../assets/images/steam.svg";
import smoke from "../../../../assets/images/smoke.svg";
import lightbulb from "../../../../assets/images/lightbulb.svg";
import insight from "../../../../assets/images/insight.svg";
import ideaChange from "../../../../assets/images/idea-exchange.svg";
import lightBulbSetting from "../../../../assets/images/lightbulb-setting.svg";
import solar_panel from "../../../../assets/images/solar-panel.svg";
import solarpanel_1 from "../../../../assets/images/solar-panel 1.svg";
import lightSelling from "../../../../assets/images/light-ceiling 1.svg";
import { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../assets/images/info_icon.svg";
import DecarbonizationSurveyQsnAns from "./DecarbonizationSurveyQsnAns";

const Question = ({
  questionNumber,
  questionText,
  logo,
  heading,
  onAnswerSelect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});

  const handleButtonClick = (answer, qsnId) => {
    setSelectedAnswer((prevAnswers) => ({
      ...prevAnswers,
      [qsnId]: answer,
    }));
    onAnswerSelect(questionNumber, answer);
    console.log(`Question ${questionNumber} selected answer: ${answer}`);
  };

  return (
    <Grid2
      sx={{
        flexDirection: "column",
        display: "flex",
        borderRight: "1px solid #E4E4E4",
        borderRadius: "5px",
        borderTop: "5px solid #369D9C",
        borderLeft: '1px solid #E4E4E4',
        gap: "20px",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxShadow: 'none',
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
          <Tooltip title="Dummy Text" placement="top" arrow>{info_icon && <img src={info_icon} alt="logo" width="16px" />}</Tooltip>
        </Grid2>

        {/* Questions and Buttons */}
        {questionText.map((q, index) => (
          <React.Fragment key={index}>
            {/* Question Text */}
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
                ml: "15px",
                // width: "900px"
              }}
            >
              <Box
                sx={{
                  width: "37px",
                  height: "34px",
                  backgroundColor: "#F7F7F7",
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
            <div style={{ borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4', padding: '14px', borderRadius: '4px' }}>
              {/* Buttons */}
              {["Yes", "No", "N/A"].map((answer, i) => (

                <Button
                  key={i}
                  onClick={() => handleButtonClick(answer, q.qsnId)}
                  sx={{
                    background:
                      selectedAnswer[q.qsnId] === answer
                        ? `var(--grad-3, linear-gradient(102deg, #369D9C 0%, #28814D 100%))`
                        : "#FFF",
                    color:
                      selectedAnswer[q.qsnId] === answer ? "#FFF" : "#474747",
                    border:
                      selectedAnswer[q.qsnId] === answer
                        ? "none"
                        : "1px solid #369D9C",
                    padding: "4px 22px",
                    borderRadius: "32px",
                    textTransform: "capitalize",
                    transition: "background 0.3s ease",
                    ml: '12px'
                  }}
                >
                  <Typography fontSize="14px" fontWeight="500">
                    {answer}
                  </Typography>
                </Button>

              ))}
            </div>
          </React.Fragment>
        ))}
      </Paper>
    </Grid2>
  );
};

// Main Component
function SurveyQuestionSection() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Keep this for storing all answers

  const handleAnswerSelect = (questionNumber, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: answer,
    }));
    console.log(`Question ${questionNumber} selected answer: ${answer}`);
  };

  const handleStartSurvey = () => {
    setSurveyStarted(true);
  };
  const handleResetSurvey = () => {
    setSurveyStarted(false);
  }
  const questions = [
    {
      id: 1,
      text: [
        {
          qsnText:
            "Do you have all motors with efficiency classification IE3 & IE4?",
          qsnId: 1,
        },
      ],
      logo: ac_motors_logo,
      heading: "Industrial AC Motors", // Pass the heading here
    },
    {
      id: 2,
      text: [
        {
          qsnText:
            "Have you involved a specialist in the selection of the pump sizing?",
          qsnId: 1,
        },
        {
          qsnText:
            "Are bypass valves and valve throttling being eliminated in all retrofitting projects?",
          qsnId: 2,
        },
      ],
      logo: process_fans_logo,
      heading: "Industrial Process Pumps", // Pass the heading here
    },
    {
      id: 3,
      text: [
        {
          qsnText:
            "Have you involved a specialist in the selection of the fan sizing?",
          qsnId: 1,
        },
        {
          qsnText:
            "Does the fan comply with a Fan Efficiency Grade (FEG) of 85% or higher?",
          qsnId: 2,
        },
      ],
      logo: process_pumps_logo,
      heading: "Industrial Process Fans", // Pass the heading here
    },
    {
      id: 4,
      text: [
        {
          qsnText:
            "Has a specialist been appointed to select the most suitable compressor technology (e.g., variable speed drive or variable displacement compressor)?",
          qsnId: 1,
        },
        {
          qsnText:
            "Are measures in place to minimize leakage in the compressed air system of the existing plant?",
          qsnId: 2,
        },
      ],
      logo: wind,
      heading: "Compressed Air System",
    },
    {
      id: 5,
      text: [
        {
          qsnText:
            "Has a high-efficiency boiler been selected for all the plant process?",
          qsnId: 1,
        },
        {
          qsnText:
            "Is are all the boiler equipped with a smart control system to optimize operational efficiency?",
          qsnId: 2,
        },
      ],
      logo: boiler, // Replace with your logo path
      heading: "Industrial Boilers", // Example heading
    },
    {
      id: 6,
      text: [
        {
          qsnText:
            "Have you assessed the insulation level of the steam distribution system to ensure it is sufficient to minimize heat loss to the environment?",
          qsnId: 1,
        },
      ],
      logo: steam, // Replace with your logo path
      heading: "Steam Distribution System", // Example heading
    },
    {
      id: 7,
      text: [
        {
          qsnText:
            "Have you considered selecting an energy-efficient chiller for all the plant?",
          qsnId: 1,
        },
      ],
      logo: tempreture, // Replace with your logo path
      heading: "Industrial Chiller System", // Example heading
    },
    {
      id: 8,
      text: [
        {
          qsnText: "Has the insulation level of the chilled water distribution system been assessed to ensure it is sufficient to minimize energy loss?",
          qsnId: 1,
        },
        {
          qsnText: "Has the system been designed to minimize pumping losses by reducing or eliminating bypass/re-circulation?",
          qsnId: 2,
        }
      ],
      logo: snowflakes, // Replace with your logo path
      heading: "Chilled Water Distribution System", // Example heading
    },
    {
      id: 9,
      text: [
        {
          qsnText: "Has a high-efficiency condenser suitable for the plant been selected?",
          qsnId: 1,
        }
      ],
      logo: warehouse,
      heading: "Refrigerated Storage Area",
    },
    {
      id: 10,
      text: [
        {
          qsnText: "Has the electrical system been designed to incorporate control measures?",
          qsnId: 1,
        }
      ],
      logo: bolt,
      heading: "Power Quality",
    },
    {
      id: 11,
      text: [
        {
          qsnText: "Has the design process considered identifying and evaluating potential waste heat recovery systems based on the waste heat generated during the process?",
          qsnId: 1,
        }
      ],
      logo: tempreture,
      heading: "Process Waste Heat Recovery",
    },
    {
      id: 12,
      text: [
        {
          qsnText: "Has the design process considered identifying and evaluating potential waste heat recovery systems based on the waste heat generated during the process?",
          qsnId: 1,
        }, {
          qsnText: "Are all the sub-meters labeled for easy identification and tracking of energy consumption?",
          qsnId: 2,
        }
      ],
      logo: r_bin,
      heading: "Process Energy Sub-Metering",
    },
    {
      id: 13,
      text: [
        {
          qsnText: "Has the development team considered improving the energy efficiency of the buildings envelope?",
          qsnId: 1,
        }
      ],
      logo: en_c,
      heading:
        "Energy Conservation Techniques and Thermal Insulation (Applicable for both Air-conditioned and Non-Air-Conditioned buildings)",
    },
    {
      id: 14,
      text: [
        {
          qsnText: "Has interior thermal imaging been conducted for air-conditioned/climate-controlled spaces to identify potential building defects?",
          qsnId: 1,
        },
        {
          qsnText: "If leaks or gaps were identified, have appropriate corrective actions been taken to address them?",
          qsnId: 2,
        },
        {
          qsnText: "Have the tests and reports been conducted in compliance with the specified conditions?",
          qsnId: 3,
        },
      ],
      logo: snow_blowing,
      heading:
        "Envelope Tightness for Air-Conditioned Spaces - Thermal Imaging Technique",
    },
    {
      id: 15,
      text: [
        {
          qsnText: "Has the industrial facility/warehouse been assessed for envelope airtightness, and have measures been taken to identify and address any defects or leakages?",
          qsnId: 1,
        }
      ],
      logo: meter_bolt,
      heading:
        "Envelope Tightness (Performance-based) Blower Door Test Technique",
    },
    {
      id: 16,
      text: [
        {
          qsnText: "Have you evaluated the potential impact of different HVAC systems on energy efficiency and operating costs to inform your selection?",
          qsnId: 1,
        }
      ],
      logo: calculator_bill,
      heading: "Optimal System Sizing - HVAC",
    },
    {
      id: 17,
      text: [
        {
          qsnText: "Have you considered incorporating design strategies to utilize Energy Recovery Units (ERUs) in the plant?",
          qsnId: 1,
        }
      ],
      logo: hand_holding,
      heading:
        "Installation of Energy Recovery Units and regulated air intake system",
    },
    {
      id: 18,
      text: [
        {
          qsnText: "Have you confirmed that the energy-efficient cooling equipment to be procured and installed is consistent with the capacities specified in the 'Optimal System Sizing - HVAC' section?",
          qsnId: 1,
        }
      ],
      logo: selection_cooling,
      heading:
        "Selection of Cooling Equipment with High Energy Efficiency Ratio (EER)",
    },
    {
      id: 19,
      text: [
        {
          qsnText: "Have you considered incorporating the necessary strategies into the HVAC system design to ensure efficient control and operation of the units?",
          qsnId: 1,
        }
      ],
      logo:smoke ,
      heading: "Programmable thermostats and CO2 Sensors for HVAC system",
    },
    {
      id: 20,
      text: [
        {
          qsnText: "Have you considered ways to improve interior lighting levels while ensuring they do not exceed the limits",
          qsnId: 1,
        }
      ],
      logo: lightbulb,
      heading: "Light Power Density - Interior",
    },
    {
      id: 21,
      text: [
        {
          qsnText: "Have you considered selecting internal lighting systems that offer flexible control options",
          qsnId: 1,
        }
      ],
      logo: insight,
      heading: "Automated lighting control / motion sensor for internal lighting",
    },
    {
      id: 22,
      text: [
        {
          qsnText: "Have you confirmed that the exterior lighting levels have been improved and do not exceed the specified limits?",
          qsnId: 1,
        }
      ],
      logo: ideaChange,
      heading: "Exterior Light Power Density",
    },
    {
      id: 23,
      text: [
        {
          qsnText: "Have you confirmed that the external lighting systems incorporate strategies to switch on/off based on specific needs or timings?",
          qsnId: 1,
        }
      ],
      logo:lightBulbSetting,
      heading: "Control of External lights",
    },
    {
      id: 24,
      text: [
        {
          qsnText: "Has the feasibility of a solar thermal hot water system been assessed, and has the potential reduction in CO2 emissions been estimated?",
          qsnId: 1,
        }
      ],
      logo:solar_panel,
      heading: "Renewable Power Source - Industrial hot water",
    },
    {
      id: 25,
      text: [
        {
          qsnText: "Have you considered conducting a feasibility study to explore the potential of generating renewable power on-site?",
          qsnId: 1,
        }
      ],
      logo: solarpanel_1,
      heading: "Onsite Renewable Energy Generation",
    },
    {
      id: 26,
      text: [
        {
          qsnText: "Have you explored the possibility of incorporating daylighting technologies into the industrial design?",
          qsnId: 1,
        }
      ],
      logo: lightSelling,
      heading: "General Plant Lighting - Use of Solar Daylighting Technologies",
    },
  ];

  return (
    <>
      {!surveyStarted ? (
        <>
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {questions.map((q) => (
              <Question
                key={q.id}
                // questionNumber={q.id}
                questionText={q.text}
                logo={q.logo}
                heading={q.heading}
                onAnswerSelect={handleAnswerSelect}
              />
            ))}
          </Grid2>

          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end", // This aligns the button to the right
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
                background:
                  "var(--grad-3, linear-gradient(102deg, #369D9C 0%, #28814D 100%))",
                padding: "11px 25px",
                '&:hover': {
                  background:
                    "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
                },
              }}
            >
              <Typography color="#fff" fontSize="13px" fontWeight="normal">
                Submit Survey
              </Typography>
            </Button>
          </Grid2>
        </>
      ) : (
        <DecarbonizationSurveyQsnAns handleResetSurvey={handleResetSurvey}></DecarbonizationSurveyQsnAns>
      )}
    </>
  );
}

export default SurveyQuestionSection;
