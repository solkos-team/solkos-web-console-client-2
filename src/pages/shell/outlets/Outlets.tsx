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

export default function Outlets() {
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
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setCurrentPage(1);
      fetchData();
    }
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
    filter_by: searchValue,
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("outlets", body, setIsLoading);
      const datos = await data.json();
      // console.log(datos);
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setOutletsData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt, dto, datosPorPagina, currentPage]);

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
            Puntos de venta
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
            Catálogo de los puntos de venta, realiza el seguimiento adecuado
            para cada uno de ellos.
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
              Puntos de Venta
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
                <ExportToExcel
                  datos={filteredOutlets}
                  nombre={"Puntos de Venta"}
                  body={body}
                  component="outlets"
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
              placeholder="Busca por punto de venta"
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
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : outlet.outlet_name === "" ? (
                          "Sin registro"
                        ) : (
                          outlet.outlet_name
                        )}
                      </td>
                      <td data-label="# Enfriadores" title={outlet.num_coolers}>
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : outlet.num_coolers === "" ? (
                          "Sin registro"
                        ) : (
                          outlet.num_coolers
                        )}
                      </td>
                      <td
                        data-label="Última visita"
                        title={outlet.days_without_visitC}
                      >
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
                          </>
                        ) : outlet.days_without_visitC === undefined ||
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
                      </td>
                      <td
                        data-label="CONTROL DE ACTIVOS"
                        title={outlet.priority}
                      >
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
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
                                        "Toma de Decisiones"
                                      ? "1.5px solid #F93448"
                                      : outlet.actionable === "Actualizar Info"
                                      ? "1.5px solid #DA7E05"
                                      : "1.5px solid black",
                                  background: "#FFF",
                                }}
                              >
                                {outlet.actionable === "Visita PdV" ? (
                                  <img
                                    src={"../../sampleData/p.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                ) : outlet.actionable === "Sin Riesgo" ? (
                                  <img
                                    src={"../../sampleData/sn.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                ) : outlet.actionable ===
                                  "Toma de Decisiones" ? (
                                  <img
                                    src={"../../sampleData/a.svg"}
                                    alt="Descripción de la imagen"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                ) : outlet.actionable === "Actualizar Info" ? (
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
                                      outlet.actionable === "Visita PdV"
                                        ? "#DA7E05"
                                        : outlet.actionable === "Sin Riesgo"
                                        ? "#0F9F67"
                                        : outlet.actionable ===
                                          "Toma de Decisiones"
                                        ? "#F93448"
                                        : outlet.actionable ===
                                          "Actualizar Info"
                                        ? "#DA7E05"
                                        : "black",
                                    // fontFamily: "DM Sans",
                                    // fontSize: "1vw",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "14px",
                                  }}
                                >
                                  {outlet.actionable === "Visita PdV"
                                    ? "Visita punto de venta"
                                    : outlet.actionable === "Sin Riesgo"
                                    ? "Sin riesgo"
                                    : outlet.actionable === "Toma de Decisiones"
                                    ? "Acciones urgentes"
                                    : outlet.actionable === "Actualizar Info"
                                    ? "Requiere actualizar ..."
                                    : outlet.actionable}
                                </div>
                              </div>
                            </>
                          </>
                        )}
                      </td>
                      <td data-label="Acciones">
                        {isLoading == true ? (
                          <>
                            <Skeleton height={20} radius="sm" width="90%" />
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
      {selectedOutletDetails && (
        <DrawerO
          opened={opened}
          onClose={close}
          outletDetails={selectedOutletDetails}
        />
      )}
    </div>
  );
}
