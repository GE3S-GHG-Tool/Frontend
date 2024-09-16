import React from "react";
import { Box, Grid2, Paper, Typography, Button } from "@mui/material";
import magelightBuld from "../../../../assets/images/mage_light-bulb.svg";
import BasicTable from "./TablesDataDecarbonation1";
import BasicTable2 from "./TablesDataDecarbonation2";
import BasicTable3 from "./TablesDataDecarbonation4";
import DecarbonizationQsnAnsWithUl from "./DecarbonizationDiffUi/DecarbonizationQsnAnsWithUl";
import DecarbonizationQsnAnsWithUl2 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsWithUi2";
import DecarbonizationQsnAnsWithUi3 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsWithUi3";
import DecarbonizationQsnAnsWithUi4 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi4";
import DecarbonizationQsnAnsWithUi5 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi5";
import DecarbonizationQsnAnsWithUi6 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi6";
import DecarbonizationQsnAnsWithUi7 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi7";
import DecarbonizationQsnAnsDiffUi8 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi8";
import DecarbonizationQsnAnsDiffUi9 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi9";
import DecarbonizationQsnAnsDiffUi10 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi10";
import DecarbonizationQsnAnsDiffUi11 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi11";
import DecarbonizationQsnAnsDiffUi12 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi12";
import DecarbonizationQsnAnsDiffUi13 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi13";
import DecarbonizationQsnAnsDiffUi14 from "./DecarbonizationDiffUi/DecarbonizationQsnAnsDiffUi14";
import ac_motors_logo from "../../../../assets/images/ac-motors_logo.svg";
import pump2 from "../../../../assets/images/pump2.svg";
import wind from "../../../../assets/images/wind.svg";
import tempreture from "../../../../assets/images/temperature.svg";
import snowflakes from "../../../../assets/images/snowflakes.svg";
import warehouse from "../../../../assets/images/warehouse.svg";
import bolt from "../../../../assets/images/bolt.svg";
import r_bin from "../../../../assets/images/recycle-bin.svg";
import snow_blowing from "../../../../assets/images/snow-blowing.svg";
import fan from "../../../../assets/images/fan.svg";
import alt_1 from "../../../../assets/images/alt_1.svg";
import heat from "../../../../assets/images/heat.svg";
import summer from "../../../../assets/images/summer.svg";
import hand_holding_2 from "../../../../assets/images/hand-holding-2.svg";
const TableComponents = {
  "Industrial Chiller System": BasicTable,
  "Refrigerated Storage Area": BasicTable2,
  "Energy Conservation Techniques and Thermal Insulation": BasicTable3,
};

const Question = ({
  questionText,
  logo,
  heading,
  answers,
  showTable,
  boldAnswerIndex,
}) => {
  const TableComponent = TableComponents[heading];

  return (
    <Grid2
      sx={{
        // flexDirection: "column",
        // display: "flex",
        border: "1px solid #E4E4E4",
        borderRadius: "5px",
        borderTop: "3px solid #369D9C",
        // gap: "20px",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
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
          }}
        >
          {logo && <img src={logo} alt="logo" width="18px" />}
          <Typography fontSize="16px" fontWeight="600" color="#000">
            {heading}
          </Typography>
        </Grid2>

        {questionText.map((q, questionIndex) => (
          <React.Fragment key={questionIndex}>
            {/* Question Text */}
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
                ml: "15px",
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
                  Q.{questionIndex + 1}
                </Typography>
              </Box>
              <Typography fontSize="14px" fontWeight="500" color="#000">
                {q}
              </Typography>
            </Grid2>

            {/* Answers or Implementation Required */}
            <Grid2
              sx={{
                borderTop: "1px solid #E4E4E4",
                mt: "8px",
                mb: "8px",
                ml: "0px",
                padding: "10px 19px",
                borderRadius: "5px",
              }}
            >
              {answers[questionIndex]?.length > 0 ? (
                // Display Answers
                <Grid2
                  sx={{
                    border: "1px solid var(--Grey-3, #D9D9D9)",
                    background: "#F7FFFC",
                    borderRadius: "5px",
                    padding: "1px 12px",
                  }}
                >
                  {answers[questionIndex].map((answer, answerIndex) => (
                    <Typography
                      key={answerIndex}
                      fontSize="12px"
                      fontWeight={
                        boldAnswerIndex === questionIndex ||
                        boldAnswerIndex >= answers[questionIndex].length
                          ? "700" // Apply bold if boldAnswerIndex matches or exceeds total answers
                          : "500"
                      }
                      color="#000"
                      sx={{ padding: "6px 0" }}
                    >
                      {answerIndex + 1}. {answer}
                    </Typography>
                  ))}
                </Grid2>
              ) : (
                // Display Implementation Required with Logo
                <Grid2
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  <img
                    src={magelightBuld}
                    alt="Implementation Required"
                    width="18px"
                  />
                  <Typography fontSize="12px" fontWeight="500" color="#000">
                    Implementation Required
                  </Typography>
                </Grid2>
              )}
            </Grid2>

            {/* Conditional Rendering of Table */}
            {showTable && questionIndex === 0 && TableComponent && (
              <Grid2
                sx={{
                  mt: "-30px",
                  mb: "8px",
                  ml: "0px",
                  padding: "10px 19px",
                  borderRadius: "5px",
                }}
              >
                <TableComponent /> {/* Render the selected table component */}
              </Grid2>
            )}
          </React.Fragment>
        ))}
      </Paper>
    </Grid2>
  );
};

function SurveyQuestionSection() {
  const questions = [
    {
      text: [
        "Do you have all motors with efficiency classification IE3 & IE4?",
      ],
      answers: [
        [
          "Upgrade to IE3 and IE4 motors for increased energy efficiency and optimal performance.",
        ],
      ],
      logo: ac_motors_logo,
      heading: "Industrial AC Motors",
      showTable: false,
    },
    {
      text: [
        "Have you involved a specialist in the selection of the pump sizing?",
        "Are bypass valves and valve throttling being eliminated in all retrofitting projects?",
      ],
      answers: [
        [
          "Pump sizing and selection must consider all possible scenarios of the operation.",
          "Right pump technology must be selected based on process requirement.",
        ],
        [
          "Pump with right VFD must be selected for the process with variable flow requirement.",
        ],
      ],
      logo: pump2,
      heading: "Industrial Process Pumps",
      showTable: false,
    },
    {
      text: [
        "Have you involved a specialist in the selection of the pump sizing?",
        "Does the fan comply with a Fan Efficiency Grade (FEG) of 85% or higher?",
      ],
      answers: [
        [
          "Fan sizing and selection must consider all possible scenarios of the operation.",
          "Right fan technology must be selected based on process requirement.",
          "Fan with right VFD must be selected for the process with variable flow requirement.",
        ],
        [],
      ],
      logo: fan,
      heading: "Industrial Process Fans",
      showTable: false,
    },
    {
      text: [
        "Has a specialist been appointed to select the most suitable compressor technology (e.g., variable speed drive or variable displacement compressor)?",
        "Are measures in place to minimize leakage in the compressed air system of the existing plant?",
      ],
      answers: [
        [],
        [
          "Leakage in the compressed air system must be minimized in the existing plant.",
        ],
      ],
      logo: wind,
      heading: "Compressed Air System",
      showTable: false,
    },
    {
      text: [
        "Has a high-efficiency boiler been selected for the plant process?",
        "Are all the boilers equipped with a smart control system to optimize operational efficiency?",
      ],
      answers: [
        [
          "Boiler sizing and design operating parameters must consider all possible scenarios of the operation.",
        ],
        [
          "The selected boiler must have smart controls to regulate the fuel and excess air supply to the boiler based on process load variation, thereby achieving higher combustion efficiency.",
        ],
      ],
      logo: alt_1,
      heading: "Industrial Process Boilers",
      showTable: false,
    },
    {
      text: [
        "Have you assessed the insulation level of the steam distribution system to ensure it is sufficient to minimize heat loss to the environment?",
      ],
      answers: [
        [
          "Steam distribution system economic insulation requirement must be carried out by a specialist.",
          "Effectiveness of the insulation must be tested on an annual basis.",
        ],
      ],
      logo: heat,
      heading: "Steam Distribution System",
      showTable: false,
    },
    {
      text: [
        "Have you considered selecting an energy-efficient chiller for all the plant?",
      ],
      answers: [
        [
          "All chiller units should meet the Minimum Energy Efficiency Ratio (EER) mentioned in the table.",
          "Ratio (EER) mentioned in the table",
        ],
      ],
      logo: tempreture,
      heading: "Industrial Chiller System",
      showTable: true,
    },
    {
      text: [
        "Has the insulation level of the chilled water distribution system been assessed to ensure it is sufficient to minimize energy loss?",
        "Has the system been designed to minimize pumping losses by reducing or eliminating bypass/re-circulation?",
      ],
      answers: [[], []],
      logo: snowflakes,
      heading: "Chilled Water Distribution System",
      showTable: false,
    },
    {
      text: [
        "Have you considered selecting an energy-efficient chiller for all the plant?",
      ],
      answers: [
        [
          "All condenser units should meet the Minimum Energy Efficiency Ratio (EER)",
        ],
      ],
      logo: warehouse,
      heading: "Refrigerated Storage Area",
      showTable: true,
    },
    {
      text: [
        "Has the electrical system been designed to incorporate control measures?",
      ],
      answers: [
        [
          "The electrical system must incorporate control measures like",
          "Distributed Power Flow Controller (DPFC)",
          "Voltage Optimizer",
          "Harmonic Filters",
          "Capacitor Banks",
          "To maintain high power factor and low hormonic levels, hence power quality",
        ],
      ],
      logo: bolt,
      heading: "Power Quality",
      showTable: false,
      boldAnswerIndex: 0,
    },
    {
      text: [
        "Has the design process considered identifying and evaluating potential waste heat recovery systems based on the waste heat generated during the process?",
      ],
      answers: [["Develop Waste heat recovery and utilization strategy"]],
      logo: summer,
      heading: "Process Waste Heat Recovery",
      showTable: false,
    },
    {
      text: [
        "Has the design process considered identifying and evaluating potential waste heat recovery systems based on the waste heat generated during the process?",
        "Are all the sub-meters labeled for easy identification and tracking of energy consumption?",
      ],
      answers: [
        [
          "Develop a sub-metering, monitoring and automatic data recording strategy to account for a minimum of the following",
          "Heating and cooling system",
          "Internal & External Lighting",
          "Compressed air system",
          "Loads above 50KW",
          "Production line-wise sub-metering",
        ],
        [
          ". In case the facility is contemplating a SCADA/ Automatic controls, these meters should be capable of providing the required outputs and integration.",
        ],
      ],
      logo: r_bin,
      heading: "Process Energy Sub-Metering",
      showTable: false,
      boldAnswerIndex: 0,
    },
    {
      text: [
        "Has the development team considered improving the energy efficiency of the building's envelope?",
      ],
      answers: [
        [
          "Make Sure that the development team considers the improvement in the energy efficiency of the building's envelope.",
          "The envelope addresses the following",
          "Horizontal Opaque elements – Roof, Slabs",
          "Vertical Opaque element – Wall, door",
          "Horizontal Glazing – Sky light",
          "Vertical Glazing – Glass Door, windows.",
        ],
        [
          ". In case the facility is contemplating a SCADA/ Automatic controls, these meters should be capable of providing the required outputs and integration.",
        ],
      ],
      logo: hand_holding_2,
      heading: "Energy Conservation Techniques and Thermal Insulation",
      showTable: true,
      boldAnswerIndex: 0,
    },
    {
      text: [
        "Has interior thermal imaging been conducted for air-conditioned/climate-controlled spaces to identify potential building defects?",
        "If leaks or gaps were identified, have appropriate corrective actions been taken to address them?",
      ],
      answers: [
        ["The thermography report highlighting"],
        [
          "The thermography report highlighting",
          "The defects in the building envelope",
          "The leakage spots noticed in the space and,",
          "Recommendations for rectifications",
        ],
      ],
      logo: snow_blowing,
      heading:
        "Envelope Tightness for Air-Conditioned Spaces - Thermal Imaging Technique",
      showTable: false,
      boldAnswerIndex: 4,
    },
  ];

  return (
    <>
      <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {questions.map((q, index) => (
          <Question
            key={index}
            questionText={q.text}
            logo={q.logo}
            heading={q.heading}
            answers={q.answers}
            showTable={q.showTable}
            boldAnswerIndex={q.boldAnswerIndex}
          />
        ))}
      </Grid2>
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          mt: "20px",
        }}
      >
        <DecarbonizationQsnAnsWithUl></DecarbonizationQsnAnsWithUl>
        <DecarbonizationQsnAnsWithUl2></DecarbonizationQsnAnsWithUl2>
        <DecarbonizationQsnAnsWithUi3></DecarbonizationQsnAnsWithUi3>
        <DecarbonizationQsnAnsWithUi4></DecarbonizationQsnAnsWithUi4>
        <DecarbonizationQsnAnsWithUi5></DecarbonizationQsnAnsWithUi5>
        <DecarbonizationQsnAnsWithUi6></DecarbonizationQsnAnsWithUi6>
        <DecarbonizationQsnAnsWithUi7></DecarbonizationQsnAnsWithUi7>
        <DecarbonizationQsnAnsDiffUi8></DecarbonizationQsnAnsDiffUi8>
        <DecarbonizationQsnAnsDiffUi9></DecarbonizationQsnAnsDiffUi9>
        <DecarbonizationQsnAnsDiffUi10></DecarbonizationQsnAnsDiffUi10>
        <DecarbonizationQsnAnsDiffUi11></DecarbonizationQsnAnsDiffUi11>
        <DecarbonizationQsnAnsDiffUi12></DecarbonizationQsnAnsDiffUi12>
        <DecarbonizationQsnAnsDiffUi13></DecarbonizationQsnAnsDiffUi13>
        <DecarbonizationQsnAnsDiffUi14></DecarbonizationQsnAnsDiffUi14>
      </Grid2>
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          mt: "45px",
        }}
      >
        <Button
          sx={{
            borderRadius: "32px",
            textTransform: "capitalize",
            justifyContent: "center",
            alignItems: "center",
            background:
              "var(--grad-3, linear-gradient(102deg, #369D9C 0%, #28814D 100%))",
            padding: "11px 40px",
          }}
        >
          <Typography color="#fff" fontSize="14px" fontWeight="600">
            Submit Survey
          </Typography>
        </Button>
      </Grid2>
    </>
  );
}

export default SurveyQuestionSection;

// // -------------------------------------
