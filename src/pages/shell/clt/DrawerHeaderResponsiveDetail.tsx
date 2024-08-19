import React from "react";
import { Accordion } from "@mantine/core";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/es";

moment.locale("es", {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  weekdays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
});

export default function DrawerHeaderResponsive({
  title,
  description,
  coolersData,
}) {
  const dto = useSelector((state: any) => state.organization);
  const {} = coolersData;

  return (
    <Accordion className="pdv_drawer_header_responsive">
      <Accordion.Item key="Header" value="HeaderResponsive">
        <Accordion.Control
          style={{
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "140%",
            color: "#000",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              // background: "red",
              width: "100%",
            }}
          >
            <div className="detail_image_info_data">
              <div className="detail_image_show">
                <img
                  src={coolersData?.asset?.url}
                  alt="cooler"
                  width={"130%"}
                  height={"85%"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://storage.googleapis.com/negocon-renders/default/default_cooler.webp";
                  }}
                />
              </div>
              <div className="detail_data_show_1">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0.25rem",
                    flex: 100,
                    marginLeft: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                      }}
                    >
                      <>
                        <div
                          style={{
                            width: "max-content",
                            display: "flex",
                            padding: "4px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "2px",
                            border:
                              coolersData?.cooler.actionable === "Visita PdV" &&
                              dto != "KOF Colombia"
                                ? "1.5px solid #DA7E05"
                                : coolersData?.cooler.actionable ===
                                    "Sin Riesgo" ||
                                  coolersData?.cooler.actionable ===
                                    "SIN RIESGO"
                                ? "1.5px solid #40C057"
                                : coolersData?.cooler.actionable ===
                                    "Estatus sin venta" ||
                                  coolersData?.cooler.actionable ===
                                    "SIN VENTA" ||
                                  coolersData?.cooler.actionable ===
                                    "Acciones urgentes" ||
                                  coolersData?.cooler.actionable ===
                                    "SIN COINCIDENCIA"
                                ? "1.5px solid #FA5252"
                                : coolersData?.cooler.actionable ===
                                  "Actualizar Info"
                                ? "1.5px solid #DA7E05"
                                : coolersData?.cooler.actionable ===
                                    "Actualizar dato" ||
                                  coolersData?.cooler.actionable ===
                                    "Datos faltantes" ||
                                  coolersData?.cooler.actionable ===
                                    "Monitoreo" ||
                                  coolersData?.cooler.actionable ===
                                    "Movimiento"
                                ? "1.5px solid #1864AB"
                                : coolersData?.cooler.actionable ===
                                    "Solicitar serv. correctivo" ||
                                  coolersData?.cooler.actionable ===
                                    "Solicitar serv. preventivos" ||
                                  coolersData?.cooler.actionable ===
                                    "Seguimiento a equipo" ||
                                  coolersData?.cooler.actionable ===
                                    "Visita PdV" ||
                                  coolersData?.cooler.actionable ===
                                    "VISITA PDV PARA LECTURA"
                                ? "1.5px solid #E67700"
                                : coolersData?.cooler.actionable ===
                                  "Visita PdV prioritaria"
                                ? "1.5px solid #C92A2A"
                                : "1.5px solid black",
                            background: "#FFF",
                          }}
                        >
                          <div
                            style={{
                              color:
                                coolersData?.cooler.actionable ===
                                  "Visita PdV" && dto != "KOF Colombia"
                                  ? "#DA7E05"
                                  : coolersData?.cooler.actionable ===
                                      "Sin Riesgo" ||
                                    coolersData?.cooler.actionable ===
                                      "SIN RIESGO"
                                  ? "#40C057"
                                  : coolersData?.cooler.actionable ===
                                      "Estatus sin venta" ||
                                    coolersData?.cooler.actionable ===
                                      "SIN VENTA" ||
                                    coolersData?.cooler.actionable ===
                                      "Acciones urgentes" ||
                                    coolersData?.cooler.actionable ===
                                      "SIN COINCIDENCIA"
                                  ? "#FA5252"
                                  : coolersData?.cooler.actionable ===
                                    "Actualizar Info"
                                  ? "#DA7E05"
                                  : coolersData?.cooler.actionable ===
                                      "Actualizar dato" ||
                                    coolersData?.cooler.actionable ===
                                      "Datos faltantes" ||
                                    coolersData?.cooler.actionable ===
                                      "Monitoreo" ||
                                    coolersData?.cooler.actionable ===
                                      "Movimiento"
                                  ? "#1864AB"
                                  : coolersData?.cooler.actionable ===
                                      "Solicitar serv. correctivo" ||
                                    coolersData?.cooler.actionable ===
                                      "Solicitar serv. preventivos" ||
                                    coolersData?.cooler.actionable ===
                                      "Seguimiento a equipo" ||
                                    coolersData?.cooler.actionable ===
                                      "Visita PdV" ||
                                    coolersData?.cooler.actionable ===
                                      "VISITA PDV PARA LECTURA"
                                  ? "#E67700"
                                  : coolersData?.cooler.actionable ===
                                    "Visita PdV prioritaria"
                                  ? "#C92A2A"
                                  : "black",
                              // fontFamily: "DM Sans",
                              fontSize: "0.875rem",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "14px",
                            }}
                          >
                            {coolersData?.cooler.actionable}
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                      }}
                    >
                      <div
                        style={{
                          color: "#000005",
                          // fontFamily: "DM Sans",
                          fontSize: "1.25rem",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "normal",
                        }}
                      >
                        {coolersData?.cooler?.serial_number === undefined
                          ? "Sin registro"
                          : coolersData?.cooler?.serial_number}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#868E96",
                      // fontFamily: "DM Mono",
                      fontSize: "0.75rem",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    {coolersData?.cooler?.model_id === undefined ||
                    coolersData?.cooler?.model_id === null
                      ? "Sin registro"
                      : coolersData?.cooler?.model_id}
                  </div>
                  {coolersData?.cooler?.status == undefined ||
                  coolersData?.cooler.status == "" ? (
                    <div
                      style={{
                        color: "#88888B",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      Sin registro
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          padding: "4px",
                          fontSize: "0.625rem",
                          // justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "2px",
                          background:
                            coolersData?.cooler?.status ===
                            "FUNCIONANDO CORRECTAMENTE"
                              ? "#B2F2BB"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CON ALERTA"
                              ? "#FFEC99"
                              : coolersData?.cooler?.status === "EN FALLA"
                              ? "#FFC9C9"
                              : coolersData?.cooler?.status ===
                                "EN ESPERA DE SERVICIO"
                              ? "#C7CBD2"
                              : coolersData?.cooler?.status ===
                                "EN ESPERA DE LECTURA"
                              ? "#A5D8FF"
                              : coolersData?.cooler?.status ===
                                "SERVICIO NO EFECTIVO"
                              ? "#FFC9C9"
                              : coolersData?.cooler?.status ===
                                "SERVICIO IMPRODUCTIVO"
                              ? "#FFC9C9"
                              : coolersData?.cooler?.status === "SIN DATOS"
                              ? "#C7CBD2"
                              : "#C7CBD2",
                        }}
                      >
                        <div
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "5px",
                            background:
                              coolersData?.cooler?.status ===
                              "FUNCIONANDO CORRECTAMENTE"
                                ? "#2B8A3E"
                                : coolersData?.cooler?.status ===
                                  "FUNCIONANDO CON ALERTA"
                                ? "#E67700"
                                : coolersData?.cooler?.status === "EN FALLA"
                                ? "#E03131"
                                : coolersData?.cooler?.status ===
                                  "EN ESPERA DE SERVICIO"
                                ? "#313A49"
                                : coolersData?.cooler?.status ===
                                  "EN ESPERA DE LECTURA"
                                ? "#1864AB"
                                : coolersData?.cooler?.status ===
                                  "SERVICIO NO EFECTIVO"
                                ? "#E03131"
                                : coolersData?.cooler?.status ===
                                  "SERVICIO IMPRODUCTIVO"
                                ? "#E03131"
                                : coolersData?.cooler?.status === "SIN DATOS"
                                ? "#313A49"
                                : "#313A49",
                          }}
                        ></div>
                        <div
                          style={{
                            color:
                              coolersData?.cooler?.status ===
                              "FUNCIONANDO CORRECTAMENTE"
                                ? "#2B8A3E"
                                : coolersData?.cooler?.status ===
                                  "FUNCIONANDO CON ALERTA"
                                ? "#E67700"
                                : coolersData?.cooler?.status === "EN FALLA"
                                ? "#E03131"
                                : coolersData?.cooler?.status ===
                                  "EN ESPERA DE SERVICIO"
                                ? "#313A49"
                                : coolersData?.cooler?.status ===
                                  "EN ESPERA DE LECTURA"
                                ? "#1864AB"
                                : coolersData?.cooler?.status ===
                                  "SERVICIO NO EFECTIVO"
                                ? "#E03131"
                                : coolersData?.cooler?.status ===
                                  "SERVICIO IMPRODUCTIVO"
                                ? "#E03131"
                                : coolersData?.cooler?.status === "SIN DATOS"
                                ? "#313A49"
                                : "#313A49",
                            fontSize: "0.625.rem",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "14px",
                          }}
                        >
                          {coolersData?.cooler?.status}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Accordion.Control>
        <Accordion.Panel>
          <section
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontStyle: "normal",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "var(--gray-6, #868E96)",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                Leído por última vez:
              </div>
              <div
                style={{
                  fontSize: "9px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "14px",
                  textTransform: "uppercase",
                  backgroundColor: "var(--blue-0, #E7F5FF)",
                  padding: "1px 6px",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "var(--blue-6, #2393F4)",
                  borderRadius: "8px",
                }}
              >
                {coolersData?.cooler?.last_read == undefined ||
                coolersData?.cooler?.last_read == null
                  ? "Sin registro"
                  : moment(new Date(coolersData?.cooler?.last_read))
                      .locale("es") // Establecer el idioma a español
                      .format("dddd D MMMM, YYYY")}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="pdv_drawer_header_h1">Canal:</div>
              <div className="pdv_drawer_header_h2">
                {coolersData?.cooler?.channel === undefined ||
                coolersData?.cooler?.channel === ""
                  ? "Sin registro"
                  : coolersData?.cooler?.channel}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="pdv_drawer_header_h1">Región:</div>
              <div className="pdv_drawer_header_h2">
                {coolersData?.cooler?.region === undefined ||
                coolersData?.cooler?.region === ""
                  ? "Sin registro"
                  : coolersData?.cooler?.region}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="pdv_drawer_header_h1">Ruta:</div>
              <div className="pdv_drawer_header_h2">
                {coolersData?.cooler?.route === undefined ||
                coolersData?.cooler?.route === ""
                  ? "Sin registro"
                  : coolersData?.cooler?.route}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="pdv_drawer_header_h1">Gerencia de zona:</div>
              <div className="pdv_drawer_header_h2">
                {coolersData?.cooler?.zone === undefined ||
                coolersData?.cooler?.zone === ""
                  ? "Sin registro"
                  : coolersData?.cooler?.zone}
              </div>
            </div>
          </section>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
