import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import Drawer from "../../../components/drawerOutlets/DrawerOutlets";
import { fetchOutlets } from "../../../utils/apiUtils";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import ExcelJS from "exceljs";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { TextInput } from "@mantine/core";

export default function Outlets() {
  interface Outlet {
    outlet_name: string;
    outlet_id: string;
    num_coolers: number;
  }

  const [searchValue, setSearchValue] = useState("");
  const [outletsData, setOutletsData] = useState<Outlet[] | null>(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const filterOutlets = (data, searchQuery) => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery.toLowerCase();
      const outletName = item.outlet_name.toLowerCase();
      const outletId = item.outlet_id.toLowerCase();
      return (
        outletName.includes(searchString) || outletId.includes(searchString)
      );
    });
    return filteredData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOutlets();
        setOutletsData(data);
        console.log(data);
        console.log("Setting isLoading to false after fetching outlets");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching outlets:", error);
      }
    };

    fetchData();
  }, []);

  const filteredOutlets = outletsData
    ? filterOutlets(outletsData, searchValue)
    : [];

  useEffect(() => {
    setNoInfoToShow(filteredOutlets.length === 0);
  }, [filteredOutlets]);

  // Page (Body)
  useEffect(() => {
    // document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo

    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOutletDetails, setSelectedOutletDetails] =
    useState<Outlet | null>(null);

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
            Puntos de venta
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
            Catálogo de los puntos de venta, realiza el seguimiento adecuado
            para cada uno de ellos.
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
                  placeholder="Busca por punto de venta"
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
              Puntos de venta
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
                  {isLoading && filteredOutlets.length === 0 && (
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
                      {filteredOutlets.length > 0 ? (
                        <Card>
                          <Table
                            style={{
                              marginBottom: "20px",
                              borderCollapse: "collapse",
                              // width: "910px",
                              height: "400px",
                            }}
                          >
                            <TableHead style={{ display: "block" }}>
                              <TableRow>
                                <TableHeaderCell
                                  style={{
                                    textAlign: "left",
                                    width: "220px",
                                  }}
                                >
                                  Nombre
                                </TableHeaderCell>
                                <TableHeaderCell
                                  style={{ textAlign: "left", width: "160px" }}
                                >
                                  # Enfriadores
                                </TableHeaderCell>

                                <TableHeaderCell
                                  style={{
                                    textAlign: "left",
                                    paddingRight: "9px",
                                    width: "160px",
                                  }}
                                >
                                  Días sin visita
                                </TableHeaderCell>
                                <TableHeaderCell
                                  style={{
                                    textAlign: "left",
                                    paddingRight: "30px",
                                    width: "160px",
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
                              {filteredOutlets
                                .slice(firstIndex, lastIndex)
                                .map((outlet, index) => (
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
                                      navigate("");
                                    }}
                                    onMouseEnter={() =>
                                      setHighlightedRow(index)
                                    }
                                    onMouseLeave={() => setHighlightedRow(-1)}
                                  >
                                    <TableCell
                                      style={{
                                        fontSize: "15px",
                                        textAlign: "left",
                                        width: "250px",
                                      }}
                                    >
                                      {outlet.outlet_name === ""
                                        ? "Sin registro"
                                        : outlet.outlet_name}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        fontSize: "15px",
                                        textAlign: "left",
                                        width: "120px",
                                      }}
                                    >
                                      {outlet.num_coolers === ""
                                        ? "Sin registro"
                                        : outlet.num_coolers}
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        fontSize: "15px",
                                        textAlign: "left",
                                        width: "120px",
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
                                          width: "60px",
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
                                          - DÍAS
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
                                        paddingRight: "70px",
                                        textAlign: "left",
                                        width: "150px",
                                        paddingLeft: "10px",
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
                                          marginRight: -70,
                                        }}
                                      >
                                        <Link
                                          to="/coolerDetail"
                                          onClick={() => {
                                            setSelectedOutletDetails(outlet);
                                            setIsDrawerOpen(true);
                                          }}
                                        >
                                          <div
                                            style={{
                                              color: "#3E83FF",
                                              fontSize: "14px",
                                              fontStyle: "normal",
                                              fontWeight: 400,
                                              lineHeight: "20px",
                                              display: "flex",
                                              marginRight: "66px",
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
                                  datos={filteredOutlets}
                                  nombre={"Outlets.csv"}
                                />
                              </TableFooterCell>
                            </TableFoot>
                          </Table>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end", // Alinea la paginación a la derecha
                              marginTop: "16px", // Espacio superior para separar la paginación de la tabla
                            }}
                          >
                            <PaginationComponent
                              accion={setCurrentPage}
                              totalDatos={filteredOutlets.length}
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
                          <p>No hay datos de outlets disponibles.</p>
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
      {selectedOutletDetails && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedOutletDetails(null);
          }}
          outletDetails={selectedOutletDetails}
        />
      )}
    </div>
  );
}
