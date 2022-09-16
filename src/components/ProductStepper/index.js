import React from "react";
import { Box, Stepper, Step, StepLabel, Container } from "@material-ui/core";
import { StepIconComponent } from "./styles";
import { LooksOne, LooksTwo } from "@material-ui/icons";
import Looks3Icon from "@material-ui/icons/Looks3";
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <LooksOne />,
    2: <LooksTwo />,
    3: <Looks3Icon />,
  };

  return (
    <StepIconComponent ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </StepIconComponent>
  );
}

export default function ProcuctStepper({ steps, activeStep }) {
  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps &&
          steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
      </Stepper>
    </Container>
  );
}
