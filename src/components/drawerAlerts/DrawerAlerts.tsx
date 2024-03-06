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
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  opened == false ? (value = 0) : "";
  const body = {
    customer: dto,
    class: level === "INDICATOR" ? "ASSET_MANAGEMENT_ACTIONABLE" : "OPE",
    algorithm: [selectedAlgorithm],
    path: pathVerify(),
    page_size: Number(value),
    page_number: currentPage,
  };
  // console.log(level);
  // console.log(selectedAlgorithm);
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("coolers", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("content-length");
      setTotalData(Number(totalData) || 0);
      setCoolersData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setCoolersData(undefined)
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    value != 0 ? fetchData() : "";
  }, [dt, datosPorPagina, opened]);

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
  totalData === undefined ? 0 : totalData;
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title=""
      position="right"
      size="40rem"
    >
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          {/* 2 */}
          <div
            style={{
              display: "flex",
              padding: "0px 30px",
              alignItems: "center",
              gap: "30px",
              alignSelf: "stretch",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "2px",
                    alignItems: "center",
                    gap: "10px",
                    borderRadius: "4px",
                    background: selectedAlgorithm.endsWith("ALERT")
                      ? "#FEF5C7"
                      : selectedAlgorithm.endsWith("FAIL")
                      ? "#FFC7CD"
                      : selectedAlgorithm === "Actualizar Info"
                      ? "#FEF5C7"
                      : selectedAlgorithm === "Sin Riesgo"
                      ? "#C0F2C8"
                      : selectedAlgorithm === "Toma de Decisiones"
                      ? "#FFC7CD"
                      : selectedAlgorithm === "Visita PdV"
                      ? "#FEF5C7"
                      : "",
                  }}
                >
                  {selectedAlgorithm ===
                  "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ? (
                    <>
                      <img
                        src={"../../sampleData/comp.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "44px", height: "44px" }}
                      />
                    </>
                  ) : selectedAlgorithm === "DISCONNECTION_ALERT" ? (
                    <>
                      {" "}
                      <img
                        src={"../../sampleData/desc.svg"}
                        alt="Descripción de la imagen"
                        style={{ width: "44px", height: "44px" }}
                      />
                    </>
                  ) : selectedAlgorithm === "HIGH_TEMPERATURE_ALERT" ? (
                    <img
                      src={"../../sampleData/alt.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "COMPRESSOR_FAIL" ||
                    selectedAlgorithm === "FREEZING_FAIL" ? (
                    <img
                      src={"../../sampleData/failc.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "TEMPERATURE_FAIL" ? (
                    <img
                      src={"../../sampleData/failt.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "MOVED_VISIT_ALERT" ? (
                    <img
                      src={"../../sampleData/mov.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "LOW_VOLTAGE_ALERT" ? (
                    <img
                      src={"../../sampleData/bajv.svg   "}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "VOLTAGE_FAIL" ? (
                    <img
                      src={"../../sampleData/faile.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "HIGH_VOLTAGE_ALERT" ? (
                    <img
                      src={"../../sampleData/altv.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "Actualizar Info" ? (
                    <img
                      src={"../../sampleData/reqa.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "Sin Riesgo" ? (
                    <img
                      src={"../../sampleData/sinr.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "Toma de Decisiones" ? (
                    <img
                      src={"../../sampleData/accio.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : selectedAlgorithm === "Visita PdV" ? (
                    <img
                      src={"../../sampleData/vp.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
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
                    background: selectedAlgorithm.endsWith("ALERT")
                      ? "#FEF5C7"
                      : selectedAlgorithm.endsWith("FAIL")
                      ? "#FFC7CD"
                      : "#BCDAFF",
                    height: 8,
                  }}
                >
                  {selectedAlgorithm.endsWith("ALERT") ? (
                    <img
                      src={"../../sampleData/alert.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "16px", height: "16px" }}
                    />
                  ) : selectedAlgorithm.endsWith("FAIL") ? (
                    <img
                      src={"../../sampleData/fail1.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "16px", height: "16px" }}
                    />
                  ) : (
                    <img
                      src={"../../sampleData/act.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "16px", height: "16px" }}
                    />
                  )}

                  <div
                    style={{
                      color: "#451C03",
                      // fontFamily: "Space Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                    }}
                  >
                    {selectedAlgorithm.endsWith("ALERT")
                      ? "ALERTA"
                      : selectedAlgorithm.endsWith("FAIL")
                      ? "FALLA"
                      : "CONTROL DE ACTIVOS"}
                  </div>
                </div>
                <div
                  style={{
                    color: "#000",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}
                >
                  {selectedAlgorithm && (
                    <div>
                      {selectedAlgorithm ===
                      "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                        ? "Alta demanda del compresor"
                        : selectedAlgorithm === "DISCONNECTION_ALERT"
                        ? "Desconexión"
                        : selectedAlgorithm === "HIGH_TEMPERATURE_ALERT"
                        ? "Alta temperatura"
                        : selectedAlgorithm === "HIGH_VOLTAGE_ALERT"
                        ? "Alto voltaje"
                        : selectedAlgorithm === "LOW_VOLTAGE_ALERT"
                        ? "Bajo voltaje"
                        : selectedAlgorithm === "TEMPERATURE_FAIL"
                        ? "Alta temperatura"
                        : selectedAlgorithm === "VOLTAGE_FAIL"
                        ? "Posible daño eléctrico"
                        : selectedAlgorithm === "COMPRESSOR_FAIL"
                        ? "Falla asociada al compresor"
                        : selectedAlgorithm === "FREEZING_FAIL"
                        ? "Evaporador bloqueado"
                        : selectedAlgorithm === "Actualizar Info"
                        ? "Requiere actualizar información"
                        : selectedAlgorithm === "Sin Riesgo"
                        ? "Sin riesgo"
                        : selectedAlgorithm === "Toma de Decisiones"
                        ? "Acciones urgentes"
                        : selectedAlgorithm === "Visita PdV"
                        ? "Visita punto de venta"
                        : selectedAlgorithm}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "265px",
                padding: "8px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "8px",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",
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
                    fontSize: "26px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {value.toLocaleString()}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
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
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      desde ayer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "4px 0px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{ width: "100%", height: "1px", background: "#CACACA" }}
            ></div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "0px 64px",
            justifyContent: "space-between",
            alignItems: "center",
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
                fontSize: "12px",
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
                fontSize: "14px",
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
                nombre={
                  "Enfriadores_" +
                  (selectedAlgorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                    ? "Alta demanda del compresor"
                    : selectedAlgorithm === "DISCONNECTION_ALERT"
                    ? "Desconexión"
                    : selectedAlgorithm === "HIGH_TEMPERATURE_ALERT"
                    ? "Alta temperatura"
                    : selectedAlgorithm === "HIGH_VOLTAGE_ALERT"
                    ? "Alto voltaje"
                    : selectedAlgorithm === "LOW_VOLTAGE_ALERT"
                    ? "Bajo voltaje"
                    : selectedAlgorithm === "DISCONNECTIONS_FAIL"
                    ? "Desconexión"
                    : selectedAlgorithm === "TEMPERATURE_FAIL"
                    ? "Falla de temperatura"
                    : selectedAlgorithm === "VOLTAGE_FAIL"
                    ? "Falla de voltaje"
                    : selectedAlgorithm === "COMPRESSOR_FAIL"
                    ? "Falla asociada al compresor"
                    : selectedAlgorithm)
                }
              />
            </div>
          </div>
        </div>
        <br></br>
        <div className="drawers_principal">
          <section className="drawers_table">
            <table>
              <thead>
                <tr>
                  <th scope="col">ESTATUS</th>
                  <th scope="col">SERIE</th>
                  <th scope="col">MODELO</th>
                  <th scope="col">DIAS SIN VISITA</th>
                  <th scope="col">CONTROL DE ACTIVOS</th>
                  <th scope="col">ACCIONES</th>
                </tr>
              </thead>
              {coolersData != undefined ? (
                <tbody>
                  {coolersData
                    .slice(firstIndex, lastIndex)
                    .map((cooler, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          navigate(
                            `/home/coolerDetail/${cooler.serial_number}`
                          );
                        }}
                      >
                        <td data-label="ESTATUS" title={cooler.status}>
                          {isLoading == true ? (
                            <>
                              <Skeleton height={20} radius="sm" width="90%" />
                            </>
                          ) : cooler.status === "" ||
                            cooler.status === null ||
                            cooler.status === undefined ? (
                            "Sin registro"
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                padding: "4px",
                                // justifyContent: "center",
                                alignItems: "center",
                                gap: "4px",
                                borderRadius: "2px",
                                background:
                                  cooler?.status === "EN FALLA"
                                    ? "#FFC7CD"
                                    : cooler?.status ===
                                      "FUNCIONANDO CORRECTAMENTE"
                                    ? "#DFF9E3"
                                    : cooler?.status ===
                                      "FUNCIONANDO CON ALERTA"
                                    ? "#FEF5C7"
                                    : "#D4DAE3",
                                width:"fit-content"
                              }}
                            >
                              <div
                                style={{
                                  width: "4px",
                                  height: "4px",
                                  borderRadius: "5px",
                                  background:
                                    cooler?.status === "EN FALLA"
                                      ? "#F93448"
                                      : cooler?.status ===
                                        "FUNCIONANDO CORRECTAMENTE"
                                      ? "#31B648"
                                      : cooler?.status ===
                                        "FUNCIONANDO CON ALERTA"
                                      ? "#F6A60A"
                                      : "#808080",
                                }}
                              ></div>
                              <div
                                style={{
                                  color:
                                    cooler?.status === "EN FALLA"
                                      ? "#F93448"
                                      : cooler?.status ===
                                        "FUNCIONANDO CORRECTAMENTE"
                                      ? "#1D5E29"
                                      : cooler?.status ===
                                        "FUNCIONANDO CON ALERTA"
                                      ? "#451C03"
                                      : "black",
                                  // fontFamily: "Space Mono",
                                  fontSize: "8px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "14px",
                                }}
                              >
                                {cooler.status}
                              </div>
                            </div>
                          )}
                        </td>
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
                                  width:"fit-content",
                                  display: "flex",
                                  padding: "4px",
                                  // justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "2px",
                                  border:
                                    cooler.actionable === "Visita PdV"
                                      ? "1.5px solid #DA7E05"
                                      : cooler.actionable === "Sin Riesgo"
                                      ? "1.5px solid #0F9F67"
                                      : cooler.actionable ===
                                        "Toma de Decisiones"
                                      ? "1.5px solid #F93448"
                                      : cooler.actionable === "Actualizar Info"
                                      ? "1.5px solid #DA7E05"
                                      : "1.5px solid black",
                                  background: "#FFF",
                                  textOverflow:"ellipsis"
                                }}
                              >
                                {cooler.actionable === "Visita PdV" ? (
                                  <img
                                    src={"../../sampleData/p.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "12px", height: "12px" }}
                                  />
                                ) : cooler.actionable === "Sin Riesgo" ? (
                                  <img
                                    src={"../../sampleData/sn.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "12px", height: "12px" }}
                                  />
                                ) : cooler.actionable ===
                                  "Toma de Decisiones" ? (
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
                                ) : (
                                  ""
                                )}

                                <div
                                title={cooler.actionable === "Visita PdV"
                                ? "Visita punto de venta"
                                : cooler.actionable === "Sin Riesgo"
                                ? "Sin riesgo"
                                : cooler.actionable === "Toma de Decisiones"
                                ? "Acciones urgentes"
                                : cooler.actionable === "Actualizar Info"
                                ? "Requiere actualización"
                                : cooler.actionable}
                                  style={{
                                    color:
                                      cooler.actionable === "Visita PdV"
                                        ? "#DA7E05"
                                        : cooler.actionable === "Sin Riesgo"
                                        ? "#0F9F67"
                                        : cooler.actionable ===
                                          "Toma de Decisiones"
                                        ? "#F93448"
                                        : cooler.actionable ===
                                          "Actualizar Info"
                                        ? "#DA7E05"
                                        : "black",
                                    // fontFamily: "DM Sans",
                                    fontSize: ".7vw",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "14px",
                                  }}
                                >
                                  {cooler.actionable === "Visita PdV"
                                    ? "Visita punt.."
                                    : cooler.actionable === "Sin Riesgo"
                                    ? "Sin riesgo"
                                    : cooler.actionable === "Toma de Decisiones"
                                    ? "Acciones urg.."
                                    : cooler.actionable === "Actualizar Info"
                                    ? "Requiere ac..."
                                    : cooler.actionable}
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
                            <Link to="/home/coolerDetail">
                              <div
                                style={{
                                  color: "#3E83FF",
                                  fontSize: "0.8rem",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  // lineHeight: "20px",
                                  display: "flex",
                                  // marginLeft: "50px",
                                  // marginRight: "50px",
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
              totalDatos={coolersData?.length}
              datosPorPagina={datosPorPagina}
              numero={setNumero}
            />
          </section>
        </div>
      </>
    </Drawer>
  );
}
