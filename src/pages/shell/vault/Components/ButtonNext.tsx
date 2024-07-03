import React from "react";
import { Button } from "rsuite";

export const ButtonNext = ({nextStep,active}) => {
  return (
    <Button
    className="vault_buttons"
      style={{
        color: "white",
        background: "#ED5079",
      }}      
      onClick={nextStep}
      // disabled = {active == 0 ? true : false}
    >
      Continuar
    </Button>
  );
};
