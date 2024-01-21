import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";

const StepperComponent = () => {
  const [step, setStep] = useState(0);
  return (
    <>
      <Stepper activeStep={step} alternativeLabel>
        <Step>
          <StepLabel className="label">Personal Details</StepLabel>
        </Step>
        <Step>
          <StepLabel className="label">Address Details</StepLabel>
        </Step>
      </Stepper>
      <RegistrationForm step={step} setStep={setStep} />
    </>
  );
};

export default StepperComponent;
