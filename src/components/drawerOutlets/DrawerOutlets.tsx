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
import { DrawerHeaderResponsive } from "../../pages/shell/outlets/DrawerHeaderResponsive";
import { MapInsightsResponsive } from "../../pages/shell/insights/Responsive/MapInsightsResponsive";
import { DrawerMap } from "../../pages/shell/outlets/DrawerMap";

export default function DrawerO({ opened, onClose, outletDetails }) {
  const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [opened2, setOpened] = useState(false);
  const toggleDrawer = () => setOpened((flag) => !flag);
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
      <section className="drawerOutlets_Principal">
        <section className="drawerHeader">
          <div className="drawerHeaderImg">
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
          </div>
          <div className="drawerHeaderInfo">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                // gap: "3px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",

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
          <DrawerHeaderResponsive
            title={"Prueba"}
            description={"Prueba2"}
            outletDetails={outletDetails}
          />
        </section>
        <section className="drawerBody">
          <section className="drawerMapaDescargar">
            <div className="drawerMapa">
              <div className="drawerMapa_Mapa">
                <MapComponentPv latitude={latitude} longitude={longitude} />
              </div>
              <div className="drawerMapa_Info">
                <div
                  style={{
                    display: "flex",
                    padding: "1px",
                    boxSizing: "border-box",
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
              <div className="drawerMapa_title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M13.0002 15.1667C14.7951 15.1667 16.2502 13.7116 16.2502 11.9167C16.2502 10.1217 14.7951 8.66667 13.0002 8.66667C11.2052 8.66667 9.75016 10.1217 9.75016 11.9167C9.75016 13.7116 11.2052 15.1667 13.0002 15.1667Z"
                    stroke="#313A49"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.1286 18.0451L14.532 22.6417C14.1257 23.0475 13.575 23.2755 13.0007 23.2755C12.4265 23.2755 11.8757 23.0475 11.4694 22.6417L6.87175 18.0451C5.65974 16.833 4.83436 15.2888 4.49999 13.6076C4.16563 11.9264 4.33728 10.1839 4.99325 8.60029C5.64923 7.01669 6.76006 5.66317 8.18527 4.71089C9.61049 3.7586 11.2861 3.25032 13.0002 3.25032C14.7143 3.25032 16.3898 3.7586 17.8151 4.71089C19.2403 5.66317 20.3511 7.01669 21.0071 8.60029C21.6631 10.1839 21.8347 11.9264 21.5003 13.6076C21.166 15.2888 20.3406 16.833 19.1286 18.0451Z"
                    stroke="#313A49"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h1 className="drawerMapa_title_h1">Ubicación en el mapa</h1>
              </div>
              <div className="drawerMapa_Button">
                <MapInsightsResponsive opened={toggleDrawer} />
                <DrawerMap
                  opened={opened2}
                  onClose={toggleDrawer}
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            </div>
          </section>
          <section className="drawerTablaPaginador">
            <div className="drawerTabla_Descargar">
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
            </div>
            <div className="drawerTabla_Buscador">
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
                  style={{ width: "100%", height: "100%" }}
                />
              </section>
            </div>
            <div className="drawerTabla_Tabla">
              <div className="drawerTABLA">
                <table className="table_responsive">
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
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
                                </>
                              ) : cooler.status === "" ||
                                cooler.status === null ||
                                cooler.status === undefined ? (
                                "Sin registro"
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    // justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "4px",
                                    borderRadius: "2px",
                                    background:
                                      cooler?.status ===
                                      "FUNCIONANDO CORRECTAMENTE"
                                        ? "#B2F2BB"
                                        : cooler?.status ===
                                          "FUNCIONANDO CON ALERTA"
                                        ? "#FFEC99"
                                        : cooler?.status === "EN FALLA"
                                        ? "#FFC9C9"
                                        : cooler?.status ===
                                          "EN ESPERA DE SERVICIO"
                                        ? "#C7CBD2"
                                        : cooler?.status ===
                                          "EN ESPERA DE LECTURA"
                                        ? "#A5D8FF"
                                        : cooler?.status ===
                                          "SERVICIO NO EFECTIVO"
                                        ? "#FFC9C9"
                                        : cooler?.status ===
                                          "SERVICIO IMPRODUCTIVO"
                                        ? "#FFC9C9"
                                        : cooler?.status === "SIN DATOS"
                                        ? "#C7CBD2"
                                        : "#C7CBD2",
                                    width: "fit-content",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "4px",
                                      height: "4px",
                                      borderRadius: "5px",
                                      background:
                                        cooler?.status ===
                                        "FUNCIONANDO CORRECTAMENTE"
                                          ? "#2B8A3E"
                                          : cooler?.status ===
                                            "FUNCIONANDO CON ALERTA"
                                          ? "#E67700"
                                          : cooler?.status === "EN FALLA"
                                          ? "#E03131"
                                          : cooler?.status ===
                                            "EN ESPERA DE SERVICIO"
                                          ? "#313A49"
                                          : "EN ESPERA DE LECTURA"
                                          ? "#1864AB"
                                          : cooler?.status ===
                                            "SERVICIO NO EFECTIVO"
                                          ? "#E03131"
                                          : cooler?.status ===
                                            "SERVICIO IMPRODUCTIVO"
                                          ? "#E03131"
                                          : cooler?.status === "SIN DATOS"
                                          ? "#313A49"
                                          : "#313A49",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      color:
                                        cooler?.status ===
                                        "FUNCIONANDO CORRECTAMENTE"
                                          ? "#2B8A3E"
                                          : cooler?.status ===
                                            "FUNCIONANDO CON ALERTA"
                                          ? "#E67700"
                                          : cooler?.status === "EN FALLA"
                                          ? "#E03131"
                                          : cooler?.status ===
                                            "EN ESPERA DE SERVICIO"
                                          ? "#313A49"
                                          : cooler?.status ===
                                            "EN ESPERA DE LECTURA"
                                          ? "#1864AB"
                                          : cooler?.status ===
                                            "SERVICIO NO EFECTIVO"
                                          ? "#E03131"
                                          : cooler?.status ===
                                            "SERVICIO IMPRODUCTIVO"
                                          ? "#E03131"
                                          : cooler?.status === "SIN DATOS"
                                          ? "#313A49"
                                          : "#313A49",
                                      fontSize: "8px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "14px",
                                      maxWidth: "80px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
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
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
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
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
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
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
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
                                      : cooler.days_without_visit +
                                        " " +
                                        "DÍAS"}
                                  </div>
                                </div>
                              )}
                            </td>
                            <td data-label="PRIORIDAD" title="Prioridad">
                              {isLoading ? (
                                <Skeleton height={20} radius="sm" width="90%" />
                              ) : !cooler.actionable ? (
                                "Sin registro"
                              ) : (
                                <div
                                  style={{
                                    width: "fit-content",
                                    display: "flex",
                                    padding: "4px",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "2px",
                                    border:
                                      cooler.actionable === "Visita PdV" ||
                                      cooler.actionable ===
                                        "VISITA PDV PARA LECTURA"
                                        ? "1.5px solid #DA7E05"
                                        : cooler.actionable === "Sin Riesgo" ||
                                          cooler.actionable === "SIN RIESGO"
                                        ? "1.5px solid #0F9F67"
                                        : cooler.actionable ===
                                            "Estatus sin venta" ||
                                          cooler.actionable === "SIN VENTA" ||
                                          cooler.actionable ===
                                            "Acciones urgentes" ||
                                          "SIN COINCIDENCIA "
                                        ? "1.5px solid #F93448"
                                        : cooler.actionable ===
                                          "Actualizar Info"
                                        ? "1.5px solid #DA7E05"
                                        : cooler.actionable ===
                                            "Actualizar dato" ||
                                          cooler.actionable ===
                                            "Datos faltantes" ||
                                          cooler.actionable === "Monitoreo" ||
                                          cooler.actionable === "Movimiento"
                                        ? "1.5px solid #1864AB"
                                        : cooler.actionable ===
                                            "Solicitar serv. correctivo" ||
                                          cooler.actionable ===
                                            "Solicitar serv. preventivos" ||
                                          cooler.actionable ===
                                            "Seguimiento a equipo" ||
                                          cooler.actionable === "Visita PdV"
                                        ? "1.5px solid #E67700"
                                        : cooler.actionable ===
                                          "Visita PdV prioritaria"
                                        ? "1.5px solid #C92A2A"
                                        : "1.5px solid black",
                                    background: "#FFF",
                                  }}
                                >
                                  {cooler.actionable === "Visita PdV" &&
                                  dto !== "KOF Colombia" ? (
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
                                  ) : cooler.actionable ===
                                      "Estatus sin venta" ||
                                    cooler.actionable === "SIN VENTA" ||
                                    cooler.actionable === "Acciones urgentes" ||
                                    cooler.actionable === "SIN COINCIDENCIA" ? (
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
                                  ) : cooler.actionable ===
                                    "Actualizar dato" ? (
                                    <img
                                      src={"../../sampleData/actDat.svg"}
                                      alt="Descripción de la imagen"
                                      style={{ width: "15px", height: "15px" }}
                                    />
                                  ) : cooler.actionable ===
                                    "Datos faltantes" ? (
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
                                  )}
                                  <div
                                    title={cooler.actionable}
                                    style={{
                                      maxWidth: "65px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      color:
                                        cooler.actionable === "Visita PdV" ||
                                        cooler.actionable ===
                                          "VISITA PDV PARA LECTURA"
                                          ? "#DA7E05"
                                          : cooler.actionable ===
                                              "Sin Riesgo" ||
                                            cooler.actionable === "SIN RIESGO"
                                          ? "#0F9F67"
                                          : cooler.actionable ===
                                              "Estatus sin venta" ||
                                            cooler.actionable === "SIN VENTA" ||
                                            cooler.actionable ===
                                              "Acciones urgentes" ||
                                            cooler.actionable ===
                                              "SIN COINCIDENCIA"
                                          ? "#F93448"
                                          : cooler.actionable ===
                                            "Actualizar Info"
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
                                            cooler.actionable === "Visita PdV"
                                          ? "#E67700"
                                          : cooler.actionable ===
                                            "Visita PdV prioritaria"
                                          ? "#C92A2A"
                                          : "black",
                                      fontSize: ".7vw",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "14px",
                                    }}
                                  >
                                    {cooler.actionable}
                                  </div>
                                </div>
                              )}
                            </td>

                            <td data-label="Acciones">
                              {isLoading == true ? (
                                <>
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
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
              </div>
              <div className="drawerPAGINADOR">
                <PaginationComponent
                  accion={setCurrentPage}
                  totalDatos={inputState()}
                  datosPorPagina={datosPorPagina}
                  numero={setNumero}
                />
              </div>
            </div>
          </section>
        </section>
      </section>
    </Drawer>
  );
}
