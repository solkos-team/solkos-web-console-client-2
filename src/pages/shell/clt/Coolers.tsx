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
import { TextInput } from "@mantine/core";

export default function Coolers() {
  interface Cooler {
    serial_number: string;
    device_id: string;
    model_id: string;
    outlet_name: string;
    region: string;
    route: string;
    status: string;
    last_read: string;
    days_without_visit: string;
    priority_status: string;
  }
  interface CoolerDetail {
    serial_number: string;
  }
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
  
  return (
    <div>
      <section>
        <PageFilter status={isLoading} />        
      </section>
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
          }}
        >
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "24px",
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
              fontSize: "14px",
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
            padding: "32px 0px",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: 100,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <TextInput
                  value={searchValue}
                  onChange={(event) => handleSearchChange(event)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Busca por Id Coolector / Mac"
                  style={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "28px",
                    width: "400px",
                    paddingRight: "40px",
                    margin: 0,
                    borderRadius: "4px",
                    color: "#88888B",
                  }}
                />
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
                marginLeft: -55,
              }}
            >
              TABLA
            </div>
            <div style={{ display: "flex", width: "570%", marginLeft: -55 }}>
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "155%",
                }}
              >
                Enfriadores
              </div>
              <div style={{ marginLeft: "auto" }}>
                <ExportToExcel datos={filteredCoolers} nombre={"Enfriadores"} />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <div style={{}}>
              <div>
                <div>
                  <section>
                    <Table
                      style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        maxWidth: "1000px",
                        height: "400px",
                      }}
                    >
                      <TableHead style={{ display: "block" }}>
                        <TableRow>
                          <TableHeaderCell
                            style={{
                              textAlign: "left",
                              width: "150px",
                            }}
                          >
                            Estatus
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{ textAlign: "left", width: "150px" }}
                          >
                            Serie
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{ textAlign: "left", width: "150px" }}
                          >
                            Modelo
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              textAlign: "left",
                              width: "150px",
                            }}
                          >
                            Última visita
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              textAlign: "left",
                              width: "150px",
                            }}
                          >
                            {" "}
                            Prioridad
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{ textAlign: "left", width: "150px" }}
                          >
                            Acciones
                          </TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      {isLoading == true ? (
                        <>
                          <br></br>
                          <br></br>
                          <div style={{ marginBottom: -40 }}></div>
                          <SkeletonTable></SkeletonTable>
                        </>
                      ) : (
                        ""
                      )}
                      {!isLoading && (
                        <>
                          {coolersData == undefined ? (
                            []
                          ) : coolersData ? (
                            <TableBody
                              style={{
                                display: "block",
                                height: "450px",
                                minWidth: "900px",
                                overflowY: "auto",
                                backgroundColor:"#FFFF",
                                scrollbarColor : "black #FFFF"
                              }}
                            >
                              {coolersData
                                // .slice(firstIndex, lastIndex)
                                .map((cooler, index) => (
                                  <TableRow
                                    key={index}
                                    className="Tabla"
                                    onClick={() => {     
                                      localStorage.getItem("USER") == 'Call Center' 
                                      ?                                 
                                      navigate(
                                        `/homeCallCenter/coolerDetail/${cooler.serial_number}`
                                      )
                                      :
                                      navigate(
                                        `/home/coolerDetail/${cooler.serial_number}`
                                      )
                                    }}
                                  >
                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        textAlign: "left",
                                        width: "150px",
                                      }}
                                    >
                                      {cooler.status == undefined ||
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
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        fontSize: "14px",
                                        textAlign: "left",
                                        width: "150px",
                                      }}
                                    >
                                      {cooler.serial_number === ""
                                        ? "Sin registro"
                                        : cooler.serial_number}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "50px",
                                        fontSize: "13px",
                                        width: "180px",
                                        textAlign: "left",
                                      }}
                                    >
                                      {cooler.model_id === ""
                                        ? "Sin registro"
                                        : cooler.model_id}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "80px",
                                        fontSize: "14px",
                                        width: "150px",
                                        textAlign: "left",
                                      }}
                                    >
                                      {cooler.last_read == undefined ||
                                      cooler.last_read == null
                                        ? "Sin registro"
                                        : new Date(
                                            cooler.last_read
                                          ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "60px",
                                        textAlign: "left",
                                        width: "150px",
                                      }}
                                    >
                                      {cooler.priority_status == undefined ||
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
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "70px",
                                        textAlign: "left",
                                        width: "150px",
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
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
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
                              <p>No hay datos de coolers disponibles.</p>
                            </div>
                          )}
                        </>
                      )}
                    </Table>
                    <PaginationComponent
                      accion={setCurrentPage}
                      totalDatos={totalData}
                      datosPorPagina={datosPorPagina}
                      numero={setNumero}
                    />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
