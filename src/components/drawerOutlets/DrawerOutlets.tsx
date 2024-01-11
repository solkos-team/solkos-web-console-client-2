import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import MapComponent from "../map";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { fetchCoolers } from "../../utils/apiUtils";
import { CoolerInterface } from "./CoolerInterface";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { ExportToExcel } from "../exportExcel/ExportToExcel";

export default function Drawer({ isOpen, onClose, outletDetails }) {
  const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const { region, route, zone, outlet_id, latitude, longitude, channel } =
    outletDetails;
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const dt = useSelector((state: any) => state.works);
  const pathVerify = () => {
    return dt.length == 0 ? "[]" : JSON.parse(dt);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoolers(pathVerify(), null, outlet_id);
        setCoolersData(data);
      } catch (error) {
        console.error("Error fetching coolers:", error);
      }
    };
    fetchData();
  }, [dt]);

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
        overflowY: "auto", // Agregado para permitir el scroll vertical
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
            padding: "0px 32px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            background: "#FFF",
          }}
        >
          <img
            onClick={onClose}
            src={"../../sampleData/buildings2.png"}
            alt="Descripción de la imagen"
            style={{ width: "60px", height: "60px", cursor: "pointer" }}
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
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  {outletDetails?.outlet_name}
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "2px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "2px",
                    border: "1.5px solid #0F9F67",
                    background: "#FFF",
                  }}
                >
                  {/* <img
                  onClick={onClose}
                  src={"../../sampleData/a.png"}
                  alt="Descripción de la imagen"
                /> */}
                  <IconCircleCheck width={"1rem"} color="#0F9F67" />
                  <div
                    style={{
                      color: "#0F9F67",
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "12px",
                    }}
                  >
                    SIN ACCIONES
                  </div>
                </div>
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {outletDetails.outlet_address || "Sin datos"}
              </div>
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
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Leído por última vez el:
              </div>
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "Inter",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                -- -- ----- ---
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
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "12px",
                    height: "10px",
                  }}
                >
                  -- DÍAS SIN VISITA
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
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
                  fontSize: "10px",
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
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {channel}
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
                  fontSize: "10px",
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
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {region}
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
                  fontSize: "10px",
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
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {route}
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
                  fontSize: "10px",
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
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {zone}
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
                height: "550px",
                padding: "24px",
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
                  <MapComponent latitude={latitude} longitude={longitude} />
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
                      src={"../../sampleData/filled.png"}
                      width={"100%"}
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
                      src={"../../sampleData/pin_filled.png"}
                      width={"24px"}
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
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
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
            gap: "32px",
            padding: "0px 24px",
          }}
        >
          <Card>
            <Table
              style={{
                borderCollapse: "collapse",
                width: "100%", // Cambiado a 100% para que la tabla sea receptiva
                maxWidth: "1000px",
                height: "12rem",
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
                      width: "8rem",
                    }}
                  >
                    Dias sin visita
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{
                      fontSize: ".84rem",
                      textAlign: "left",
                      width: "5rem",
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
              <TableBody
                style={{ display: "block", height: "90%", overflowY: "auto" }}
              >
                {coolersData
                  .slice(firstIndex, lastIndex)
                  .map((cooler, index) => (
                    <TableRow
                      key={index}
                      className="Tabla"
                      onClick={() => {
                        navigate(`/coolerDetail/${cooler.serial_number}`);
                      }}
                    >
                      <TableCell
                        style={{
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "5.8rem",
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
                            width: "fit-content",
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
                              width: "100%",
                              fontSize: ".5rem",
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
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "6.5rem",
                        }}
                      >
                        {cooler.serial_number === ""
                          ? "Sin registro"
                          : cooler.serial_number}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "9rem",
                        }}
                      >
                        {cooler.model_id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "8rem",
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
                            width: "6rem",
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
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "5rem",
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
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: ".84rem",
                          textAlign: "left",
                          width: "8rem",
                          height: "3rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
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
              totalDatos={coolersData.length}
              datosPorPagina={datosPorPagina}
              numero={setNumero}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
