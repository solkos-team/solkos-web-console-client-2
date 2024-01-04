import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import { fetchCoolers, fetchCoolerDetails } from "../../../utils/apiUtils";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableFoot,
  TableFooterCell,
} from "@tremor/react";
import ExcelJS from "exceljs";
import { useSelector, useDispatch } from "react-redux";
import { addPath } from "../../../app/works";
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
  }
  interface CoolerDetail {
    serial_number: string;
  }
  const dt = useSelector((state: any) => state.works);
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [coolersDataDeatil, setCoolersDataDeatil] = useState<
    CoolerDetail[] | null
  >(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [highlightedRow, setHighlightedRow] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const navigate = useNavigate();
  // const datosPorPagina = 10;
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
    return dt.length == 0 ? "[]" : JSON.parse(dt);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoolers(pathVerify(), setIsLoading);
        setCoolersData(data);
        console.log(data);
        setIsLoading(false); // Set isLoading to false after fetching coolers
      } catch (error) {
        console.error("Error fetching coolers:", error);
      }
    };

    fetchData();
  }, [dt]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coolersData && coolersData.length > 0) {
          const data = await fetchCoolerDetails(coolersData[0].serial_number);
          setCoolersDataDeatil(data);
          console.log(data);
          setIsLoading(false); // Set isLoading to false after fetching cooler details
        }
      } catch (error) {
        console.error("Error fetching cooler details:", error);
      }
    };

    fetchData();
  }, [coolersData]);

  const filteredCoolers = coolersData
    ? filterCoolers(coolersData, searchValue)
    : [];

  useEffect(() => {
    setNoInfoToShow(filteredCoolers.length === 0);
  }, [filteredCoolers]);

  // Page (Body)
  useEffect(() => {
    // document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo

    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  return (
    <div>
      <PageFilter />

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
                  onChange={handleSearchChange}
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

            {/* <div
              style={{
                display: "flex",
                padding: "1px 18px",
                justifyContent: "center",
                alignItems: "center",
                gap: "18px",
                flex: 100,
                alignSelf: "stretch",
                borderRadius: "0px 2px 2px 0px",
                background: "#313A49",
                margin: 0, // Elimina el margen
              }}
            >
              <div
                style={{
                  color: "#D4DAE3",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Buscar
              </div>
            </div> */}
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
            <div
              style={{
                color: "#000005",
                // fontFamily: "DM Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "155%",
                marginLeft: -55,
              }}
            >
              Enfriadores
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
                  {/* {isLoading && filteredCoolers.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 400,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Cargando...
                    </div>
                  )} */}
                  {isLoading == true || filteredCoolers.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 400,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Cargando...
                    </div>
                  ) : (
                    ""
                  )}
                  {!isLoading && (
                    <>
                      {filteredCoolers.length > 0 ? (
                        <Card>
                          <Table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%", // Cambiado a 100% para que la tabla sea receptiva
                              maxWidth: "1000px",
                              // width: "910px",
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
                                  Días sin visita
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
                            <TableBody
                              style={{
                                display: "block",
                                height: "450px",
                                minWidth: "900px",
                                overflowY: "auto",
                              }}
                            >
                              {filteredCoolers
                                .slice(firstIndex, lastIndex)
                                .map((cooler, index) => (
                                  <TableRow
                                    key={index}
                                    style={{
                                      backgroundColor:
                                        index % 2 === 0 ? "#FFF" : "#F4F4F4",
                                      borderBottom: "1px solid #CACACA",
                                      background:
                                        index === highlightedRow
                                          ? "#CCCCCC"
                                          : index % 2 === 0
                                          ? "#FFF"
                                          : "#F4F4F4",
                                    }}
                                    onClick={() => {
                                      navigate(
                                        `/coolerDetail/${cooler.serial_number}`
                                      );
                                      console.log(
                                        `Se hizo clic en la fila con serial_number: ${cooler.serial_number}`
                                      );
                                    }}
                                    onMouseEnter={() =>
                                      setHighlightedRow(index)
                                    }
                                    onMouseLeave={() => setHighlightedRow(-1)}
                                  >
                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        textAlign: "left",
                                        width: "150px",
                                      }}
                                    >
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
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "14px",
                                          }}
                                        >
                                          FUNCIONANDO ---
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        fontSize: "15px",
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
                                        fontSize: "15px",
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
                                        fontSize: "15px",
                                        width: "150px",
                                        textAlign: "left",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          padding: "4px",
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
                                            // fontFamily: "Space Mono",
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            lineHeight: "14px",
                                          }}
                                        >
                                          {" "}
                                          --- DÍAS
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "60px",
                                        textAlign: "left",
                                        width: "150px",
                                      }}
                                    >
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
                                            fontSize: "12px",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            lineHeight: "14px",
                                          }}
                                        >
                                          -----------
                                        </div>
                                      </div>
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
                            <TableFoot>
                              <TableFooterCell>
                                <ExportToExcel
                                  datos={filteredCoolers}
                                  nombre={"Coolers.csv"}
                                />
                              </TableFooterCell>
                            </TableFoot>
                          </Table>
                          <br></br>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end", // Alinea la paginación a la derecha
                              marginTop: "16px", // Espacio superior para separar la paginación de la tabla
                            }}
                          >
                            <PaginationComponent
                              accion={setCurrentPage}
                              totalDatos={filteredCoolers.length}
                              datosPorPagina={datosPorPagina}
                              numero={setNumero}
                            />
                          </div>
                        </Card>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 250,
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          <p>No hay datos de coolers disponibles.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
