import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import Drawer from "../../../components/drawerOutlets/DrawerOutlets";
import { fetchUniversal, fetchUniversalTables } from "../../../utils/apiUtils";
import {
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Card, Table } from "@mantine/core";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { MantineProvider, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import { CoolerInterface } from "../../../components/drawerOutlets/CoolerInterface";
import { SkeletonTableOutlets } from "../../../components/skeletonTableOutlets/SkeletonTableOutlets";

export default function Outlets() {
  const [searchValue, setSearchValue] = useState("");
  const [outletsData, setOutletsData] = useState<CoolerInterface[]>();
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(25);
  const navigate = useNavigate();
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [totalData, setTotalData] = useState<String | number>(0)

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
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = {
    customer: dto,
    page_size: Number(datosPorPagina),
    page_number: currentPage,
    path: pathVerify(),
  };
  const fetchData = async () => {
    try {
      // const data = await fetchOutlets(pathVerify(), setIsLoading);
      const data = await fetchUniversalTables("outlets", body, setIsLoading);
      const datos = await data.json()
      const totalData = data.headers.get('content-length')
      setTotalData(Number(totalData) || 0)
      setOutletsData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt, dto, datosPorPagina,currentPage]);

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
    useState<CoolerInterface | null>(null);
  outletsData == undefined ? [] : outletsData
  totalData == undefined ? 0 : totalData
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
            <div style={{ display: "flex", width: "470%", marginLeft: -55 }}>
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
                Puntos de Venta
              </div>
              <div style={{ marginLeft: "auto" }}>
                <ExportToExcel
                  datos={filteredOutlets}
                  nombre={"Puntos de Venta"}
                />
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
                            Última visita
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
                      {isLoading == true ? (
                        <>
                          <br></br>
                          <br></br>
                          <div style={{ marginBottom: -40 }}></div>
                          <SkeletonTableOutlets></SkeletonTableOutlets>
                        </>
                      ) : (
                        ""
                      )}
                      {!isLoading && (
                        <>
                          {outletsData == undefined ? [] : outletsData ? (
                            <TableBody
                              style={{
                                display: "block",
                                height: "450px",
                                minWidth: "900px",
                                overflowY: "auto",
                              }}
                            >
                              {outletsData
                                // .slice(firstIndex, lastIndex)
                                .map((outlet, index) => (
                                  <TableRow
                                    className="Tabla"
                                    key={index}
                                    onClick={() => {
                                      navigate("");
                                    }}
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
                                      {outlet.days_without_visitC ===
                                        undefined ||
                                        outlet.days_without_visitC === "" ? (
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
                                              {outlet.days_without_visitC}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        paddingRight: "30px",
                                        textAlign: "center",
                                        fontSize: "15px",
                                        width: "78px",
                                      }}
                                    >
                                      {outlet.priority === undefined ||
                                        outlet.priority === "" ? (
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
                                                fontSize: "12px",
                                                fontStyle: "normal",
                                                fontWeight: 600,
                                                lineHeight: "12px",
                                              }}
                                            >
                                              {" "}
                                              {outlet.priority}
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
                                          to="/home/coolerDetail"
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
                              <p>
                                No hay datos de puntos de venta disponibles.
                              </p>
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
