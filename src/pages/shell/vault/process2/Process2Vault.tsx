import React, { useState } from 'react'
import { StepOne } from './StepOne/StepOne'
import { StepTwo } from './StepTwo/StepTwo';
import { Stepper } from '@mantine/core';
import { StepFinal } from './StepFinal/StepFinal';
import { CoolerInterface } from '../../../../interfaces/CoolerInterface';
import { vaultProces2RemoveDuplicades } from '../../../../Functions/Vault';

export const Process2Vault = () => {
  //logica boton
  const [step,setStep] = useState(0)
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));  
  const [coolersToChange,setCoolersToChange] = useState<CoolerInterface[]>([]) 
  const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);  
  
  return (
    <section className='insights_principal_container' style={{height:'90%'}}>
      <StepOne active={active} setActive={setActive} nextStep={nextStep} prevStep={prevStep} coolersToChange={coolersToChange} setCoolersToChange={setCoolersToChange}  coolersData={coolersData} setCoolersData={setCoolersData} />
      <StepTwo active={active} setActive={setActive} nextStep={nextStep} prevStep={prevStep} coolersToChange={coolersToChange} />
      <StepFinal active={active} coolersToChange={coolersToChange}  />
    </section>
  )
}
