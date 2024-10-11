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
import moment from "moment";
import "moment/locale/es";
import {
  backgroundCircle,
  getBorderStyle,
  getBorderStyle2,
  getColor2,
} from "../../Functions/Vault";

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
  weekdays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
});

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
    actionable,
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
      withCloseButton={false}
    >
      <div style={{ position: "absolute", left: "1rem", top: "1rem" }}>
        <button
          style={{
            display: "flex",
            padding: "0.313rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.625rem",
            alignSelf: "stretch",
            borderRadius: "0.25rem",
            border: "0.063rem solid #CED4DA",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <img
            src={"../../sampleData/CloseDrawer.svg"}
            alt="Close"
            style={{ width: "1.125rem", height: "1.125rem" }}
          />
        </button>
      </div>

      <section className="drawerOutlets_Principal" style={{ marginTop: 45 }}>
        <section className="drawerHeader">
          <div className="drawerHeaderImg">
            <img
              onClick={onClose}
              src={"../../sampleData/pv2.svg"}
              alt="Descripción de la imagen"
              style={{
                width: "40px",
                height: "40px",
                cursor: "pointer",
                marginRight: "10px",
              }}
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
                  width: "max-content",
                  height: "max-content",
                  padding: "2px",
                  boxSizing: "border-box",
                  fontSize: "0.625rem",
                  borderRadius: "2px",
                  fontWeight: 500,
                  border: getBorderStyle2(actionable, dto),
                  color: getColor2(actionable, dto),
                }}
              >
                {actionable ?? "Sin registro"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      color: "#000005",
                      fontSize: "1.125rem",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      width: "100%",
                    }}
                  >
                    Sin registro
                  </div>
                ) : (
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "0.563rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {outlet_address}
                  </div>
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
                    fontSize: "0.75rem",
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
                      fontSize: "11px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Sin registro
                  </div>
                ) : (
                  <section
                    style={{
                      display: "flex",
                      padding: "1px var(--borderRadius-tremor-small, 6px)",
                      boxSizing: "border-box",
                      width: "max-content",
                      backgroundColor: "var(--blue-0, #E7F5FF)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        color: "var(--blue-6, #2393F4)",
                        fontSize: "0.563rem",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      {lastReadDate == undefined || lastReadDate == null
                        ? "Sin registro"
                        : moment(new Date(lastReadDate))
                            .locale("es") // Establecer el idioma a español
                            .format("dddd D MMMM, YYYY")}
                    </div>
                  </section>
                )}
                &nbsp;
                {days_without_visitC === undefined ||
                days_without_visitC === "" ||
                days_without_visitC === null ? (
                  ""
                ) : (
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
                )}
              </div>
            </div>
          </div>

          <div
            className="drawerHeaderInfo"
            // style={{ background: "red" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                // gap: "3px",
                alignSelf: "stretch",
                marginTop: 25,
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
                    color: "#868E96",
                    // fontFamily: "DM Mono",
                    fontSize: "0.563rem",
                    fontStyle: "normal",
                    fontWeight: 700,
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
                    // background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--other-black, #000)",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "14px",
                    }}
                  >
                    {channel === undefined ||
                    channel === "" ||
                    channel === null ? (
                      <div
                        style={{
                          color: "#000",
                          // fontFamily: "DM Mono",
                          fontSize: "0.563rem",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "14px",
                        }}
                      >
                        Sin registro
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#000",
                          // fontFamily: "DM Mono",
                          fontSize: "0.563rem",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "14px",
                        }}
                      >
                        {channel}
                      </div>
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
                    color: "#868E96",
                    // fontFamily: "DM Mono",
                    fontSize: "0.563rem",
                    fontStyle: "normal",
                    fontWeight: 700,
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
                    // background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--other-black, #000)",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 700,
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
                      <div
                        style={{
                          color: "#000",
                          // fontFamily: "DM Mono",
                          fontSize: "0.563rem",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "14px",
                        }}
                      >
                        {region}
                      </div>
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
                    color: "#868E96",
                    // fontFamily: "DM Mono",
                    fontSize: "0.563rem",
                    fontStyle: "normal",
                    fontWeight: 700,
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
                    // background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--other-black, #000)",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "14px",
                    }}
                  >
                    {route === undefined || route === "" || route === null ? (
                      "Sin registros"
                    ) : (
                      <div
                        style={{
                          color: "#000",
                          // fontFamily: "DM Mono",
                          fontSize: "0.563rem",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "14px",
                        }}
                      >
                        {route}
                      </div>
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
                    color: "#868E96",
                    // fontFamily: "DM Mono",
                    fontSize: "0.563rem",
                    fontStyle: "normal",
                    fontWeight: 700,
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
                    // background: "#D4DAE3",
                    height: "3px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--other-black, #000)",
                      // fontFamily: "DM Mono",
                      fontSize: "8px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "14px",
                    }}
                  >
                    {zone === undefined || zone === "" || zone === null ? (
                      "Sin registros"
                    ) : (
                      <div
                        style={{
                          color: "#000",
                          // fontFamily: "DM Mono",
                          fontSize: "0.563rem",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "14px",
                        }}
                      >
                        {zone}
                      </div>
                    )}
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
          <section
            className="drawerMapaDescargar"
            // style={{ background: "pink" }}
          >
            <div className="drawerMapa">
              <div className="drawerMapa_title">
                <div
                  style={{
                    width: "max-content",
                    height: "max-content",
                    backgroundColor: "var(--kasmir-2, #C7CBD2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.25rem",
                  }}
                >
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
                </div>
                <div className="drawerMapa_title_h1">Ubicación en el mapa</div>
              </div>
              <div className="drawerMapa_Mapa">
                <MapComponentPv latitude={latitude} longitude={longitude} />
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
                  padding: "0px 35px",
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
                      color: "#ADB5BD",
                      // fontFamily: "DM Sans",
                      fontSize: "0.563REM",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "155%",
                    }}
                  >
                    TABLA
                  </div>
                  <div
                    style={{
                      color: "#101113",
                      // fontFamily: "DM Sans",
                      fontSize: "0.875",
                      fontStyle: "normal",
                      fontWeight: 400,
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
            {/* <div className="drawerTabla_Buscador">
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
            </div> */}
            <div className="drawerTabla_Tabla">
              <div className="drawerTABLA">
                <table className="table_responsive">
                  <thead>
                    <tr>
                      <th scope="col" style={{ color: "#000" }}>
                        SERIE
                      </th>
                      <th scope="col" style={{ color: "#000" }}>
                        MODELO
                      </th>
                      <th scope="col" style={{ color: "#000" }}>
                        DIAS SIN VISITA
                      </th>
                      <th scope="col" style={{ color: "#000" }}>
                        CONTROL DE ACTIVOS
                      </th>
                      <th scope="col" style={{ color: "#000" }}>
                        ACCIONES
                      </th>
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
                                <div style={{ color: "#868E96" }}>
                                  {cooler.serial_number}
                                </div>
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
                                <div style={{ color: "#868E96" }}>
                                  {cooler.model_id}
                                </div>
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
                                      cooler.actionable === "Visita PdV"
                                        ? "1.5px solid #E67700"
                                        : cooler.actionable === "Sin Riesgo"
                                        ? "1.5px solid #40C057"
                                        : cooler.actionable ===
                                            "Estatus sin venta" ||
                                          cooler.actionable === "SIN VENTA" ||
                                          cooler.actionable ===
                                            "Acciones urgentes"
                                        ? "1.5px solid #FA5252"
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
                                        : cooler.actionable === "SIN RIESGO" ||
                                          cooler.actionable ===
                                            "SIN RIESGO SIN VENTA" ||
                                          cooler.actionable ===
                                            "VISITA PDV SIN VENTA" ||
                                          cooler.actionable === "EN BODEGA" ||
                                          cooler.actionable ===
                                            "PDV POR ASIGNAR"
                                        ? "1.5px solid #2393F4"
                                        : cooler.actionable ===
                                            "VISITA PDV PARA LECTURA" ||
                                          cooler.actionable ===
                                            "SIN COINCIDENCIA" ||
                                          cooler.actionable === "CON MOVIMIENTO"
                                        ? "1.5px solid #FAB005"
                                        : "1.5px solid black",
                                    background: "#FFF",
                                  }}
                                >
                                  <div
                                    title={cooler.actionable}
                                    style={{
                                      maxWidth: "80px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      color:
                                        cooler.actionable === "Visita PdV"
                                          ? "#E67700"
                                          : cooler.actionable === "Sin Riesgo"
                                          ? "#40C057"
                                          : cooler.actionable ===
                                              "Estatus sin venta" ||
                                            cooler.actionable === "SIN VENTA" ||
                                            cooler.actionable ===
                                              "Acciones urgentes"
                                          ? "#FA5252"
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
                                          : cooler.actionable ===
                                              "SIN RIESGO" ||
                                            cooler.actionable ===
                                              "SIN RIESGO SIN VENTA" ||
                                            cooler.actionable ===
                                              "VISITA PDV SIN VENTA" ||
                                            cooler.actionable === "EN BODEGA" ||
                                            cooler.actionable ===
                                              "PDV POR ASIGNAR"
                                          ? "#2393F4"
                                          : cooler.actionable ===
                                              "VISITA PDV PARA LECTURA" ||
                                            cooler.actionable ===
                                              "SIN COINCIDENCIA" ||
                                            cooler.actionable ===
                                              "CON MOVIMIENTO"
                                          ? "#FAB005"
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
