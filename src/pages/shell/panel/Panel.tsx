// import React, { useState, useEffect } from "react";
// import { tableauFetch } from "../../../utils/apiUtils";
// import { useSelector } from "react-redux";
// import TableauReport from "tableau-react";
// import PageFilter from "../../../components/pageFilter";
// import { Loader, Tabs } from "@mantine/core";
// import { useNavigate } from "react-router-dom";

// export default function Panel() {
//   const navigate = useNavigate();

//   const [data, setData] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<string | null>("first");
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
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (dto !== "KOF" && dto !== "KOF Colombia") {
//       navigate("/home");
//     }
//   }, [region, zone, operative_unit, route, navigate, dto]);

//   useEffect(() => {
//     if (dto === "CALL CENTER") {
//       navigate("/home/clt_callCenter");
//     }
//   }, [region, zone, operative_unit, route, navigate, dto]);

//   useEffect(() => {
//     fetchToken();
//   }, [region, zone, operative_unit, route, activeTab]);

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
//     console.log("Current tab:", tab);
//     setActiveTab(tab);
//   };

//   return (
//     <section>
//       <PageFilter />
//       <br></br>
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
//             fontStyle: "normal",
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
//               value={activeTab}
//               onTabChange={handleTabChange}
//               style={{ width: "100%" }}
//             >
//               <Tabs.List>
//                 <Tabs.Tab value="first" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Detalle de Rutas
//                 </Tabs.Tab>
//                 <Tabs.Tab value="second" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Estatus Vault - Iniciativa Secop
//                 </Tabs.Tab>
//                 <Tabs.Tab value="third" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   KPI's Históricos
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
//                       {dto === "KOF" ? (
//                         <>
//                           <br></br>
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

//                   <Tabs.Panel value="second">
//                     <>
//                       {dto === "KOF" ? (
//                         <>
//                           <br></br>
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
//                           <br></br>
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
//                   </Tabs.Panel>
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
//               value={activeTab}
//               onTabChange={handleTabChange}
//               style={{ width: "100%" }}
//             >
//               <Tabs.List>
//                 <Tabs.Tab value="first" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Conectividad
//                 </Tabs.Tab>
//                 <Tabs.Tab value="second" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Parque reparado
//                 </Tabs.Tab>
//                 <Tabs.Tab value="third" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Cumplimiento mantenimiento
//                 </Tabs.Tab>
//                 <Tabs.Tab value="fourth" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Tiempo de respuesta mercado
//                 </Tabs.Tab>
//                 <Tabs.Tab value="fifth" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Reincidencia
//                 </Tabs.Tab>
//                 <Tabs.Tab value="sixth" style={{ fontSize: ".9vw" }}>
//                   <img
//                     src={"../../sampleData/star.svg"}
//                     alt="Icono"
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       marginRight: "5px",
//                     }}
//                   />
//                   Detalle O.S
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
//                           <br></br>
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/Conectividad/ActividaddelParque?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
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
//                           <br></br>
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
//                   <Tabs.Panel value="third">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br></br>
//                           <TableauReport
//                             url={`https://tableau.efemsa.com/views/CumplimientoMtoMensual-Piso/CumplimientoMtoanual?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
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
//                           <br></br>
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
//                   <Tabs.Panel value="fifth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br></br>
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
//                   <Tabs.Panel value="sixth">
//                     <>
//                       {dto === "KOF Colombia" ? (
//                         <>
//                           <br></br>
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
//                 </div>
//               )}
//             </Tabs>
//           </div>
//         </>
//       ) : (
//         ""
//       )}
//     </section>
//   );
// }

// Versión Original
// ************************************************************************************************************
// ************************************************************************************************************

// import React, { useState, useEffect } from "react";
// import { tableauFetch } from "../../../utils/apiUtils";
// import { useSelector } from "react-redux";
// import TableauReport from "tableau-react";
// import PageFilter from "../../../components/pageFilter";
// import { Loader, Tabs } from "@mantine/core";
// import { useNavigate } from "react-router-dom";

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
//     if (dto !== "KOF" && dto !== "KOF Colombia") {
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
//       console.log("Current tab:", tab);
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
//             fontStyle: "normal",
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
//               style={{ width: "100%" }}
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
//                 <Tabs.Tab
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
//                 </Tabs.Tab>
//               </Tabs.List>
//               {isLoading ? (
//                 <div style={{ marginTop: 30 }}>
//                   <Loader color="gray" />
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

//                   <Tabs.Panel value="second">
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
//                   </Tabs.Panel>
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
//               style={{ width: "100%" }}
//             >
//               <Tabs.List>
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
//                   <Loader color="gray" />
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
//       ) : null}
//     </section>
//   );
// }

// ************************************************************************************************************

import React, { useState, useEffect } from "react";
import { tableauFetch } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import TableauReport from "tableau-react";
import PageFilter from "../../../components/pageFilter";
import { Loader, Tabs } from "@mantine/core";
import { redirect, useNavigate } from "react-router-dom";

export default function Panel() {
  const navigate = useNavigate();

  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("first");
  const [tabsEnabled, setTabsEnabled] = useState(true);
  const URL = `https://us-central1-imberalink-238816.cloudfunctions.net/get-trusted-ticket-cors`;
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);

  function pathVerify() {
    return dt.length === 0 ? [] : JSON.parse(dt);
  }

  const verifiedPath = pathVerify();
  const region = verifiedPath[0] || "";
  const zone = verifiedPath[1] || "";
  const operative_unit = verifiedPath[2] || "";
  const route = verifiedPath[3] || "";

  const fetchToken = async () => {
    try {
      const data = await tableauFetch(URL, setIsLoading);
      const datos = await data;
      setData(datos);
      setIsLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setError("Sin conexión a internet.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [region, zone, operative_unit, route]);

  useEffect(() => {
    if (dto !== "KOF" && dto !== "KOF Colombia" && dto !== "KOF Guatemala") {
      navigate("/home");
    }
  }, [navigate, dto]);

  useEffect(() => {
    if (dto === "CALL CENTER") {
      navigate("/home/clt_callCenter");
    }
  }, [navigate, dto]);

  useEffect(() => {
    const handleTabChange = async (tab: string) => {
      console.log("Current tab:", tab);
      setActiveTab(tab);
      await fetchToken();
      setTabsEnabled(false);
      const timer = setTimeout(() => {
        setTabsEnabled(true);
      }, 10000);
      return () => clearTimeout(timer);
    };
    handleTabChange(activeTab);
  }, [activeTab, dto, dt]);

  const options = {
    height: "1200px",
    width: "100%",
  };

  const parameters = {
    region: region,
    management_zone: zone,
    operative_unit: operative_unit,
    route: route,
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "140%",
            marginLeft: -55,
          }}
        >
          Tableros
        </text>
      </div>
      {dto === "KOF" ? (
        <>
          <div>
            <Tabs
              color="teal"
              value={activeTab || "first"} // Valor predeterminado
              onTabChange={handleTabChange}
              style={{ width: "94%" }}
            >
              <Tabs.List>
                <Tabs.Tab
                  value="first"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {/* <img
                    src={"../../sampleData/star.svg"}
                    alt="Icono"
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                    }}
                  /> */}
                  Detalle de Rutas
                </Tabs.Tab>
                <Tabs.Tab
                  value="second"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Estatus Vault - Iniciativa Secop
                </Tabs.Tab>
                <Tabs.Tab
                  value="third"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  KPI's Históricos
                </Tabs.Tab>
              </Tabs.List>
              {isLoading ? (
                <div style={{ marginTop: 30 }}>
                  <Loader color="gray" size="xs" />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tabs.Panel value="first">
                    <>
                      {dto === "KOF" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/KOF/Detalle_Rutas?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>

                  <Tabs.Panel value="second">
                    <>
                      {dto === "KOF" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/KOF/Vault-Secop?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="third">
                    <>
                      {dto === "KOF" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/KOF/KPIsHistricos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                </div>
              )}
            </Tabs>
          </div>
        </>
      ) : dto === "KOF Colombia" ? (
        <>
          <div>
            <Tabs
              color="teal"
              value={activeTab || "first"} // Valor predeterminado
              onTabChange={handleTabChange}
              style={{ width: "94%" }}
            >
              <Tabs.List className="tabs-list">
                <Tabs.Tab
                  value="first"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Actividad del parque
                </Tabs.Tab>
                <Tabs.Tab
                  value="second"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Control activos
                </Tabs.Tab>
                <Tabs.Tab
                  value="third"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Lect Gerente
                </Tabs.Tab>
                <Tabs.Tab
                  value="fourth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  % Parque reparado
                </Tabs.Tab>
                <Tabs.Tab
                  value="fifth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Cumplimiento mto
                </Tabs.Tab>
                <Tabs.Tab
                  value="sixth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Cumplimiento mto sucursal
                </Tabs.Tab>
                <Tabs.Tab
                  value="seventh"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Cumplimiento mto piso
                </Tabs.Tab>
                <Tabs.Tab
                  value="eighth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Tiempo respuesta
                </Tabs.Tab>
                <Tabs.Tab
                  value="ninth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Reincidencia
                </Tabs.Tab>
                <Tabs.Tab
                  value="tenth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Equipos reincidentes
                </Tabs.Tab>
                <Tabs.Tab
                  value="eleventh"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Detalle O.S
                </Tabs.Tab>
                <Tabs.Tab
                  value="twelfth"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  O.S por activo
                </Tabs.Tab>
              </Tabs.List>
              {isLoading ? (
                <div style={{ marginTop: 30 }}>
                  <Loader color="gray" size="xs" />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tabs.Panel value="first">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Actividadparque/ActividaddelParque?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>

                  <Tabs.Panel value="second">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Controlactivos/ControlActivos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="third">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Lect_Gerente-Zona/Reportes/Solkos/_0?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="fourth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/ParqueReparado/ParqueReparado?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="fifth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Cumplimientomantenimiento/CumplimientoMtoanual?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="sixth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Cumplimientomtosucursal/CumplimientoMtosucursal?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="seventh">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Cumplimientomtopiso/CumplimientoMtopiso?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="eighth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Tiemporespuesta/TRMAo?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="ninth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Reincidencia/Reincidencia?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="tenth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/Equiposreincidentes/Detalleequiposreincidentes?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="eleventh">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/DetalleO_S/DetalleO_SMes?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                  <Tabs.Panel value="twelfth">
                    <>
                      {dto === "KOF Colombia" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/O_Sporactivo/O_Sporactivo?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                </div>
              )}
            </Tabs>
          </div>
        </>
      ) : dto === "KOF Guatemala" ? (
        <>
          <div>
            <Tabs
              color="teal"
              value={activeTab || "first"} // Valor predeterminado
              onTabChange={handleTabChange}
              style={{ width: "94%" }}
            >
              <Tabs.List className="tabs-list">
                <Tabs.Tab
                  value="first"
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  Rutas
                </Tabs.Tab>
              </Tabs.List>
              {isLoading ? (
                <div style={{ marginTop: 30 }}>
                  <Loader color="gray" size="xs" />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tabs.Panel value="first">
                    <>
                      {dto === "KOF Guatemala" ? (
                        <>
                          <br />
                          <TableauReport
                            url={`https://tableau.efemsa.com/views/KOFGuatemala/Detalle_Rutas?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                            token={data}
                            options={options}
                            parameters={parameters}
                            query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                          />
                        </>
                      ) : (
                        <div style={{ marginTop: 30 }}>
                          No hay tableros disponibles para mostrar
                        </div>
                      )}
                    </>
                  </Tabs.Panel>
                </div>
              )}
            </Tabs>
          </div>
        </>
      ) : null}
    </section>
  );
}
