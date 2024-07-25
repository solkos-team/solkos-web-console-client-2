import React, { useEffect, useState } from "react";
import { Alert, Drawer } from "@mantine/core";
import {
  formatDrawerCoolview,
  getMonth,
  obtenerFechas,
  updateTelemetriaStatus,
} from "../../../Functions/Coolview";
import { LogoCoolview } from "../../../sampleData/Coolview/coolviewIcons";
import { IconInfoCircle } from "@tabler/icons-react";
export const coolviewDrawer = ({
  opened,
  onClose,
  CoolerId,
  dateStat,
}) => {
  const [telemetriaStatus,setTelemetriaStatus] = useState(true)
  const [URL, setURL] = useState<string>("");
  const mesToday = new Date();
  if (dateStat != undefined && URL == "") {
    setURL(
      `https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${obtenerFechas(dateStat.getUTCMonth() + 1, dateStat.getFullYear())[1]
      }&end_date=${obtenerFechas(dateStat.getUTCMonth() + 1, dateStat.getFullYear())[0]
      }&clt=false`
    );
  }

  updateTelemetriaStatus(dateStat,telemetriaStatus,setTelemetriaStatus);
  useEffect(() => {
    formatDrawerCoolview();
  }, [opened]);
  formatDrawerCoolview();  
  return  telemetriaStatus === true ? (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <img
          src={LogoCoolview}
          alt={"LogoCoolview"}
          className="CoolviewLogo"
        ></img>
      }
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
    >
      <section className="coolview_printipal">
        <iframe src={URL} width="100%" height="100%" frameBorder="0" />
      </section>
    </Drawer>
  ) : (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <img
          src={LogoCoolview}
          alt={"LogoCoolview"}
          className="CoolviewLogo"
        ></img>
      }
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
    >
      <section style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert variant="light" color={'yellow'} title={'Sin telemetria'} icon={<IconInfoCircle />}>
          Lo sentimos,se realizo la consulta exitosamente, pero este enfriador no posee telemetria para mostrar en Coolview.
        </Alert>
      </section>
    </Drawer>
  )
    ;
};
