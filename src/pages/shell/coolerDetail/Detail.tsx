import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import Resume from "../../../components/resume";
import EconomicDetail from "../../../components/economicDetail/EconomicDetail";
import Energy from "../../../components/energyConsum";
import { Center, Tabs } from "@mantine/core";
import { useParams } from "react-router-dom";
import { fetchUniversalDetails } from "../../../utils/apiUtils";
import moment from "moment";
import "moment/locale/es";
import ResumeCC from "../../../components/resumeCallCenter";
import { CoolerData } from "../../../interfaces/CoolerInterface";
import MapComponent from "../../../components/map";
import MapComponent1 from "../../../components/map_1";
import MapComponent2 from "../../../components/map_2";
import { IconArrowDownRight, IconArrowRight } from "@tabler/icons-react";
import DrawerInversion from "../../../components/drawerInversion/DrawerInversion";
import DrawerEnergy from "../../../components/drawerEnergy/DrawerEnergy";
import { useDisclosure } from "@mantine/hooks";

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
  const b = "../../sampleData/devices.png";
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [inversionOpened, { open: openInversion, close: closeInversion }] =
    useDisclosure(false);
  const [energyOpened, { open: openEnergy, close: closeEnergy }] =
    useDisclosure(false);
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
      const data = await fetchUniversalDetails("coolers", serial_number, "GET");
      setCoolersData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  const { serial_number } = useParams();

  useEffect(() => {}, [serial_number, coolersData]);
  const [tabs, setTabs] = useState<string | undefined>();

  if (coolersData && coolersData.activity && coolersData.activity.length > 0) {
    console.log(coolersData.activity[0].data.service_id);
  } else {
    console.log("No hay actividad disponible.");
  }

  return (
    <div>
      {localStorage.getItem("USER") == "Call Center" ? (
        <PageFilter path="" disabledPath={true} />
      ) : (
        <PageFilter path="clt" disabledPath={true} />
      )}
      <br />
      <section
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <section>
          <>
            <div
              style={{
                display: "flex",
                padding: "0px 32px",
                alignItems: "flex-start",
                marginLeft: -85,
                gap: "2px",
                alignSelf: "stretch",
                width: "96%",
              }}
            >
              <img
                src={"../../sampleData/cooler_c.png"}
                alt="cooler"
                width={"10%"}
              ></img>

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
                        fontSize: "1.5vw",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      {coolersData?.cooler?.serial_number === undefined
                        ? "Sin registro"
                        : coolersData?.cooler?.serial_number}
                    </div>
                    {/* <div
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
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "14px",
                      }}
                    >
                      -----
                    </div>
                  </div> */}
                  </div>
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: ".9vw",
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
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: ".9vw",
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
                          fontSize: ".9vw",
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
                      fontSize: ".9vw",
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
                      fontSize: "1vw",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {coolersData?.cooler?.last_read == undefined ||
                    coolersData?.cooler?.last_read == null
                      ? "Sin registro"
                      : moment(new Date(coolersData?.cooler?.last_read)).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "5px",
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
                        fontSize: "0.9vw",
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
                {/* {coolersData?.cooler?.customer != "KOF" ? ( */}
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
                        fontSize: ".7vw",
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
                          fontSize: ".7vw",
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
                {/* ) : (
                ""
              )} */}
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
                      fontSize: ".7vw",
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
                        fontSize: ".7vw",
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
                      fontSize: ".7vw",
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
                        fontSize: ".7vw",
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
                      fontSize: ".7vw",
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
                        fontSize: ".7vw",
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
        </section>

        <section>
          {sortedTracking?.map((cooler, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                padding: "0.5rem",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                borderRadius: "8px",
                borderLeft: "4px solid #3E83FF",
                background: "#EEF6FF",
                marginBottom: "0.4rem",
              }}
            >
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "0.95vw",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                {cooler.algorithm === "Indicador de Riesgo Nivel: 0"
                  ? "Indicador: Sin riesgo"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 1"
                  ? "Indicador: Visitar punto de venta"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 2"
                  ? "Indicador: Requiere actualizar información"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 3"
                  ? "Indicador: Tomar acción urgente"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 4"
                  ? "Indicador: En riesgo"
                  : cooler.algorithm === "OWNED"
                  ? "Indicador: En propiedad"
                  : cooler.algorithm === "INSTALLED"
                  ? "Indicador: Instalado"
                  : cooler.algorithm === "LOCATION"
                  ? "Indicador: Ubicado"
                  : cooler.algorithm === "TELEMETRY"
                  ? "Indicador: Telemetría"
                  : cooler.algorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
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
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "0.79vw",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {formatCreatedAt(cooler.notified_at)}
              </div>
            </div>
          ))}
        </section>
        <section>
          <div
            className="clt_actividad_acerca_principal"
            style={{ overflowY: "auto" }}
          >
            <section className="clt_actividad_principal_actividad">
              <div className="clt_actividad_principal_title">
                <img
                  src={"../../sampleData/actividad.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "2vw", height: "2vw" }}
                />
                <h1 className="clt_actividad_principal_title_h1">
                  Actividad del enfriador
                </h1>
              </div>
              <div className="clt_acerca_principal_cards">
                {coolersData?.service_orders === null ||
                coolersData?.service_orders?.length === 0 ? (
                  <>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "1vw",
                        marginTop: 150,
                      }}
                    >
                      Sin actividad
                    </p>
                  </>
                ) : (
                  coolersData &&
                  coolersData.activity &&
                  coolersData.activity.length > 0 && (
                    <div>
                      {coolersData.activity.map((order, index) => (
                        <>
                          <div key={index}>
                            <div
                              style={{
                                display: "flex",
                                padding: "8px",
                                flexDirection: "column",
                                alignItems: "flex-start",

                                alignSelf: "stretch",
                                borderRadius: "5px",
                                background: "#FFF",
                                boxShadow:
                                  "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
                                width: "96%",
                                height: "100%",
                              }}
                            >
                              {order.type === "SERVICE_ORDER" && (
                                <>
                                  <div
                                    style={{
                                      color: "#88888B",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "normal",
                                    }}
                                  >
                                    {order.data.close_at === undefined ||
                                    order.data.close_at === null
                                      ? "Sin registro"
                                      : moment(
                                          new Date(order.data.close_at)
                                        ).format("DD/MM/YYYY HH:mm")}
                                  </div>

                                  <div
                                    style={{
                                      color: "#000005",
                                      // fontFamily: "DM Sans",
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "normal",
                                      textAlign: "left",
                                      marginTop: "-5px",
                                    }}
                                  >
                                    <div>
                                      <p>Orden: {order.data.id}</p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "4px",
                                        borderRadius: "2px",
                                        background: "#BCDAFF",
                                        marginLeft: 10,
                                      }}
                                    >
                                      {order.data.service_id === "1003" ? (
                                        <>
                                          <img
                                            src={"../../sampleData/mov2.svg"}
                                            alt="Descripción de la imagen"
                                            style={{
                                              width: ".9vw",
                                              height: ".9vw",
                                              lineHeight: "14px",
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <img
                                            src={"../../sampleData/so.svg"}
                                            alt="Descripción de la imagen"
                                            style={{
                                              width: ".9vw",
                                              height: ".9vw",
                                              lineHeight: "14px",
                                            }}
                                          />
                                        </>
                                      )}

                                      <div
                                        style={{
                                          color: "#3E83FF",
                                          fontSize: "8px",
                                          fontStyle: "normal",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {order.data.service_id === "1004"
                                          ? "ORDEN DE INSTALACIÓN"
                                          : order.data.service_id === "1003"
                                          ? "ORDEN DE MOVIMIENTO"
                                          : "ORDEN DE SERVICIO"}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      color: "#000005",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "normal",
                                      marginTop: "-5px",
                                    }}
                                  >
                                    $ {order.data.total.toLocaleString()}
                                  </div>
                                  <div
                                    style={{
                                      color: "#88888B",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "normal",
                                      textAlign: "left",
                                    }}
                                  >
                                    {order.data.description}
                                  </div>
                                </>
                              )}
                              {order.type === "TRACKING" && (
                                <>
                                  <div
                                    style={{
                                      color: "#88888B",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "normal",
                                    }}
                                  >
                                    {order.data.notified_at === undefined ||
                                    order.data.notified_at === null
                                      ? "Sin registro"
                                      : moment(
                                          new Date(order.data.notified_at)
                                        ).format("DD/MM/YYYY HH:mm")}
                                  </div>

                                  <div
                                    style={{
                                      color: "#000005",
                                      // fontFamily: "DM Sans",
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "normal",
                                      textAlign: "left",
                                      marginTop: "-5px",
                                    }}
                                  >
                                    <div>
                                      <p>{order.data.algorithm}</p>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        padding: "2px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "4px",
                                        borderRadius: "2px",
                                        background:
                                          order.data.level === "ALERT"
                                            ? "#FEF5C7"
                                            : order.data.level === "FAIL"
                                            ? "#FFC7CD"
                                            : "#BCDAFF",
                                        marginLeft: 10,
                                      }}
                                    >
                                      {order.data.level === "ALERT" ? (
                                        <>
                                          {" "}
                                          <img
                                            src={"../../sampleData/alert3.svg"}
                                            alt="Descripción de la imagen"
                                            style={{
                                              width: ".9vw",
                                              height: ".9vw",
                                              lineHeight: "14px",
                                            }}
                                          />
                                        </>
                                      ) : order.data.level === "FAIL" ? (
                                        <>
                                          {" "}
                                          <img
                                            src={"../../sampleData/fail3.svg"}
                                            alt="Descripción de la imagen"
                                            style={{
                                              width: ".9vw",
                                              height: ".9vw",
                                              lineHeight: "14px",
                                            }}
                                          />
                                        </>
                                      ) : order.data.level === "INDICATOR" ? (
                                        <>
                                          {" "}
                                          <img
                                            src={"../../sampleData/ind3.svg"}
                                            alt="Descripción de la imagen"
                                            style={{
                                              width: ".9vw",
                                              height: ".9vw",
                                              lineHeight: "14px",
                                            }}
                                          />
                                        </>
                                      ) : (
                                        ""
                                      )}

                                      <div
                                        style={{
                                          color:
                                            order.data.level === "ALERT"
                                              ? "#451C03"
                                              : order.data.level === "FAIL"
                                              ? "#F93448"
                                              : "#3E83FF",
                                          fontSize: "8px",
                                          fontStyle: "normal",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {order.data.level === "ALERT"
                                          ? "ALERTA"
                                          : order.data.level === "FAIL"
                                          ? "FALLA"
                                          : order.data.level}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <p />
                          </div>
                        </>
                      ))}
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="clt_acerca_principal">
              <div className="clt_actividad_principal_title">
                <img
                  src={"../../sampleData/buildings.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "2vw", height: "2vw" }}
                />
                <h1 className="clt_actividad_principal_title_h1">
                  Acerca del punto de venta
                </h1>
              </div>
              <div className="clt_actividad_principal_title_nombre">
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  Nombre PdV
                </h1>
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  {coolersData?.cooler?.outlet_name == ""
                    ? "Sin registro"
                    : coolersData?.cooler?.outlet_name}
                </h1>
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  /<b>{coolersData?.cooler?.outlet_id}</b>
                </h1>
              </div>

              <div className="clt_actividad_principal_title_nombre">
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  Dirección
                </h1>
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  {coolersData?.cooler?.outlet_address === "" ||
                  coolersData?.cooler?.outlet_address == undefined
                    ? "Sin registro"
                    : coolersData?.cooler?.outlet_address}
                </h1>
              </div>

              <div className="clt_actividad_principal_title_nombre">
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  Distancia el punto de instalación
                </h1>
                <h1 className="clt_actividad_principal_title_nombre_h1">
                  {coolersData?.cooler?.distance === undefined
                    ? "Sin registro"
                    : coolersData?.cooler?.last_latitude + "metros"}
                </h1>
              </div>
              <div className="clt_actividad_principal_mapa">
                {(coolersData?.cooler?.last_latitude != null &&
                  coolersData?.cooler?.latitude === 0) ||
                (coolersData?.cooler?.last_latitude != 0 &&
                  coolersData?.cooler?.latitude === 0) ? (
                  <>
                    <div>
                      <MapComponent1
                        latitude={coolersData?.cooler?.last_latitude}
                        longitude={coolersData?.cooler?.last_longitude}
                      />
                    </div>
                  </>
                ) : coolersData?.cooler?.last_latitude === null ||
                  coolersData?.cooler?.last_latitude === 0 ? (
                  <>
                    <div>
                      <MapComponent
                        latitude={coolersData?.cooler?.latitude}
                        longitude={coolersData?.cooler?.longitude}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <MapComponent2
                      latitude={coolersData?.cooler?.latitude}
                      longitude={coolersData?.cooler?.longitude}
                      last_latitude={coolersData?.cooler?.last_latitude}
                      last_longitude={coolersData?.cooler?.last_longitude}
                    />
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  alignItems: "center",
                  alignContent: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={"../../sampleData/icon1.svg"}
                    width={"20vw"}
                    alt="cooler"
                  ></img>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    Instalación
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <img
                    src={"../../sampleData/icon2.svg"}
                    width={"20vw"}
                    alt="cooler"
                  ></img>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    Última ubicación
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {/* <IconCircleX /> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px", // Espacio entre los bloques
                    }}
                  >
                    <div
                      style={{
                        width: "1vw", // Ancho de cada bloque
                        height: "0.3vw",
                        background: "#ED5079",
                      }}
                    ></div>
                    &nbsp;
                    <div
                      style={{
                        width: "1vw", // Ancho de cada bloque
                        height: "0.3vw",
                        background: "#ED5079",
                      }}
                    ></div>
                    &nbsp;
                    <div
                      style={{
                        width: "1vw", // Ancho de cada bloque
                        height: "0.3vw",
                        background: "#ED5079",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    Distancia entre puntos
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
      <section>
        <div className="clt_actividad_acerca_principal">
          <section className="clt_actividad_principal">
            <div className="clt_actividad_principal_title">
              <img
                src={"../../sampleData/actividad.svg"}
                alt="Descripción de la imagen"
                style={{ width: "18px", height: "18px" }}
              />
              <h1 className="clt_actividad_principal_title_h1">
                Inversión total en el enfriador
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "60px",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".8vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Gasto total de propiedad
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.3vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.total_ownership_expense?.value ===
                  undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_ownership_expense.value.toLocaleString()}`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".8vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Precio de venta
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.3vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.sale_price?.value === undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.sale_price.value.toLocaleString()}`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "0.8vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Gasto total por servicio
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.3vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.total_expense_service.value ===
                  undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_expense_service.value.toLocaleString()}`}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                flex: 100,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "1vw",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
                onClick={openInversion}
              >
                Ver detalles
              </div>
              <IconArrowRight
                style={{ color: "#3E83FF", width: "15px", height: "15px" }}
              />
            </div>
          </section>
          <section className="clt_actividad_principal">
            <div className="clt_actividad_principal_title">
              <img
                src={"../../sampleData/energy.svg"}
                alt="Descripción de la imagen"
                style={{ width: "18px", height: "18px" }}
              />
              <h1 className="clt_actividad_principal_title_h1">
                Gastos de energía
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "40px",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".8vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Consumo de energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.3vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.energy_consumption?.value ===
                  undefined
                    ? "Sin registro"
                    : `${
                        coolersData?.properties?.energy_consumption.value.toFixed(
                          2
                        ) +
                        " " +
                        "KW/h"
                      }`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".8vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Referencia de consumo de energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.3vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.power_consumption_reference
                    ?.value == undefined
                    ? "Sin registro"
                    : `${
                        coolersData?.properties?.power_consumption_reference.value.toFixed(
                          2
                        ) +
                        " " +
                        "KW/h"
                      }`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".8vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Gasto en energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.3vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.energy_cost.value == undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.energy_cost.value.toLocaleString()}`}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                flex: 100,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "1vw",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
                onClick={openEnergy}
              >
                Ver detalles
              </div>
              <IconArrowRight
                style={{ color: "#3E83FF", width: "15px", height: "15px" }}
              />
            </div>
          </section>
        </div>
      </section>
      <DrawerInversion
        opened={inversionOpened}
        onClose={closeInversion}
        coolersData={coolersData}
      />
      <DrawerEnergy
        opened={energyOpened}
        onClose={closeEnergy}
        coolersData={coolersData}
      />
    </div>
  );
}
