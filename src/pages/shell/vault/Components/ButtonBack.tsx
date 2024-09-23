import React from 'react'
import { Button } from 'rsuite'

export const ButtonBack = ({prevStep,active}) => {
  return (
    <Button
    className='vault_buttons'
      style={{
        color: "#ED5079",
        background: "#FFFF", 
        visibility : active == 1 ? 'hidden' : 'visible'     
      }}
      onClick={prevStep}
    >
      Regresar
    </Button>
  )
}
