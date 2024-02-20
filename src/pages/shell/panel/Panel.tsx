import React, { useState, useEffect } from "react";
import { Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowDownRight, IconArrowRight } from "@tabler/icons-react";
export default function Panel() {
  const [opened, { open, close }] = useDisclosure(false);
  // Page (Body)
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      {/* <iframe
        src="https://tableau.efemsa.com/views/KOF_Nacional/KOF?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y"
        title="iframe Example 1"
        width="900"
        height="1200"
        style={{ marginLeft: -30 }}
      >
        <p></p>
      </iframe> */}
      <div className="clt_actividad_acerca_principal">
        <section className="clt_actividad_principal">
          <div className="clt_actividad_principal_title">
            <img
              src={"../../sampleData/cooler1.png"}
              alt="Descripción de la imagen"
              style={{ width: "22px", height: "22px" }}
            />
            <h1 className="clt_actividad_principal_title_h1">Actividad del enfriador</h1>
          </div>   
          <div className="clt_acerca_principal_cards">
            <div className="clt_acerca_principal_cards_info">
              {/* Fecha & Actividad */}
              <div className="clt_acerca_principal_cards_info_fecha">
                <h1 className="clt_acerca_principal_cards_info_fecha_h1">14 de febrero</h1>                
                <h1 className="clt_acerca_principal_cards_info_fecha_estatus_h1">Activa</h1>
              </div>
              {/* Order y Tipo falla,alerta,movimiento */}
              <div className="clt_acerca_principal_cards_info_orden">
                <h1 className="clt_acerca_principal_cards_info_orden_h1">Orden REY0791626</h1>                                
                <h1 className="clt_acerca_principal_cards_info_orden_tipo"></h1>                                
              </div>
            </div>
          </div>   
        </section>
        <section className="clt_acerca_principal">
          <div className="clt_actividad_principal_title">
            <img
              src={"../../sampleData/buildings.png"}
              alt="Descripción de la imagen"
              style={{ width: "22px", height: "22px" }}
            />
            <h1 className="clt_actividad_principal_title_h1">Acerca del punto de venta</h1>
          </div>
          <div className="clt_actividad_principal_title_nombre">
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre del punto de venta</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre del punto de venta</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
          </div>
          <div className="clt_actividad_principal_title_nombre">
            <h1 className="clt_actividad_principal_title_nombre_h1">ID</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
          </div>
          <div className="clt_actividad_principal_title_nombre">
            <h1 className="clt_actividad_principal_title_nombre_h1">Dirección</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
          </div>
          <div className="clt_actividad_principal_title_nombre">
            <h1 className="clt_actividad_principal_title_nombre_h1">Punto de instalación (Lat, Lon)</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
          </div>
          <div className="clt_actividad_principal_title_nombre">
            <h1 className="clt_actividad_principal_title_nombre_h1">Última posición (Lat, Lon)</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
          </div>
          <div className="clt_actividad_principal_title_nombre">
            <h1 className="clt_actividad_principal_title_nombre_h1">Distancia el punto de instalación</h1>
            <h1 className="clt_actividad_principal_title_nombre_h1">Nombre</h1>
          </div>
          <div className="clt_actividad_principal_mapa"></div>
        </section>
      </div>
      <br />
      <div className="clt_inversion_gasto_principal">
        <section className="clt_inversion_principal">
          <div className="clt_inversion_principal_title_all">
            <div className="clt_actividad_principal_title">
              <img
                src={"../../sampleData/commerce.png"}
                width={"24px"}
                alt="cooler"
              ></img>
              <h1 className="clt_actividad_principal_title_h1">Inversión total en el enfriador </h1>                        
            </div>                    
          </div>
        </section>
        <section className="clt_acerca_de_principal">
          <div className="clt_actividad_principal_title">
            <img
              src={"../../sampleData/buildings.png"}
              alt="Descripción de la imagen"
              style={{ width: "22px", height: "22px" }}
            />
            <h1 className="clt_actividad_principal_title_h1">Acerca del punto de venta</h1>
          </div>
          <div className="clt_actividad_principal_data"></div>
        </section>
      </div>
    </>
  );
}
