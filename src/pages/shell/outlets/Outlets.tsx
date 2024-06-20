import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import DrawerO from "../../../components/drawerOutlets/DrawerOutlets";
import { fetchUniversalTables } from "../../../utils/apiUtils";
import { Skeleton } from "@mantine/core";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { CoolerInterface } from "../../../interfaces/CoolerInterface";
import { HeaderInsights } from "../insights/Responsive/HeaderInsights";
import { useLocation } from "react-router-dom";
import { TagInput } from "rsuite";
import { tagStyles } from "../../../Functions/pathVerify";

export default function Outlets() {
  const [showTable, setShowTable] = useState(false);
  const [tableViewClicked, setTableViewClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [outletsData, setOutletsData] = useState<CoolerInterface[]>();
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(25);
  const navigate = useNavigate();
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [totalData, setTotalData] = useState<String | number>(0);
  const [tags, setTags] = useState<string[]>([]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     setShowTable(true);
  //     setCurrentPage(1);
  //     if (tableViewClicked) {
  //       fetchData();
  //     }
  //   }
  // };
  const handleTagChange = (newTags) => {
    setTags(newTags);
  };
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter" && tags.length > 0 && event.target.value == "") {
  //     fetchData();
  //   }
  // };
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
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const filter = params.get("filter");
  const filterBy = tags.length > 0 ? tags : filter ? [filter] : [];

  const body = {
    customer: dto,
    page_size: Number(datosPorPagina),
    page_number: currentPage,
    path: pathVerify(),
    filter_by: filterBy,
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("outlets", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setOutletsData(datos);
      setIsLoading(false);
      setShowTable(true);
      // Corrected comparison logic
      if (filter && body.filter_by.includes(filter)) {
        // Execute your conditional code here
      }

      // const tagElements = document.querySelectorAll(
      //   ".rs-picker-tag-list .rs-tag"
      // );
      // tagStyles(datos ?? [], tagElements);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };
  useEffect(() => {
    if (showTable) {
      fetchData();
    }
  }, [showTable, currentPage, datosPorPagina]);

  const filteredOutlets = outletsData
    ? filterOutlets(outletsData, searchValue)
    : [];

  useEffect(() => {
    setNoInfoToShow(filteredOutlets.length === 0);
  }, [filteredOutlets]);

  // Page (Body)
  useEffect(() => {
    document.addEventListener("click", function (event) {
      const element = event.target as HTMLElement;
      if (
        (isDrawerOpen == true &&
          element.className == "mantine-134h5mf mantine-AppShell-main") ||
        element.className == "principalOutlets"
      ) {
        setIsDrawerOpen(false);
      }
    });
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOutletDetails, setSelectedOutletDetails] =
    useState<CoolerInterface | null>(null);
  outletsData == undefined ? [] : outletsData;
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
        </tr>
      );
    }
    return rows;
  };

  useEffect(() => {
    if (filter) {
      setSearchValue(filter);
      setShowTable(true);
      setTableViewClicked(true);
    }
  }, [filter]);

  useEffect(() => {
    if (location.pathname === "/home/outlets") {
      localStorage.removeItem("searchTags");
    }
  }, [location]);

  return (
    <section>
      <section className="pdv_pathfilter">
        <PageFilter status={isLoading} />
      </section>
      <section className="pdv_principal">
        <section className="pdv_titleInfo">
          <div className="outlets_title_h1">Puntos de venta</div>
        </section>
        <section className="pdv_pathTable">
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
              <TagInput
                value={filterBy}
                onChange={handleTagChange}
                // onKeyDown={handleKeyDown}
                placeholder="Busca por Id Pvd/ PdV"
                style={{
                  fontSize: "0.8rem",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "1.8rem",
                  width: "100%",
                  paddingRight: "10rem",
                  borderRadius: "4px",
                  color: "#88888B",
                  border: "1px solid #ccc",
                  textAlign: "left",
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
            </div>{" "}
            <br />
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <button
                style={{
                  background: "#ED5079",
                  color: "white",
                  fontSize: ".85rem",
                }}
                onClick={fetchData} // Llama a fetchData al hacer clic
              >
                Buscar PdV
              </button>
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
            </div>
          </div>
          <br></br>
          <br></br>

          {showTable && (
            <>
              <section className="pdv_table">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col"># Enfriadores</th>
                      <th scope="col">Última visita</th>
                      <th scope="col">CONTROL DE ACTIVOS</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  {outletsData != undefined ? (
                    <tbody>
                      {outletsData
                        // .slice(firstIndex, lastIndex)
                        .map((outlet, index) => (
                          <tr key={index}>
                            <td data-label="Nombre" title={outlet.outlet_name}>
                              {isLoading == true ? (
                                <>
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
                                </>
                              ) : outlet.outlet_name === "" ? (
                                "Sin registro"
                              ) : (
                                outlet.outlet_name
                              )}
                            </td>
                            <td
                              data-label="# Enfriadores"
                              title={outlet.num_coolers}
                            >
                              {isLoading == true ? (
                                <>
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
                                </>
                              ) : outlet.num_coolers === "" ? (
                                "Sin registro"
                              ) : (
                                outlet.num_coolers
                              )}
                            </td>
                            <td
                              data-label="Última visita"
                              title={outlet.last_read}
                            >
                              {isLoading == true ? (
                                <>
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
                                </>
                              ) : outlet.last_read === undefined ||
                                outlet.last_read === null ? (
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
                                      {new Date(
                                        outlet.last_read
                                      ).toLocaleDateString("es-MX", {
                                        timeZone: "UTC",
                                      })}
                                    </div>
                                  </div>
                                </>
                              )}
                            </td>
                            <td
                              data-label="CONTROL DE ACTIVOS"
                              title={outlet.priority}
                            >
                              {isLoading == true ? (
                                <>
                                  <Skeleton
                                    height={20}
                                    radius="sm"
                                    width="90%"
                                  />
                                </>
                              ) : outlet.actionable === undefined ||
                                outlet.actionable === "" ? (
                                "Sin registro"
                              ) : (
                                <>
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
                                          outlet.actionable === "Visita PdV"
                                            ? "1.5px solid #DA7E05"
                                            : outlet.actionable === "Sin Riesgo"
                                            ? "1.5px solid #0F9F67"
                                            : outlet.actionable ===
                                                "Toma de Decisiones" ||
                                              outlet.actionable ===
                                                "Acciones urgentes"
                                            ? "1.5px solid #F93448"
                                            : outlet.actionable ===
                                              "Actualizar Info"
                                            ? "1.5px solid #DA7E05"
                                            : outlet.actionable ===
                                                "Actualizar dato" ||
                                              outlet.actionable ===
                                                "Datos faltantes" ||
                                              outlet.actionable ===
                                                "Monitoreo" ||
                                              outlet.actionable === "Movimiento"
                                            ? "1.5px solid #1864AB"
                                            : outlet.actionable ===
                                                "Solicitar serv. correctivo" ||
                                              outlet.actionable ===
                                                "Solicitar serv. preventivos" ||
                                              outlet.actionable ===
                                                "Seguimiento a equipo" ||
                                              outlet.actionable === "Visita PdV"
                                            ? "1.5px solid #E67700"
                                            : outlet.actionable ===
                                              "Visita PdV prioritaria"
                                            ? "1.5px solid #C92A2A"
                                            : "1.5px solid black",
                                        background: "#FFF",
                                      }}
                                    >
                                      {outlet.actionable === "Visita PdV" &&
                                      dto != "KOF Colombia" ? (
                                        <img
                                          src={"../../sampleData/p.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable === "Sin Riesgo" ? (
                                        <img
                                          src={"../../sampleData/sn.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                          "Toma de Decisiones" ||
                                        outlet.actionable ===
                                          "Acciones urgentes" ? (
                                        <img
                                          src={"../../sampleData/a.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                        "Actualizar Info" ? (
                                        <img
                                          src={"../../sampleData/p.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                        "Actualizar dato" ? (
                                        <img
                                          src={"../../sampleData/actDat.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                        "Datos faltantes" ? (
                                        <img
                                          src={"../../sampleData/datFal.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable === "Monitoreo" ? (
                                        <img
                                          src={"../../sampleData/Mont.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable === "Movimiento" ? (
                                        <img
                                          src={"../../sampleData/mov1.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                          "Solicitar serv. correctivo" ||
                                        outlet.actionable ===
                                          "Solicitar serv. preventivos" ? (
                                        <img
                                          src={"../../sampleData/serCP.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                        "Seguimiento a equipo" ? (
                                        <img
                                          src={"../../sampleData/seguE.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable === "Visita PdV" ? (
                                        <img
                                          src={"../../sampleData/visitap.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : outlet.actionable ===
                                        "Visita PdV prioritaria" ? (
                                        <img
                                          src={"../../sampleData/visitapd.svg"}
                                          alt="Descripción de la imagen"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}

                                      <div
                                        style={{
                                          color:
                                            outlet.actionable === "Visita PdV"
                                              ? "#DA7E05"
                                              : outlet.actionable ===
                                                "Sin Riesgo"
                                              ? "#0F9F67"
                                              : outlet.actionable ===
                                                  "Toma de Decisiones" ||
                                                outlet.actionable ===
                                                  "Acciones urgentes"
                                              ? "#F93448"
                                              : outlet.actionable ===
                                                "Actualizar Info"
                                              ? "#DA7E05"
                                              : outlet.actionable ===
                                                  "Actualizar dato" ||
                                                outlet.actionable ===
                                                  "Datos faltantes" ||
                                                outlet.actionable ===
                                                  "Monitoreo" ||
                                                outlet.actionable ===
                                                  "Movimiento"
                                              ? "#1864AB"
                                              : outlet.actionable ===
                                                  "Solicitar serv. correctivo" ||
                                                outlet.actionable ===
                                                  "Solicitar serv. preventivos" ||
                                                outlet.actionable ===
                                                  "Seguimiento a equipo" ||
                                                outlet.actionable ===
                                                  "Visita PdV"
                                              ? "#E67700"
                                              : outlet.actionable ===
                                                "Visita PdV prioritaria"
                                              ? "#C92A2A"
                                              : "black",
                                          // fontFamily: "DM Sans",
                                          // fontSize: "1vw",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          lineHeight: "14px",
                                        }}
                                      >
                                        {outlet.actionable}
                                      </div>
                                    </div>
                                  </>
                                </>
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
                                <div
                                  onClick={() => {
                                    setSelectedOutletDetails(outlet);
                                    open();
                                  }}
                                >
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
                        fontSize: "18px",
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
        </section>
        {selectedOutletDetails && (
          <DrawerO
            opened={opened}
            onClose={close}
            outletDetails={selectedOutletDetails}
          />
        )}
      </section>
    </section>
  );
}

// import React, { useState, useEffect } from "react";
// import PageFilter from "../../../components/pageFilter";
// import { useNavigate } from "react-router-dom";
// import { IconArrowRight } from "@tabler/icons-react";
// import DrawerO from "../../../components/drawerOutlets/DrawerOutlets";
// import { fetchUniversalTables } from "../../../utils/apiUtils";
// import { Skeleton } from "@mantine/core";
// import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
// import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
// import { TextInput } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { useSelector } from "react-redux";
// import { CoolerInterface } from "../../../interfaces/CoolerInterface";
// import { HeaderInsights } from "../insights/Responsive/HeaderInsights";
// import { useLocation } from "react-router-dom";

// export default function Outlets() {
//   const [searchValue, setSearchValue] = useState("");
//   const [opened, { open, close }] = useDisclosure(false);
//   const [outletsData, setOutletsData] = useState<CoolerInterface[]>();
//   const [noInfoToShow, setNoInfoToShow] = useState(false);
//   const [isLoading, setIsLoading] = useState<Boolean>(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [datosPorPagina, setNumero] = useState(25);
//   const navigate = useNavigate();
//   const lastIndex = currentPage * Number(datosPorPagina);
//   const firstIndex = lastIndex - Number(datosPorPagina);
//   const dt = useSelector((state: any) => state.works);
//   const dto = useSelector((state: any) => state.organization);
//   const [totalData, setTotalData] = useState<String | number>(0);
//   const handleSearchChange = (event) => {
//     setSearchValue(event.target.value);
//     setNoInfoToShow(false);
//   };
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       setCurrentPage(1);
//       fetchData();
//     }
//   };
//   const filterOutlets = (data, searchQuery) => {
//     const filteredData = data.filter((item) => {
//       const searchString = searchQuery.toLowerCase();
//       const outletName = item.outlet_name.toLowerCase();
//       const outletId = item.outlet_id.toLowerCase();
//       return (
//         outletName.includes(searchString) || outletId.includes(searchString)
//       );
//     });
//     return filteredData;
//   };
//   const pathVerify = () => {
//     return dt.length == 0 ? [] : JSON.parse(dt);
//   };
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const filter = params.get("filter");
//   const body = {
//     customer: dto,
//     page_size: Number(datosPorPagina),
//     page_number: currentPage,
//     path: pathVerify(),
//     filter_by: searchValue.split(",") || (filter ? [filter] : []),
//   };
//   const fetchData = async () => {
//     try {
//       const data = await fetchUniversalTables("outlets", body, setIsLoading);
//       const datos = await data.json();
//       const totalData = data.headers.get("pagination-count");
//       setTotalData(Number(totalData) || 0);
//       setOutletsData(datos);
//       setIsLoading(false);
//       // **************
//       if (filter && body.filter_by.includes(filter)) {
//       }
//     } catch (error) {
//       console.error("Error fetching outlets:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [dt, dto, datosPorPagina, currentPage]);
//   const filteredOutlets = outletsData
//     ? filterOutlets(outletsData, searchValue)
//     : [];
//   useEffect(() => {
//     setNoInfoToShow(filteredOutlets.length === 0);
//   }, [filteredOutlets]);
//   // Page (Body)
//   useEffect(() => {
//     document.addEventListener("click", function (event) {
//       const element = event.target as HTMLElement;
//       if (
//         (isDrawerOpen == true &&
//           element.className == "mantine-134h5mf mantine-AppShell-main") ||
//         element.className == "principalOutlets"
//       ) {
//         setIsDrawerOpen(false);
//       }
//     });
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedOutletDetails, setSelectedOutletDetails] =
//     useState<CoolerInterface | null>(null);
//   outletsData == undefined ? [] : outletsData;
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
//         </tr>
//       );
//     }
//     return rows;
//   };
//   return (
//     <section className="pdv_principal" style={{ marginTop: -50 }}>
//       <section className="pdv_pathfilter">
//         <PageFilter status={isLoading} />
//       </section>
//       <section className="pdv_titleInfo" style={{ marginLeft: -50 }}>
//         <div className="insights_title_h1">Puntos de venta</div>
//         <p className="insights_title_p">
//           Catálogo de los puntos de venta, realiza el seguimiento adecuado para
//           cada uno de ellos.
//         </p>
//         <br></br>
//         <HeaderInsights
//           title={"Puntos de venta"}
//           description={
//             "Catálogo de los puntos de venta, realiza el seguimiento adecuado para cada uno de ellos"
//           }
//         />
//         <p className="insights_title_p" style={{ marginTop: -10 }}>
//           Tabla
//         </p>
//         <div className="pdv_title_p">
//           <p style={{ fontSize: "14px", color: "#000005", marginTop: -10 }}>
//             Puntos de Venta
//           </p>
//           <ExportToExcel
//             datos={filteredOutlets}
//             nombre={"Puntos de Venta"}
//             body={body}
//             component="outlets"
//           />
//         </div>
//       </section>
//       <section className="pdv_pathTable">
//         <TextInput
//           value={searchValue}
//           onChange={(event) => handleSearchChange(event)}
//           onKeyDown={handleKeyDown}
//           type="text"
//           placeholder="Busca por punto de venta"
//           style={{
//             fontSize: "0.8rem",
//             fontStyle: "normal",
//             fontWeight: 500,
//             lineHeight: "1,8rem",
//             width: "100%",
//             paddingRight: "2.5rem",
//             margin: 0,
//             borderRadius: "4px",
//             color: "#88888B",
//           }}
//         />
//         <br />
//         <section className="pdv_table">
//           <table>
//             <thead>
//               <tr>
//                 <th scope="col">Nombre</th>
//                 <th scope="col"># Enfriadores</th>
//                 <th scope="col">Última visita</th>
//                 <th scope="col">CONTROL DE ACTIVOS</th>
//                 <th scope="col">Acciones</th>
//               </tr>
//             </thead>
//             {outletsData != undefined ? (
//               <tbody>
//                 {outletsData
//                   // .slice(firstIndex, lastIndex)
//                   .map((outlet, index) => (
//                     <tr key={index}>
//                       <td data-label="Nombre" title={outlet.outlet_name}>
//                         {isLoading == true ? (
//                           <>
//                             <Skeleton height={20} radius="sm" width="90%" />
//                           </>
//                         ) : outlet.outlet_name === "" ? (
//                           "Sin registro"
//                         ) : (
//                           outlet.outlet_name
//                         )}
//                       </td>
//                       <td data-label="# Enfriadores" title={outlet.num_coolers}>
//                         {isLoading == true ? (
//                           <>
//                             <Skeleton height={20} radius="sm" width="90%" />
//                           </>
//                         ) : outlet.num_coolers === "" ? (
//                           "Sin registro"
//                         ) : (
//                           outlet.num_coolers
//                         )}
//                       </td>
//                       <td data-label="Última visita" title={outlet.last_read}>
//                         {isLoading == true ? (
//                           <>
//                             <Skeleton height={20} radius="sm" width="90%" />
//                           </>
//                         ) : outlet.last_read === undefined ||
//                           outlet.last_read === null ? (
//                           "Sin registro"
//                         ) : (
//                           <>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 padding: "4px",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 gap: "4px",
//                                 borderRadius: "2px",
//                                 background: "#D4DAE3",
//                                 width: "60px",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   color: "#313A49",
//                                   // fontFamily: "Space Mono",
//                                   fontSize: "12px",
//                                   fontStyle: "normal",
//                                   fontWeight: 400,
//                                   lineHeight: "14px",
//                                 }}
//                               >
//                                 {" "}
//                                 {new Date(outlet.last_read).toLocaleDateString(
//                                   "es-MX",
//                                   { timeZone: "UTC" }
//                                 )}
//                               </div>
//                             </div>
//                           </>
//                         )}
//                       </td>
//                       <td
//                         data-label="CONTROL DE ACTIVOS"
//                         title={outlet.priority}
//                       >
//                         {isLoading == true ? (
//                           <>
//                             <Skeleton height={20} radius="sm" width="90%" />
//                           </>
//                         ) : outlet.actionable === undefined ||
//                           outlet.actionable === "" ? (
//                           "Sin registro"
//                         ) : (
//                           <>
//                             <>
//                               <div
//                                 style={{
//                                   width: "fit-content",
//                                   display: "flex",
//                                   padding: "4px",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   gap: "4px",
//                                   borderRadius: "2px",
//                                   border:
//                                     outlet.actionable === "Visita PdV"
//                                       ? "1.5px solid #DA7E05"
//                                       : outlet.actionable === "Sin Riesgo"
//                                       ? "1.5px solid #0F9F67"
//                                       : outlet.actionable ===
//                                           "Toma de Decisiones" ||
//                                         outlet.actionable ===
//                                           "Acciones urgentes"
//                                       ? "1.5px solid #F93448"
//                                       : outlet.actionable === "Actualizar Info"
//                                       ? "1.5px solid #DA7E05"
//                                       : outlet.actionable ===
//                                           "Actualizar dato" ||
//                                         outlet.actionable ===
//                                           "Datos faltantes" ||
//                                         outlet.actionable === "Monitoreo" ||
//                                         outlet.actionable === "Movimiento"
//                                       ? "1.5px solid #1864AB"
//                                       : outlet.actionable ===
//                                           "Solicitar serv. correctivo" ||
//                                         outlet.actionable ===
//                                           "Solicitar serv. preventivos" ||
//                                         outlet.actionable ===
//                                           "Seguimiento a equipo" ||
//                                         outlet.actionable === "Visita PdV"
//                                       ? "1.5px solid #E67700"
//                                       : outlet.actionable ===
//                                         "Visita PdV prioritaria"
//                                       ? "1.5px solid #C92A2A"
//                                       : "1.5px solid black",
//                                   background: "#FFF",
//                                 }}
//                               >
//                                 {outlet.actionable === "Visita PdV" &&
//                                 dto != "KOF Colombia" ? (
//                                   <img
//                                     src={"../../sampleData/p.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Sin Riesgo" ? (
//                                   <img
//                                     src={"../../sampleData/sn.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable ===
//                                     "Toma de Decisiones" ||
//                                   outlet.actionable === "Acciones urgentes" ? (
//                                   <img
//                                     src={"../../sampleData/a.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Actualizar Info" ? (
//                                   <img
//                                     src={"../../sampleData/p.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Actualizar dato" ? (
//                                   <img
//                                     src={"../../sampleData/actDat.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Datos faltantes" ? (
//                                   <img
//                                     src={"../../sampleData/datFal.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Monitoreo" ? (
//                                   <img
//                                     src={"../../sampleData/Mont.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Movimiento" ? (
//                                   <img
//                                     src={"../../sampleData/mov1.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable ===
//                                     "Solicitar serv. correctivo" ||
//                                   outlet.actionable ===
//                                     "Solicitar serv. preventivos" ? (
//                                   <img
//                                     src={"../../sampleData/serCP.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable ===
//                                   "Seguimiento a equipo" ? (
//                                   <img
//                                     src={"../../sampleData/seguE.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable === "Visita PdV" ? (
//                                   <img
//                                     src={"../../sampleData/visitap.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : outlet.actionable ===
//                                   "Visita PdV prioritaria" ? (
//                                   <img
//                                     src={"../../sampleData/visitapd.svg"}
//                                     alt="Descripción de la imagen"
//                                     style={{ width: "15px", height: "15px" }}
//                                   />
//                                 ) : (
//                                   ""
//                                 )}
//                                 <div
//                                   style={{
//                                     color:
//                                       outlet.actionable === "Visita PdV"
//                                         ? "#DA7E05"
//                                         : outlet.actionable === "Sin Riesgo"
//                                         ? "#0F9F67"
//                                         : outlet.actionable ===
//                                             "Toma de Decisiones" ||
//                                           outlet.actionable ===
//                                             "Acciones urgentes"
//                                         ? "#F93448"
//                                         : outlet.actionable ===
//                                           "Actualizar Info"
//                                         ? "#DA7E05"
//                                         : outlet.actionable ===
//                                             "Actualizar dato" ||
//                                           outlet.actionable ===
//                                             "Datos faltantes" ||
//                                           outlet.actionable === "Monitoreo" ||
//                                           outlet.actionable === "Movimiento"
//                                         ? "#1864AB"
//                                         : outlet.actionable ===
//                                             "Solicitar serv. correctivo" ||
//                                           outlet.actionable ===
//                                             "Solicitar serv. preventivos" ||
//                                           outlet.actionable ===
//                                             "Seguimiento a equipo" ||
//                                           outlet.actionable === "Visita PdV"
//                                         ? "#E67700"
//                                         : outlet.actionable ===
//                                           "Visita PdV prioritaria"
//                                         ? "#C92A2A"
//                                         : "black",
//                                     // fontFamily: "DM Sans",
//                                     // fontSize: "1vw",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "14px",
//                                   }}
//                                 >
//                                   {outlet.actionable}
//                                 </div>
//                               </div>
//                             </>
//                           </>
//                         )}
//                       </td>
//                       <td data-label="Acciones">
//                         {isLoading == true ? (
//                           <>
//                             <Skeleton height={20} radius="sm" width="90%" />
//                           </>
//                         ) : (
//                           <div
//                             onClick={() => {
//                               setSelectedOutletDetails(outlet);
//                               open();
//                             }}
//                           >
//                             <div
//                               style={{
//                                 color: "#3E83FF",
//                                 fontSize: "0.8rem",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 display: "flex",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Ver más
//                               <IconArrowRight
//                                 style={{
//                                   color: "#3E83FF",
//                                   width: "1.0rem",
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
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
//                   fontSize: "18px",
//                 }}
//               >
//                 <p>Sin información para mostrar.</p>
//               </div>
//             )}
//           </table>
//           <br />
//         </section>
//       </section>
//       {selectedOutletDetails && (
//         <DrawerO
//           opened={opened}
//           onClose={close}
//           outletDetails={selectedOutletDetails}
//         />
//       )}
//     </section>
//   );
// }
