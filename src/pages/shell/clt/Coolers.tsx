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
      const totalData = data.headers.get("content-length");
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
    let rows: any = []
    for (let i = 0; i < 25; i++) {
      rows.push(
        <tr key={i}>
          <td data-label="Nombre">
            {<><Skeleton height={8} radius="xl" width="100%" /></>}
          </td>
          <td data-label="# Endriadores" >
            {<><Skeleton height={8} radius="xl" width="100%" /></>}
          </td>
          <td data-label="Última visita" >
            {<><Skeleton height={8} radius="xl" width="100%" /></>}
          </td>
          <td data-label="Prioridad">
            {<><Skeleton height={8} radius="xl" width="100%" /></>}
          </td>
          <td data-label="Acciones">
            {
              <><Skeleton height={8} radius="xl" width="100%" /></>
            }
          </td>
        </tr>
      )
    }
    return rows
  }
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
          marginLeft: 0
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "90%"
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
            Haz seguimiento de todos los parámetros de cada uno de tus enfriadores
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "0px 2rem",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "90%"
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
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <h1
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "1.1rem",
                fontStyle: "normal",
                fontWeight: 300,
                marginLeft: -55,
              }}
            >
              Enfriadores
            </h1>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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
            gap: "32px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >

          </div>
          <div

            style={{
              display: "flex",
              padding: "32px 0px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              width: "100%",
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
        <section style={{
          padding: "0px 0rem",
          marginLeft: -55,
          width: "100%",
          height: "30rem",
          overflowY: "auto"
        }} >
          <table>
            <thead>
              <tr>
                <th scope="col">Estatus</th>
                <th scope="col">Serie</th>
                <th scope="col">Modelo</th>
                <th scope="col">Última visita</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {coolersData != undefined ? (
              <tbody>
                {coolersData
                  // .slice(firstIndex, lastIndex)
                  .map((cooler, index) => (
                    <tr key={index}
                      onClick={() => {
                        localStorage.getItem("USER") ==
                          "Call Center"
                          ? navigate(
                            `/homeCallCenter/coolerDetail/${cooler.serial_number}`
                          )
                          : navigate(
                            `/home/coolerDetail/${cooler.serial_number}`
                          );
                      }}>
                      <td data-label="Nombre" title={cooler.status}>
                        {isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                        cooler.status == undefined ||
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
                                  color: "#0F9F67",
                                  // fontFamily: "Space Mono",
                                  fontSize: "14px",
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
                      </td>
                      <td data-label="Serie" title={cooler.serial_number}>
                        {isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                        cooler.serial_number === ""
                          ? "Sin registro"
                          : cooler.serial_number}
                      </td>
                      <td data-label="Modelo" title={cooler.model_id}>
                        {isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                        cooler.model_id === ""
                          ? "Sin registro"
                          : cooler.model_id}
                      </td>
                      <td data-label="Última visita" title={cooler.last_read}>
                        {isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                        cooler.last_read == undefined ||
                          cooler.last_read == null
                          ? "Sin registro"
                          : new Date(
                            cooler.last_read
                          ).toLocaleDateString()}
                      </td>
                      <td data-label="Prioridad" title={cooler.priority_status}>
                        {isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                        cooler.priority_status == undefined ||
                          cooler.priority_status == "" ? (
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
                                border: "1.5px solid #0F9F67",
                                background: "#FFF",
                              }}
                            >
                              <div
                                style={{
                                  color: "#0F9F67",
                                  // fontFamily: "DM Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "14px",
                                }}
                              >
                                {cooler.priority_status}
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                      <td data-label="Acciones" title="Acciones">
                        {isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
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
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              isLoading == true
                ?
                <tbody>
                  {isloadingData()}
                </tbody>
                :
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  <p>No hay datos de usuarios disponibles.</p>
                </div>
            )}
          </table>
          <br />
        </section>
        <section style={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
