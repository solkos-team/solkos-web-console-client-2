import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PageFilter from "../../../components/pageFilter";
import { Tooltip, Skeleton, Center } from "@mantine/core";
import { Link } from "react-router-dom";
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
import { coolviewDrawer as DrawerCoolview } from "../coolView/coolviewDrawer";
import { useDisclosure } from "@mantine/hooks";
import { CoolviewIcon } from "../../../sampleData/icons";
import { userVerify } from "../../../Functions/pathVerify";

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
  const dto = useSelector((state: any) => state.organization);
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
  const [coolViewOpened, { open: openCoolview, close: closeCoolview }] =
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
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [fechaActual, setFechaActual] = useState("");
  const [fechaAnterior, setFechaAnterior] = useState("");

  function getFechas() {
    var fechaActual = new Date();
    var fechaAnterior = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate() - 30
    );
    var fechaActualFormateada = fechaActual.toISOString().split("T")[0];
    var fechaAnteriorFormateada = fechaAnterior.toISOString().split("T")[0];
    setFechaActual(fechaActualFormateada);
    setFechaAnterior(fechaAnteriorFormateada);
  }

  useEffect(() => {
    fetchData(serie);
    getFechas();
  }, []);

  useEffect(() => {
    SetSerie(serial_number);
    fetchData(serial_number);
  }, [serial_number]);

  const searchSerial = (value) => {
    value == "" || value == null || value == undefined
      ? alert("Ingresa datos correctos! ")
      : fetchData(value);
    setEditSerie(false);
  };
  return (
    <>
      {localStorage.getItem("ORG") == "CALL CENTER" ? (
        <PageFilter path="" disabledPath={true} />
      ) : (
        <PageFilter path="clt" disabledPath={true} />
      )}
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
                              : coolersData?.cooler.actionable === "Sin Riesgo"
                              ? "1.5px solid #0F9F67"
                              : coolersData?.cooler.actionable ===
                                  "Estatus sin venta" ||
                                coolersData?.cooler.actionable ===
                                  "Acciones urgentes"
                              ? "1.5px solid #F93448"
                              : coolersData?.cooler.actionable ===
                                "Actualizar Info"
                              ? "1.5px solid #DA7E05"
                              : coolersData?.cooler.actionable ===
                                  "Actualizar dato" ||
                                coolersData?.cooler.actionable ===
                                  "Datos faltantes" ||
                                coolersData?.cooler.actionable ===
                                  "Monitoreo" ||
                                coolersData?.cooler.actionable === "Movimiento"
                              ? "1.5px solid #1864AB"
                              : coolersData?.cooler.actionable ===
                                  "Solicitar serv. correctivo" ||
                                coolersData?.cooler.actionable ===
                                  "Solicitar serv. preventivos" ||
                                coolersData?.cooler.actionable ===
                                  "Seguimiento a equipo" ||
                                coolersData?.cooler.actionable === "Visita PdV"
                              ? "1.5px solid #E67700"
                              : coolersData?.cooler.actionable ===
                                "Visita PdV prioritaria"
                              ? "1.5px solid #C92A2A"
                              : "1.5px solid black",
                          background: "#FFF",
                        }}
                      >
                        {isLoading == true ? (
                          <Skeleton height={8} radius="xl" />
                        ) : coolersData?.cooler.actionable === "Visita PdV" &&
                          dto != "KOF Colombia" ? (
                          <img
                            src={"../../sampleData/p.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable === "Sin Riesgo" ? (
                          <img
                            src={"../../sampleData/sn.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                            "Estatus sin venta" ||
                          coolersData?.cooler.actionable ===
                            "Acciones urgentes" ? (
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
                        ) : coolersData?.cooler.actionable ===
                          "Actualizar dato" ? (
                          <img
                            src={"../../sampleData/actDat.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                          "Datos faltantes" ? (
                          <img
                            src={"../../sampleData/datFal.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable === "Monitoreo" ? (
                          <img
                            src={"../../sampleData/Mont.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable === "Movimiento" ? (
                          <img
                            src={"../../sampleData/mov1.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                            "Solicitar serv. correctivo" ||
                          coolersData?.cooler.actionable ===
                            "Solicitar serv. preventivos" ? (
                          <img
                            src={"../../sampleData/serCP.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                          "Seguimiento a equipo" ? (
                          <img
                            src={"../../sampleData/seguE.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable === "Visita PdV" ? (
                          <img
                            src={"../../sampleData/visitap.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : coolersData?.cooler.actionable ===
                          "Visita PdV prioritaria" ? (
                          <img
                            src={"../../sampleData/visitapd.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                        ) : (
                          ""
                        )}

                        <div
                          style={{
                            color:
                              coolersData?.cooler.actionable === "Visita PdV" &&
                              dto != "KOF Colombia"
                                ? "#DA7E05"
                                : coolersData?.cooler.actionable ===
                                  "Sin Riesgo"
                                ? "#0F9F67"
                                : coolersData?.cooler.actionable ===
                                    "Estatus sin venta" ||
                                  coolersData?.cooler.actionable ===
                                    "Acciones urgentes"
                                ? "#F93448"
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
                                    "Visita PdV"
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
                          fontWeight: 500,
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
                  display: userVerify(localStorage.getItem("USER") ?? ""),
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
              {/* <div style={{  justifyContent: "space-between" }}>
                <Link
                  to={`/home/coolView/?device_id=${coolersData?.cooler.device_id}&date_from=${fechaAnterior}&date_to=${fechaActual}&clt=false`}
                  style={{ fontSize: "0.625rem" }}
                >
                  Ver en CoolView
                </Link>
              </div> */}
            </div>
          </div>
        </section>
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
                          width: "100%", // Esto hará que el div ocupe el 100% del ancho del contenedor padre
                          height: "100%",
                          backgroundImage: "url('../../sampleData/fondd.png')",
                          backgroundSize: "cover", // Esto asegurará que la imagen cubra todo el div
                          backgroundPosition: "center", // Esto centrará la imagen en el div
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
          <section className="detail_principal_inv_gast_1">
            <div className="clt_actividad_acerca_principal">
              <section className="clt_actividad_principal">
                <div className="clt_actividad_principal_title">
                  <img
                    src={"../../sampleData/actividad.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "1.5vw", height: "1.5vw" }}
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
                      {isLoading == true ? (
                        <Skeleton height={10} radius="xl" />
                      ) : coolersData?.properties?.total_ownership_expense
                          ?.value === undefined ? (
                        "Sin registro"
                      ) : (
                        "$" +
                        `${coolersData?.properties?.total_ownership_expense.value.toLocaleString(
                          "es-MX"
                        )}`
                      )}
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
                          `${coolersData?.properties?.sale_price.value.toLocaleString(
                            "es-MX"
                          )}`}
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
                          `${coolersData?.properties?.total_expense_service.value.toLocaleString(
                            "es-MX"
                          )}`}
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
              <section
                className="clt_actividad_principal"
                style={{ marginLeft: "6px" }}
              >
                <div className="clt_actividad_principal_title">
                  <img
                    src={"../../sampleData/energy.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "1.5vw", height: "1.5vw" }}
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
                          `${coolersData?.properties?.energy_cost.value.toLocaleString(
                            "es-MX"
                          )}`}
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
        </section>
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
      <DrawerCoolview
        opened={coolViewOpened}
        onClose={closeCoolview}
        CoolerId={coolersData?.cooler.device_id}
      />
    </>
  );
}
