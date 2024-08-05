import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { ExportToExcel } from "../exportExcel/ExportToExcel";
import { Skeleton, Table } from "@mantine/core";
import { fetchUniversalTables } from "../../utils/apiUtils";
import { CoolerInterface } from "../../interfaces/CoolerInterface";
import { Drawer } from "@mantine/core";

export default function DrawerA({
  opened,
  onClose,
  selectedAlgorithm,
  value,
  delta,
  level,
}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(25);
  const [coolersData, setCoolersData] = useState<CoolerInterface[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState<String | number>(0);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  opened == false ? (value = 0) : "";
  const body = {
    customer: dto,
    class: level === "INDICATOR" ? "ASSET_MANAGEMENT_ACTIONABLE" : "OPE",
    algorithm: [
      selectedAlgorithm === "Bajo/Alto voltaje"
        ? "VOLTAGE_ALERT"
        : selectedAlgorithm === "Alta demanda de compresor"
        ? "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
        : selectedAlgorithm === "Alerta alta temperatura"
        ? "HIGH_TEMPERATURE_ALERT"
        : selectedAlgorithm === "Desconexión"
        ? "DISCONNECTION_ALERT"
        : selectedAlgorithm === "Falla asociada al compresor"
        ? "COMPRESSOR_FAIL"
        : selectedAlgorithm === "Evaporador bloqueado"
        ? "FREEZING_FAIL"
        : selectedAlgorithm === "Alta temperatura"
        ? "TEMPERATURE_FAIL"
        : selectedAlgorithm === "Posible daño eléctrico"
        ? "VOLTAGE_FAIL"
        : selectedAlgorithm === "SIN RIESGO"
        ? "Sin Riesgo"
        : selectedAlgorithm === "SIN VENTA"
        ? "Estatus sin venta"
        : selectedAlgorithm === "VISITA PDV PARA LECTURA"
        ? "Visita PdV"
        : selectedAlgorithm === "SIN COINCIDENCIA"
        ? "Acciones urgentes" || "Actualizar Info"
        : selectedAlgorithm,
    ],
    path: pathVerify(),
    page_size: Number(datosPorPagina),
    page_number: currentPage,
  };

  console.log(selectedAlgorithm);
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("coolers", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setCoolersData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setCoolersData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(level);
  useEffect(() => {
    value != 0 ? fetchData() : "";
  }, [dt, datosPorPagina, opened, currentPage]);

  const filterCoolersDataDownload = (coolersData) => {
    if (!coolersData) return [];

    return coolersData.map((cooler) => ({
      Serie: cooler.serial_number,
      Mac: cooler.device_id,
      Modelo: cooler.model_id,
      Zona: cooler.zone,
      Región: cooler.region,
      Unidad_operativa: cooler.operative_unit,
      Ruta: cooler.route,
      Punto_de_venta: cooler.outlet_name,
      Dirección: cooler.outlet_address,
      Latitud: cooler.latitude,
      Longitud: cooler.longitude,
      Prioridad: cooler.priority,
      Fecha_de_notificación: cooler.notified_at,
    }));
  };
  const isloadingData = () => {
    let rows: any = [];
    for (let i = 0; i < 25; i++) {
      rows.push(
        <tr key={i}>
          <td data-label="ESTATUS">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="SERIE">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="MODELO">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="DIAS SIN VISITA">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="PRIORIDAD">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
        </tr>
      );
    }
    return rows;
  };
  coolersData === undefined ? [] : coolersData;
  // console.log(coolersData);
  totalData === undefined ? 0 : totalData;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title=""
      position="right"
      size="40rem"
    >
      <section
        className="drawerAlertsPrincipal"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "",
          gap: "4px",
          marginTop: "1rem",
        }}
      >
        <div
          className="drawerAlertHeader"
          style={{
            width: "100%",
            height: "10%",
            backgroundColor: "",
            borderBottom: "1px solid var(--gray-4, #CED4DA)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              paddingBottom: "0.5rem",
              boxSizing: "border-box",
            }}
          >
            {/* 2 */}
            <div
              style={{
                display: "flex",
                padding: "0px 30px",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                  backgroundColor: "",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "2px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    border:
                      selectedAlgorithm === "Sin Riesgo" ||
                      selectedAlgorithm === "SIN RIESGO"
                        ? "1px solid #40C057"
                        : selectedAlgorithm === "Solicitar serv. correctivo" ||
                          selectedAlgorithm === "Solicitar serv. preventivo" ||
                          selectedAlgorithm === "Seguimiento a equipo" ||
                          selectedAlgorithm === "Visita PdV" ||
                          selectedAlgorithm === "VISITA PDV PARA LECTURA"
                        ? "1px solid #E67700"
                        : selectedAlgorithm === "Estatus sin venta" ||
                          selectedAlgorithm === "SIN VENTA" ||
                          selectedAlgorithm === "Acciones urgentes" ||
                          selectedAlgorithm === "SIN COINCIDENCIA"
                        ? "1px solid #FA5252"
                        : "",
                    background:
                      level === "ALERT"
                        ? "#FEF5C7"
                        : level === "FAIL"
                        ? "#FFC7CD"
                        : selectedAlgorithm === "Actualizar Info"
                        ? "#FEF5C7"
                        : selectedAlgorithm === "Sin Riesgo" ||
                          selectedAlgorithm === "SIN RIESGO"
                        ? "#EBFBEE"
                        : selectedAlgorithm === "Estatus sin venta" ||
                          selectedAlgorithm === "SIN VENTA" ||
                          selectedAlgorithm === "Acciones urgentes" ||
                          selectedAlgorithm === "SIN COINCIDENCIA"
                        ? "#FFF5F5"
                        : selectedAlgorithm === "Visita PdV" &&
                          dto != "KOF Colombia"
                        ? "#FEF5C7"
                        : selectedAlgorithm === "Actualizar dato" ||
                          selectedAlgorithm === "Datos faltantes" ||
                          selectedAlgorithm === "Monitoreo" ||
                          selectedAlgorithm === "Movimiento"
                        ? "#A5D8FF"
                        : selectedAlgorithm === "Solicitar serv. correctivo" ||
                          selectedAlgorithm === "Solicitar serv. preventivo" ||
                          selectedAlgorithm === "Seguimiento a equipo" ||
                          selectedAlgorithm === "Visita PdV" ||
                          selectedAlgorithm === "VISITA PDV PARA LECTURA"
                        ? "#FFF9DB"
                        : selectedAlgorithm === "Visita PdV prioritaria"
                        ? "#FFC9C9"
                        : "",
                  }}
                >
                  {selectedAlgorithm === "Sin Riesgo" ||
                  selectedAlgorithm === "SIN RIESGO" ? (
                    <img
                      src={"../../sampleData/circle-check.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Actualizar Info" ? (
                    <img
                      src={"../../sampleData/reqa.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Estatus sin venta" ||
                    selectedAlgorithm === "SIN VENTA" ||
                    selectedAlgorithm === "Acciones urgentes" ||
                    selectedAlgorithm === "SIN COINCIDENCIA" ? (
                    <img
                      src={"../../sampleData/alert-circle2.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Visita PdV" &&
                    dto != "KOF Colombia" ? (
                    <img
                      src={"../../sampleData/vp.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Falla asociada al compresor" ? (
                    <>
                      <img
                        src={"../../sampleData/failc.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "1.813rem", height: "1.813rem" }}
                      />
                    </>
                  ) : selectedAlgorithm === "Alta temperatura" ? (
                    <img
                      src={"../../sampleData/failt.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Posible daño eléctrico" ? (
                    <img
                      src={"../../sampleData/faile.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Evaporador bloqueado" ? (
                    <img
                      src={"../../sampleData/failc.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Alta demanda de compresor" ? (
                    <>
                      <img
                        src={"../../sampleData/AlertsDrawer/compressor.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "1.813rem", height: "1.813rem" }}
                      />
                    </>
                  ) : selectedAlgorithm === "Desconexión" ? (
                    <>
                      {" "}
                      <img
                        src={"../../sampleData/desc.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "1.813rem", height: "1.813rem" }}
                      />
                    </>
                  ) : selectedAlgorithm === "Alerta alta temperatura" ? (
                    <img
                      src={"../../sampleData/alt.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Bajo/Alto voltaje" ? (
                    <img
                      src={"../../sampleData/altv.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Actualizar dato" ? (
                    <img
                      src={"../../sampleData/actDat.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Datos faltantes" ? (
                    <img
                      src={"../../sampleData/datFal.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Monitoreo" ? (
                    <img
                      src={"../../sampleData/Mont.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Movimiento" ? (
                    <img
                      src={"../../sampleData/mov1.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Solicitar serv. correctivo" ||
                    selectedAlgorithm === "Solicitar serv. preventivo" ? (
                    <img
                      src={"../../sampleData/serCP.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Seguimiento a equipo" ? (
                    <img
                      src={"../../sampleData/seguE.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Visita PdV" ||
                    selectedAlgorithm === "VISITA PDV PARA LECTURA" ? (
                    <img
                      src={"../../sampleData/building-store.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : selectedAlgorithm === "Visita PdV prioritaria" ? (
                    <img
                      src={"../../sampleData/visitapd.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "1.813rem", height: "1.813rem" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  backgroundColor: "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "2px",
                      background:
                        level === "ALERT"
                          ? "#FEF5C7"
                          : level === "INDICATOR"
                          ? "#BCDAFF"
                          : "#FFC7CD",
                      height: "100%",
                    }}
                  >
                    {level === "ALERT" ? (
                      <img
                        src={"../../sampleData/AlertsDrawer/alert.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "16px", height: "16px", color: "red" }}
                      />
                    ) : level === "INDICATOR" ? (
                      <img
                        src={"../../sampleData/act.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "16px", height: "16px" }}
                      />
                    ) : (
                      <img
                        src={"../../sampleData/fail1.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "16px", height: "16px" }}
                      />
                    )}

                    <div
                      style={{
                        color:
                          level === "ALERT"
                            ? "var(--yellow-9, #E67700)"
                            : "#451C03",
                        // fontFamily: "Space Mono",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "14px",
                      }}
                    >
                      {level === "ALERT"
                        ? "ALERTAS"
                        : level === "INDICATOR"
                        ? "CONTROL DE ACTIVOS"
                        : "FALLA"}
                    </div>
                  </div>
                  <div
                    style={{
                      color: "var(--other-black, #000)",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      fontSize: "1.2rem",
                    }}
                  >
                    {selectedAlgorithm && <div>{selectedAlgorithm}</div>}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "max-content",
                  padding: "8px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--gray-4, #CED4DA)",
                  background: "var(--gray-0, #F8F9FA)",
                  marginLeft: "auto",
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
                    style={{
                      color: "#000005",
                      // fontFamily: " DM Sans",
                      fontSize: "1.125rem",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    {value.toLocaleString("es-MX")}
                  </div>
                  <div
                    style={{
                      display: "none",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{ display: "flex", alignItems: "flex-start" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "8px",
                            background:
                              delta < 0
                                ? "#C0F2C8"
                                : delta === 0
                                ? "#ADBACC"
                                : delta > 0
                                ? "#FFC7CD"
                                : "",
                          }}
                        >
                          {delta < 0 ? (
                            <>
                              {" "}
                              <img
                                src={"../../sampleData/arrow2.svg"}
                                alt="Descripción de la imagen"
                              />
                            </>
                          ) : delta === 0 ? (
                            <>
                              <img
                                src={"../../sampleData/arrow1.svg"}
                                alt="Descripción de la imagen"
                              />
                            </>
                          ) : delta > 0 ? (
                            <>
                              {" "}
                              <img
                                src={"../../sampleData/arrow3.svg"}
                                alt="Descripción de la imagen"
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          color:
                            delta < 0
                              ? "#31B648"
                              : delta === 0
                              ? "#313A49"
                              : delta > 0
                              ? "#F93448"
                              : "",
                          // fontFamily: "DM Sans",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                        {delta > 0 ? "+" + delta : delta}
                      </div>
                      <div
                        style={{
                          color: "var(--gray-6, #868E96)",
                          // fontFamily: "DM Sans",
                          fontSize: "0.75rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                        Desde ayer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <hr style={{borderBottom:'1px solid #CACACA'}} /> */}
        </div>
        <div
          className="drawerAlertsDescargar"
          style={{ width: "100%", height: "max-content", backgroundColor: "" }}
        >
          <div
            style={{
              display: "flex",
              padding: "0px 30px",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "0.563rem",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "155%",
                }}
              >
                TABLA
              </div>
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "DM Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "155%",
                }}
              >
                ENFRIADORES
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: 350,
              }}
            >
              <div style={{ marginLeft: "auto" }}>
                <ExportToExcel
                  datos={filterCoolersDataDownload(coolersData)}
                  nombre={"Enfriadores_" + selectedAlgorithm}
                  body={body}
                  component="coolers"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="drawers_principal">
          <section className="drawers_table">
            <table>
              <thead>
                <tr>
                  <th scope="col">SERIE</th>
                  <th scope="col">MODELO</th>
                  <th scope="col">DIAS SIN VISITA</th>
                  <th scope="col">CONTROL DE ACTIVOS</th>
                  <th scope="col">ACCIONES</th>
                </tr>
              </thead>
              {coolersData != undefined ? (
                <tbody>
                  {coolersData.map((cooler, index) => (
                    <tr
                      key={index}
                      // onClick={() => {
                      //   navigate(`/home/clt/${cooler.serial_number}`);
                      // }}
                    >
                      <td data-label="SERIE" title={cooler.serial_number}>
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : cooler.serial_number === "" ||
                          cooler.serial_number === null ||
                          cooler.serial_number === undefined ? (
                          "Sin registro"
                        ) : (
                          cooler.serial_number
                        )}
                      </td>
                      <td data-label="Modelo" title={cooler.model_id}>
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : cooler.model_id === "" ||
                          cooler.model_id === null ||
                          cooler.model_id === undefined ? (
                          "Sin registro"
                        ) : (
                          cooler.model_id
                        )}
                      </td>
                      <td
                        data-label="DIAS SIN VISITA"
                        title={
                          cooler.days_without_visit === null ||
                          cooler.days_without_visit === undefined
                            ? "Sin registro"
                            : cooler.days_without_visit
                        }
                      >
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : cooler.serial_number === "" ||
                          cooler.serial_number === null ||
                          cooler.serial_number === undefined ? (
                          "Sin registro"
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              padding: "4px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "2px",
                              background: "#D4DAE3",
                              width: "80px",
                            }}
                          >
                            <div
                              style={{
                                color: "#313A49",
                                // fontFamily: "Space Mono",
                                fontSize: "10px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "14px",
                              }}
                            >
                              {cooler.days_without_visit === undefined ||
                              cooler.days_without_visit === null
                                ? "Sin registro"
                                : cooler.days_without_visit + " " + "DÍAS"}
                            </div>
                          </div>
                        )}
                      </td>
                      <td data-label="PRIORIDAD" title="Prioridad">
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : cooler.actionable === "" ||
                          cooler.actionable === null ||
                          cooler.actionable === undefined ? (
                          "Sin registro"
                        ) : (
                          <>
                            <div
                              style={{
                                width: "fit-content",
                                display: "flex",
                                padding: "4px",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "2px",
                                border:
                                  cooler.actionable === "Visita PdV" &&
                                  dto != "KOF Colombia"
                                    ? "1.5px solid #DA7E05"
                                    : cooler.actionable === "Sin Riesgo" ||
                                      cooler.actionable === "SIN RIESGO"
                                    ? "1.5px solid #40C057"
                                    : cooler.actionable ===
                                        "Estatus sin venta" ||
                                      cooler.actionable === "SIN VENTA" ||
                                      cooler.actionable ===
                                        "Acciones urgentes" ||
                                      cooler.actionable === "SIN COINCIDENCIA"
                                    ? "1.5px solid #FA5252"
                                    : cooler.actionable === "Actualizar Info"
                                    ? "1.5px solid #DA7E05"
                                    : cooler.actionable === "Actualizar dato" ||
                                      cooler.actionable === "Datos faltantes" ||
                                      cooler.actionable === "Monitoreo" ||
                                      cooler.actionable === "Movimiento"
                                    ? "1.5px solid #1864AB"
                                    : cooler.actionable ===
                                        "Solicitar serv. correctivo" ||
                                      cooler.actionable ===
                                        "Solicitar serv. preventivos" ||
                                      cooler.actionable ===
                                        "Seguimiento a equipo" ||
                                      cooler.actionable === "Visita PdV" ||
                                      cooler.actionable ===
                                        "VISITA PDV PARA LECTURA"
                                    ? "1.5px solid #E67700"
                                    : cooler.actionable ===
                                      "Visita PdV prioritaria"
                                    ? "1.5px solid #C92A2A"
                                    : "1.5px solid black",
                                background: "#FFF",
                              }}
                            >
                              {/* {cooler.actionable === "Visita PdV" &&
                              dto != "KOF Colombia" ? (
                                <img
                                  src={"../../sampleData/p.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "12px", height: "12px" }}
                                />
                              ) : cooler.actionable === "Sin Riesgo" ||
                                cooler.actionable === "SIN RIESGO" ? (
                                <img
                                  src={"../../sampleData/sn.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "12px", height: "12px" }}
                                />
                              ) : cooler.actionable === "Estatus sin venta" ||
                                cooler.actionable === "SIN VENTA" ||
                                cooler.actionable === "Acciones urgentes" ||
                                cooler.actionable === "SIN COINCIDENCIA" ? (
                                <img
                                  src={"../../sampleData/a.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "12px", height: "12px" }}
                                />
                              ) : cooler.actionable === "Actualizar Info" ? (
                                <img
                                  src={"../../sampleData/p.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "12px", height: "12px" }}
                                />
                              ) : cooler.actionable === "Actualizar dato" ? (
                                <img
                                  src={"../../sampleData/actDat.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable === "Datos faltantes" ? (
                                <img
                                  src={"../../sampleData/datFal.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable === "Monitoreo" ? (
                                <img
                                  src={"../../sampleData/Mont.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable === "Movimiento" ? (
                                <img
                                  src={"../../sampleData/mov1.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable ===
                                  "Solicitar serv. correctivo" ||
                                cooler.actionable ===
                                  "Solicitar serv. preventivos" ? (
                                <img
                                  src={"../../sampleData/serCP.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable ===
                                "Seguimiento a equipo" ? (
                                <img
                                  src={"../../sampleData/seguE.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable === "Visita PdV" ||
                                cooler.actionable ===
                                  "VISITA PDV PARA LECTURA" ? (
                                <img
                                  src={"../../sampleData/visitap.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : cooler.actionable ===
                                "Visita PdV prioritaria" ? (
                                <img
                                  src={"../../sampleData/visitapd.svg"}
                                  alt="Descripción de la imagen"
                                  style={{ width: "15px", height: "15px" }}
                                />
                              ) : (
                                ""
                              )} */}

                              <div
                                title={cooler.actionable}
                                style={{
                                  maxWidth: "95px", // Ajusta según sea necesario
                                  color:
                                    cooler.actionable === "Visita PdV" &&
                                    dto != "KOF Colombia"
                                      ? "#DA7E05"
                                      : cooler.actionable === "Sin Riesgo" ||
                                        cooler.actionable === "SIN RIESGO"
                                      ? "#40C057"
                                      : cooler.actionable ===
                                          "Estatus sin venta" ||
                                        cooler.actionable === "SIN VENTA" ||
                                        cooler.actionable ===
                                          "Acciones urgentes" ||
                                        cooler.actionable === "SIN VENTA" ||
                                        cooler.actionable === "SIN COINCIDENCIA"
                                      ? "#FA5252"
                                      : cooler.actionable === "Actualizar Info"
                                      ? "#DA7E05"
                                      : cooler.actionable ===
                                          "Actualizar dato" ||
                                        cooler.actionable ===
                                          "Datos faltantes" ||
                                        cooler.actionable === "Monitoreo" ||
                                        cooler.actionable === "Movimiento"
                                      ? "#1864AB"
                                      : cooler.actionable ===
                                          "Solicitar serv. correctivo" ||
                                        cooler.actionable ===
                                          "Solicitar serv. preventivos" ||
                                        cooler.actionable ===
                                          "Seguimiento a equipo" ||
                                        cooler.actionable === "Visita PdV" ||
                                        cooler.actionable ===
                                          "VISITA PDV PARA LECTURA"
                                      ? "#E67700"
                                      : cooler.actionable ===
                                        "Visita PdV prioritaria"
                                      ? "#C92A2A"
                                      : "black",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "14px",
                                  whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
                                  overflow: "hidden", // Oculta el texto que se desborda del contenedor
                                  textOverflow: "ellipsis", // Añade "..." al final del texto que se desborda
                                }}
                              >
                                {cooler.actionable}
                              </div>
                            </div>
                          </>
                        )}
                      </td>

                      <td data-label="Acciones">
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : (
                          <Link
                            to={`/home/clt/${cooler.serial_number}`}
                            target="_blank"
                          >
                            <div
                              style={{
                                color: "#3E83FF",
                                fontSize: "0.8rem",
                                fontStyle: "normal",
                                fontWeight: 400,
                                display: "flex",
                                cursor: "pointer",
                              }}
                            >
                              Ver más
                              <IconArrowRight
                                style={{
                                  color: "#3E83FF",
                                  width: "1.0rem",
                                }}
                              />
                            </div>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : isLoading == true ? (
                <tbody>{isloadingData()}</tbody>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  <p>Sin información para mostrar.</p>
                </div>
              )}
            </table>
          </section>
          <section className="drawer_pagination">
            <PaginationComponent
              accion={setCurrentPage}
              totalDatos={totalData}
              datosPorPagina={datosPorPagina}
              numero={setNumero}
            />
          </section>
        </div>
      </section>
    </Drawer>
  );
}
