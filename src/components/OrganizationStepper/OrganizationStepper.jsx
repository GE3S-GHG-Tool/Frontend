import { useState } from "react";
import "./OrganizationStepper.css";
import Wrapper from "../Wrapper/Wrapper";
import Organization from "./Organization";
import Details from "./Details";
import Goals from "./Goals";
import Invite from "./Invite";

export default function OrganizationStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Wrapper>
      <div className="stepper">
        {activeStep === 0 && (
          <Organization activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {activeStep === 1 && (
          <Details activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {activeStep === 2 && (
          <Goals activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        {activeStep === 3 && (
          <Invite activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
        <div className="seperate"></div>
        <div className="stepper_comp">
          <span className={activeStep === 0 ? "current_step" : "circle"}>
            1
          </span>
          <p>Organisation</p>
          <div className="lines"></div>
          <span className={activeStep === 1 ? "current_step" : "circle"}>
            2
          </span>
          <p>Basic Details</p>
          <div className="lines"></div>
          <span className={activeStep === 2 ? "current_step" : "circle"}>
            3
          </span>
          <p>Goals</p>
          <div className="lines"></div>
          <span className={activeStep === 2 ? "current_step" : "circle"}>
            4
          </span>
          <p>Invite</p>
        </div>
      </div>
    </Wrapper>
  );
}
