import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import MapComponentPv from "../mapPv/MapPv";
import { Table } from "@mantine/core";
import { Drawer, Button } from "@mantine/core";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { fetchCoolers, fetchUniversal } from "../../utils/apiUtils";
import { CoolerInterface } from "../../interfaces/CoolerInterface";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { ExportToExcel } from "../exportExcel/ExportToExcel";
import { TextInput, Skeleton } from "@mantine/core";

export default function DrawerO({ opened, onClose, outletDetails }) {
  const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
  } = outletDetails;
  const lastReadDate = new Date(last_read);
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filterOutlets = (data, searchQuery) => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery.toLowerCase();
      const coolerSerial = item.serial_number.toLowerCase();
      const coolerId = item.device_id.toLowerCase();
      return (
        coolerSerial.includes(searchString) || coolerId.includes(searchString)
      );
    });
    return filteredData;
  };
  const body = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED", "OWNED"],
    path: pathVerify(),
    page_size: num_coolers,
    page_number: 1,
    outlet_id: outlet_id,
  };
  const fetchData = async () => {
    try {
      // const data = await fetchCoolers(pathVerify(), null, outlet_id);
      const data = await fetchUniversal("coolers", body, setIsLoading);
      setCoolersData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  const filteredCoolers = coolersData
    ? filterOutlets(coolersData, searchValue)
    : [];
  useEffect(() => {
    fetchData();
  }, [dt, opened]);

  const inputState = () => {
    if (coolersData === null) {
      return 0;
    } else {
      return coolersData.length;
    }
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
  // console.log(filteredCoolers);
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
            gap: "10px",
          }}
        >
          {/* 2 */}
          <div
            style={{
              display: "flex",
              padding: "0px 32px",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              background: "#FFF",
            }}
          >
            <img
              onClick={onClose}
              src={"../../sampleData/pv2.svg"}
              alt="Descripción de la imagen"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
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
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    {outlet_name}
                  </div>
                </div>

                {outlet_address === undefined ||
                outlet_address === "" ||
                outlet_address === null ? (
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "12px",
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
                    // fontFamily: "DM Sans",
                    fontSize: "11px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Leído por última vez el:
                </div>
                {last_read === undefined ||
                last_read === "" ||
                last_read === null ? (
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "11px",
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
                        color: "#000005",
                        // fontFamily: "Inter",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      {lastReadDate.toLocaleDateString("es-MX", {
                        timeZone: "UTC",
                      })}
                    </div>
                  </>
                )}
                &nbsp;
                {days_without_visitC === undefined ||
                days_without_visitC === "" ||
                days_without_visitC === null ? (
                  ""
                ) : (
                  <>
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
                          fontSize: "10px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "12px",
                          height: "10px",
                        }}
                      >
                        {`${days_without_visitC} días sin visita`}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* 3 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "3px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "18px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "9px",
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
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "2px",
                    background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "#313A49",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    {channel === undefined ||
                    channel === "" ||
                    channel === null ? (
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Mono",
                          fontSize: "9px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        Sin registro
                      </div>
                    ) : (
                      `${channel}`
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "22px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "9px",
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
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "2px",
                    background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "#313A49",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    {region === undefined ||
                    region === "" ||
                    region === null ? (
                      <div
                        style={{
                          color: "#88888B",
                          fontSize: "9px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        Sin registro
                      </div>
                    ) : (
                      `${region}`
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "22px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "9px",
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
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "2px",
                    background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "#313A49",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    {route === undefined || route === "" || route === null
                      ? "Sin registros"
                      : `${route}`}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "22px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "9px",
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
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "2px",
                    background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "#313A49",
                      // fontFamily: "DM Mono",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    {zone === undefined || zone === "" || zone === null
                      ? "Sin registros"
                      : `${zone}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{ width: "100%", height: "1px", background: "#CACACA" }}
            ></div>
            <div
              style={{
                display: "flex",
                padding: "0px 64px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                alignSelf: "stretch",
              }}
            >
              {/* Map */}
              <div
                style={{
                  display: "flex",
                  height: "180px",
                  padding: "10px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #88888B",
                  background: "#FFF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                  }}
                >
                  <img
                    src={"../../sampleData/map.png"}
                    alt="Descripción de la imagen"
                    style={{ marginRight: 490 }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <MapComponentPv latitude={latitude} longitude={longitude} />
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
                        src={"../../sampleData/mappv.svg"}
                        width={"15px"}
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
                        width={"15px"}
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
                            width: "8px", // Ancho de cada bloque
                            height: "3px",
                            background: "#ED5079",
                          }}
                        ></div>
                        &nbsp;
                        <div
                          style={{
                            width: "8px", // Ancho de cada bloque
                            height: "3px",
                            background: "#ED5079",
                          }}
                        ></div>
                        &nbsp;
                        <div
                          style={{
                            width: "8px", // Ancho de cada bloque
                            height: "3px",
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
                </div>
              </div>
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
                  fontSize: "10px",
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
                  fontSize: "12px",
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
                  datos={coolersData}
                  nombre={"Enfriadores_Puntos_de_Venta"}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px 24px",
            }}
          >
            <section
              style={{
                visibility: inputState() > 1 ? "visible" : "hidden",
              }}
            >
              <TextInput
                placeholder="Busca por Serie o Modelo"
                value={searchValue}
                onChange={handleSearchChange}
                type="text"
                style={{ width: "330%" }}
              />
            </section>
            <section style={{ marginTop: -30 }}>
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
                {filteredCoolers != undefined ? (
                  <tbody>
                    {filteredCoolers
                      .slice(firstIndex, lastIndex)
                      .map((cooler, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            navigate(`/home/clt/${cooler.serial_number}`);
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
                                  width: "fit-content",
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
                                    width: "fit-content",
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
                                            "Estatus sin venta" ||
                                          cooler.actionable ===
                                            "Acciones urgentes"
                                        ? "1.5px solid #F93448"
                                        : cooler.actionable ===
                                          "Actualizar Info"
                                        ? "1.5px solid #DA7E05"
                                        : "1.5px solid black",
                                    background: "#FFF",
                                    textOverflow: "ellipsis",
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
                                      "Estatus sin venta" ||
                                    cooler.actionable ===
                                      "Acciones urgentes" ? (
                                    <img
                                      src={"../../sampleData/a.svg"}
                                      alt="Descripción de la imagen"
                                      style={{ width: "12px", height: "12px" }}
                                    />
                                  ) : cooler.actionable ===
                                    "Actualizar Info" ? (
                                    <img
                                      src={"../../sampleData/p.svg"}
                                      alt="Descripción de la imagen"
                                      style={{ width: "12px", height: "12px" }}
                                    />
                                  ) : (
                                    ""
                                  )}

                                  <div
                                    title={cooler.actionable}
                                    style={{
                                      color:
                                        cooler.actionable === "Visita PdV"
                                          ? "#DA7E05"
                                          : cooler.actionable === "Sin Riesgo"
                                          ? "#0F9F67"
                                          : cooler.actionable ===
                                              "Estatus sin venta" ||
                                            cooler.actionable ===
                                              "Acciones urgentes"
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
                                      ? "Visita PdV.."
                                      : cooler.actionable === "Sin Riesgo"
                                      ? "Sin Riesgo"
                                      : cooler.actionable ===
                                        "Estatus sin venta"
                                      ? "Estat sin v..."
                                      : cooler.actionable ===
                                        "Acciones urgentes"
                                      ? "Acciones urg.."
                                      : cooler.actionable === "Actualizar Info"
                                      ? "Actualizar inf..."
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
                              <Link to="/home/clt">
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
              <PaginationComponent
                accion={setCurrentPage}
                totalDatos={inputState()}
                datosPorPagina={datosPorPagina}
                numero={setNumero}
              />
            </section>
          </div>
        </div>
      </>
    </Drawer>
  );
}
