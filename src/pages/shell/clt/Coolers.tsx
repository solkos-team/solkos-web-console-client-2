import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { SkeletonTable } from "../../../components/skeletonTable/SkeletonTable";
import { fetchUniversalTables } from "../../../utils/apiUtils";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Table } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { TextInput, Skeleton } from "@mantine/core";
import { CoolerInterface as Cooler } from "../../../interfaces/CoolerInterface";

export default function Coolers() {
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<Cooler[]>();
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(25);
  const [totalData, setTotalData] = useState<String | number>(0);
  const navigate = useNavigate();
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false);
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
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCurrentPage(1);
      fetchData();
    }
  };
  const body = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    page_size: Number(datosPorPagina),
    page_number: currentPage,
    filter_by: searchValue,
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("coolers", body, setIsLoading);
      const datos = await data.json();
      // console.log(datos);
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setCoolersData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt, dto, currentPage, datosPorPagina]);

  const filteredCoolers = coolersData
    ? filterCoolers(coolersData, searchValue)
    : [];

  useEffect(() => {
    setNoInfoToShow(filteredCoolers.length === 0);
  }, [filteredCoolers]);

  // Page (Body)
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
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
          <td data-label="# Endriadores">
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
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "90%",
          }}
        >
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "1.5rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "155%",
              marginLeft: -55,
            }}
          >
            Cooler Life Tracking
          </div>
          <div
            style={{
              color: "#88888B",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
              marginLeft: -55,
            }}
          >
            Haz seguimiento de todos los parámetros de cada uno de tus
            enfriadores
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "0px 2rem",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "90%",
          }}
        >
          <h1
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "155%",
              marginLeft: -55,
            }}
          >
            Tabla
          </h1>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "1.0rem",
                fontStyle: "normal",
                fontWeight: 300,
                marginLeft: -55,
                marginTop: -10,
              }}
            >
              Enfriadores
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: -15,
              }}
            >
              <div>
                <ExportToExcel datos={filteredCoolers} nombre={"Enfriadores"} />
              </div>
            </div>
          </div>
        </div>
        {/* Tabla */}
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              padding: "32px 0px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              width: "100%",
              marginTop: -30,
            }}
          >
            <TextInput
              value={searchValue}
              onChange={(event) => handleSearchChange(event)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Busca por Serie/ Id Coolector / Mac"
              style={{
                fontSize: "0.8rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1,8rem",
                width: "100%",
                paddingRight: "2.5rem",
                margin: 0,
                borderRadius: "4px",
                color: "#88888B",
              }}
            />
          </div>
        </div>
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
                <th scope="col">Última visita</th>
                <th scope="col">Control de activos</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {coolersData != undefined ? (
              <tbody>
                {coolersData
                  // .slice(firstIndex, lastIndex)
                  .map((cooler, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        localStorage.getItem("USER") == "Call Center"
                          ? navigate(
                              `/homeCallCenter/coolerDetail/${cooler.serial_number}`
                            )
                          : navigate(
                              `/home/coolerDetail/${cooler.serial_number}`
                            );
                      }}
                    >
                      <td data-label="Nombre" title={cooler.status}>
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
                                  fontSize:
                                    cooler?.status ===
                                    "FUNCIONANDO CORRECTAMENTE"
                                      ? ".75vw"
                                      : ".8vw",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "14px",
                                }}
                              >
                                {cooler?.status}
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
                          new Date(cooler.last_read).toLocaleDateString()
                        )}
                      </td>
                      <td data-label="Prioridad" title={cooler.priority_status}>
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
                                  cooler.actionable === "Visita PdV"
                                    ? "1.5px solid #DA7E05"
                                    : cooler.actionable === "Sin Riesgo"
                                    ? "1.5px solid #0F9F67"
                                    : cooler.actionable === "Toma de Decisiones"
                                    ? "1.5px solid #F93448"
                                    : cooler.actionable === "Actualizar Info"
                                    ? "1.5px solid #DA7E05"
                                    : "1.5px solid black",
                                background: "#FFF",
                              }}
                            >
                              {cooler.actionable === "Visita PdV" ? (
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
                              ) : cooler.actionable === "Toma de Decisiones" ? (
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
                              ) : (
                                ""
                              )}

                              <div
                                style={{
                                  color:
                                    cooler.actionable === "Visita PdV"
                                      ? "#DA7E05"
                                      : cooler.actionable === "Sin Riesgo"
                                      ? "#0F9F67"
                                      : cooler.actionable ===
                                        "Toma de Decisiones"
                                      ? "#F93448"
                                      : cooler.actionable === "Actualizar Info"
                                      ? "#DA7E05"
                                      : "black",
                                  // fontFamily: "DM Sans",
                                  fontSize: "1vw",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "14px",
                                }}
                              >
                                {cooler.actionable === "Visita PdV"
                                  ? "Visita punto de venta"
                                  : cooler.actionable === "Sin Riesgo"
                                  ? "Sin riesgo"
                                  : cooler.actionable === "Toma de Decisiones"
                                  ? "Acciones urgentes"
                                  : cooler.actionable === "Actualizar Info"
                                  ? "Requiere actualizar ..."
                                  : cooler.actionable}
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
                            <Link to="/home/coolerDetail">
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
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <PaginationComponent
            accion={setCurrentPage}
            totalDatos={totalData}
            datosPorPagina={datosPorPagina}
            numero={setNumero}
          />
        </section>
      </div>
    </div>
  );
}
