import React from 'react'
import { Drawer } from '@mantine/core'
import { getMonth } from '../../../Functions/Coolview'


export const coolviewDrawer = ({ opened, onClose, CoolerId }) => {
    const mesToday = new Date()
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title="CoolView"
            position="bottom"
            size="95%"
        >
            <section className="coolview_printipal">
                {/* <iframe
                    src={`http://localhost:5173?device_id=${CoolerId}&start_date=${getMonth(mesToday.getMonth()).firstDay}&end_date=${getMonth(mesToday.getMonth() + 1).lastDay}&clt=false`}
                    width='100%'
                    height='100%'
                    frameBorder='0'
                /> */}
                <iframe
                    src={`https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${getMonth(mesToday.getMonth()).firstDay}&end_date=${getMonth(mesToday.getMonth() + 1).lastDay}&clt=false`}
                    width='100%'
                    height='100%'
                    frameBorder='0'
                />
            </section>
        </Drawer>
    )
}


{/* <iframe
    src={`http://localhost:5173?device_id=${CoolerId}&start_date=${getMonth(mesToday.getMonth()).firstDay}&end_date=${getMonth(mesToday.getMonth() + 1).lastDay}&clt=false`}
    width='100%'
    height='100%'
    frameBorder='0'
/> */}