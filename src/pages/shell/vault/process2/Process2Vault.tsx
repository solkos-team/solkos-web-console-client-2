import React, { useState } from 'react'
import { StepOne } from './StepOne/StepOne'

export const Process2Vault = () => {
  //logica boton
  const [step,setStep] = useState(0)
  return (
    <section className='insights_principal_container' style={{height:'90%'}}>
      <StepOne />
    </section>
  )
}
