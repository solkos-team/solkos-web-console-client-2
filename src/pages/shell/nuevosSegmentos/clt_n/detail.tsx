import React, { useState, useEffect } from "react";
import PageFilter from "../../../../components/pageFilter";
import { Tooltip, Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";
import { fetchUniversalDetails } from "../../../../utils/apiUtils";
import moment from "moment";
import "moment/locale/es";
import { CoolerData } from "../../../../interfaces/CoolerInterface";
import MapComponent from "../../../../components/map";
import MapComponent1 from "../../../../components/map_1";
import MapComponent2 from "../../../../components/map_2";
import { IconArrowRight } from "@tabler/icons-react";
import DrawerInversion from "../../../../components/drawerInversion/DrawerInversion";
import DrawerEnergy from "../../../../components/drawerEnergy/DrawerEnergy";
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

export const Detail = () => {
  const b = "../../sampleData/devices.png";
  const { serial_number } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [editSerie, setEditSerie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serie, SetSerie] = useState(serial_number);
  const [inversionOpened, { open: openInversion, close: closeInversion }] =
    useDisclosure(false);
  const [energyOpened, { open: openEnergy, close: closeEnergy }] =
    useDisclosure(false);

  const fetchData = async (serie?) => {
    try {
      const data = await fetchUniversalDetails(
        "coolers",
        serie,
        "GET",
        setIsLoading
      );
      setCoolersData(data);
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(serie);
  }, []);

  useEffect(() => {}, [serial_number, coolersData]);
  const searchSerial = (value) => {
    value == "" || value == null || value == undefined
      ? alert("Ingresa datos correctos! ")
      : fetchData(value);
    setEditSerie(false);
  };
  return (
    <>
      {" "}
      <PageFilter path="clt" disabledPath={true} />
      <section className="detail_principal_body">
        <section className="detail_image_info">
          <div className="detail_image_info_data">
            <div className="detail_image_show">
              {isLoading == true ? (
                <div
                  style={{ width: "50%", height: "50%", marginLeft: "2rem" }}
                >
                  <Skeleton height={90} radius="sm" />
                </div>
              ) : (
                <img
                  src={coolersData?.asset?.url}
                  alt="cooler"
                  width={"100%"}
                  height={"85%"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://storage.googleapis.com/negocon-renders/default/default_cooler.webp";
                  }}
                />
              )}
            </div>
            <div className="detail_data_show">
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
                  <>
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
                              coolersData?.cooler?.status === "EN FALLA"
                                ? "#FFC7CD"
                                : coolersData?.cooler?.status ===
                                  "FUNCIONANDO CORRECTAMENTE"
                                ? "#DFF9E3"
                                : coolersData?.cooler?.status ===
                                  "FUNCIONANDO CON ALERTA"
                                ? "#FEF5C7"
                                : "#D4DAE3",
                          }}
                        >
                          <img
                            src={"../../sampleData/transmiss2.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                          <div
                            style={{
                              color:
                                coolersData?.cooler?.status === "EN FALLA"
                                  ? "#F93448"
                                  : coolersData?.cooler?.status ===
                                    "FUNCIONANDO CORRECTAMENTE"
                                  ? "#1D5E29"
                                  : coolersData?.cooler?.status ===
                                    "FUNCIONANDO CON ALERTA"
                                  ? "#451C03"
                                  : "black",
                              // fontFamily: "Space Mono",
                              fontSize: "0.625.rem",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "14px",
                            }}
                          >
                            {/* {coolersData?.cooler?.status} */}
                            TRANSMITIENDO
                          </div>
                        </div>
                      </>
                    )}
                  </>
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
                      {coolersData?.cooler?.serial_number === undefined ? (
                        "Sin registro"
                      ) : (
                        <input
                          placeholder="Ingresa una nueva serie"
                          value={serie}
                          onChange={(e) => {
                            SetSerie(e.target.value);
                          }}
                          style={{
                            color: "#000005",
                            // fontFamily: "DM Sans",
                            fontSize: "1.25rem",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            width: `${
                              coolersData?.cooler?.serial_number.length + 1
                            }ch`,
                            border: editSerie == false ? "transparent" : "",
                          }}
                          disabled={!editSerie}
                          onKeyDown={(e) =>
                            e.key === "Enter" ? searchSerial(serie) : ""
                          }
                        />
                      )}
                    </div>
                    <Tooltip label="Ver otra serie">
                      <div
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          display: "none",
                        }}
                        onClick={() => {
                          setEditSerie((o) => !o);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
                          viewBox="0 0 50 50"
                        >
                          <path
                            d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
                            onClick={() => {
                              setEditSerie((o) => !o);
                            }}
                          ></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "0.75rem",
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
                          coolersData?.cooler?.status === "EN FALLA"
                            ? "#FFC7CD"
                            : coolersData?.cooler?.status ===
                              "FUNCIONANDO CORRECTAMENTE"
                            ? "#DFF9E3"
                            : coolersData?.cooler?.status ===
                              "FUNCIONANDO CON ALERTA"
                            ? "#FEF5C7"
                            : "#D4DAE3",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "5px",
                          background:
                            coolersData?.cooler?.status === "EN FALLA"
                              ? "#F93448"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CORRECTAMENTE"
                              ? "#31B648"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CON ALERTA"
                              ? "#F6A60A"
                              : "#808080",
                        }}
                      ></div>
                      <div
                        style={{
                          color:
                            coolersData?.cooler?.status === "EN FALLA"
                              ? "#F93448"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CORRECTAMENTE"
                              ? "#1D5E29"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CON ALERTA"
                              ? "#451C03"
                              : "black",
                          // fontFamily: "Space Mono",
                          fontSize: "0.625.rem",
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
              </div>
            </div>
          </div>
          <div className="detail_data_ns">
            <div
              style={{
                display: "flex",
                padding: "16px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: 100,
                }}
              >
                <img
                  src={"../../sampleData/online.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "17px", height: "17px" }}
                />
                <text
                  style={{
                    color: "#3A3A3F",
                    fontSize: "0.75rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  EN VIVO
                </text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    minWidth: "140px",
                    minHeight: "52px",
                    padding: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: 100,
                    }}
                  >
                    <text
                      style={{
                        overflow: "hidden",
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Temperatura
                    </text>
                    <text
                      style={{
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      4°C
                    </text>
                  </div>
                  <img
                    src={"../../sampleData/tem1.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    minWidth: "140px",
                    minHeight: "52px",
                    padding: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: 100,
                    }}
                  >
                    <text
                      style={{
                        overflow: "hidden",
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Voltaje
                    </text>
                    <text
                      style={{
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      118V
                    </text>
                  </div>
                  <img
                    src={"../../sampleData/vol1.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    minWidth: "140px",
                    minHeight: "52px",
                    padding: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: 100,
                    }}
                  >
                    <text
                      style={{
                        overflow: "hidden",
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Temperatura
                    </text>
                    <text
                      style={{
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      4°C
                    </text>
                  </div>
                  <img
                    src={"../../sampleData/tem1.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="detail_hr" style={{ marginTop: 2 }} />

        <section className="detail_principal_body">
          <div
            style={{
              display: "flex",
              padding: "12px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              flex: 100,
              borderRadius: "8px",
              borderLeft: "4px solid #F93448",
              background: "#FFF1F2",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <img
                  src={"../../sampleData/alertN.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "1em", height: "1em" }}
                />
                <text
                  style={{
                    color: "#F93448",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  Alerta de funcionamiento
                </text>
              </div>
              <div>
                {" "}
                <img
                  src={"../../sampleData/close-i.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "1em", height: "1em", cursor: "pointer" }}
                />
              </div>
            </div>
            <div
              style={{
                color: "#F93448",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              19 de septiembre de 2023 6:00
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                alignSelf: "stretch",
                marginTop: 10,
              }}
            >
              <div
                style={{
                  color: "#F93448",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                Se ha detectado una falla en el compresor, esta trabajando más
                tiempo de los rangos funcionales. Levanta una orden de servicio{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  borderRadius: "4px",
                  background: "#F93448",
                  marginLeft: "auto",
                }}
              >
                <button
                  style={{
                    color: "#FFF1F2",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    padding: "4px 4px",
                    borderRadius: "4px",
                    background: "#F93448",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  Solicitar servicio técnico
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="detail_principal_body_content">
          <section className="detail_principal_actividad_acerca_1">
            <div
              className="clt_actividad_acerca_principal"
              // style={{ overflowY: "auto" }}
            >
              <section className="clt_actividad_principal_actividad">
                <div className="clt_actividad_principal_title">
                  <img
                    src={"../../sampleData/actividad.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "1.5em", height: "1.5em" }}
                  />
                  <h1 className="clt_actividad_principal_title_h1">
                    Actividad del enfriador
                  </h1>
                </div>
                <div className="clt_acerca_principal_cards">
                  {coolersData &&
                  coolersData.activity &&
                  coolersData.activity.length <= 0 ? (
                    <>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.75em",
                          marginTop: 130,
                        }}
                      >
                        Sin actividad
                      </p>
                    </>
                  ) : (
                    coolersData &&
                    coolersData.activity &&
                    coolersData.activity.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {coolersData.activity
                          .filter(
                            (order) =>
                              (order.type === "SERVICE_ORDER" &&
                                (order.data.status === "D,D" ||
                                  order.data.status === "O,O")) ||
                              (order.type === "TRACKING" &&
                                (order.data.algorithm === "COMPRESSOR_FAIL" ||
                                  order.data.algorithm === "FREEZING_FAIL" ||
                                  order.data.algorithm === "TEMPERATURE_FAIL" ||
                                  order.data.algorithm === "VOLTAGE_FAIL" ||
                                  order.data.algorithm ===
                                    "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ||
                                  order.data.algorithm ===
                                    "DISCONNECTION_ALERT" ||
                                  order.data.algorithm ===
                                    "HIGH_TEMPERATURE_ALERT" ||
                                  order.data.algorithm === "VOLTAGE_ALERT" ||
                                  order.data.algorithm === "Actualizar Info" ||
                                  order.data.algorithm === "Sin Riesgo" ||
                                  order.data.algorithm ===
                                    "Estatus sin venta" ||
                                  order.data.algorithm === "Visita PdV" ||
                                  order.data.algorithm === "Acciones urgentes"))
                          )
                          .sort((a, b) => {
                            let aDate, bDate;

                            if (a.type === "SERVICE_ORDER") {
                              if (a.data.status === "D,D") {
                                aDate = new Date(a.data.close_at).getTime();
                              } else if (a.data.status === "O,O") {
                                aDate = new Date(a.data.received_at).getTime();
                              }
                            } else if (
                              a.type === "TRACKING" &&
                              a.data.notified_at
                            ) {
                              aDate = new Date(a.data.notified_at).getTime();
                            }

                            if (b.type === "SERVICE_ORDER") {
                              if (b.data.status === "D,D") {
                                bDate = new Date(b.data.close_at).getTime();
                              } else if (b.data.status === "O,O") {
                                bDate = new Date(b.data.received_at).getTime();
                              }
                            } else if (
                              b.type === "TRACKING" &&
                              b.data.notified_at
                            ) {
                              bDate = new Date(b.data.notified_at).getTime();
                            }

                            if (!aDate && !bDate) {
                              if (a.type === "SERVICE_ORDER") return -1;
                              if (b.type === "SERVICE_ORDER") return 1;
                              if (a.type === "TRACKING") return -1;
                              if (b.type === "TRACKING") return 1;
                              return 0;
                            }

                            if (!aDate) return -1;
                            if (!bDate) return 1;

                            return bDate - aDate;
                          })

                          .map((order, index) => (
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
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          alignSelf: "stretch",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#88888B",
                                            fontSize: "0.75em",
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                            lineHeight: "normal",
                                          }}
                                        >
                                          {order.data.status === "D,D"
                                            ? order.data.close_at ===
                                                undefined ||
                                              order.data.close_at === null
                                              ? "Sin registro"
                                              : moment
                                                  .utc(order.data.close_at)
                                                  .format("DD/MM/YYYY HH:mm")
                                            : order.data.status === "O,O"
                                            ? order.data.received_at ===
                                                undefined ||
                                              order.data.received_at === null
                                              ? "Sin registro"
                                              : moment
                                                  .utc(order.data.received_at)
                                                  .format("DD/MM/YYYY HH:mm")
                                            : "Sin registro"}
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            padding: "4px",
                                            alignItems: "center",
                                            gap: "4px",
                                            borderRadius: "2px",
                                            background: "#D4DAE3",
                                            marginLeft: "auto",
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#313A49",
                                              fontSize: "7px",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                              lineHeight: "14px",
                                            }}
                                          >
                                            {order.data.status === "D,D"
                                              ? "CERRADA"
                                              : "ABIERTA"}
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          color: "#000005",
                                          // fontFamily: "DM Sans",
                                          display: "flex",
                                          alignItems: "center",
                                          fontSize: "0.875em",
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
                                                src={
                                                  "../../sampleData/mov2.svg"
                                                }
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
                                              fontSize: "0.625rem",
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
                                          fontSize: "0.875rem",
                                          fontStyle: "normal",
                                          fontWeight: 400,
                                          lineHeight: "normal",
                                          marginTop: "-5px",
                                        }}
                                      >
                                        ${" "}
                                        {order.data.total.toLocaleString(
                                          "es-MX"
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          color: "#88888B",
                                          fontSize: "0.75rem",
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
                                          fontSize: "0.75rem",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          lineHeight: "normal",
                                        }}
                                      >
                                        {order.data.notified_at === undefined ||
                                        order.data.notified_at === null
                                          ? "Sin registro"
                                          : moment
                                              .utc(order.data.notified_at)
                                              .format("DD/MM/YYYY HH:mm")}
                                      </div>

                                      <div
                                        style={{
                                          color: "#000005",
                                          // fontFamily: "DM Sans",
                                          display: "flex",
                                          alignItems: "center",
                                          fontSize: "0.75rem",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "normal",
                                          textAlign: "left",
                                        }}
                                      >
                                        <div>
                                          {order.data.algorithm ===
                                          "COMPRESSOR_FAIL"
                                            ? "Falla asociada al compresor"
                                            : order.data.algorithm ===
                                              "TEMPERATURE_FAIL"
                                            ? "Alta temperatura"
                                            : order.data.algorithm ===
                                              "VOLTAGE_FAIL"
                                            ? "Posible daño eléctrico"
                                            : order.data.algorithm ===
                                              "FREEZING_FAIL"
                                            ? "Evaporador bloqueado"
                                            : order.data.algorithm ===
                                              "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                                            ? "Alta demanda del compresor"
                                            : order.data.algorithm ===
                                              "DISCONNECTION_ALERT"
                                            ? "Desconexión"
                                            : order.data.algorithm ===
                                              "HIGH_TEMPERATURE_ALERT"
                                            ? "Alta temperatura"
                                            : order.data.algorithm ===
                                              "VOLTAGE_ALERT"
                                            ? "Bajo/Alto voltaje"
                                            : order.data.algorithm}
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
                                                src={
                                                  "../../sampleData/alert3.svg"
                                                }
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
                                                src={
                                                  "../../sampleData/fail3.svg"
                                                }
                                                alt="Descripción de la imagen"
                                                style={{
                                                  width: ".9vw",
                                                  height: ".9vw",
                                                  lineHeight: "14px",
                                                }}
                                              />
                                            </>
                                          ) : order.data.level ===
                                            "INDICATOR" ? (
                                            <>
                                              {" "}
                                              <img
                                                src={
                                                  "../../sampleData/ind3.svg"
                                                }
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
                                              fontSize: "0.5rem",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                            }}
                                          >
                                            {order.data.level === "ALERT"
                                              ? "ALERTA"
                                              : order.data.level === "FAIL"
                                              ? "FALLA"
                                              : order.data.level === "INDICATOR"
                                              ? "CONTROL DE ACTIVOS"
                                              : order.data.level}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    )
                  )}
                </div>
              </section>

              <section className="clt_actividad_principal_actividad">
                <div className="clt_actividad_principal_title">
                  <img
                    src={"../../sampleData/buildings.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "1.5em", height: "1.5em" }}
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
                    {isLoading == true ? (
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton height={15} radius="sm" />
                      </div>
                    ) : coolersData?.cooler?.outlet_name === undefined ||
                      coolersData?.cooler?.outlet_name === "" ? (
                      "Sin registro"
                    ) : (
                      coolersData?.cooler?.outlet_name
                    )}
                    {coolersData?.cooler?.outlet_id === undefined ||
                    coolersData?.cooler?.outlet_id === "" ? (
                      " / Sin registro"
                    ) : (
                      <span>
                        {" "}
                        / <strong>{coolersData?.cooler?.outlet_id}</strong>
                      </span>
                    )}
                  </h1>
                </div>
                <div className="clt_actividad_principal_title_nombre">
                  <h1 className="clt_actividad_principal_title_nombre_h1">
                    Dirección
                  </h1>
                  <h1 className="clt_actividad_principal_title_nombre_h1">
                    {isLoading == true ? (
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton height={20} radius="xl" />
                      </div>
                    ) : coolersData?.cooler?.outlet_address === "" ||
                      coolersData?.cooler?.outlet_address == undefined ? (
                      "Sin registro"
                    ) : (
                      coolersData?.cooler?.outlet_address
                    )}
                  </h1>
                </div>
                <div className="clt_actividad_principal_title_nombre">
                  <h1 className="clt_actividad_principal_title_nombre_h1">
                    Distancia al punto de instalación
                  </h1>
                  <h1 className="clt_actividad_principal_title_nombre_h1">
                    {isLoading == true ? (
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton height={10} radius="xl" />
                      </div>
                    ) : coolersData?.cooler?.distance === undefined ||
                      coolersData?.cooler?.distance === null ? (
                      "Sin registro"
                    ) : Number(coolersData?.cooler?.distance.toFixed(0)) < 0 ? (
                      "Sin posición de instalación"
                    ) : (
                      `${coolersData?.cooler?.distance.toFixed(0)} metros`
                    )}
                  </h1>
                </div>
                <div className="clt_actividad_principal_mapa">
                  {isLoading == true ? (
                    <Skeleton
                      height={10}
                      radius="xl"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (coolersData?.cooler?.last_latitude != null &&
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
                <div className="clt_actividad_mapa_info">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={"../../sampleData/mappv.svg"}
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
                        gap: "4px", //
                      }}
                    >
                      <div
                        style={{
                          width: "1vw",
                          height: "0.3vw",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "1vw",
                          height: "0.3vw",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "1vw",
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
      </section>
    </>
  );
};
