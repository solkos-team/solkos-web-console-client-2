import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import ExcelJS from "exceljs";
import { useSelector,useDispatch } from "react-redux";
import { addPath } from "../../../app/works";
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
  const dt = useSelector((state:any)=> state.works)  
  console.log('valor inicial works',dt) 
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [coolersDataDeatil, setCoolersDataDeatil] = useState<
    CoolerDetail[] | null
  >(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [highlightedRow, setHighlightedRow] = useState(-1);
  const navigate = useNavigate();
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

  const pathVerify = () =>{
    return (dt.length == 0) ? "[]" : JSON.parse(dt)
  }
  const fetchCoolersFromAPI = async (path) => {
    console.log('path ->',path)
    const url =
      "https://universal-console-server-b7agk5thba-uc.a.run.app/coolers";
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      customer: "KOF",
      class: "STK",
      algorithm: ["INSTALLED"],
      page_size: 100,
      page_number: 1,
      path:path
    };
    console.log(data)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      console.log(data)
      if (!response.ok) {
        throw new Error("Error al obtener los datos de los enfriadores");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }    
  };

  useEffect(() => {    
    
    const fetchData = async () => {
      try {
        
        const data = await fetchCoolersFromAPI(pathVerify());
        setCoolersData(data);
        console.log("Setting isLoading to false after fetching coolers");
        setIsLoading(false); // Set isLoading to false after fetching coolers
      } catch (error) {
        console.error("Error fetching coolers:", error);
      }
      
    };

    fetchData();
  }, [dt]);

  ////////////////////////////////////////////////////////////
  const fetchCoolersFromAPI2 = async (serial_number) => {
    const url = `https://universal-console-server-b7agk5thba-uc.a.run.app/coolers/${serial_number}`;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del enfriador");
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coolersData && coolersData.length > 0) {
          const data = await fetchCoolersFromAPI2(coolersData[0].serial_number);
          setCoolersDataDeatil(data);
          console.log(
            "Setting isLoading to false after fetching cooler details"
          );
          setIsLoading(false); // Set isLoading to false after fetching cooler details
        }
      } catch (error) {
        console.error("Error fetching cooler details:", error);
      }
    };

    fetchData();
  }, [coolersData]);

  /////////////////////////////////////////////////////////////
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
              marginLeft: -80,
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
              marginLeft: -80,
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
                <input
                  value={searchValue}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Busca por..."
                  style={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "28px",
                    width: "400px",
                    paddingRight: "40px",
                    margin: 0, // Elimina el margen
                  }}
                />
                <img
                  src={"../../sampleData/filter.png"}
                  alt="Descripción de la imagen"
                  style={{
                    position: "absolute",
                    right: "10px",
                  }}
                />
              </div>
            </div>

            <div
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
                marginLeft: -80,
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
                marginLeft: -80,
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
                  {isLoading && filteredCoolers.length === 0 && (
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
                  )}
                  {!isLoading && (
                    <>
                      {filteredCoolers.length > 0 ? (
                        <Card>
                          <Table
                            style={{
                              marginBottom: "20px",
                              borderCollapse: "collapse",
                              width: "910px",
                            }}
                          >
                            <TableHead>
                              <TableRow>
                                <TableHeaderCell
                                  style={{
                                    textAlign: "left",
                                  }}
                                >
                                  Estatus
                                </TableHeaderCell>
                                <TableHeaderCell style={{ textAlign: "left" }}>
                                  Serie
                                </TableHeaderCell>
                                <TableHeaderCell style={{ textAlign: "left" }}>
                                  Modelo
                                </TableHeaderCell>
                                <TableHeaderCell
                                  style={{
                                    textAlign: "left",
                                    paddingRight: "9px",
                                  }}
                                >
                                  Días sin visita
                                </TableHeaderCell>
                                <TableHeaderCell
                                  style={{
                                    textAlign: "left",
                                    paddingRight: "30px",
                                  }}
                                >
                                  {" "}
                                  Prioridad
                                </TableHeaderCell>
                                <TableHeaderCell style={{ textAlign: "left" }}>
                                  Acciones
                                </TableHeaderCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredCoolers.map((cooler, index) => (
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
                                  onMouseEnter={() => setHighlightedRow(index)}
                                  onMouseLeave={() => setHighlightedRow(-1)}
                                >
                                  <TableCell
                                    style={{
                                      paddingRight: "30px",
                                      textAlign: "left",
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
                                    }}
                                  >
                                    {cooler.serial_number === ""
                                      ? "Sin registro"
                                      : cooler.serial_number}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      paddingRight: "30px",
                                      fontSize: "15px",
                                      textAlign: "left",
                                    }}
                                  >
                                    {cooler.model_id === ""
                                      ? "Sin registro"
                                      : cooler.model_id}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      paddingRight: "30px",
                                      fontSize: "15px",
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
                                      paddingRight: "30px",
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
                                      paddingRight: "30px",
                                      textAlign: "left",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        // justifyContent: "flex-end",
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
                          </Table>
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
