import React from 'react';
import { Accordion } from '@mantine/core';

export const HeaderInsights = ({title,description}) => {
  return (
    <Accordion className='insights_title_responsive'>
      <Accordion.Item key='Header' value='HeaderResponsive'>
        <Accordion.Control style={{
          fontSize : '1.375rem',
          fontStyle : 'normal',
          fontWeight : '700',          
          color : 'var(--other-black, #000)'
        }}>{title}</Accordion.Control>
        <Accordion.Panel
        style={{
          textAlign :'left',
          color : '#868E96'   
        }}>{description}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
