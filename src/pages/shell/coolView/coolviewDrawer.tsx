import React, { useEffect, useState } from "react";
import { Alert, Drawer } from "@mantine/core";
import {formatDrawerCoolview,getDates,updateTelemetriaStatus,} from "../../../Functions/Coolview";
import {CoolviewAnimationOpen, LogoCoolview,} from "../../../sampleData/Coolview/CoolviewIcons";
import { IconInfoCircle } from "@tabler/icons-react";
import {Player} from '@lottiefiles/react-lottie-player'

export const coolviewDrawer = ({
  opened,
  onClose,
  CoolerId,
  dateStat,
  url2,
}) => {
  const [telemetriaStatus, setTelemetriaStatus] = useState(true);
  const [URL, setURL] = useState<string>("");
  const [isLoading,setIsLoading] = useState(false)
  const mesToday = new Date();
  if (dateStat != undefined && URL == "") {
    setURL(
      `https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${
        getDates(
          dateStat.getDate() + 1,
          dateStat.getMonth() + 1,
          dateStat.getFullYear()
        )[1]
      }&end_date=${
        getDates(
          dateStat.getDate() + 1,
          dateStat.getMonth() + 1,
          dateStat.getFullYear()
        )[0]
      }&clt=false`
    );
  }

  updateTelemetriaStatus(dateStat, telemetriaStatus, setTelemetriaStatus);
  
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [opened]);
  
  return telemetriaStatus === true ? (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        isLoading == true ? '' :   
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <img
            src={LogoCoolview}
            alt={"LogoCoolview"}
            // className="CoolviewLogo"
            style={{height:'50px'}}
          />    
          <div>
            <div style={{color:'var(--other-black, #000)',fontSize:'1.375rem'}}>Coolview</div>
            <div style={{color:'var(--Neutral-Outline, #88888B)',fontSize:'0.625rem'}}>Visualización avanzada de telemetría</div>
          </div>      
        </div>
      }
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
    >
      <section className="coolview_printipal">
        {
          isLoading == true ? 
          <div style={{width:'100%',height:'95%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Player src={CoolviewAnimationOpen} autoplay style={{width:'100%',height:'100%'}} />
          </div>
          : <iframe src={url2} width="100%" height="95%" frameBorder="0" />
        }
        <div style={{width:'100%',height:'15%',background:'',color:'var(--Neutral-Outline, #88888B)',display:'flex',alignItems:'center',justifyContent:'center'}}>powered by solkos</div>
      </section>
    </Drawer>
  ) : (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={    
        isLoading == true ? '' :    
        <div
          style={{
            display:  "flex",
            width: "100%",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <img
            src={LogoCoolview}
            alt={"LogoCoolview"}
            // className="CoolviewLogo"
            style={{height:'50px'}}
          />    
          <div>
            <div style={{color:'var(--other-black, #000)',fontSize:'1.375rem'}}>Coolview</div>
            <div style={{color:'var(--Neutral-Outline, #88888B)',fontSize:'0.625rem'}}>Visualización avanzada de telemetría</div>
          </div>      
        </div>
      }
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
    >
      {
        isLoading == true 
        ? <section style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Player src={CoolviewAnimationOpen} autoplay style={{width:'100%',height:'100%'}}></Player>
        </section>  
        :
        <section
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Alert
            variant="light"
            color={"yellow"}
            title={"Sin telemetria"}
            icon={<IconInfoCircle />}
          >
            Lo sentimos,se realizo la consulta exitosamente, pero este enfriador
            no posee telemetria para mostrar en Coolview.
          </Alert>
        </section>
      }
    </Drawer>
  );
};
