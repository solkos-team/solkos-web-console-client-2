import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import Resume from "../../../components/resume";
import EconomicDetail from "../../../components/economicDetail/EconomicDetail";
import Energy from "../../../components/energyConsum";
import { Tabs } from "@mantine/core";
import { useParams } from "react-router-dom";
import { fetchUniversalDetails } from "../../../utils/apiUtils";
import moment from "moment";
import "moment/locale/es";
import ResumeCC from "../../../components/resumeCallCenter";
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
});

export default function CoolerDetail() {
  interface CoolerData {
    cooler: {
      serial_number: string;
      model_id: string;
      outlet_name: string;
      customer: string;
      region: string;
      route: string;
      zone: string;
      days_without_visit: string;
      last_read: string;
      total_ownership_expense: number;
      sale_price: number;
      total_expense_service: string;
      energy_consumption: string;
      status: string;
      asset_number: string;
      channel: string;
    };
    properties: {
      description: string;
      name: string;
      value: number;
    };
    service_orders?: Array<{ description: string }>;
    tracking?: Array<{ class: string; algorithm: string; notified_at: string }>;
  }

  const b = "../../sampleData/devices.png";
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false);
  };

  const sortedTracking = coolersData?.tracking?.slice().sort((a, b) => {
    const dateA = new Date(a.notified_at).getTime();
    const dateB = new Date(b.notified_at).getTime();
    return dateB - dateA;
  });

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  };

  const fetchData = async () => {
    try {
      // const data = await fetchCoolersFromAPI(serial_number);
      const data = await fetchUniversalDetails("coolers", serial_number, "GET");
      setCoolersData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { serial_number } = useParams();

  useEffect(() => {}, [serial_number, coolersData]);
  const [tabs, setTabs] = useState<string | undefined>();

  return (
    <div>
      {
        localStorage.getItem("USER") == 'Call Center' 
        ? <PageFilter path="" disabledPath={true} />
        : <PageFilter path="clt" disabledPath={true} />
      }
      
      <br />
      <div>
        {/* *********************************************************** */}
        {localStorage.getItem("USER") === "Call Center" ? (
          <>
            <div
              style={{
                display: "flex",
                padding: "0px 32px",
                alignItems: "flex-start",
                marginLeft: -85,
                gap: "8px",
                alignSelf: "stretch",
                width: "96%",
              }}
            >
              <img src={b} width={"60px"} alt="cooler"></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: 100,
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
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        color: "#000005",
                        // fontFamily: "DM Sans",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      {coolersData?.cooler?.serial_number === undefined
                        ? "Serie: Sin registro"
                        : "Serie: " + coolersData?.cooler?.serial_number}
                    </div>
                    <div
                      style={{
                        color: "#000005",
                        // fontFamily: "DM Sans",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      {coolersData?.cooler?.serial_number === undefined
                        ? "Activo: Sin registro"
                        : "Activo: " + coolersData?.cooler?.asset_number}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      border: "1.5px solid #0F9F67",
                      background: "#FFF",
                    }}
                  >
                    <div
                      style={{
                        color: "#0F9F67",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "14px",
                      }}
                    >
                      -----
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.cooler?.model_id === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.model_id}
                </div>
                {coolersData?.cooler?.status == undefined ||
                coolersData?.cooler.status == "" ? (
                  "Sin registro"
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        padding: "4px",
                        // justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "2px",
                        background: "#B6FEDB",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "5px",
                          background: "#31B648",
                        }}
                      ></div>
                      <div
                        style={{
                          color: "#028053",
                          // fontFamily: "Space Mono",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                      >
                        {coolersData?.cooler?.status}
                      </div>
                    </div>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "Inter",
                      fontSize:
                        localStorage.getItem("USER") === "Call Center"
                          ? "16px"
                          : "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Leído por última vez el:
                  </div>

                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "Inter",
                      fontSize:
                        localStorage.getItem("USER") === "Call Center"
                          ? "16px"
                          : "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {coolersData?.cooler?.last_read == undefined ||
                    coolersData?.cooler?.last_read == null
                      ? "Sin registro"
                      : moment(new Date(coolersData?.cooler?.last_read)).format(
                          "D [de] MMMM [de] YYYY [a las] h:mm A"
                        )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {" "}
                      {coolersData?.cooler?.days_without_visit === null ||
                      coolersData?.cooler?.days_without_visit === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.days_without_visit +
                          " " +
                          "días sin visita"}
                    </div>
                  </div>
                </div>
                <br></br>
                {localStorage.getItem("USER") === "Call Center" ? (
                  <>
                    <div style={{ display: "flex", gap: "16px" }}>
                      {sortedTracking?.map((cooler, index) => (
                        <>
                          <div
                            style={{
                              display: "flex",
                              padding: "8px",
                              // justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "4px",
                              background: "#EEF6FF",
                            }}
                          >
                            <div
                              style={{
                                color: "#3E83FF",
                                // fontFamily: "DM Sans",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal",
                              }}
                            >
                              {cooler.algorithm ===
                              "Indicador de Riesgo Nivel: 0"
                                ? "Indicador: Sin riesgo"
                                : cooler.algorithm ===
                                  "Indicador de Riesgo Nivel: 1"
                                ? "Indicador: Visitar punto de venta"
                                : cooler.algorithm ===
                                  "Indicador de Riesgo Nivel: 2"
                                ? "Indicador: Requiere actualizar información"
                                : cooler.algorithm ===
                                  "Indicador de Riesgo Nivel: 3"
                                ? "Indicador: Tomar acción urgente"
                                : cooler.algorithm ===
                                  "Indicador de Riesgo Nivel: 4"
                                ? "Indicador: En riesgo"
                                : cooler.algorithm === "OWNED"
                                ? "Indicador: En propiedad"
                                : cooler.algorithm === "INSTALLED"
                                ? "Indicador: Instalado"
                                : cooler.algorithm === "LOCATION"
                                ? "Indicador: Ubicado"
                                : cooler.algorithm === "TELEMETRY"
                                ? "Indicador: Telemetría"
                                : cooler.algorithm ===
                                  "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                                ? "Alerta: Alta demanda del compresor"
                                : cooler.algorithm === "LOW_VOLTAGE_ALERT"
                                ? "Alerta: Bajo voltaje"
                                : cooler.algorithm === "HIGH_VOLTAGE_ALERT"
                                ? "Alerta: Alto voltaje"
                                : cooler.algorithm === "MOVED_VISIT_ALERT"
                                ? "Alerta: Movimiento"
                                : cooler.algorithm === "HIGH_TEMPERATURE_ALERT"
                                ? "Alerta: Alta temperatura"
                                : cooler.algorithm === "DISCONNECTION_ALERT"
                                ? "Alerta: Desconexión"
                                : cooler.algorithm === "TEMPERATURE_FAIL"
                                ? "Falla de temperatura"
                                : cooler.algorithm === "COMPRESSOR_FAIL"
                                ? "Falla asociada al compresor"
                                : cooler.algorithm === "DISCONNECTIONS_FAIL"
                                ? "Falla de desconexión"
                                : cooler.algorithm === "VOLTAGE_FAIL"
                                ? "Falla de voltaje"
                                : cooler.algorithm === "FREEZING_FAIL"
                                ? "Falla de congelación"
                                : cooler.algorithm}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    padding: "0px 0px 4px",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    CANAL:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.channel === "" ||
                      coolersData?.cooler?.channel === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.channel}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    padding: "0px 0px 4px",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    REGIÓN:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.region === "" ||
                      coolersData?.cooler?.region === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.region}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    padding: "0px 0px 4px",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    RUTA:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.route === "" ||
                      coolersData?.cooler?.route === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.route}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    GERENCIA DE ZONA:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.zone === "" ||
                      coolersData?.cooler?.zone === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.zone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                padding: "0px 32px",
                alignItems: "flex-start",
                marginLeft: -85,
                gap: "8px",
                alignSelf: "stretch",
                width: "96%",
              }}
            >
              <img src={b} width={"60px"} alt="cooler"></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  flex: 100,
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
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        color: "#000005",
                        // fontFamily: "DM Sans",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      {coolersData?.cooler?.serial_number === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.serial_number}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "2px",
                        border: "1.5px solid #0F9F67",
                        background: "#FFF",
                      }}
                    >
                      <div
                        style={{
                          color: "#0F9F67",
                          // fontFamily: "DM Sans",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "14px",
                        }}
                      >
                        -----
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
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
                  "Sin registro"
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        padding: "4px",
                        // justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "2px",
                        background: "#B6FEDB",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "5px",
                          background: "#31B648",
                        }}
                      ></div>
                      <div
                        style={{
                          color: "#028053",
                          // fontFamily: "Space Mono",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                      >
                        {coolersData?.cooler?.status}
                      </div>
                    </div>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Leído por última vez el:
                  </div>

                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {coolersData?.cooler?.last_read == undefined ||
                    coolersData?.cooler?.last_read == null
                      ? "Sin registro"
                      : moment(new Date(coolersData?.cooler?.last_read)).format(
                          "D [de] MMMM [de] YYYY [a las] h:mm A"
                        )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {" "}
                      {coolersData?.cooler?.days_without_visit === null ||
                      coolersData?.cooler?.days_without_visit === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.days_without_visit +
                          " " +
                          "días sin visita"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                  alignSelf: "stretch",
                }}
              >
                {coolersData?.cooler?.customer != "KOF" ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        // flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "6px",
                        alignSelf: "stretch",
                        padding: "0px 0px 4px",
                      }}
                    >
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Mono",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        CANAL:
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "4px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "2px",
                          background: "#D4DAE3",
                          marginTop: -5,
                        }}
                      >
                        <div
                          style={{
                            color: "#313A49",
                            // fontFamily: "DM Mono",
                            fontSize: "10px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "14px",
                          }}
                        >
                          Sin registro
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    padding: "0px 0px 4px",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    REGIÓN:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.region === "" ||
                      coolersData?.cooler?.region === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.region}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    padding: "0px 0px 4px",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    RUTA:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.route === "" ||
                      coolersData?.cooler?.route === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.route}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    GERENCIA DE ZONA:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "4px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background: "#D4DAE3",
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      {coolersData?.cooler?.zone === "" ||
                      coolersData?.cooler?.zone === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.zone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* *********************************************************** */}
        <br></br>
        <div
          style={{
            // SE QUITA BACKGROUND Y HEIGHT PARA QUITAR SEGUNDO SCROLL
            display: "flex",
            // height: "36px",
            width: "100%",
            // padding: "0px 01px 0px 0px",
            alignItems: "flex-start",
            alignSelf: "stretch",
            // background: "#D4DAE3",
            flex: 1, // Añade esta línea
            marginLeft: "-40px",
          }}
        >
          {localStorage.getItem("USER") === "Call Center" ? (
            <>
              <Tabs color="teal" defaultValue="first" value={tabs}>
                <Tabs.List>
                  <Tabs.Tab value="first" onClick={() => setTabs("first")}>
                    Resumen
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first" pt="xs">
                  <ResumeCC coolersData={coolersData} setTab={setTabs} />
                </Tabs.Panel>
              </Tabs>
            </>
          ) : (
            <>
              <Tabs color="teal" defaultValue="first" value={tabs}>
                <Tabs.List>
                  <Tabs.Tab value="first" onClick={() => setTabs("first")}>
                    Resumen
                  </Tabs.Tab>
                  <Tabs.Tab value="second" onClick={() => setTabs("second")}>
                    Desglose economico{" "}
                  </Tabs.Tab>
                  <Tabs.Tab value="tree" onClick={() => setTabs("tree")}>
                    Gasto de energía{" "}
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="first" pt="xs">
                  <Resume coolersData={coolersData} setTab={setTabs} />
                </Tabs.Panel>

                <Tabs.Panel value="second" pt="xs">
                  <EconomicDetail coolersData={coolersData} />
                </Tabs.Panel>

                <Tabs.Panel value="tree" pt="xs">
                  <Energy coolersData={coolersData} />
                </Tabs.Panel>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
