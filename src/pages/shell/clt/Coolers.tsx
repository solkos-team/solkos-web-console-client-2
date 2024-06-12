import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { fetchUniversalTables } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { TextInput, Skeleton } from "@mantine/core";
import { CoolerInterface as Cooler } from "../../../interfaces/CoolerInterface";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import moment from "moment";

import "moment/locale/es";
import { miniSerializeError } from "@reduxjs/toolkit";

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

export default function Coolers() {
  const [showTable, setShowTable] = useState(false);
  const [tableViewClicked, setTableViewClicked] = useState(false);
  const [sortByLastVisit, setSortByLastVisit] = useState(true);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<Cooler[]>();
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [changeAsc, setChangeAsc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(25);
  const [totalData, setTotalData] = useState<String | number>(0);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterCoolers = (data, searchQuery) => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery.toLowerCase();
      const codeEnfriador = item.serial_number.toLowerCase();
      const deviceId = item.device_id.toLowerCase();
      return (
        codeEnfriador.includes(searchString) || deviceId.includes(searchString)
      );
    });
    return filteredData;
  };

  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };

  const body = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED", "OWNED"],
    path: pathVerify(),
    page_size: Number(datosPorPagina),
    page_number: currentPage,
    filter_by: searchValue.split(','),
    order_by: {
      asc: changeAsc,
      name: "last_read",
    },
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("coolers", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setCoolersData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setShowTable(true);
      setCurrentPage(1);
      if (tableViewClicked) {
        fetchData();
      }
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchData();
    }
  }, [showTable, currentPage, datosPorPagina, changeAsc]);

  const filteredCoolers = coolersData
    ? filterCoolers(coolersData, searchValue)
    : [];

  useEffect(() => {
    setNoInfoToShow(filteredCoolers.length === 0);
  }, [filteredCoolers]);

  // Page (Body)
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  coolersData == undefined ? [] : coolersData;
  totalData == undefined ? 0 : totalData;
  const isloadingData = () => {
    let rows: any = [];
    for (let i = 0; i < 25; i++) {
      rows.push(
        <tr key={i}>
          <td data-label="Nombre">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="# Enfriadores">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Última visita">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Prioridad">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Acciones">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Accion">
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

  return (
    <div>
      <PageFilter status={isLoading} />
      <br></br>
      <div
        style={{
          display: "flex",
          padding: "16px 0px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "16px",
          flex: 100,
          alignSelf: "stretch",
          width: "100%",
          marginLeft: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "2rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "155%",
            }}
          >
            Cooler Life Tracking
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            padding: "0px 2rem",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: -15,
              }}
            >
              <div>
                <ExportToExcel
                  datos={filteredCoolers}
                  nombre={"Enfriadores"}
                  body={body}
                  component="coolers"
                />
              </div>
            </div>
          </div>
        </div> */}
        {/* Tabla */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            boxSizing: "border-box",
            marginLeft: "-1.5%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "60%",
            }}
          >
            <TextInput
              value={searchValue}
              onChange={(event) => handleSearchChange(event)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="       Buscar por Serie/ Id Coolector / Mac / PdV"
              style={{
                fontSize: "0.8rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1.8rem",
                width: "100%",
                paddingRight: "10rem",
                borderRadius: "4px",
                color: "#88888B",
              }}
            />
            <img
              src={"../../sampleData/searchC.svg"}
              alt="Descripción de la imagen"
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "15px",
                height: "15px",
                pointerEvents: "none",
                opacity: searchValue ? "0" : "1",
              }}
            />
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "flex-start" }}
          onClick={() => {
            setShowTable(true);
            setTableViewClicked(true);
          }}
        >
          <text
            style={{
              color: "#ED5079",
              fontSize: ".9rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "28px",
              cursor: "pointer",
            }}
          >
            Ir a vista con tabla{"   "}
          </text>
          <img
            src={"../../sampleData/table.svg"}
            alt="Descripción de la imagen"
            style={{ width: "18px", height: "15px", marginTop: 6 }}
          />
        </div>

        {showTable && (
          <>
            <section
              style={{
                padding: "1rem 0rem",
                marginLeft: -55,
                width: "100%",
                height: "100%",
                overflowY: "auto",
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">Estatus</th>
                    <th scope="col">Serie</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setChangeAsc((o) => !o)}
                      >
                        Última visita
                        <img
                          src={`../../sampleData/${
                            changeAsc == false
                              ? "sort-descending.svg"
                              : "sort-ascending.svg"
                          }`}
                          alt="Descripción de la imagen"
                          style={{
                            width: "15px",
                            height: "15px",
                            verticalAlign: "middle",
                          }}
                        />
                      </span>
                    </th>
                    <th scope="col">Control de activos</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                {coolersData != undefined ? (
                  <tbody>
                    {coolersData.map((cooler, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          localStorage.getItem("ORG") == "CALL CENTER"
                            ? navigate(
                                `/home/clt_callCenter/${cooler.serial_number}`
                              )
                            : navigate(`/home/clt/${cooler.serial_number}`);
                        }}
                      >
                        <td data-label="ESTATUS" title={cooler.status}>
                          {isLoading == true ? (
                            <>
                              <Skeleton height={20} radius="sm" width="90%" />
                            </>
                          ) : cooler.status == undefined ||
                            cooler.status == "" ? (
                            "Sin registro"
                          ) : (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "4px",
                                  // justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "4px",
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
                                    width: "5px",
                                    height: "5px",
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
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "14px",
                                  }}
                                >
                                  <div style={{ fontSize: "0.6rem" }}>
                                    {cooler?.status}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </td>
                        <td data-label="Serie" title={cooler.serial_number}>
                          {isLoading == true ? (
                            <>
                              <Skeleton height={20} radius="sm" width="90%" />
                            </>
                          ) : cooler.serial_number === "" ? (
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
                          ) : cooler.model_id === "" ? (
                            "Sin registro"
                          ) : (
                            cooler.model_id
                          )}
                        </td>
                        <td data-label="Última visita" title={cooler.last_read}>
                          {isLoading == true ? (
                            <>
                              <Skeleton height={20} radius="sm" width="90%" />
                            </>
                          ) : cooler.last_read == undefined ||
                            cooler.last_read == null ? (
                            "Sin registro"
                          ) : (
                            moment(new Date(cooler?.last_read)).format(
                              "DD/MM/YYYY"
                            )
                          )}
                        </td>
                        <td
                          data-label="CONTROL DE ACTIVOS"
                          title={cooler.priority_status}
                        >
                          {isLoading == true ? (
                            <>
                              <Skeleton height={20} radius="sm" width="90%" />
                            </>
                          ) : cooler.actionable == undefined ||
                            cooler.actionable == "" ? (
                            "Sin registro"
                          ) : (
                            <>
                              <div
                                style={{
                                  width: "fit-content",
                                  display: "flex",
                                  padding: "4px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "2px",
                                  border:
                                    cooler.actionable === "Visita PdV" &&
                                    dto != "KOF Colombia"
                                      ? "1.5px solid #DA7E05"
                                      : cooler.actionable === "Sin Riesgo"
                                      ? "1.5px solid #0F9F67"
                                      : cooler.actionable ===
                                          "Estatus sin venta" ||
                                        cooler.actionable ===
                                          "Acciones urgentes"
                                      ? "1.5px solid #F93448"
                                      : cooler.actionable === "Actualizar Info"
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
                                dto != "KOF Colombia" ? (
                                  <img
                                    src={"../../sampleData/p.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                ) : cooler.actionable === "Sin Riesgo" ? (
                                  <img
                                    src={"../../sampleData/sn.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                ) : cooler.actionable === "Estatus sin venta" ||
                                  cooler.actionable === "Acciones urgentes" ? (
                                  <img
                                    src={"../../sampleData/a.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                ) : cooler.actionable === "Actualizar Info" ? (
                                  <img
                                    src={"../../sampleData/p.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
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
                                ) : cooler.actionable === "Visita PdV" ? (
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
                                  style={{
                                    color:
                                      cooler.actionable === "Visita PdV" &&
                                      dto != "KOF Colombia"
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

                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "14px",
                                  }}
                                >
                                  {cooler.actionable}
                                </div>
                              </div>
                            </>
                          )}
                        </td>
                        <td data-label="Acciones" title="Acciones">
                          {isLoading == true ? (
                            <>
                              <Skeleton height={20} radius="sm" width="90%" />
                            </>
                          ) : (
                            <div>
                              <Link to={`/home/clt/${cooler.serial_number}`}>
                                <div
                                  style={{
                                    color: "#3E83FF",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "20px",
                                    display: "flex",
                                    marginRight: "6px",
                                  }}
                                >
                                  Ver más{" "}
                                  <IconArrowRight
                                    style={{
                                      color: "#3E83FF",
                                      width: "16px",
                                      height: "16px",
                                      marginTop: "2px",
                                    }}
                                  />
                                </div>
                              </Link>
                            </div>
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
                      fontSize: "1.5vw",
                      width: "100%",
                    }}
                  >
                    <p>Sin información para mostrar.</p>
                  </div>
                )}
              </table>
              <br />
            </section>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <PaginationComponent
                accion={setCurrentPage}
                totalDatos={totalData}
                datosPorPagina={datosPorPagina}
                numero={setNumero}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import PageFilter from "../../../components/pageFilter";
// import { BrowserRouter as Router, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { IconArrowRight } from "@tabler/icons-react";
// import { fetchUniversalTables } from "../../../utils/apiUtils";
// import { useSelector } from "react-redux";
// import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
// import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
// import { TextInput, Skeleton } from "@mantine/core";
// import { CoolerInterface as Cooler } from "../../../interfaces/CoolerInterface";
// import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
// import moment from "moment";
// import "moment/locale/es";
// moment.locale("es", {
//   months: [
//     "Enero",
//     "Febrero",
//     "Marzo",
//     "Abril",
//     "Mayo",
//     "Junio",
//     "Julio",
//     "Agosto",
//     "Septiembre",
//     "Octubre",
//     "Noviembre",
//     "Diciembre",
//   ],
// });

// export default function Coolers() {
//   const [sortByLastVisit, setSortByLastVisit] = useState(false);
//   const dt = useSelector((state: any) => state.works);
//   const dto = useSelector((state: any) => state.organization);
//   const [searchValue, setSearchValue] = useState("");
//   const [coolersData, setCoolersData] = useState<Cooler[]>();
//   const [noInfoToShow, setNoInfoToShow] = useState(false);
//   const [changeAsc, setChangeAsc] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [datosPorPagina, setNumero] = useState(25);
//   const [totalData, setTotalData] = useState<String | number>(0);
//   const navigate = useNavigate();
//   const handleSearchChange = (event) => {
//     setSearchValue(event.target.value);
//     setNoInfoToShow(false);
//   };

//   const filterCoolers = (data, searchQuery) => {
//     const filteredData = data.filter((item) => {
//       const searchString = searchQuery.toLowerCase();
//       const codeEnfriador = item.serial_number.toLowerCase();
//       const deviceId = item.device_id.toLowerCase();
//       return (
//         codeEnfriador.includes(searchString) || deviceId.includes(searchString)
//       );
//     });
//     return filteredData;
//   };
//   const pathVerify = () => {
//     return dt.length == 0 ? [] : JSON.parse(dt);
//   };
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       setCurrentPage(1);
//       fetchData();
//     }
//   };
//   const body = {
//     customer: dto,
//     class: "STK",
//     algorithm: ["INSTALLED", "OWNED"],
//     path: pathVerify(),
//     page_size: Number(datosPorPagina),
//     page_number: currentPage,
//     filter_by: searchValue,
//     order_by: {
//       asc: changeAsc,
//       name: "last_read",
//     },
//   };
//   useEffect(() => {
//     setCurrentPage(1);
//     fetchData();
//   }, [changeAsc]);
//   const fetchData = async () => {
//     try {
//       const data = await fetchUniversalTables("coolers", body, setIsLoading);
//       const datos = await data.json();
//       const totalData = data.headers.get("pagination-count");
//       setTotalData(Number(totalData) || 0);
//       setCoolersData(datos);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching coolers:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [dt, dto, currentPage, datosPorPagina]);
//   const filteredCoolers = coolersData
//     ? filterCoolers(coolersData, searchValue)
//     : [];
//   useEffect(() => {
//     setNoInfoToShow(filteredCoolers.length === 0);
//   }, [filteredCoolers]);
//   // Page (Body)
//   useEffect(() => {
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
//   coolersData == undefined ? [] : coolersData;
//   totalData == undefined ? 0 : totalData;
//   const isloadingData = () => {
//     let rows: any = [];
//     for (let i = 0; i < 25; i++) {
//       rows.push(
//         <tr key={i}>
//           <td data-label="Nombre">
//             {
//               <>
//                 <Skeleton height={20} radius="sm" width="90%" />
//               </>
//             }
//           </td>
//           <td data-label="# Enfriadores">
//             {
//               <>
//                 <Skeleton height={20} radius="sm" width="90%" />
//               </>
//             }
//           </td>
//           <td data-label="Última visita">
//             {
//               <>
//                 <Skeleton height={20} radius="sm" width="90%" />
//               </>
//             }
//           </td>
//           <td data-label="Prioridad">
//             {
//               <>
//                 <Skeleton height={20} radius="sm" width="90%" />
//               </>
//             }
//           </td>
//           <td data-label="Acciones">
//             {
//               <>
//                 <Skeleton height={20} radius="sm" width="90%" />
//               </>
//             }
//           </td>
//           <td data-label="Accion">
//             {
//               <>
//                 <Skeleton height={20} radius="sm" width="90%" />
//               </>
//             }
//           </td>
//         </tr>
//       );
//     }
//     return rows;
//   };
//   return (
//     <div>
//       <PageFilter status={isLoading} />
//       <br></br>
//       <div
//         style={{
//           display: "flex",
//           padding: "16px 0px",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           gap: "16px",
//           flex: 100,
//           alignSelf: "stretch",
//           width: "100%",
//           marginLeft: 0,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             padding: "0px 32px",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             alignSelf: "stretch",
//             width: "90%",
//           }}
//         >
//           <div
//             style={{
//               color: "#000005",
//               // fontFamily: "DM Sans",
//               fontSize: "1.5rem",
//               fontStyle: "normal",
//               fontWeight: 700,
//               lineHeight: "155%",
//               marginLeft: -55,
//             }}
//           >
//             Cooler Life Tracking
//           </div>
//           <div
//             style={{
//               color: "#88888B",
//               // fontFamily: "DM Sans",
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "155%",
//               marginLeft: -55,
//             }}
//           >
//             Haz seguimiento de todos los parámetros de cada uno de tus
//             enfriadores
//           </div>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             padding: "0px 2rem",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             alignSelf: "stretch",
//             width: "90%",
//           }}
//         >
//           <h1
//             style={{
//               color: "#000005",
//               // fontFamily: "DM Sans",
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "155%",
//               marginLeft: -55,
//             }}
//           >
//             Tabla
//           </h1>
//           <div
//             style={{
//               display: "flex",
//               width: "100%",
//               justifyContent: "space-between",
//             }}
//           >
//             <h1
//               style={{
//                 color: "#88888B",
//                 // fontFamily: "DM Sans",
//                 fontSize: "1.0rem",
//                 fontStyle: "normal",
//                 fontWeight: 300,
//                 marginLeft: -55,
//                 marginTop: -10,
//               }}
//             >
//               Enfriadores
//             </h1>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 marginTop: -15,
//               }}
//             >
//               <div>
//                 <ExportToExcel
//                   datos={filteredCoolers}
//                   nombre={"Enfriadores"}
//                   body={body}
//                   component="coolers"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Tabla */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             alignSelf: "stretch",
//             boxSizing: "border-box",
//             marginLeft: "-1.5%",
//           }}
//         >
//           <TextInput
//             value={searchValue}
//             onChange={(event) => handleSearchChange(event)}
//             onKeyDown={handleKeyDown}
//             type="text"
//             placeholder="Busca por Serie/ Id Coolector / Mac"
//             style={{
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "1,8rem",
//               width: "98%",
//               paddingRight: "2.5rem",
//               margin: 0,
//               borderRadius: "4px",
//               color: "#88888B",
//             }}
//           />
//         </div>
//         <section
//           style={{
//             padding: "1rem 0rem",
//             marginLeft: -55,
//             width: "100%",
//             height: "100%",
//             overflowY: "auto",
//           }}
//         >
//           <table>
//             <thead>
//               <tr>
//                 <th scope="col">Estatus</th>
//                 <th scope="col">Serie</th>
//                 <th scope="col">Modelo</th>
//                 <th scope="col">
//                   <span
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setChangeAsc((o) => !o)}
//                   >
//                     Última visita
//                     <img
//                       src={`../../sampleData/${
//                         changeAsc == false
//                           ? "sort-descending.svg"
//                           : "sort-ascending.svg"
//                       }`}
//                       alt="Descripción de la imagen"
//                       style={{
//                         width: "15px",
//                         height: "15px",
//                         verticalAlign: "middle",
//                       }}
//                     />
//                   </span>
//                 </th>
//                 <th scope="col">Control de activos</th>
//                 <th scope="col">Acciones</th>
//               </tr>
//             </thead>
//             {coolersData != undefined ? (
//               <tbody>
//                 {coolersData.map((cooler, index) => (
//                   <tr
//                     key={index}
//                     onClick={() => {
//                       localStorage.getItem("ORG") == "CALL CENTER"
//                         ? navigate(
//                             `/home/clt_callCenter/${cooler.serial_number}`
//                           )
//                         : navigate(`/home/clt/${cooler.serial_number}`);
//                     }}
//                   >
//                     <td data-label="ESTATUS" title={cooler.status}>
//                       {isLoading == true ? (
//                         <>
//                           <Skeleton height={20} radius="sm" width="90%" />
//                         </>
//                       ) : cooler.status == undefined || cooler.status == "" ? (
//                         "Sin registro"
//                       ) : (
//                         <>
//                           <div
//                             style={{
//                               display: "flex",
//                               padding: "4px",
//                               // justifyContent: "center",
//                               alignItems: "center",
//                               gap: "4px",
//                               borderRadius: "4px",
//                               background:
//                                 cooler?.status === "FUNCIONANDO CORRECTAMENTE"
//                                   ? "#B2F2BB"
//                                   : cooler?.status === "FUNCIONANDO CON ALERTA"
//                                   ? "#FFEC99"
//                                   : cooler?.status === "EN FALLA"
//                                   ? "#FFC9C9"
//                                   : cooler?.status === "EN ESPERA DE SERVICIO"
//                                   ? "#C7CBD2"
//                                   : cooler?.status === "EN ESPERA DE LECTURA"
//                                   ? "#A5D8FF"
//                                   : cooler?.status === "SERVICIO NO EFECTIVO"
//                                   ? "#FFC9C9"
//                                   : cooler?.status === "SERVICIO IMPRODUCTIVO"
//                                   ? "#FFC9C9"
//                                   : cooler?.status === "SIN DATOS"
//                                   ? "#C7CBD2"
//                                   : "#C7CBD2",
//                               width: "fit-content",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "5px",
//                                 height: "5px",
//                                 borderRadius: "5px",
//                                 background:
//                                   cooler?.status === "FUNCIONANDO CORRECTAMENTE"
//                                     ? "#2B8A3E"
//                                     : cooler?.status ===
//                                       "FUNCIONANDO CON ALERTA"
//                                     ? "#E67700"
//                                     : cooler?.status === "EN FALLA"
//                                     ? "#E03131"
//                                     : cooler?.status === "EN ESPERA DE SERVICIO"
//                                     ? "#313A49"
//                                     : cooler?.status === "EN ESPERA DE LECTURA"
//                                     ? "#1864AB"
//                                     : cooler?.status === "SERVICIO NO EFECTIVO"
//                                     ? "#E03131"
//                                     : cooler?.status === "SERVICIO IMPRODUCTIVO"
//                                     ? "#E03131"
//                                     : cooler?.status === "SIN DATOS"
//                                     ? "#313A49"
//                                     : "#313A49",
//                               }}
//                             ></div>
//                             <div
//                               style={{
//                                 color:
//                                   cooler?.status === "FUNCIONANDO CORRECTAMENTE"
//                                     ? "#2B8A3E"
//                                     : cooler?.status ===
//                                       "FUNCIONANDO CON ALERTA"
//                                     ? "#E67700"
//                                     : cooler?.status === "EN FALLA"
//                                     ? "#E03131"
//                                     : cooler?.status === "EN ESPERA DE SERVICIO"
//                                     ? "#313A49"
//                                     : cooler?.status === "EN ESPERA DE LECTURA"
//                                     ? "#1864AB"
//                                     : cooler?.status === "SERVICIO NO EFECTIVO"
//                                     ? "#E03131"
//                                     : cooler?.status === "SERVICIO IMPRODUCTIVO"
//                                     ? "#E03131"
//                                     : cooler?.status === "SIN DATOS"
//                                     ? "#313A49"
//                                     : "#313A49",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "14px",
//                               }}
//                             >
//                               <div style={{ fontSize: "0.6rem" }}>
//                                 {cooler?.status}
//                               </div>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </td>
//                     <td data-label="Serie" title={cooler.serial_number}>
//                       {isLoading == true ? (
//                         <>
//                           <Skeleton height={20} radius="sm" width="90%" />
//                         </>
//                       ) : cooler.serial_number === "" ? (
//                         "Sin registro"
//                       ) : (
//                         cooler.serial_number
//                       )}
//                     </td>
//                     <td data-label="Modelo" title={cooler.model_id}>
//                       {isLoading == true ? (
//                         <>
//                           <Skeleton height={20} radius="sm" width="90%" />
//                         </>
//                       ) : cooler.model_id === "" ? (
//                         "Sin registro"
//                       ) : (
//                         cooler.model_id
//                       )}
//                     </td>
//                     <td data-label="Última visita" title={cooler.last_read}>
//                       {isLoading == true ? (
//                         <>
//                           <Skeleton height={20} radius="sm" width="90%" />
//                         </>
//                       ) : cooler.last_read == undefined ||
//                         cooler.last_read == null ? (
//                         "Sin registro"
//                       ) : (
//                         moment(new Date(cooler?.last_read)).format("DD/MM/YYYY")
//                       )}
//                     </td>
//                     <td
//                       data-label="CONTROL DE ACTIVOS"
//                       title={cooler.priority_status}
//                     >
//                       {isLoading == true ? (
//                         <>
//                           <Skeleton height={20} radius="sm" width="90%" />
//                         </>
//                       ) : cooler.actionable == undefined ||
//                         cooler.actionable == "" ? (
//                         "Sin registro"
//                       ) : (
//                         <>
//                           <div
//                             style={{
//                               width: "fit-content",
//                               display: "flex",
//                               padding: "4px",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               gap: "4px",
//                               borderRadius: "2px",
//                               border:
//                                 cooler.actionable === "Visita PdV" &&
//                                 dto != "KOF Colombia"
//                                   ? "1.5px solid #DA7E05"
//                                   : cooler.actionable === "Sin Riesgo"
//                                   ? "1.5px solid #0F9F67"
//                                   : cooler.actionable === "Estatus sin venta" ||
//                                     cooler.actionable === "Acciones urgentes"
//                                   ? "1.5px solid #F93448"
//                                   : cooler.actionable === "Actualizar Info"
//                                   ? "1.5px solid #DA7E05"
//                                   : cooler.actionable === "Actualizar dato" ||
//                                     cooler.actionable === "Datos faltantes" ||
//                                     cooler.actionable === "Monitoreo" ||
//                                     cooler.actionable === "Movimiento"
//                                   ? "1.5px solid #1864AB"
//                                   : cooler.actionable ===
//                                       "Solicitar serv. correctivo" ||
//                                     cooler.actionable ===
//                                       "Solicitar serv. preventivos" ||
//                                     cooler.actionable ===
//                                       "Seguimiento a equipo" ||
//                                     cooler.actionable === "Visita PdV"
//                                   ? "1.5px solid #E67700"
//                                   : cooler.actionable ===
//                                     "Visita PdV prioritaria"
//                                   ? "1.5px solid #C92A2A"
//                                   : "1.5px solid black",
//                               background: "#FFF",
//                             }}
//                           >
//                             {cooler.actionable === "Visita PdV" &&
//                             dto != "KOF Colombia" ? (
//                               <img
//                                 src={"../../sampleData/p.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Sin Riesgo" ? (
//                               <img
//                                 src={"../../sampleData/sn.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Estatus sin venta" ||
//                               cooler.actionable === "Acciones urgentes" ? (
//                               <img
//                                 src={"../../sampleData/a.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Actualizar Info" ? (
//                               <img
//                                 src={"../../sampleData/p.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Actualizar dato" ? (
//                               <img
//                                 src={"../../sampleData/actDat.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Datos faltantes" ? (
//                               <img
//                                 src={"../../sampleData/datFal.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Monitoreo" ? (
//                               <img
//                                 src={"../../sampleData/Mont.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Movimiento" ? (
//                               <img
//                                 src={"../../sampleData/mov1.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable ===
//                                 "Solicitar serv. correctivo" ||
//                               cooler.actionable ===
//                                 "Solicitar serv. preventivos" ? (
//                               <img
//                                 src={"../../sampleData/serCP.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Seguimiento a equipo" ? (
//                               <img
//                                 src={"../../sampleData/seguE.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable === "Visita PdV" ? (
//                               <img
//                                 src={"../../sampleData/visitap.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : cooler.actionable ===
//                               "Visita PdV prioritaria" ? (
//                               <img
//                                 src={"../../sampleData/visitapd.svg"}
//                                 alt="Descripción de la imagen"
//                                 style={{ width: "15px", height: "15px" }}
//                               />
//                             ) : (
//                               ""
//                             )}

//                             <div
//                               style={{
//                                 color:
//                                   cooler.actionable === "Visita PdV" &&
//                                   dto != "KOF Colombia"
//                                     ? "#DA7E05"
//                                     : cooler.actionable === "Sin Riesgo"
//                                     ? "#0F9F67"
//                                     : cooler.actionable ===
//                                         "Estatus sin venta" ||
//                                       cooler.actionable === "Acciones urgentes"
//                                     ? "#F93448"
//                                     : cooler.actionable === "Actualizar Info"
//                                     ? "#DA7E05"
//                                     : cooler.actionable === "Actualizar dato" ||
//                                       cooler.actionable === "Datos faltantes" ||
//                                       cooler.actionable === "Monitoreo" ||
//                                       cooler.actionable === "Movimiento"
//                                     ? "#1864AB"
//                                     : cooler.actionable ===
//                                         "Solicitar serv. correctivo" ||
//                                       cooler.actionable ===
//                                         "Solicitar serv. preventivos" ||
//                                       cooler.actionable ===
//                                         "Seguimiento a equipo" ||
//                                       cooler.actionable === "Visita PdV"
//                                     ? "#E67700"
//                                     : cooler.actionable ===
//                                       "Visita PdV prioritaria"
//                                     ? "#C92A2A"
//                                     : "black",
//                                 fontStyle: "normal",
//                                 fontWeight: 600,
//                                 lineHeight: "14px",
//                               }}
//                             >
//                               {cooler.actionable}
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </td>
//                     <td data-label="Acciones" title="Acciones">
//                       {isLoading == true ? (
//                         <>
//                           <Skeleton height={20} radius="sm" width="90%" />
//                         </>
//                       ) : (
//                         <div>
//                           <Link to={`/home/clt/${cooler.serial_number}`}>
//                             <div
//                               style={{
//                                 color: "#3E83FF",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 lineHeight: "20px",
//                                 display: "flex",
//                                 marginRight: "6px",
//                               }}
//                             >
//                               Ver más{" "}
//                               <IconArrowRight
//                                 style={{
//                                   color: "#3E83FF",
//                                   width: "16px",
//                                   height: "16px",
//                                   marginTop: "2px",
//                                 }}
//                               />
//                             </div>
//                           </Link>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             ) : isLoading == true ? (
//               <tbody>{isloadingData()}</tbody>
//             ) : (
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontWeight: "bold",
//                   fontSize: "1.5vw",
//                   width: "100%",
//                 }}
//               >
//                 <p>Sin información para mostrar.</p>
//               </div>
//             )}
//           </table>
//           <br />
//         </section>
//         <section
//           style={{ display: "flex", flexDirection: "column", width: "100%" }}
//         >
//           <PaginationComponent
//             accion={setCurrentPage}
//             totalDatos={totalData}
//             datosPorPagina={datosPorPagina}
//             numero={setNumero}
//           />
//         </section>
//       </div>
//     </div>
//   );
// }
