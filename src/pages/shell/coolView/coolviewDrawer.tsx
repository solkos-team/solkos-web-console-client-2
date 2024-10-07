import React, { useEffect, useState } from "react";
import { Alert, Drawer } from "@mantine/core";
import { getDates, updateTelemetriaStatus, } from "../../../Functions/Coolview";
import { CoolviewAnimationOpen, LogoCoolview, } from "../../../sampleData/Coolview/CoolviewIcons";
import { IconInfoCircle } from "@tabler/icons-react";
import { Player } from '@lottiefiles/react-lottie-player'

export const coolviewDrawer = ({
  opened,
  onClose,
  CoolerId,
  dateStat,
  url2,
}) => {
  const [telemetriaStatus, setTelemetriaStatus] = useState(true);
  const [URL, setURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false)
  const mesToday = new Date();
  if (dateStat != undefined && URL == "") {
    setURL(
      `https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${getDates(
        dateStat.getDate() + 1,
        dateStat.getMonth() + 1,
        dateStat.getFullYear()
      )[1]
      }&end_date=${getDates(
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Espera un poco antes de hacer visible el iframe
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Tiempo en milisegundos para iniciar la visibilidad

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const borderElement: any = document.querySelector('.mantine-w29q45');

    if (borderElement) {
      borderElement.style.borderBottom = isLoading == true ? '' : '2px solid #CED4DA';
    }

  }, [isLoading]);

  return telemetriaStatus === true ? (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "4px",
            visibility: isLoading == true ? 'hidden' : 'visible'
          }}
        >
          <div style={{display:'flex',flexDirection:'column',marginLeft:'2rem'}}>
            <div style={{ color: 'var(--other-black, #000)', fontSize: '1.375rem', display: 'flex', alignItems: 'center',gap:'0.5rem' }}>
              <img
                src={LogoCoolview}
                alt={"LogoCoolview"}
                style={{ height: '2rem', width: '2rem' }}
              />
              Coolview
            </div>
            <h1 style={{ color: 'var(--Neutral-Outline, #88888B)', fontSize: '0.625rem', marginLeft: '2.5rem' }}>Visualización avanzada de telemetría</h1>
          </div>
        </div>
      }
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
      withCloseButton={false}
    >
      <section className="coolview_printipal">
        {
          isLoading == true ?
            <div style={{ width: '100%', height: '95%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Player src={CoolviewAnimationOpen} autoplay style={{ height: '300px', width: '300px' }} loop />
            </div>
            : <iframe src={url2} width="100%" height="85%" frameBorder="0"/>
        }
        <div style={{ width: '100%', height: 'max-content', background: '', color: 'var(--Neutral-Outline, #88888B)', display: 'flex', alignItems: 'center', justifyContent: 'center',zIndex:'1' ,marginTop:'-1rem' }}>powered by solkos</div>
      </section>
    </Drawer>
  ) : (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "4px",
            visibility: isLoading == true ? 'hidden' : 'visible'
          }}
        >
          <div style={{display:'flex',flexDirection:'column',marginLeft:'2rem'}}>
            <div style={{ color: 'var(--other-black, #000)', fontSize: '1.375rem', display: 'flex', alignItems: 'center',gap:'0.5rem' }}>
              <img
                src={LogoCoolview}
                alt={"LogoCoolview"}
                style={{ height: '2rem', width: '2rem' }}
              />
              Coolview
            </div>
            <h1 style={{ color: 'var(--Neutral-Outline, #88888B)', fontSize: '0.625rem', marginLeft: '2.5rem' }}>Visualización avanzada de telemetría</h1>
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
          ?
          <section style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Player src={CoolviewAnimationOpen} autoplay style={{ height: '300px', width: '300px' }} loop></Player>
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
