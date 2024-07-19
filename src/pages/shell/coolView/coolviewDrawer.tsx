import React, { useEffect, useState } from "react";
import { Drawer } from "@mantine/core";
import { formatDrawerCoolview, getMonth, obtenerFechas } from "../../../Functions/Coolview";
import { LogoCoolview } from "../../../sampleData/Coolview/coolviewIcons"; 
export const coolviewDrawer = ({ opened, onClose, CoolerId,mesLastStat,dateStat }) => {  
  const [URL,setURL] = useState<string>('')  
  const mesToday = new Date();
  if(dateStat != undefined && URL == ''){  
  setURL(`https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${            
            obtenerFechas(dateStat.getUTCMonth() + 1,dateStat.getFullYear())[1]
          }&end_date=${obtenerFechas(dateStat.getUTCMonth() + 1,dateStat.getFullYear())[0]}&clt=false`)
  }
  
  

  useEffect(() => {
    formatDrawerCoolview()
  }, [opened]);
  formatDrawerCoolview()    
  console.log(dateStat)
  return (
    dateStat !== undefined 
   ?
   <Drawer
      opened={opened}
      onClose={onClose}
      title={<img src={LogoCoolview} alt={'LogoCoolview'} className="CoolviewLogo"></img>}
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
    >
      <section className="coolview_printipal">  
        <iframe
          src={URL}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </section>
    </Drawer> 
   : <Drawer
   opened={opened}
   onClose={onClose}
   title={<img src={LogoCoolview} alt={'LogoCoolview'} className="CoolviewLogo"></img>}
   position="bottom"
   size="76%"
   overlayOpacity={0.1}
   overlayBlur={0}
   className="drawerCoolview"
 >
   <section className="coolview_printipal">  
     <iframe
       src={`https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${
            getMonth(mesToday.getMonth(),mesToday.getFullYear()).firstDay
          }&end_date=${getMonth(mesToday.getMonth() + 1,mesToday.getFullYear()).lastDay}&clt=false`}
       width="100%"
       height="100%"
       frameBorder="0"
     />
   </section>
 </Drawer> 
  )
};

