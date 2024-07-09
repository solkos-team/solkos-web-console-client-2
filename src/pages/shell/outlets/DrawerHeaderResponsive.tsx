import React from 'react'
import { Accordion } from '@mantine/core';

export const DrawerHeaderResponsive = ({title,description}) => {
  return (
    <Accordion  className='pdv_drawer_header_responsive'>
      <Accordion.Item key='Header' value='HeaderResponsive'>
        <Accordion.Control style={{
          fontSize : '22px',
          fontStyle : 'normal',
          fontWeight : '700',
          lineHeight : '140%',
          color : '#000'
        }}>
            <section style={{display:'flex',flexDirection:'row'}}>
            <div style={{width:'30%',backgroundColor:'blue',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>icono</div>
            <div style={{width:'70%',backgroundColor:'red'}}>
                <div style={{width:'100%',height:'30px',backgroundColor:'gray'}}></div>
                <div style={{width:'100%',height:'30px',backgroundColor:'gray'}}></div>
                <div style={{width:'100%',height:'30px',backgroundColor:'gray'}}></div>
            </div>
            </section>
        </Accordion.Control>
        <Accordion.Panel
        style={{
          textAlign :'left',
          color : '#868E96'   
        }}>{description}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
