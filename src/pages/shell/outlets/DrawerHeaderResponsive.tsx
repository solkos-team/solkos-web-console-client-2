import React from "react";
import { Accordion } from "@mantine/core";
import { useSelector } from "react-redux";

export const DrawerHeaderResponsive = ({
  title,
  description,
  outletDetails,
}) => {
  const dto = useSelector((state: any) => state.organization);
  const {
    region,
    route,
    zone,
    outlet_id,
    latitude,
    longitude,
    channel,
    outlet_name,
    outlet_address,
    days_without_visitC,
    last_read,
    num_coolers,
    actionable,
  } = outletDetails;

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
          <section style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <path
                  d="M4.25 29.75H29.75M4.25 9.91667V11.3333C4.25 12.4605 4.69777 13.5415 5.4948 14.3385C6.29183 15.1356 7.37283 15.5833 8.5 15.5833C9.62717 15.5833 10.7082 15.1356 11.5052 14.3385C12.3022 13.5415 12.75 12.4605 12.75 11.3333M4.25 9.91667H29.75M4.25 9.91667L7.08333 4.25H26.9167L29.75 9.91667M12.75 11.3333V9.91667M12.75 11.3333C12.75 12.4605 13.1978 13.5415 13.9948 14.3385C14.7918 15.1356 15.8728 15.5833 17 15.5833C18.1272 15.5833 19.2082 15.1356 20.0052 14.3385C20.8022 13.5415 21.25 12.4605 21.25 11.3333M21.25 11.3333V9.91667M21.25 11.3333C21.25 12.4605 21.6978 13.5415 22.4948 14.3385C23.2918 15.1356 24.3728 15.5833 25.5 15.5833C26.6272 15.5833 27.7082 15.1356 28.5052 14.3385C29.3022 13.5415 29.75 12.4605 29.75 11.3333V9.91667M7.08333 29.75V15.3708M26.9167 29.75V15.3708M12.75 29.75V24.0833C12.75 23.3319 13.0485 22.6112 13.5799 22.0799C14.1112 21.5485 14.8319 21.25 15.5833 21.25H18.4167C19.1681 21.25 19.8888 21.5485 20.4201 22.0799C20.9515 22.6112 21.25 23.3319 21.25 24.0833V29.75"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                width: "70%",
                display: "flex",
                gap: "var(--Sizes-Spacers-2xs, 4px)",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "30px",
                  fontSize: "0.563rem",
                }}
              >
                {actionable === undefined || actionable === "" ? (
                  "Sin registro"
                ) : (
                  <>
                    <>
                      <div
                        style={{
                          width: "fit-content",
                          display: "flex",
                          padding: "4px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "2px",
                          border:
                            actionable === "Visita PdV" ||
                            actionable === "VISITA PDV PARA LECTURA"
                              ? "1.5px solid #DA7E05"
                              : actionable === "Sin Riesgo" ||
                                actionable === "SIN RIESGO"
                              ? "1.5px solid #0F9F67"
                              : actionable === "Toma de Decisiones" ||
                                actionable === "Acciones urgentes" ||
                                actionable === "SIN COINCIDENCIA"
                              ? "1.5px solid #F93448"
                              : actionable === "Actualizar Info"
                              ? "1.5px solid #DA7E05"
                              : actionable === "Actualizar dato" ||
                                actionable === "Datos faltantes" ||
                                actionable === "Monitoreo" ||
                                actionable === "Movimiento"
                              ? "1.5px solid #1864AB"
                              : actionable === "Solicitar serv. correctivo" ||
                                actionable === "Solicitar serv. preventivos" ||
                                actionable === "Seguimiento a equipo" ||
                                actionable === "Visita PdV"
                              ? "1.5px solid #E67700"
                              : actionable === "Visita PdV prioritaria"
                              ? "1.5px solid #C92A2A"
                              : "1.5px solid black",
                          background: "#FFF",
                        }}
                      >
                        {actionable === "Visita PdV" &&
                        dto != "KOF Colombia" ? (
                          <img
                            src={"../../sampleData/p.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Sin Riesgo" ||
                          actionable === "SIN RIESGO" ? (
                          <img
                            src={"../../sampleData/sn.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Toma de Decisiones" ||
                          actionable === "Acciones urgentes" ||
                          actionable === "SIN COINCIDENCIA" ? (
                          <img
                            src={"../../sampleData/a.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Actualizar Info" ? (
                          <img
                            src={"../../sampleData/p.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Actualizar dato" ? (
                          <img
                            src={"../../sampleData/actDat.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Datos faltantes" ? (
                          <img
                            src={"../../sampleData/datFal.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Monitoreo" ? (
                          <img
                            src={"../../sampleData/Mont.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Movimiento" ? (
                          <img
                            src={"../../sampleData/mov1.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Solicitar serv. correctivo" ||
                          actionable === "Solicitar serv. preventivos" ? (
                          <img
                            src={"../../sampleData/serCP.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Seguimiento a equipo" ? (
                          <img
                            src={"../../sampleData/seguE.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Visita PdV" ||
                          actionable === "VISITA PDV PARA LECTURA" ? (
                          <img
                            src={"../../sampleData/visitap.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : actionable === "Visita PdV prioritaria" ? (
                          <img
                            src={"../../sampleData/visitapd.svg"}
                            alt="Descripción de la imagen"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        ) : (
                          ""
                        )}

                        <div
                          style={{
                            color:
                              actionable === "Visita PdV" ||
                              actionable === "VISITA PDV PARA LECTURA"
                                ? "#DA7E05"
                                : actionable === "Sin Riesgo" ||
                                  actionable === "SIN RIESGO"
                                ? "#0F9F67"
                                : actionable === "Toma de Decisiones" ||
                                  actionable === "Acciones urgentes" ||
                                  actionable === "SIN COINCIDENCIA"
                                ? "#F93448"
                                : actionable === "Actualizar Info"
                                ? "#DA7E05"
                                : actionable === "Actualizar dato" ||
                                  actionable === "Datos faltantes" ||
                                  actionable === "Monitoreo" ||
                                  actionable === "Movimiento"
                                ? "#1864AB"
                                : actionable === "Solicitar serv. correctivo" ||
                                  actionable ===
                                    "Solicitar serv. preventivos" ||
                                  actionable === "Seguimiento a equipo" ||
                                  actionable === "Visita PdV"
                                ? "#E67700"
                                : actionable === "Visita PdV prioritaria"
                                ? "#C92A2A"
                                : "black",
                            // fontFamily: "DM Sans",
                            // fontSize: "1vw",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "9px",
                          }}
                        >
                          {actionable}
                        </div>
                      </div>
                    </>
                  </>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "30px",
                }}
              >
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  {outlet_name}
                </div>
              </div>
              <div
                style={{
                  width: "200px",
                  height: "30px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 5px",
                  scrollbarWidth: "thin",
                }}
              >
                {outlet_address === undefined ||
                outlet_address === "" ||
                outlet_address === null ? (
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "9px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    Sin registro
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      {outlet_address}
                    </div>
                  </>
                )}
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
                {last_read ?? "Sin registro"}
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
                {channel ?? "Sin registro"}
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
                {region ?? "Sin registro"}
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
                {route ?? "Sin registro"}
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
                {zone ?? "Sin registro"}
              </div>
            </div>
          </section>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
