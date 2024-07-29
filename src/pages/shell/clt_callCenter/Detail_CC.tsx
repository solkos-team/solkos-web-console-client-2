import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { Tooltip, Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";
import { fetchUniversalDetails } from "../../../utils/apiUtils";
import moment from "moment";
import "moment/locale/es";
import { CoolerData } from "../../../interfaces/CoolerInterface";
import MapComponent from "../../../components/map";
import MapComponent1 from "../../../components/map_1";
import MapComponent2 from "../../../components/map_2";
import { IconArrowRight } from "@tabler/icons-react";
import DrawerInversion from "../../../components/drawerInversion/DrawerInversion";
import DrawerEnergy from "../../../components/drawerEnergy/DrawerEnergy";
import { useDisclosure } from "@mantine/hooks";
import { CoolviewIcon } from "../../../sampleData/icons";
import { userVerify } from "../../../Functions/pathVerify";
import { coolviewDrawer as DrawerCoolview } from "../coolView/coolviewDrawer";

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

export default function CoolerDetailCC() {
  const [coolViewOpened, { open: openCoolview, close: closeCoolview }] =
    useDisclosure(false);
  const b = "../../sampleData/devices.png";
  const { serial_number } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [mesLastStat, setMesLastStat] = useState<number>();
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [dateTelemetri, setDateTelemetri] = useState<Date>();
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

  if (
    coolersData?.activity?.find(
      (item) => item.data.class === "ASSET_MANAGEMENT_LAST_STAT"
    )?.data.notified_at &&
    mesLastStat == undefined
  ) {
    const mesLastStat = new Date(
      coolersData?.activity?.find(
        (item) => item.data.class === "ASSET_MANAGEMENT_LAST_STAT"
      )?.data.notified_at
    );
    setMesLastStat(mesLastStat.getMonth() + 1 ?? 1);
    setDateTelemetri(mesLastStat);
  }

  const Role = localStorage.getItem("Role") || "";

  return (
    <>
      {/* {localStorage.getItem("ORG") == "CALL CENTER" ? (
        <PageFilter path="" disabledPath={true} />
      ) : (
        <PageFilter path="clt" disabledPath={true} />
      )} */}
      <section className="detail_principal_body" style={{ marginTop: "-1rem" }}>
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
                          // display: "none",
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
                            coolersData?.cooler.actionable === "Visita PdV" ||
                            coolersData?.cooler.actionable ===
                              "VISITA PDV PARA LECTURA"
                              ? "1.5px solid #DA7E05"
                              : coolersData?.cooler.actionable ===
                                  "Sin Riesgo" ||
                                coolersData?.cooler.actionable === "SIN RIESGO"
                              ? "1.5px solid #0F9F67"
                              : coolersData?.cooler.actionable ===
                                  "Estatus sin venta" ||
                                coolersData?.cooler.actionable ===
                                  "SIN VENTA" ||
                                coolersData?.cooler.actionable ===
                                  "Acciones urgentes" ||
                                coolersData?.cooler.actionable ===
                                  "SIN COINCIDENCIA"
                              ? "1.5px solid #F93448"
                              : coolersData?.cooler.actionable ===
                                "Actualizar Info"
                              ? "1.5px solid #DA7E05"
                              : "1.5px solid black",
                          background: "#FFF",
                        }}
                      >
                        {isLoading == true ? (
                          <Skeleton height={8} radius="xl" />
                        ) : coolersData?.cooler.actionable === "Visita PdV" ||
                          coolersData?.cooler.actionable ===
                            "VISITA PDV PARA LECTURA" ? (
                          <img
                            src={"../../sampleData/p.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable === "Sin Riesgo" ||
                          coolersData?.cooler.actionable === "SIN RIESGO" ? (
                          <img
                            src={"../../sampleData/sn.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                            "Estatus sin venta" ||
                          coolersData?.cooler.actionable === "SIN VENTA" ||
                          coolersData?.cooler.actionable ===
                            "Acciones urgentes" ||
                          coolersData?.cooler.actionable ===
                            "SIN COINCIDENCIA" ? (
                          <img
                            src={"../../sampleData/a.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                          "Actualizar Info" ? (
                          <img
                            src={"../../sampleData/p.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : (
                          ""
                        )}

                        <div
                          style={{
                            color:
                              coolersData?.cooler.actionable === "Visita PdV" ||
                              coolersData?.cooler.actionable ===
                                "VISITA PDV PARA LECTURA"
                                ? "#DA7E05"
                                : coolersData?.cooler.actionable ===
                                    "Sin Riesgo" ||
                                  coolersData?.cooler.actionable ===
                                    "SIN RIESGO"
                                ? "#0F9F67"
                                : coolersData?.cooler.actionable ===
                                    "Estatus sin venta" ||
                                  coolersData?.cooler.actionable ===
                                    "SIN VENTA" ||
                                  coolersData?.cooler.actionable ===
                                    "Acciones urgentes" ||
                                  coolersData?.cooler.actionable ===
                                    "SIN COINCIDENCIA"
                                ? "#F93448"
                                : coolersData?.cooler.actionable ===
                                  "Actualizar Info"
                                ? "#DA7E05"
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
                        color: "#000000",
                        // fontFamily: "DM Sans",
                        fontSize: "1.25rem",
                        fontStyle: "normal",
                        lineHeight: "normal",
                      }}
                    >
                      {coolersData?.cooler?.asset_number === undefined ||
                      coolersData?.cooler?.asset_number === ""
                        ? "Sin registro"
                        : coolersData?.cooler?.asset_number}
                    </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                    width: "30rem",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "Inter",
                      fontSize: "0.75rem",
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
                      fontSize: "0.75rem",
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
                        fontSize: "0.75rem",
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
            </div>
          </div>
          <div className="detail_data">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                  }}
                >
                  CANAL:
                </div>
                <div
                  style={{
                    color: "#313A49",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    background: "#D4DAE3",
                    borderRadius: "2px",
                    padding: "4px",
                    textAlign: "right",
                    marginTop: "-4px",
                  }}
                >
                  {isLoading == true ? (
                    <div style={{ width: "100%", height: "100%" }}>
                      <Skeleton height={20} radius="xl" />
                    </div>
                  ) : coolersData?.cooler?.channel === undefined ||
                    coolersData?.cooler?.channel === "" ? (
                    "Sin registro"
                  ) : (
                    coolersData?.cooler?.channel
                  )}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    color: "#88888B",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                  }}
                >
                  REGIÓN:
                </div>
                <div
                  style={{
                    color: "#313A49",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    background: "#D4DAE3",
                    borderRadius: "2px",
                    padding: "4px",
                    textAlign: "right",
                    marginTop: "-4px",
                  }}
                >
                  {isLoading == true ? (
                    <div style={{ width: "100%", height: "100%" }}>
                      <Skeleton height={20} radius="xl" />
                    </div>
                  ) : coolersData?.cooler?.region === "" ||
                    coolersData?.cooler?.region === undefined ? (
                    "Sin registro"
                  ) : (
                    coolersData?.cooler?.region
                  )}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    color: "#88888B",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                  }}
                >
                  RUTA:
                </div>
                <div
                  style={{
                    color: "#313A49",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    background: "#D4DAE3",
                    borderRadius: "2px",
                    padding: "4px",
                    textAlign: "right",
                    marginTop: "-4px",
                  }}
                >
                  {isLoading == true ? (
                    <div style={{ width: "100%", height: "100%" }}>
                      <Skeleton height={20} radius="xl" />
                    </div>
                  ) : coolersData?.cooler?.route === "" ||
                    coolersData?.cooler?.route === undefined ? (
                    "Sin registro"
                  ) : (
                    coolersData?.cooler?.route
                  )}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    color: "#88888B",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                  }}
                >
                  GERENCIA DE ZONA:
                </div>
                <div
                  style={{
                    color: "#313A49",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    background: "#D4DAE3",
                    borderRadius: "2px",
                    padding: "4px",
                    textAlign: "right",
                    marginTop: "-4px",
                  }}
                >
                  {isLoading == true ? (
                    <div style={{ width: "100%", height: "100%" }}>
                      <Skeleton height={20} radius="xl" />
                    </div>
                  ) : coolersData?.cooler?.zone === "" ||
                    coolersData?.cooler?.zone === undefined ? (
                    "Sin registro"
                  ) : (
                    coolersData?.cooler?.zone
                  )}
                </div>
              </div>
              <div
                style={{
                  // display: userVerify(localStorage.getItem("USER") ?? ""),
                  // display: Role === "root" ? "flex" : "none",
                  display:
                    Role === "root" && isLoading === false ? "flex" : "none",
                  gap: "5px",
                  background: "var(--blue-0, #E7F5FF)",
                  width: "fit-content",
                  padding: "5px",
                  boxSizing: "border-box",
                  borderRadius: "5px",
                }}
              >
                {/* <div style={{ display: isLoading == true ? 'none' : "flex",gap:'5px' }}> */}
                <div
                  style={{
                    color: "var(--blue-6, #2393F4)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  onClick={openCoolview}
                >
                  Ver Coolview
                </div>
                <img src={CoolviewIcon} alt="CoolviewIcon" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
        <br></br>
        <hr className="detail_hr" style={{ marginTop: 2 }} />
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
                                  order.data.status === "C,C" ||
                                  order.data.status === "O,O")) ||
                              (order.type === "TRACKING" &&
                                (order.data.algorithm === "Bajo/Alto voltaje" ||
                                  order.data.algorithm ===
                                    "Alta demanda de compresor" ||
                                  order.data.algorithm ===
                                    "Alerta alta temperatura" ||
                                  order.data.algorithm === "Desconexión" ||
                                  order.data.algorithm ===
                                    "Falla asociada al compresor" ||
                                  order.data.algorithm ===
                                    "Evaporador bloqueado" ||
                                  order.data.algorithm === "Alta temperatura" ||
                                  order.data.algorithm ===
                                    "Posible daño eléctrico" ||
                                  order.data.algorithm === "Actualizar Info" ||
                                  order.data.algorithm === "Sin Riesgo" ||
                                  order.data.algorithm === "SIN RIESGO" ||
                                  order.data.algorithm ===
                                    "Estatus sin venta" ||
                                  order.data.algorithm === "SIN VENTA" ||
                                  order.data.algorithm === "Visita PdV" ||
                                  order.data.algorithm ===
                                    "VISITA PDV PARA LECTURA" ||
                                  order.data.algorithm ===
                                    "Acciones urgentes" ||
                                  order.data.algorithm === "SIN COINCIDENCIA"))
                          )
                          .sort((a, b) => {
                            let aDate, bDate;

                            if (a.type === "SERVICE_ORDER") {
                              if (a.data.status === "D,D") {
                                aDate = new Date(a.data.close_at).getTime();
                              } else if (
                                a.data.status === "O,O" ||
                                a.data.status === "C,C"
                              ) {
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
                              } else if (
                                b.data.status === "O,O" ||
                                b.data.status === "C,C"
                              ) {
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
                                    borderRadius: "8px",
                                    border: "1px solid var(--gray-4, #CED4DA)",
                                    background: "var(--gray-0, #F8F9FA)",
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
                                            : order.data.status === "O,O" ||
                                              order.data.status === "C,C"
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
                                            {order.data.status === "O,O"
                                              ? "ABIERTA"
                                              : "CERRADA"}
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
                    ) : (Number(coolersData?.cooler?.distance.toFixed(0)) < 0 &&
                        coolersData?.cooler.latitude === 0) ||
                      coolersData?.cooler.latitude === undefined ? (
                      "Sin posición de instalación"
                    ) : (Number(coolersData?.cooler?.distance.toFixed(0)) < 0 &&
                        coolersData?.cooler.last_latitude === 0) ||
                      coolersData?.cooler.last_latitude === undefined ||
                      coolersData?.cooler.last_latitude === null ? (
                      "Sin posición de última visita"
                    ) : (
                      `${coolersData?.cooler?.distance.toFixed(0)} metros`
                    )}
                  </h1>
                </div>
                <div className="clt_actividad_principal_mapa">
                  {isLoading == true ? (
                    <Skeleton
                      height={10}
                      radius="xs"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : coolersData?.cooler?.last_latitude === null &&
                    coolersData?.cooler?.latitude === 0 ? (
                    <>
                      <div
                        style={{
                          display: "inline-flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          width: "100%",
                          height: "100%",
                          backgroundImage: "url('../../sampleData/fondd.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <img
                          src={"../../sampleData/notmap.svg"}
                          alt="Descripción de la imagen"
                          style={{
                            width: "26px",
                            height: "26px",
                          }}
                        />
                        <text
                          style={{
                            color: "#ED5079",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "155%",
                          }}
                        >
                          No hay datos de la ubicación
                        </text>
                      </div>
                    </>
                  ) : coolersData?.cooler?.last_latitude != null &&
                    coolersData?.cooler?.latitude === 0 ? (
                    <>
                      <div>
                        <MapComponent1
                          latitude={coolersData?.cooler?.last_latitude}
                          longitude={coolersData?.cooler?.last_longitude}
                        />
                      </div>
                    </>
                  ) : coolersData?.cooler?.last_latitude === null &&
                    coolersData?.cooler?.latitude != 0 ? (
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
              </section>
            </div>
          </section>
        </section>
      </section>
      <DrawerCoolview
        opened={coolViewOpened}
        onClose={closeCoolview}
        CoolerId={coolersData?.cooler?.serial_number}
        dateStat={dateTelemetri}
      />
    </>
  );
}
