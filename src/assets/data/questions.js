import ac_motors_logo from "../images/ac-motors_logo.svg";
import process_pumps_logo from "../images/process_pumps_logo.svg";
import process_fans_logo from "../images/process_fans_logo.svg";
import selection_cooling from "../images/selection_cooling.svg";
import en_c from "../images/en_c.svg";
import wind from "../images/wind.svg";
import boiler from "../images/boiler.svg";
import tempreture from "../images/temperature.svg";
import snowflakes from "../images/snowflakes.svg";
import warehouse from "../images/warehouse.svg";
import bolt from "../images/bolt.svg";
import r_bin from "../images/recycle-bin.svg";
import snow_blowing from "../images/snow-blowing.svg";
import meter_bolt from "../images/meter-bolt 1.svg";
import calculator_bill from "../images/calculator-bill 1.svg";
import hand_holding from "../images/hand-holding-water 1.svg";
import steam from "../images/steam.svg";
import smoke from "../images/smoke.svg";
import lightbulb from "../images/lightbulb.svg";
import insight from "../images/insight.svg";
import ideaChange from "../images/idea-exchange.svg";
import lightBulbSetting from "../images/lightbulb-setting.svg";
import solar_panel from "../images/solar-panel.svg";
import solarpanel_1 from "../images/solar-panel 1.svg";
import lightSelling from "../images/light-ceiling 1.svg";
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
        qsnId: 2,
      },
      {
        qsnText:
          "Are bypass valves and valve throttling being eliminated in all retrofitting projects?",
        qsnId: 3,
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
        qsnId: 4,
      },
      {
        qsnText:
          "Does the fan comply with a Fan Efficiency Grade (FEG) of 85% or higher?",
        qsnId: 5,
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
        qsnId: 6,
      },
      {
        qsnText:
          "Are measures in place to minimize leakage in the compressed air system of the existing plant?",
        qsnId: 7,
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
        qsnId: 8,
      },
      {
        qsnText:
          "Is are all the boiler equipped with a smart control system to optimize operational efficiency?",
        qsnId: 9,
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
        qsnId: 10,
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
        qsnId: 11,
      },
    ],
    logo: tempreture, // Replace with your logo path
    heading: "Industrial Chiller System", // Example heading
  },
  {
    id: 8,
    text: [
      {
        qsnText:
          "Has the insulation level of the chilled water distribution system been assessed to ensure it is sufficient to minimize energy loss?",
        qsnId: 12,
      },
      {
        qsnText:
          "Has the system been designed to minimize pumping losses by reducing or eliminating bypass/re-circulation?",
        qsnId: 13,
      },
    ],
    logo: snowflakes, // Replace with your logo path
    heading: "Chilled Water Distribution System", // Example heading
  },
  {
    id: 9,
    text: [
      {
        qsnText:
          "Has a high-efficiency condenser suitable for the plant been selected?",
        qsnId: 14,
      },
    ],
    logo: warehouse,
    heading: "Refrigerated Storage Area",
  },
  {
    id: 10,
    text: [
      {
        qsnText:
          "Has the electrical system been designed to incorporate control measures?",
        qsnId: 15,
      },
    ],
    logo: bolt,
    heading: "Power Quality",
  },
  {
    id: 11,
    text: [
      {
        qsnText:
          "Has the design process considered identifying and evaluating potential waste heat recovery systems based on the waste heat generated during the process?",
        qsnId: 16,
      },
    ],
    logo: tempreture,
    heading: "Process Waste Heat Recovery",
  },
  {
    id: 12,
    text: [
      {
        qsnText:
          "Has the design process considered identifying and evaluating potential waste heat recovery systems based on the waste heat generated during the process?",
        qsnId: 17,
      },
      {
        qsnText:
          "Are all the sub-meters labeled for easy identification and tracking of energy consumption?",
        qsnId: 18,
      },
    ],
    logo: r_bin,
    heading: "Process Energy Sub-Metering",
  },
  {
    id: 13,
    text: [
      {
        qsnText:
          "Has the development team considered improving the energy efficiency of the buildings envelope?",
        qsnId: 19,
      },
    ],
    logo: en_c,
    heading:
      "Energy Conservation Techniques and Thermal Insulation (Applicable for both Air-conditioned and Non-Air-Conditioned buildings)",
  },
  {
    id: 14,
    text: [
      {
        qsnText:
          "Has interior thermal imaging been conducted for air-conditioned/climate-controlled spaces to identify potential building defects?",
        qsnId: 20,
      },
      {
        qsnText:
          "If leaks or gaps were identified, have appropriate corrective actions been taken to address them?",
        qsnId: 21,
      },
      {
        qsnText:
          "Have the tests and reports been conducted in compliance with the specified conditions?",
        qsnId: 22,
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
        qsnText:
          "Has the industrial facility/warehouse been assessed for envelope airtightness, and have measures been taken to identify and address any defects or leakages?",
        qsnId: 23,
      },
    ],
    logo: meter_bolt,
    heading:
      "Envelope Tightness (Performance-based) Blower Door Test Technique",
  },
  {
    id: 16,
    text: [
      {
        qsnText:
          "Have you evaluated the potential impact of different HVAC systems on energy efficiency and operating costs to inform your selection?",
        qsnId: 24,
      },
    ],
    logo: calculator_bill,
    heading: "Optimal System Sizing - HVAC",
  },
  {
    id: 17,
    text: [
      {
        qsnText:
          "Have you considered incorporating design strategies to utilize Energy Recovery Units (ERUs) in the plant?",
        qsnId: 25,
      },
    ],
    logo: hand_holding,
    heading:
      "Installation of Energy Recovery Units and regulated air intake system",
  },
  {
    id: 18,
    text: [
      {
        qsnText:
          "Have you confirmed that the energy-efficient cooling equipment to be procured and installed is consistent with the capacities specified in the 'Optimal System Sizing - HVAC' section?",
        qsnId: 26,
      },
    ],
    logo: selection_cooling,
    heading:
      "Selection of Cooling Equipment with High Energy Efficiency Ratio (EER)",
  },
  {
    id: 19,
    text: [
      {
        qsnText:
          "Have you considered incorporating the necessary strategies into the HVAC system design to ensure efficient control and operation of the units?",
        qsnId: 27,
      },
    ],
    logo: smoke,
    heading: "Programmable thermostats and CO2 Sensors for HVAC system",
  },
  {
    id: 20,
    text: [
      {
        qsnText:
          "Have you considered ways to improve interior lighting levels while ensuring they do not exceed the limits",
        qsnId: 28,
      },
    ],
    logo: lightbulb,
    heading: "Light Power Density - Interior",
  },
  {
    id: 21,
    text: [
      {
        qsnText:
          "Have you considered selecting internal lighting systems that offer flexible control options",
        qsnId: 29,
      },
    ],
    logo: insight,
    heading: "Automated lighting control / motion sensor for internal lighting",
  },
  {
    id: 22,
    text: [
      {
        qsnText:
          "Have you confirmed that the exterior lighting levels have been improved and do not exceed the specified limits?",
        qsnId: 30,
      },
    ],
    logo: ideaChange,
    heading: "Exterior Light Power Density",
  },
  {
    id: 23,
    text: [
      {
        qsnText:
          "Have you confirmed that the external lighting systems incorporate strategies to switch on/off based on specific needs or timings?",
        qsnId: 31,
      },
    ],
    logo: lightBulbSetting,
    heading: "Control of External lights",
  },
  {
    id: 24,
    text: [
      {
        qsnText:
          "Has the feasibility of a solar thermal hot water system been assessed, and has the potential reduction in CO2 emissions been estimated?",
        qsnId: 32,
      },
    ],
    logo: solar_panel,
    heading: "Renewable Power Source - Industrial hot water",
  },
  {
    id: 25,
    text: [
      {
        qsnText:
          "Have you considered conducting a feasibility study to explore the potential of generating renewable power on-site?",
        qsnId: 33,
      },
    ],
    logo: solarpanel_1,
    heading: "Onsite Renewable Energy Generation",
  },
  {
    id: 26,
    text: [
      {
        qsnText:
          "Have you explored the possibility of incorporating daylighting technologies into the industrial design?",
        qsnId: 34,
      },
    ],
    logo: lightSelling,
    heading: "General Plant Lighting - Use of Solar Daylighting Technologies",
  },
];

export default questions;
