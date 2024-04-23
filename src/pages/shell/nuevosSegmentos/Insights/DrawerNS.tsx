import React from 'react'
import { Drawer } from '@mantine/core'
import IconD from '../../../../sampleData/NS/TransmitionNSDrawer.svg'
import ArrowIcon from '../../../../sampleData/NS/Arrow.svg'

export const DrawerNS = ({opened,close}) => {
  return (
    <Drawer opened={opened} onClose={close} title="" position='right' size="40rem">
        <section className="insights_drawer_container">
            <section className="insights_drawer_header">
                <section className="insights_drawer_header_iconHeader">
                  <img src={IconD} alt="IconDrawer" style={{width:'2rem', height:'2rem'}}/>
                  <div>Equipos Transmitiendo</div>
                </section>
                <section className="insights_drawer_header_max">
                  <div>10</div>
                  <div className="insights_drawer_header_arrow"><img src={ArrowIcon} alt="" /></div>
                  <div>+0</div>
                  <div>desde ayer</div>
                </section>
            </section>
            <section className="insights_drawer_content"></section>
        </section>
      </Drawer>
  )
}
