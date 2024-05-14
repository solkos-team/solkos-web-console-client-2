import React from 'react';
import { Accordion } from '@mantine/core';

export const HeaderInsights = () => {
  return (
    <Accordion className='insights_title_responsive'>
      <Accordion.Item key='Header' value='HeaderResponsive'>
        <Accordion.Control style={{
          fontSize : '22px',
          fontStyle : 'normal',
          fontWeight : '700',
          lineHeight : '140%',
          color : '#000'
        }}>Cooler Insights</Accordion.Control>
        <Accordion.Panel
        style={{
          textAlign :'left',
          color : '#868E96'   
        }}>Haz un seguimiento de todos los parámetros de cada uno de tus enfriadores</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
