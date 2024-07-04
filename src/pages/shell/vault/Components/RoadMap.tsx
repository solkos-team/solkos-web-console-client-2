import React from "react";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";

export const RoadMap = ({ active, setActive, nextStep, prevStep }) => {
  // const [active, setActive] = useState(1);
  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <Stepper active={active} onStepClick={setActive} size="xs" radius='xs'>
         <Stepper.Step label="Activar o Desactivar Vault" >
           {/* Step 1 content: Create an account */}
         </Stepper.Step>
         <Stepper.Step label="Revisión Final" >
           {/* Step 2 content: Verify email */}
         </Stepper.Step>              
       </Stepper>
    </>
  );
};
