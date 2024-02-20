import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconDownload, IconArrowRight } from "@tabler/icons-react";
import DrawerO from "../../../components/drawerOutlets/DrawerOutlets";
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
import { Card, Table,Skeleton } from "@mantine/core";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { MantineProvider, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { CoolerInterface } from "../../../interfaces/CoolerInterface";
import { SkeletonTableOutlets } from "../../../components/skeletonTableOutlets/SkeletonTableOutlets";

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
      // const data = await fetchOutlets(pathVerify(), setIsLoading);
      const data = await fetchUniversalTables("outlets", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("content-length");
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
    // document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo
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
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOutletDetails, setSelectedOutletDetails] =
    useState<CoolerInterface | null>(null);
  outletsData == undefined ? [] : outletsData;
  totalData == undefined ? 0 : totalData;
  const isloadingData = () => {
    let rows:any = []
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
              {<><Skeleton height={8} radius="xl" width="100%" /></>}
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
            Catálogo de los puntos de venta, realiza el seguimiento adecuado para cada uno de ellos.

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
              Puntos de Venta
            </h1>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <div>
                <ExportToExcel datos={filteredOutlets} nombre={"Puntos de Venta"} />
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
        <section style={{          
          padding: "0px 0rem",
          marginLeft: -55,
          width: "100%",
          height : "30rem",
          overflowY:"auto"
        }} >
          <table>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col"># Enfriadores</th>
                <th scope="col">Última visita</th>
                <th scope="col">Prioridad</th>
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
                            {
                              isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                            outlet.outlet_name === ""
                              ? "Sin registro"
                              : outlet.outlet_name}
                          </td>
                          <td data-label="# Endriadores" title={outlet.num_coolers}>
                            {
                              isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                            outlet.num_coolers === ""
                              ? "Sin registro"
                              : outlet.num_coolers}
                          </td>
                          <td data-label="Última visita" title={outlet.days_without_visitC}>
                            {
                              isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                            outlet.days_without_visitC ===
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
                          </td>
                          <td data-label="Prioridad" title={outlet.priority}>
                            {
                              isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                            outlet.priority === undefined ||
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
                          </td>
                          <td data-label="Acciones">
                            {
                              isLoading == true ? <><Skeleton height={8} radius="xl" width="100%"/></> :
                            <div                              
                              // onClick={openDrawer}
                              // onClick={toggleDrawerEdit}
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
                                  // lineHeight: "20px",
                                  display: "flex",
                                  // marginLeft: "50px",
                                  // marginRight: "50px",
                                  cursor:"pointer"
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
        <section style={{display:"flex",flexDirection:"column" ,width:"100%"}}>
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
          // onClose={() => {
          //   setIsDrawerOpen(false);
          //   setSelectedOutletDetails(null);
          // }}
          onClose={close}
          outletDetails={selectedOutletDetails}
        />
      )}
    </div>
  );
}
