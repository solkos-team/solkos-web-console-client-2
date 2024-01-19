import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { PaginationComponent } from "../Pagination/PaginationComponent";

import { ExportToExcel } from "../exportExcel/ExportToExcel";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { flushSync } from "react-dom";
import { fetchCoolersDrawer, fetchUniversal } from "../../utils/apiUtils";
import { CoolerInterface } from "../drawerOutlets/CoolerInterface";
import { SkeletonTableInsights } from "../skeletonTableInsights/SkeletonTableInsights";

export default function DrawerA({
  isOpen,
  onClose,
  selectedAlgorithm,
  value,
  delta,
}) {
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const [coolersData, setCoolersData] = useState<CoolerInterface[] | null>(
    null
  );
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = {
    customer: dto,
    class: "OPE",
    algorithm: [selectedAlgorithm],
    path: pathVerify(),
    page_size: Number(value),
    page_number: 1,
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUniversal("coolers", body);
      console.log(data);
      setCoolersData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt]);

  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div
      ref={drawerRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "700px",
        backgroundColor: "#FFF",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        transform: `translateX(${isOpen ? "0" : "100%"})`,
        transition: "transform 0.3s ease-in-out",
        padding: "10px",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "27px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            alignItems: "flex-start",
            gap: "10px",
            alignSelf: "stretch",
          }}
        >
          <img
            onClick={onClose}
            src={"../../sampleData/arrowsDes.png"}
            alt="Descripción de la imagen"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </div>
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
                    : selectedAlgorithm.endsWith("ALERT")
                    ? "#FFC7CD"
                    : "#BCDAFF",
                }}
              >
                {selectedAlgorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ? (
                  <>
                    <img
                      src={"../../sampleData/devices_2.png"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  </>
                ) : selectedAlgorithm === "DISCONNECTION_ALERT" ? (
                  <>
                    {" "}
                    <img
                      src={"../../sampleData/disconnection.png"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  </>
                ) : selectedAlgorithm === "HIGH_TEMPERATURE_ALERT" ? (
                  <img
                    src={"../../sampleData/weather.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : selectedAlgorithm === "COMPRESSOR_FAIL" ? (
                  <img
                    src={"../../sampleData/compressor2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : selectedAlgorithm === "TEMPERATURE_FAIL" ? (
                  <img
                    src={"../../sampleData/weather2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : selectedAlgorithm === "MOVED_VISIT_ALERT" ? (
                  <img
                    src={"../../sampleData/devices_2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : selectedAlgorithm === "HIGH_VOLTAGE_ALERT" ||
                  selectedAlgorithm === "LOW_VOLTAGE_ALERT" ? (
                  <img
                    src={"../../sampleData/devices_2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : (
                  <img
                    src={"../../sampleData/indc2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
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
                    src={"../../sampleData/alert_y.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                ) : selectedAlgorithm.endsWith("FAIL") ? (
                  <img
                    src={"../../sampleData/fails2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                ) : (
                  <img
                    src={"../../sampleData/indc2.png"}
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
                    : "INDICADOR"}
                </div>
              </div>
              <div
                style={{
                  color: "#000",
                  // fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                {selectedAlgorithm && (
                  <div>
                    {selectedAlgorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
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
                      : selectedAlgorithm === "MOVED_VISIT_ALERT"
                      ? "Movimiento"
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
                            src={"../../sampleData/arrow_gr.png"}
                            alt="Descripción de la imagen"
                          />
                        </>
                      ) : delta === 0 ? (
                        <>
                          <img
                            src={"../../sampleData/arrow_3.png"}
                            alt="Descripción de la imagen"
                          />
                        </>
                      ) : delta > 0 ? (
                        <>
                          {" "}
                          <img
                            src={"../../sampleData/arrow_4.png"}
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
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
          padding: "0px 24px",
        }}
      >
        <Card>
          <Table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              maxWidth: "1000px",
              height: "20rem",
            }}
          >
            <TableHead style={{ display: "block" }}>
              <TableRow>
                <TableHeaderCell
                  style={{
                    fontSize: ".84rem",
                    textAlign: "left",
                    width: "6.2rem",
                  }}
                >
                  Estatus
                </TableHeaderCell>
                <TableHeaderCell
                  style={{
                    fontSize: ".84rem",
                    textAlign: "left",
                    paddingLeft: 30,
                    width: "7rem",
                  }}
                >
                  Serie
                </TableHeaderCell>
                <TableHeaderCell
                  style={{
                    fontSize: ".84rem",
                    textAlign: "left",
                    width: "9rem",
                  }}
                >
                  Modelo
                </TableHeaderCell>
                <TableHeaderCell
                  style={{
                    fontSize: ".84rem",
                    textAlign: "left",
                    width: "9rem",
                  }}
                >
                  Dias sin visita
                </TableHeaderCell>
                <TableHeaderCell
                  style={{
                    fontSize: ".84rem",
                    textAlign: "left",
                    width: "6rem",
                  }}
                >
                  Prioridad
                </TableHeaderCell>
                <TableHeaderCell
                  style={{
                    fontSize: ".84rem",
                    textAlign: "left",
                    width: "8rem",
                  }}
                >
                  Acciones
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            {isLoading == true ? (
              <>
                <br></br>
                <br></br>
                <div style={{ marginBottom: -10 }}></div>
                <SkeletonTableInsights></SkeletonTableInsights>
              </>
            ) : (
              ""
            )}

            <TableBody
              style={{ display: "block", height: "90%", overflowY: "auto" }}
            >
              {coolersData &&
                coolersData
                  .slice(
                    (currentPage - 1) * datosPorPagina,
                    currentPage * datosPorPagina
                  )
                  .map((cooler) => (
                    <TableRow
                      key={cooler.serial_number}
                      className="Tabla"
                      onClick={() => {
                        navigate(`/coolerDetail/${cooler.serial_number}`);
                      }}
                    >
                      <TableCell
                        style={{
                          paddingRight: "30px",
                          textAlign: "left",
                          width: "100px",
                        }}
                      >
                        {cooler.status == undefined || cooler.status == null ? (
                          <div style={{ fontSize: 13 }}>Sin registro</div>
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
                                  fontSize: "8px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "14px",
                                }}
                              >
                                {cooler.status}
                              </div>
                            </div>
                          </>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".74rem",
                          textAlign: "left",
                          width: "6.5rem",
                        }}
                      >
                        {cooler.serial_number}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".74rem",
                          textAlign: "left",
                          width: "9rem",
                        }}
                      >
                        {cooler.model_id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".74rem",
                          textAlign: "left",
                          width: "9rem",
                        }}
                      >
                        {cooler.days_without_visit == undefined ||
                        cooler.days_without_visit == "" ? (
                          "Sin registro"
                        ) : (
                          <>
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
                                {" "}
                                {`${cooler.days_without_visit} DÍAS`}
                              </div>
                            </div>
                          </>
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "5rem",
                        }}
                      >
                        <div style={{ fontSize: 12 }}>Sin registro</div>
                        {/* {cooler.priority === undefined ||
                        cooler.priority === null ? (
                          "Sin registros"
                        ) : (
                          <>
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
                                width: "3rem",
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
                                {cooler.priority}
                              </div>
                            </div>
                          </>
                        )} */}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".74rem",
                          textAlign: "left",
                          width: "9rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "4px",
                            flex: 100,
                            height: "40px",
                          }}
                        >
                          <Link to="/coolerDetail">
                            <div
                              style={{
                                color: "#3E83FF",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "20px",
                                display: "flex",
                                marginRight: "30px",
                              }}
                            >
                              Ver más{" "}
                              <IconArrowRight
                                style={{
                                  color: "#3E83FF",
                                  width: "1.0rem",
                                }}
                              />
                            </div>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <PaginationComponent
            accion={setCurrentPage}
            totalDatos={coolersData?.length || 0}
            datosPorPagina={datosPorPagina}
            numero={setNumero}
          />
        </Card>
      </div>
    </div>
  );
}
