// import React, { useState, useEffect } from "react";
// import { tableauFetch } from "../../../utils/apiUtils";
// import { useSelector } from "react-redux";
// import TableauReport from "tableau-react";
// import PageFilter from "../../../components/pageFilter";
// import { Loader, Tabs } from "@mantine/core";
// import { redirect, useNavigate } from "react-router-dom";

// export default function Panel() {
//   const navigate = useNavigate();

//   const [data, setData] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<string>("first");
//   const [tabsEnabled, setTabsEnabled] = useState(true);
//   const URL = `https://us-central1-imberalink-238816.cloudfunctions.net/get-trusted-ticket-cors`;
//   const dt = useSelector((state: any) => state.works);
//   const dto = useSelector((state: any) => state.organization);

//   function pathVerify() {
//     return dt.length === 0 ? [] : JSON.parse(dt);
//   }
//   const verifiedPath = pathVerify();
//   const region = verifiedPath[0] || "";
//   const zone = verifiedPath[1] || "";
//   const operative_unit = verifiedPath[2] || "";
//   const route = verifiedPath[3] || "";

//   const fetchToken = async () => {
//     try {
//       const data = await tableauFetch(URL, setIsLoading);
//       const datos = await data;
//       setData(datos);
//       setIsLoading(false);
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       console.error(error);
//       setError("Sin conexión a internet.");
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchToken();
//   }, [region, zone, operative_unit, route]);

//   useEffect(() => {
//     if (
//       dto !== "KOF" &&
//       dto !== "KOF Colombia" &&
//       dto !== "KOF Guatemala" &&
//       dto !== "ECO"
//     ) {
//       navigate("/home");
//     }
//   }, [navigate, dto]);
//   useEffect(() => {
//     if (dto === "CALL CENTER") {
//       navigate("/home/clt_callCenter");
//     }
//   }, [navigate, dto]);

//   useEffect(() => {
//     const handleTabChange = async (tab: string) => {
//       // console.log("Current tab:", tab);
//       setActiveTab(tab);
//       await fetchToken();
//       setTabsEnabled(false);
//       const timer = setTimeout(() => {
//         setTabsEnabled(true);
//       }, 10000);
//       return () => clearTimeout(timer);
//     };
//     handleTabChange(activeTab);
//   }, [activeTab, dto, dt]);

//   const options = {
//     height: "1200px",
//     width: "100%",
//   };
//   const parameters = {
//     region: region,
//     management_zone: zone,
//     operative_unit: operative_unit,
//     route: route,
//   };
//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   return (
//     <section>
//       <PageFilter />
//       <br />
//       <div
//         style={{
//           display: "flex",
//           padding: "16px",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           alignSelf: "stretch",
//         }}
//       >
//         <text
//           style={{
//             color: "#000",
//             fontSize: "1.5rem",
//             fontWeight: 700,
//             lineHeight: "140%",
//             marginLeft: -55,
//           }}
//         >
//           Tableros
//         </text>
//       </div>
//       {dto === "KOF" ? (
//         <>
//           <div>
//             <Tabs
//               color="teal"
//               value={activeTab || "first"} // Valor predeterminado
//               onTabChange={handleTabChange}
//               style={{ width: "94%" }}
//             >
//               <Tabs.List>
//                 <Tabs.Tab
//                   value="first"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   {/* <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   /> */}
//                   Detalle de Rutas
//                 </Tabs.Tab>
//                 {/* <Tabs.Tab
//                   value="second"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Estatus Vault - Iniciativa Secop
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="third"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   KPI's Históricos
//                 </Tabs.Tab> */}
//               </Tabs.List>
//               {isLoading ? (
//                 <div style={{ marginTop: 30 }}>
//                   <Loader color="gray" size="xs" />
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Tabs.Panel value="first">
//                     <>
//                       {dto === "KOF" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/KOF/Detalle_Rutas?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>

//                   {/* <Tabs.Panel value="second">
//                     <>
//                       {dto === "KOF" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/KOF/Vault-Secop?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="third">
//                     <>
//                       {dto === "KOF" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/KOF/KPIsHistricos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel> */}
//                 </div>
//               )}
//             </Tabs>
//           </div>
//         </>
//       ) : dto === "KOF Colombia" ? (
//         <>
//           <div>
//             <Tabs
//               color="teal"
//               value={activeTab || "first"} // Valor predeterminado
//               onTabChange={handleTabChange}
//               style={{ width: "94%" }}
//             >
//               <Tabs.List className="tabs-list">
//                 <Tabs.Tab
//                   value="first"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Actividad del parque
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="second"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Control activos
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="third"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Lect Gerente
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="fourth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   % Parque reparado
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="fifth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Cumplimiento mto
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="sixth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Cumplimiento mto sucursal
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="seventh"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Cumplimiento mto piso
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="eighth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Tiempo respuesta
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="ninth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Reincidencia
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="tenth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Equipos reincidentes
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="eleventh"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Detalle O.S
//                 </Tabs.Tab>
//                 <Tabs.Tab
//                   value="twelfth"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   O.S por activo
//                 </Tabs.Tab>
//               </Tabs.List>
//               {isLoading ? (
//                 <div style={{ marginTop: 30 }}>
//                   <Loader color="gray" size="xs" />
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Tabs.Panel value="first">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Actividadparque/ActividaddelParque?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>

//                   <Tabs.Panel value="second">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Controlactivos/ControlActivos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="third">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Lect_Gerente-Zona/Reportes/Solkos/_0?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="fourth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/ParqueReparado/ParqueReparado?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="fifth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Cumplimientomantenimiento/CumplimientoMtoanual?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="sixth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Cumplimientomtosucursal/CumplimientoMtosucursal?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="seventh">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Cumplimientomtopiso/CumplimientoMtopiso?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="eighth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Tiemporespuesta/TRMAo?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="ninth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Reincidencia/Reincidencia?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="tenth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Equiposreincidentes/Detalleequiposreincidentes?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="eleventh">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/DetalleO_S/DetalleO_SMes?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                   <Tabs.Panel value="twelfth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/O_Sporactivo/O_Sporactivo?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                 </div>
//               )}
//             </Tabs>
//           </div>
//         </>
//       ) : dto === "KOF Guatemala" ? (
//         <>
//           <div>
//             <Tabs
//               color="teal"
//               value={activeTab || "first"} // Valor predeterminado
//               onTabChange={handleTabChange}
//               style={{ width: "94%" }}
//             >
//               <Tabs.List className="tabs-list">
//                 <Tabs.Tab
//                   value="first"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Rutas
//                 </Tabs.Tab>
//               </Tabs.List>
//               {isLoading ? (
//                 <div style={{ marginTop: 30 }}>
//                   <Loader color="gray" size="xs" />
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Tabs.Panel value="first">
//                     <>
//                       {dto === "KOF Guatemala" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/KOFGuatemala/Detalle_Rutas?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                 </div>
//               )}
//             </Tabs>
//           </div>
//         </>
//       ) : dto === "ECO" ? (
//         <>
//           <div>
//             <Tabs
//               color="teal"
//               value={activeTab || "first"} // Valor predeterminado
//               onTabChange={handleTabChange}
//               style={{ width: "94%" }}
//             >
//               <Tabs.List className="tabs-list">
//                 <Tabs.Tab
//                   value="first"
//                   style={{ fontSize: ".9vw" }}
//                   disabled={!tabsEnabled}
//                 >
//                   Actividad del parque
//                 </Tabs.Tab>
//               </Tabs.List>
//               {isLoading ? (
//                 <div style={{ marginTop: 30 }}>
//                   <Loader color="gray" size="xs" />
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <Tabs.Panel value="first">
//                     <>
//                       {dto === "ECO" ? (
//                         <>
//                           <br />
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Eco/ECO?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
//                             token={data}
//                             options={options}
//                             parameters={parameters}
//                             query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
//                           />
//                         </>
//                       ) : (
//                         <div style={{ marginTop: 30 }}>
//                           No hay tableros disponibles para mostrar
//                         </div>
//                       )}
//                     </>
//                   </Tabs.Panel>
//                 </div>
//               )}
//             </Tabs>
//           </div>
//         </>
//       ) : null}
//     </section>
//   );
// }

// ******************************************************************

import React, { useState, useEffect, useCallback } from "react";
import { tableauFetch } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import TableauReport from "tableau-react";
import PageFilter from "../../../components/pageFilter";
import { Loader, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";

declare var Tally: any;

export default function Panel() {
  const navigate = useNavigate();

  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tab0");
  const [tabsEnabled, setTabsEnabled] = useState(true);
  const URL = `https://us-central1-imberalink-238816.cloudfunctions.net/get-trusted-ticket-cors-test`;

  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);

  const verifiedPath = dt.length === 0 ? [] : JSON.parse(dt);
  const region = verifiedPath[0] || "";
  const zone = verifiedPath[1] || "";
  const operative_unit = verifiedPath[2] || "";
  const route = verifiedPath[3] || "";

  const options = { height: "1200px", width: "100%" };
  const parameters = { region, management_zone: zone, operative_unit, route };

  const fetchToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await tableauFetch(URL, setIsLoading); // Utiliza tableauFetch con la URL correcta
      const datos = await data;
      setData(datos); // Almacena los datos recibidos
      setError(null); // Limpia cualquier error previo
    } catch (error) {
      console.error(error);
      setError("Sin conexión a internet."); // Maneja errores
    } finally {
      setIsLoading(false); // Asegura que el estado de carga se actualice
    }
  }, []);

  // Token fetching on tab change or path updates
  useEffect(() => {
    fetchToken();
  }, [region, zone, operative_unit, route, dt, dto]);

  // Navigation based on organization changes
  useEffect(() => {
    if (!["KOF", "KOF Colombia", "ECO"].includes(dto)) {
      navigate("/home");
    } else if (dto === "CALL CENTER") {
      navigate("/home/clt_callCenter");
    }
  }, [navigate, dto]);

  // Handle tabs and token refresh logic
  useEffect(() => {
    const handleTabChange = async () => {
      setTabsEnabled(false);
      await fetchToken();
      const timer = setTimeout(() => setTabsEnabled(true), 20000);

      return () => clearTimeout(timer);
    };
    handleTabChange();
  }, [activeTab, fetchToken]);

  const renderTableauReport = (url: string) => (
    <TableauReport
      url={url}
      token={data}
      options={options}
      parameters={parameters}
      query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
    />
  );

  useEffect(() => {
    // Carga el script de Tally
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openTallyPopup = () => {
    const formId = "w4oP8d"; // ID de formulario
    Tally.openPopup(formId);
  };

  return (
    <section>
      <PageFilter />
      <br />
      <div
        style={{
          display: "flex",
          padding: "16px",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <text
          style={{
            color: "#000",
            fontSize: "1.5rem",
            fontWeight: 700,
            lineHeight: "140%",
            marginLeft: -55,
          }}
        >
          Tableros
        </text>
      </div>

      {dto === "KOF Colombia" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {[
                "Actividad del parque",
                "Control activos",
                "Lect Gerente",
                "% Parque reparado",
                "Cumplimiento mto",
                "Cumplimiento mto sucursal",
                "Cumplimiento mto piso",
                "Tiempo respuesta",
                "Reincidencia",
                "Equipos reincidentes",
                "Detalle O.S",
                "O.S por activo",
              ].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Actividadparque/ActividaddelParque"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab1">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Controlactivos/ControlActivos"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab2">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Lect_Gerente-Zona/Reportes/Solkos/_0"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab3">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/ParqueReparado/ParqueReparado"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab4">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Cumplimientomantenimiento/CumplimientoMtoanual"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab5">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Cumplimientomtosucursal/CumplimientoMtosucursal"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab6">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Cumplimientomtopiso/CumplimientoMtopiso"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab7">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Tiemporespuesta/TRMAo"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab8">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Reincidencia/Reincidencia"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab9">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Equiposreincidentes/Detalleequiposreincidentes"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab10">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/DetalleO_S/DetalleO_SMes"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab11">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/O_Sporactivo/O_Sporactivo"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : dto === "KOF" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {["Detalle de rutas"].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/KOF/Detalle_Rutas"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : dto === "KOF Guatemala" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {["Rutas"].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/KOF_Guatemala/Detalle_Rutas"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : dto === "ECO" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {["Actividad del parque"].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Eco/ECO"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : (
        <div style={{ marginTop: 30 }}>
          No hay tableros disponibles para mostrar
        </div>
      )}

      <button className="floating-button" onClick={openTallyPopup}>
        <img
          src={"../../sampleData/ticket.svg"}
          alt="Descripción de la imagen"
        />
      </button>
    </section>
  );
}
