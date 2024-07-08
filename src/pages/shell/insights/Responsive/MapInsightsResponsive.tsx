import React from 'react'
import { MapOpen } from '../../../../sampleData/icons'

export const MapInsightsResponsive = ({opened}) => {
  return (
    <button className='MapInsightsResponsive' onClick={opened}>
      <img src={MapOpen} alt="" />
      Ver mapa</button>
  )
}
