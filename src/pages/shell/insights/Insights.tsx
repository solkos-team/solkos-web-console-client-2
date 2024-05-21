// Versión QA
// **********************************************************************************************
// import React, { useState, useEffect } from "react";
// import PageFilter from "../../../components/pageFilter";
// import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import MapInsightsComponent from "../../../components/mapInsights";
// import { SkeletonInsights } from "../../../components/skeletonInsights/SkeletonInsights";
// import {
//   InsightsData,
//   CoolerInterface as Cooler,
// } from "../../../interfaces/CoolerInterface";
// import { Skeleton } from "@mantine/core";
// export default function Insights() {
//   const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
//   const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
//   const [showData, setShowData] = useState(false);
//   const [items, numIntems] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const [mapKey, setMapKey] = useState(0);
//   const [showAll2, setShowAll2] = useState(false);
//   const [showAll3, setShowAll3] = useState(false);
//   const toggleShowAll2 = () => {
//     setShowAll2(!showAll2);
//   };
//   const toggleShowAll3 = () => {
//     setShowAll3(!showAll3);
//   };
//   const dt = useSelector((state: any) => state.works);
//   const dto = useSelector((state: any) => state.organization);
//   const handleMapKeyChange = () => {
//     setMapKey((prevKey) => prevKey + 1);
//   };
//   useEffect(() => {
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
//   const pathVerify = () => {
//     return dt.length == 0 ? [] : JSON.parse(dt);
//   };
//   const body = { customer: dto, path: pathVerify() };
//   const fetchData = async () => {
//     try {
//       const data = await fetchUniversal("insights", body);
//       setInsightsData(data);
//       console.log(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching outlets:", error);
//     }
//   };
//   const body2 = {
//     customer: dto,
//     class: "STK",
//     algorithm: ["INSTALLED"],
//     path: pathVerify(),
//     page_size: 10000,
//     page_number: 1,
//   };
//   const fetchData2 = async () => {
//     try {
//       const data = await fetchUniversal("coolers", body2, setIsLoading);
//       setCoolersData(data);
//       console.log(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching coolers:", error);
//     }
//   };
//   const fetchDataNumerOfItems = async () => {
//     try {
//       const data = await fetchInsights(pathVerify());
//       numIntems(Number(data.insights.INDICATOR.total));
//       // console.log(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching coolers:", error);
//     }
//   };
//   useEffect(() => {
//     fetchDataNumerOfItems();
//     fetchData();
//     fetchData2();
//     handleMapKeyChange();
//   }, [dt, dto]);

//   const filteredMarkers = coolersData
//     ? coolersData
//         .filter(
//           (cooler) =>
//             parseFloat(cooler.latitude) !== 0 &&
//             parseFloat(cooler.longitude) !== 0
//         )
//         .map((cooler) => ({
//           latitude: parseFloat(cooler.latitude),
//           longitude: parseFloat(cooler.longitude),
//         }))
//     : [];

//   const markers = filteredMarkers;
//   useEffect(() => {}, [markers]);

//   insightsData?.summary.coolers.toLocaleString("es-MX") != null ||
//   insightsData?.summary.coolers.toLocaleString("es-MX") != undefined
//     ? sessionStorage.setItem(
//         "TtlCoolers",
//         insightsData?.summary.coolers.toLocaleString("es-MX")
//       )
//     : "";

//   return (
//     <div>
//       <PageFilter status={isLoading} />
//       <br></br>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           flex: 100,
//           alignSelf: "stretch",
//         }}
//       >
//         {/* Titl */}
//         <section className="principal-titl">
//           <div
//             style={{
//               color: "#000005",
//               // fontFamily: "DM Sans",
//               fontSize: "22px",
//               fontStyle: "normal",
//               fontWeight: 700,
//               lineHeight: "155%",
//             }}
//           >
//             Cooler Insights
//           </div>
//           <div
//             style={{
//               color: "#88888B",
//               // fontFamily: "DM Sans",
//               fontSize: "14px",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "155%",
//             }}
//           >
//             Ve el panorama general de los enfriadores y toma acciones.
//           </div>
//         </section>
//         {/* principal */}
//         <div className="principal-content">
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               width: "97%",
//               gap: "10px",
//             }}
//           >
//             {/* Acerca de los equipos y graficas */}
//             <section
//               style={{
//                 width: "100%",
//                 height: 200,
//                 gap: "-10px",
//                 display: "grid",
//                 gridColumnGap: "1px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   // width: "92%",
//                   height: 400,
//                   padding: "1.2rem",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   borderRadius: "8px",
//                   border: "1px solid #88888B",
//                   background: "#FFF",
//                   marginTop: showData == true ? "-3.5rem" : "0%",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "flex-start",

//                     alignSelf: "stretch",
//                   }}
//                 >
//                   <img
//                     src={"../../sampleData/map.png"}
//                     alt="Descripción de la imagen"
//                     style={{ width: "1.2rem", height: "1.2rem" }}
//                   />

//                   <div
//                     style={{
//                       color: "#88888B",
//                       // fontFamily: "DM Sans",
//                       fontSize: "0.8rem",
//                       fontStyle: "normal",
//                       fontWeight: 500,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     Visualiza la ubicación donde los enfriadores han sido
//                     instalados.
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     // display: showData == true ? "flex" : "none",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-end",
//                     alignContent: "flex-end",
//                     rowGap: ".3rem",
//                     alignSelf: "stretch",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "flex-end",
//                       alignItems: "flex-start",
//                       gap: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         color: "#88888B",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.8rem",
//                         fontStyle: "normal",
//                         fontWeight: 400,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       Enfriadores
//                     </div>

//                     <div
//                       style={{
//                         color: "#000005",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.9remrem",
//                         fontStyle: "normal",
//                         fontWeight: 500,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {isLoading == true ? (
//                         <>
//                           <div style={{ width: "100%", height: "100%" }}>
//                             <Skeleton
//                               height={15}
//                               mt={6}
//                               width="70px"
//                               radius="sm"
//                             />
//                           </div>
//                         </>
//                       ) : insightsData?.summary.coolers === undefined ? (
//                         "Sin registro"
//                       ) : (
//                         insightsData?.summary.coolers.toLocaleString("es-MX")
//                       )}
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "flex-end",
//                       alignItems: "flex-start",
//                       gap: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         color: "#88888B",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.8rem",
//                         fontStyle: "normal",
//                         fontWeight: 400,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       Regiones
//                     </div>
//                     <div
//                       style={{
//                         color: "#000005",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.9remrem",
//                         fontStyle: "normal",
//                         fontWeight: 500,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {isLoading == true ? (
//                         <>
//                           <div style={{ width: "100%", height: "100%" }}>
//                             <Skeleton
//                               height={15}
//                               mt={6}
//                               width="70px"
//                               radius="sm"
//                             />
//                           </div>
//                         </>
//                       ) : insightsData?.summary.regions === undefined ? (
//                         "Sin registro"
//                       ) : (
//                         insightsData?.summary.regions.toLocaleString("es-MX")
//                       )}
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "flex-end",
//                       alignItems: "flex-start",
//                       gap: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         color: "#88888B",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.8rem",
//                         fontStyle: "normal",
//                         fontWeight: 400,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       Zonas
//                     </div>
//                     <div
//                       style={{
//                         color: "#000005",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.9remrem",
//                         fontStyle: "normal",
//                         fontWeight: 500,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {isLoading == true ? (
//                         <>
//                           <div style={{ width: "100%", height: "100%" }}>
//                             <Skeleton
//                               height={15}
//                               mt={6}
//                               width="70px"
//                               radius="sm"
//                             />
//                           </div>
//                         </>
//                       ) : insightsData?.summary.zones === undefined ? (
//                         "Sin registro"
//                       ) : (
//                         insightsData?.summary.zones.toLocaleString("es-MX")
//                       )}
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "flex-end",
//                       alignItems: "flex-start",
//                       gap: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         color: "#88888B",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.8rem",
//                         fontStyle: "normal",
//                         fontWeight: 400,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       Unidad OP.
//                     </div>
//                     <div
//                       style={{
//                         color: "#000005",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.9remrem",
//                         fontStyle: "normal",
//                         fontWeight: 500,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {isLoading == true ? (
//                         <>
//                           <div style={{ width: "100%", height: "100%" }}>
//                             <Skeleton
//                               height={15}
//                               mt={6}
//                               width="70px"
//                               radius="sm"
//                             />
//                           </div>
//                         </>
//                       ) : insightsData?.summary.operative_units ===
//                         undefined ? (
//                         "Sin registro"
//                       ) : (
//                         insightsData?.summary.operative_units.toLocaleString(
//                           "es-MX"
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "flex-end",
//                       alignItems: "flex-start",
//                       gap: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         color: "#88888B",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.8rem",
//                         fontStyle: "normal",
//                         fontWeight: 400,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       Rutas
//                     </div>
//                     <div
//                       style={{
//                         color: "#000005",
//                         // fontFamily: "DM Sans",
//                         fontSize: "0.9remrem",
//                         fontStyle: "normal",
//                         fontWeight: 500,
//                         lineHeight: "normal",
//                       }}
//                     >
//                       {isLoading == true ? (
//                         <>
//                           <div style={{ width: "100%", height: "100%" }}>
//                             <Skeleton
//                               height={15}
//                               mt={6}
//                               width="70px"
//                               radius="sm"
//                             />
//                           </div>
//                         </>
//                       ) : insightsData?.summary.routes === undefined ? (
//                         "Sin registro"
//                       ) : (
//                         insightsData?.summary.routes.toLocaleString("es-MX")
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {/* cuadro mapa */}
//                 <div
//                   style={{
//                     display: "flex",
//                     padding: "2px",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     gap: "2px",
//                     flex: 100,
//                     alignSelf: "stretch",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       alignSelf: "stretch",
//                     }}
//                   ></div>
//                   <br></br>
//                   <div
//                     style={{
//                       borderRadius: "8px",
//                       border: "1px solid #CACACA",
//                       width: "100%",
//                       height: "100%",
//                     }}
//                   >
//                     {/* MAPA */}
//                     {<MapInsightsComponent items={items} data={coolersData} />}
//                   </div>
//                 </div>
//               </div>
//             </section>
//             {/* Indicadores */}
//             <section
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "10px",
//               }}
//             >
//               {/* Control del activo */}
//               <section
//                 style={{
//                   display: "flex",
//                   width: "50%",
//                   height: "100%",
//                   padding: "0.6rem",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   gap: "10px",
//                   borderRadius: "8px",
//                   border: "1px solid #88888B",
//                   background: "#FFF",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "16px",
//                     alignSelf: "stretch",
//                   }}
//                 >
//                   <div
//                     style={{
//                       color: "#3A3A3F",
//                       // fontFamily: "DM Sans",
//                       fontSize: "16px",
//                       fontStyle: "normal",
//                       fontWeight: 500,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     Control del Activo
//                   </div>
//                   <p></p>
//                 </div>
//                 {isLoading == true ? (
//                   <>
//                     <br></br>
//                     <div style={{ marginBottom: -40 }}></div>
//                     <SkeletonInsights></SkeletonInsights>
//                   </>
//                 ) : (
//                   ""
//                 )}
//                 {!isLoading && (
//                   <>
//                     {insightsData && insightsData?.insights != undefined ? (
//                       <>
//                         {/* ******************************** */}

//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "flex-start",
//                             gap: "8px",
//                             flex: 100,
//                             alignSelf: "stretch",
//                           }}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "16px",
//                               alignSelf: "stretch",
//                             }}
//                           >
//                             <img
//                               src={"../../sampleData/indc2.png"}
//                               alt="Descripción de la imagen"
//                               style={{ width: "25px", height: "25px" }}
//                             />
//                             <div
//                               style={{
//                                 color: "#3A3A3F",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "16px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               Avanzados
//                             </div>

//                             <p></p>
//                           </div>

//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "flex-end",
//                               alignContent: "flex-end",
//                               gap: "8px",
//                               alignSelf: "stretch",
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 color: "#000005",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "22px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               {insightsData?.insights?.INDICATOR?.algorithms
//                                 .filter(
//                                   (algorithm) =>
//                                     algorithm.class ===
//                                     "ASSET_MANAGEMENT_ACTIONABLE"
//                                 )
//                                 .reduce(
//                                   (total, algorithm) => total + algorithm.value,
//                                   0
//                                 )
//                                 .toLocaleString("es-MX")}
//                             </div>
//                             <div
//                               style={{
//                                 color: "#88888B",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               total de indicadores
//                             </div>
//                           </div>
//                           {/* *************************INDICADORES****************************** */}

//                           <>
//                             <>
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   padding: "8px 0px",
//                                   justifyContent: "space-between",
//                                   alignItems: "flex-start",
//                                   alignSelf: "stretch",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     color: "#3A3A3F",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "20px",
//                                   }}
//                                 >
//                                   Tipo
//                                 </div>
//                                 <div
//                                   style={{
//                                     color: "#3A3A3F",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "20px",
//                                   }}
//                                 >
//                                   Cantidad
//                                 </div>
//                               </div>
//                               {insightsData?.insights?.INDICATOR?.algorithms
//                                 .filter(
//                                   (algorithm) =>
//                                     algorithm.class ===
//                                     "ASSET_MANAGEMENT_ACTIONABLE"
//                                 )
//                                 .sort((a, b) => {
//                                   const order = [
//                                     "Sin Riesgo",
//                                     "Visita PdV",
//                                     "Actualizar Info",
//                                     "Estatus sin venta",
//                                     "Acciones urgentes",
//                                   ];
//                                   const indexA = order.indexOf(a.algorithm);
//                                   const indexB = order.indexOf(b.algorithm);
//                                   return indexA - indexB;
//                                 })
//                                 .map((algorithm, index) => {
//                                   const max = Math.max(
//                                     ...insightsData.insights.INDICATOR.algorithms.map(
//                                       (alg) => alg.value
//                                     )
//                                   );
//                                   return (
//                                     <div
//                                       key={index}
//                                       style={{
//                                         display: "flex",
//                                         padding: "0px",
//                                         gap: "16px",
//                                         alignSelf: "stretch",
//                                       }}
//                                     >
//                                       <div
//                                         style={{
//                                           width: `${
//                                             (algorithm.value / max) * 100
//                                           }%`,
//                                           height: "2.0vw",
//                                           borderRadius: "4px",
//                                           background: "#BCDAFF",
//                                           display: "flex",
//                                           alignItems: "center",
//                                           paddingLeft: "16px",
//                                         }}
//                                       >
//                                         <div
//                                           style={{
//                                             color: "#142257",
//                                             fontSize: "14px",
//                                             fontWeight: 400,
//                                             lineHeight: "20px",
//                                             whiteSpace: "nowrap",
//                                           }}
//                                         >
//                                           {algorithm.algorithm}
//                                         </div>
//                                       </div>
//                                       <div
//                                         style={{
//                                           color: "#000005",
//                                           fontSize: "14px",
//                                           fontWeight: 400,
//                                           lineHeight: "normal",
//                                           marginLeft: "auto",
//                                         }}
//                                       >
//                                         {algorithm.value === undefined
//                                           ? "Sin registro"
//                                           : algorithm.value.toLocaleString(
//                                               "es-MX"
//                                             )}
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   padding: "4px 0px",
//                                   flexDirection: "column",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   gap: "10px",
//                                   alignSelf: "stretch",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     width: "100%",
//                                     height: "1px",
//                                     background: "#CACACA",
//                                   }}
//                                 ></div>
//                               </div>{" "}
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "flex-end",
//                                   alignItems: "center",
//                                   gap: "4px",
//                                   marginLeft: 110,
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() => navigate("/home/indicator")}
//                               >
//                                 <div
//                                   style={{
//                                     color: "#3E83FF",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 400,
//                                     lineHeight: "normal",
//                                     marginLeft: 50,
//                                   }}
//                                 >
//                                   Ver detalles
//                                 </div>
//                                 <img
//                                   src={"../../sampleData/arrow_b.png"}
//                                   alt="Descripción de la imagen"
//                                   style={{ marginTop: 5 }}
//                                 />
//                               </div>
//                             </>
//                           </>
//                           {/* )} */}
//                           {/* ***********************INDICADORES******************************** */}
//                         </div>
//                       </>
//                     ) : (
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           fontWeight: "bold",
//                           fontSize: "18px",
//                         }}
//                       >
//                         <p>Sin información para mostrar.</p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </section>
//               {/* Mantenimiento */}
//               <section
//                 style={{
//                   display: "flex",
//                   width: "50%",
//                   height: "100%",
//                   padding: "0.6rem",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   gap: "10px",
//                   borderRadius: "8px",
//                   border: "1px solid #88888B",
//                   background: "#FFF",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "16px",
//                     alignSelf: "stretch",
//                   }}
//                 >
//                   <div
//                     style={{
//                       color: "#3A3A3F",
//                       // fontFamily: "DM Sans",
//                       fontSize: "16px",
//                       fontStyle: "normal",
//                       fontWeight: 500,
//                       lineHeight: "normal",
//                     }}
//                   >
//                     Mantenimiento
//                   </div>
//                   <p></p>
//                 </div>
//                 {isLoading == true ? (
//                   <>
//                     <br></br>
//                     <div style={{ marginBottom: -40 }}></div>
//                     <SkeletonInsights></SkeletonInsights>
//                   </>
//                 ) : (
//                   ""
//                 )}

//                 {!isLoading && (
//                   <>
//                     {insightsData && insightsData?.insights != undefined ? (
//                       <>
//                         {/* ************************** */}
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "flex-start",
//                             gap: "8px",
//                             flex: 100,
//                             alignSelf: "stretch",
//                           }}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "flex-end",
//                               alignContent: "flex-end",
//                               gap: "8px",
//                               alignSelf: "stretch",
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <img
//                               src={"../../sampleData/cooler1.png"}
//                               alt="Descripción de la imagen"
//                               style={{ width: "22px", height: "22px" }}
//                             />
//                             <div
//                               style={{
//                                 color: "#000005",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               Enfriadores analizados
//                             </div>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 minWidth: "200px",
//                                 flexDirection: "column",
//                                 justifyContent: "flex-end",
//                                 alignItems: "flex-start",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   color: "#88888B",
//                                   fontSize: "14px",
//                                   fontStyle: "normal",
//                                   fontWeight: 400,
//                                   lineHeight: "normal",
//                                 }}
//                               >
//                                 Enfriadores
//                               </div>
//                               <div
//                                 style={{
//                                   color: "#000005",
//                                   fontSize: "20px",
//                                   fontStyle: "normal",
//                                   fontWeight: 500,
//                                   lineHeight: "normal",
//                                 }}
//                               >
//                                 0
//                               </div>
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "flex-end",
//                               alignContent: "flex-end",
//                               gap: "8px",
//                               alignSelf: "stretch",
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <img
//                               src={"../../sampleData/coolersg.png"}
//                               alt="Descripción de la imagen"
//                               style={{ width: "22px", height: "22px" }}
//                             />
//                             <div
//                               style={{
//                                 color: "#000005",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               Enfriadores funcionando
//                             </div>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 minWidth: "200px",
//                                 flexDirection: "column",
//                                 justifyContent: "flex-end",
//                                 alignItems: "flex-start",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   color: "#88888B",
//                                   fontSize: "14px",
//                                   fontStyle: "normal",
//                                   fontWeight: 400,
//                                   lineHeight: "normal",
//                                 }}
//                               >
//                                 Enfriadores
//                               </div>
//                               <div
//                                 style={{
//                                   color: "#000005",
//                                   fontSize: "20px",
//                                   fontStyle: "normal",
//                                   fontWeight: 500,
//                                   lineHeight: "normal",
//                                 }}
//                               >
//                                 0
//                               </div>
//                             </div>
//                           </div>
//                           {/* *********************************** */}
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "16px",
//                               alignSelf: "stretch",
//                             }}
//                           >
//                             <img
//                               src={"../../sampleData/fail_r.png"}
//                               alt="Descripción de la imagen"
//                               style={{ width: "25px", height: "25px" }}
//                             />
//                             <div
//                               style={{
//                                 color: "#3A3A3F",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "16px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               Fallas
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "flex-end",
//                               alignContent: "flex-end",
//                               gap: "8px",
//                               alignSelf: "stretch",
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 color: "#000005",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "22px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               {insightsData?.insights?.FAIL?.total === undefined
//                                 ? "Sin registro"
//                                 : insightsData?.insights?.FAIL?.total.toLocaleString(
//                                     "es-MX"
//                                   )}
//                             </div>
//                             <div
//                               style={{
//                                 color: "#88888B",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               total de fallas
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "flex-end",
//                               alignItems: "center",
//                               gap: "4px",
//                               marginLeft: 110,
//                               cursor: "pointer",
//                             }}
//                             onClick={toggleShowAll3}
//                           >
//                             <div
//                               style={{
//                                 color: "#3E83FF",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 lineHeight: "normal",
//                                 marginLeft: 50,
//                               }}
//                             >
//                               {showAll3 ? "Ver menos" : "Ver más"}
//                             </div>
//                             <img
//                               src={"../../sampleData/arrow_b.png"}
//                               alt="Descripción de la imagen"
//                               style={{ marginTop: 5 }}
//                             />
//                           </div>
//                           {/* ********************** */}
//                           {showAll3 && (
//                             <>
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   padding: "8px 0px",
//                                   justifyContent: "space-between",
//                                   alignItems: "flex-start",
//                                   alignSelf: "stretch",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     color: "#3A3A3F",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "20px",
//                                   }}
//                                 >
//                                   Tipo
//                                 </div>
//                                 <div
//                                   style={{
//                                     color: "#3A3A3F",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "20px",
//                                   }}
//                                 >
//                                   Cantidad
//                                 </div>
//                               </div>
//                               {/* Indicador barra */}
//                               {insightsData?.insights?.FAIL?.algorithms.map(
//                                 (algorithm, index) => {
//                                   const max = Math.max(
//                                     ...insightsData.insights?.FAIL?.algorithms.map(
//                                       (alg) => alg.value
//                                     )
//                                   );

//                                   return (
//                                     <div
//                                       key={index}
//                                       style={{
//                                         display: "flex",
//                                         padding: "0px",
//                                         gap: "16px",
//                                         alignSelf: "stretch",
//                                       }}
//                                     >
//                                       <div
//                                         style={{
//                                           width: `${
//                                             (algorithm.value / max) * 100
//                                           }%`,
//                                           height: "2.0vw",
//                                           borderRadius: "4px",
//                                           background: "#ffc4cc",
//                                           display: "flex",
//                                           alignItems: "center",
//                                           paddingLeft: "16px",
//                                         }}
//                                       >
//                                         <div
//                                           style={{
//                                             color: "#142257",
//                                             fontSize: "12px",
//                                             fontWeight: 400,
//                                             lineHeight: "20px",
//                                             whiteSpace: "nowrap",
//                                           }}
//                                         >
//                                           {algorithm.algorithm ===
//                                           "FREEZING_FAIL"
//                                             ? "Evaporador bloqueado"
//                                             : algorithm.algorithm ===
//                                               "TEMPERATURE_FAIL"
//                                             ? "Alta temperatura"
//                                             : algorithm.algorithm ===
//                                               "COMPRESSOR_FAIL"
//                                             ? "Falla asociada al compresor"
//                                             : algorithm.algorithm ===
//                                               "DISCONNECTIONS_FAIL"
//                                             ? "Falla de desconexión"
//                                             : algorithm.algorithm ===
//                                               "VOLTAGE_FAIL"
//                                             ? "Posible daño eléctrico"
//                                             : algorithm.algorithm}
//                                         </div>
//                                       </div>
//                                       <div
//                                         style={{
//                                           color: "#000005",
//                                           fontSize: "14px",
//                                           fontWeight: 400,
//                                           lineHeight: "normal",
//                                           marginLeft: "auto",
//                                         }}
//                                       >
//                                         {algorithm.value === undefined
//                                           ? "Sin registro"
//                                           : algorithm.value.toLocaleString(
//                                               "es-MX"
//                                             )}
//                                       </div>
//                                     </div>
//                                   );
//                                 }
//                               )}
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   padding: "4px 0px",
//                                   flexDirection: "column",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   gap: "10px",
//                                   alignSelf: "stretch",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     width: "100%",
//                                     height: "1px",
//                                     background: "#CACACA",
//                                   }}
//                                 ></div>
//                               </div>
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "flex-end",
//                                   alignItems: "center",
//                                   gap: "4px",
//                                   marginLeft: 110,
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() => navigate("/home/fails")}
//                               >
//                                 <div
//                                   style={{
//                                     color: "#3E83FF",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 400,
//                                     lineHeight: "normal",
//                                     marginLeft: 20,
//                                   }}
//                                 >
//                                   Ver detalles
//                                 </div>
//                                 <img
//                                   src={"../../sampleData/arrow_b.png"}
//                                   alt="Descripción de la imagen"
//                                   style={{ marginTop: 5 }}
//                                 />
//                               </div>
//                             </>
//                           )}
//                           {/* ********************** */}
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "16px",
//                               alignSelf: "stretch",
//                             }}
//                           >
//                             <img
//                               src={"../../sampleData/alert_y.png"}
//                               alt="Descripción de la imagen"
//                               style={{ width: "25px", height: "25px" }}
//                             />
//                             <div
//                               style={{
//                                 color: "#3A3A3F",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "16px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               Alertas
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "flex-end",
//                               alignContent: "flex-end",
//                               gap: "8px",
//                               alignSelf: "stretch",
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 color: "#000005",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "22px",
//                                 fontStyle: "normal",
//                                 fontWeight: 500,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               {insightsData?.insights?.ALERT?.total ===
//                               undefined
//                                 ? "Sin registro"
//                                 : insightsData?.insights?.ALERT?.total.toLocaleString(
//                                     "es-MX"
//                                   )}
//                             </div>
//                             <div
//                               style={{
//                                 color: "#88888B",
//                                 // fontFamily: "DM Sans",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 lineHeight: "normal",
//                               }}
//                             >
//                               total de alertas
//                             </div>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "flex-end",
//                               alignItems: "center",
//                               gap: "4px",
//                               marginLeft: 110,
//                               cursor: "pointer",
//                             }}
//                             onClick={toggleShowAll2}
//                           >
//                             <div
//                               style={{
//                                 color: "#3E83FF",
//                                 fontSize: "14px",
//                                 fontStyle: "normal",
//                                 fontWeight: 400,
//                                 lineHeight: "normal",
//                                 marginLeft: 50,
//                               }}
//                             >
//                               {showAll2 ? "Ver menos" : "Ver más"}
//                             </div>
//                             <img
//                               src={"../../sampleData/arrow_b.png"}
//                               alt="Descripción de la imagen"
//                               style={{ marginTop: 5 }}
//                             />
//                           </div>
//                           {/* ********************* */}
//                           {showAll2 && (
//                             <>
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   padding: "8px 0px",
//                                   justifyContent: "space-between",
//                                   alignItems: "flex-start",
//                                   alignSelf: "stretch",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     color: "#3A3A3F",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "20px",
//                                   }}
//                                 >
//                                   Tipo
//                                 </div>
//                                 <div
//                                   style={{
//                                     color: "#3A3A3F",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 600,
//                                     lineHeight: "20px",
//                                   }}
//                                 >
//                                   Cantidad
//                                 </div>
//                               </div>
//                               {/* Indicador barra */}
//                               {insightsData?.insights?.ALERT?.algorithms
//                                 .filter(
//                                   (algorithm) =>
//                                     algorithm.algorithm ===
//                                       "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ||
//                                     algorithm.algorithm === "VOLTAGE_ALERT" ||
//                                     algorithm.algorithm ===
//                                       "HIGH_TEMPERATURE_ALERT" ||
//                                     algorithm.algorithm ===
//                                       "DISCONNECTION_ALERT"
//                                 )
//                                 .map((algorithm, index) => {
//                                   const max = Math.max(
//                                     ...insightsData.insights?.ALERT?.algorithms.map(
//                                       (alg) => alg.value
//                                     )
//                                   );

//                                   return (
//                                     <div
//                                       key={index}
//                                       style={{
//                                         display: "flex",
//                                         padding: "0px",
//                                         gap: "16px",
//                                         alignSelf: "stretch",
//                                       }}
//                                     >
//                                       <div
//                                         style={{
//                                           width: `${
//                                             (algorithm.value / max) * 100
//                                           }%`,
//                                           height: "2.0vw",
//                                           borderRadius: "4px",
//                                           background: "#FEF5C7",
//                                           display: "flex",
//                                           alignItems: "center",
//                                           paddingLeft: "16px",
//                                         }}
//                                       >
//                                         <div
//                                           style={{
//                                             color: "#142257",
//                                             fontSize: "12px",
//                                             fontWeight: 400,
//                                             lineHeight: "20px",
//                                             whiteSpace: "nowrap",
//                                           }}
//                                         >
//                                           {algorithm.algorithm ===
//                                           "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
//                                             ? "Alta demanda del compresor"
//                                             : algorithm.algorithm ===
//                                               "HIGH_TEMPERATURE_ALERT"
//                                             ? "Alta temperatura"
//                                             : algorithm.algorithm ===
//                                               "DISCONNECTION_ALERT"
//                                             ? "Desconexión"
//                                             : algorithm.algorithm ===
//                                               "VOLTAGE_ALERT"
//                                             ? "Bajo/Alto voltaje"
//                                             : algorithm.algorithm}
//                                         </div>
//                                       </div>
//                                       <div
//                                         style={{
//                                           color: "#000005",
//                                           fontSize: "14px",
//                                           fontWeight: 400,
//                                           lineHeight: "normal",
//                                           marginLeft: "auto",
//                                         }}
//                                       >
//                                         {algorithm.value === undefined
//                                           ? "Sin registro"
//                                           : algorithm.value.toLocaleString(
//                                               "es-MX"
//                                             )}
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   padding: "4px 0px",
//                                   flexDirection: "column",
//                                   justifyContent: "center",
//                                   alignItems: "center",
//                                   gap: "10px",
//                                   alignSelf: "stretch",
//                                 }}
//                               >
//                                 <div
//                                   style={{
//                                     width: "100%",
//                                     height: "1px",
//                                     background: "#CACACA",
//                                   }}
//                                 ></div>
//                               </div>
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "flex-end",
//                                   alignItems: "center",
//                                   gap: "4px",
//                                   marginLeft: 110,
//                                   cursor: "pointer",
//                                 }}
//                                 onClick={() => navigate("/home/alerts")}
//                               >
//                                 <div
//                                   style={{
//                                     color: "#3E83FF",
//                                     // fontFamily: "DM Sans",
//                                     fontSize: "14px",
//                                     fontStyle: "normal",
//                                     fontWeight: 400,
//                                     lineHeight: "normal",
//                                     marginLeft: 20,
//                                   }}
//                                 >
//                                   Ver detalles
//                                 </div>
//                                 <img
//                                   src={"../../sampleData/arrow_b.png"}
//                                   alt="Descripción de la imagen"
//                                   style={{ marginTop: 5 }}
//                                 />
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </>
//                     ) : (
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           fontWeight: "bold",
//                           fontSize: "18px",
//                         }}
//                       >
//                         <p>Sin información para mostrar.</p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </section>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// *************************************************
// **********************************************************************************************

import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapInsightsComponent from "../../../components/mapInsights";
import { pathVerify } from "../../../Functions/pathVerify";
import { AcercaDeLosEquiposIcon } from "../../../sampleData/icons";
import {
  InsightsData,
  CoolerInterface as Cooler,
} from "../../../interfaces/CoolerInterface";
import { Insights as InsightsIT } from "../../../interfaces/InsightsInterfaces";
import { Skeleton, Tooltip } from "@mantine/core";
import { MapInsights } from "./MapInsights";
import { HeaderInsights } from "./Responsive/HeaderInsights";
import { MapInsightsResponsive } from "./Responsive/MapInsightsResponsive";
export default function Insights() {
  const [insightsData, setInsightsData] = useState<InsightsIT | null>(null);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [items, numIntems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState(0);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const handleMapKeyChange = () => {
    setMapKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body, setIsLoading);
      setInsightsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };
  const body2 = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    // page_size: 10000,
    page_size: 10,
    page_number: 1,
  };

  const fetchDataNumerOfItems = async () => {
    try {
      const data = await fetchInsights(pathVerify());
      numIntems(Number(data.insights.INDICATOR.total));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };
  useEffect(() => {
    fetchDataNumerOfItems();
    fetchData();
    handleMapKeyChange();
  }, [dt, dto]);

  const filteredMarkers2 = insightsData?.geo_data;
  const IndicadoresData =
    insightsData?.insights?.INDICATOR?.algorithms.filter(
      (data) => data.class == "ASSET_MANAGEMENT_ACTIONABLE"
    ) || [];
  const sum2 = IndicadoresData.reduce((prev, curr) => prev + curr.value, 0);
  insightsData?.summary.coolers.toLocaleString("es-MX") != null ||
  insightsData?.summary.coolers.toLocaleString("es-MX") != undefined
    ? sessionStorage.setItem(
        "TtlCoolers",
        insightsData?.summary.coolers.toLocaleString("es-MX")
      )
    : "";

  return (
    <div className="insights_principal_container">
      <PageFilter status={isLoading} />
      <br></br>
      <section className="insights_contenido_principal">
        <section className="insights_title">
          <div className="insights_title_h1">Cooler Insights</div>
          <p className="insights_title_p">
            Ve el panorama general de los enfriadores y toma acciones
          </p>
          <HeaderInsights title={'Cooler Insights'} description={'Haz un seguimiento de todos los parámetros de cada uno de tus enfriadores'} />
        </section>
        <section className="insights_principal">
          <section className="insights_mapa">
            <div className="insights_mapa_info_title">
              <img
                className="insights_mapa_info_title_mapa"
                src={AcercaDeLosEquiposIcon}
                alt="Descripción de la imagen"
                style={{ width: "20px", height: "20px" }}
              />
              <h1 className="insights_mapa_info_title_h1">
                Acerca de los equipos
              </h1>
            </div>

            {/* description from mapa */}
            <div className="insights_mapa_info_descripcion">
              <p className="insights_mapa_info_descripcion_p">
                Visualiza la ubicación donde los enfriadores han sido
                instalados.
              </p>
            </div>
            {/* datas from mapa */}
            <div className="insights_mapa_info_datas">
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">
                  Enfriadores
                </li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : insightsData?.summary.coolers === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.coolers.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Rutas</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : insightsData?.summary.routes === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.routes.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Unidad Op.</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : insightsData?.summary.operative_units === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.operative_units.toLocaleString(
                      "es-MX"
                    )
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Zonas</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : insightsData?.summary.zones === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.zones.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Regiones</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : insightsData?.summary.regions === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.regions.toLocaleString("es-MX")
                  )}
                </li>
              </div>
            </div>
            <br></br>
            {/* Mapa inf and filters */}
            {/* <div className="insights_mapa_info_mapa_info">
              <h1 className="insights_mapa_info_mapa_info_h1">
                Visualización de enfriadores:
              </h1> */}
            {/* <div className="insights_mapa_info_mapa_filters"></div> */}
            {/* </div> */}
            {/* Mapa */}
            <div className="insights_mapa_info_mapa">
              {
                <MapInsightsComponent
                  items={items}
                  data={insightsData?.geo_data}
                />
              }
              <MapInsightsResponsive />
            </div>
          </section>
          <section className="insights_datas">
            <section className="insights_datas_info">
              <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={AcercaDeLosEquiposIcon}
                    alt="Descripción de la imagen"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">KPI’s</h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insights_datas_kpi_data">
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Cobertura
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      // style={{ marginTop: "-8px" }}
                    >
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="50%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.assets_analytics[4]?.percentage ==
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.assets_analytics[4]?.percentage.toFixed(
                          1
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {
                        isLoading == true ? (
                          <>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="50%"
                              radius="xs"
                            />
                          </>
                        ) : insightsData?.assets_analytics[4]?.value ==
                          undefined ? (
                          "Sin registro"
                        ) : (
                          insightsData?.assets_analytics[4]?.value.toLocaleString(
                            "es-MX"
                          ) + " Enfriadores"
                        )
                        // "0 Enfriadores"
                      }
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Coincidencia
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      // style={{ marginTop: "-8px" }}
                    >
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.assets_analytics[1]?.percentage ==
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.assets_analytics[1]?.percentage.toFixed(
                          1
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.assets_analytics[1]?.value ==
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.assets_analytics[1]?.value.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Frecuencia
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      // style={{ marginTop: "-8px" }}
                    >
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="55%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.assets_analytics[2]?.percentage ==
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.assets_analytics[2]?.percentage.toFixed(
                          1
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="55%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.assets_analytics[2]?.value ==
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.assets_analytics[2]?.value.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={"../../sampleData/status_park_icon.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Estatus del parque
                  </h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insights_datas_kpi_data">
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Analizados
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="70%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[0]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[0]?.percentage.toLocaleString(
                          "es-MX"
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="70%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[0]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[0]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Funcionando
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[3]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[3]?.percentage.toLocaleString(
                          "es-MX"
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[3]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[3]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">Falla</div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[2]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[2]?.percentage.toLocaleString(
                          "es-MX"
                        ) + " %"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[2]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[2]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Atendidos
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[1]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[1]?.percentage.toLocaleString(
                          "es-MX"
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : insightsData?.status_parque[1]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[1]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="insights_datas_info2">
              <div className="insigths_datas_info2_control">
                <div className="insigths_datas_info2_control_title">
                  <img
                    src={"../../sampleData/actividad.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Control de activos
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title">
                  <h1 className="insights_datas_kpi_title_h1_data">
                    {isLoading == true ? (
                      <>
                        <div style={{ width: "2rem", height: "1rem" }}>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="100%"
                            radius="xs"
                          />
                        </div>
                      </>
                    ) : sum2 == undefined && sum2 == undefined ? (
                      "Sin registro"
                    ) : (
                      sum2.toLocaleString("es-MX")
                    )}
                  </h1>
                  <h1 className="insights_datas_kpi_title_data_h1">
                    Total de enfriadores
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title_grapics">
                  <div className="insigths_datas_info2_control_title_grapics_container">
                    <div
                      style={{
                        display: "flex",
                        // padding: "8px 0px",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#3A3A3F",
                          // fontFamily: "DM Sans",
                          fontSize: "0.75rem",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        Tipo
                      </div>
                      <div
                        style={{
                          color: "#3A3A3F",
                          // fontFamily: "DM Sans",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          fontStyle: "normal",
                          lineHeight: "20px",
                        }}
                      >
                        Cantidad
                      </div>
                    </div>
                    {IndicadoresData.sort((a, b) => {
                      const order = [
                        "Sin Riesgo",
                        "Visita PdV",
                        "Actualizar Info",
                        "Estatus sin venta",
                        "Acciones urgentes",
                      ];
                      const indexA = order.indexOf(a.algorithm);
                      const indexB = order.indexOf(b.algorithm);
                      return indexA - indexB;
                    }).map((algorithm, index) => {
                      const max = Math.max(
                        ...IndicadoresData.map((alg) => alg.value)
                      );

                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            padding: "0px",
                            gap: "16px",
                            alignSelf: "stretch",
                            marginBottom: "16px",
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            className="insights_datas_info_controlDeActivos_barras"
                            style={{
                              width: `${(algorithm.value / max) * 100}%`,
                              background: isLoading != true ? "#BCDAFF" : "",
                            }}
                          >
                            <div className="insights_datas_info_mantenimiento_datos_barras_title">
                              {isLoading == true ? (
                                <>
                                  <div
                                    style={{
                                      width: "2rem",
                                      height: "1rem",
                                      // marginLeft: -10,
                                    }}
                                  >
                                    <Skeleton
                                      height={15}
                                      mt={6}
                                      width="400%"
                                      radius="xs"
                                    />
                                  </div>
                                </>
                              ) : (
                                <span
                                  style={{
                                    color: "#2393F4",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                  }}
                                >
                                  {algorithm.algorithm}
                                </span>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              color: "#000005",
                              fontSize: "0.75rem",
                              fontWeight: 400,
                              lineHeight: "15.62px",
                              marginLeft: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isLoading == true ? (
                              <>
                                <div style={{ width: "2rem", height: "1rem" }}>
                                  <Skeleton
                                    height={15}
                                    mt={6}
                                    width="100%"
                                    radius="xs"
                                  />
                                </div>
                              </>
                            ) : algorithm.value === undefined ? (
                              "Sin registro"
                            ) : (
                              algorithm.value.toLocaleString("es-MX")
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <hr
                      className="insights_datas_hr"
                      style={{ display: isLoading == true ? "none" : "" }}
                    />
                    <section
                      className="insights_datas_mantenimiento_VerDetalles_principal"
                      style={{ display: isLoading == true ? "none" : "" }}
                      onClick={() => navigate("/home/indicator")}
                    >
                      <div className="insights_datas_mantenimiento_VerDetalles_h1">
                        Ver detalles
                      </div>
                      <img
                        src={"../../sampleData/arrow_b.png"}
                        alt="Descripción de la imagen"
                        style={{ marginTop: 4 }}
                      />
                    </section>
                  </div>
                </div>
              </div>
              <div className="insigths_datas_info2_mantenimiento">
                <div className="insigths_datas_info2_control_mantenimiento">
                  <div className="insigths_datas_info2_control_title">
                    <img
                      src={"../../sampleData/maintenance_icon.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <h1 className="insights_datas_kpi_title_h1">
                      Mantenimiento
                    </h1>
                  </div>
                  <div className="insigths_datas_info2_control_title">
                    <h1 className="insights_datas_kpi_title_h1_data">
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "2rem", height: "1rem" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="100%"
                              radius="xs"
                            />
                          </div>
                        </>
                      ) : insightsData?.insights?.ALERT?.total == undefined &&
                        insightsData?.insights?.FAIL?.total == undefined ? (
                        "Sin registro"
                      ) : (
                        (
                          Number(insightsData?.insights?.ALERT?.total) +
                          Number(insightsData?.insights?.FAIL?.total)
                        ).toLocaleString("es-MX")
                      )}
                    </h1>
                    <h1 className="insights_datas_kpi_title_data_h1">
                      Total de alertas y fallas
                    </h1>
                  </div>
                  <div className="insigths_datas_info2_control_title_grapics_container">
                    <section className="insights_datas_info_mantenimiento_datos">
                      <div className="insights_datas_info_mantenimiento_datos_h1">
                        Tipo
                      </div>
                      <div className="insights_datas_info_mantenimiento_datos_h1">
                        Cantidad
                      </div>
                    </section>
                    {/* Indicador barra */}
                    <section className="insights_datas_mantenimiento_barras">
                      <div
                        key={1}
                        className="insights_datas_info_mantenimiento_datos_barras"
                      >
                        <div
                          className="insights_datas_info_mantenimiento_datos_barras_color_Fallas"
                          style={{
                            width: `${
                              ((insightsData?.insights?.FAIL?.total || 0) /
                                (Number(insightsData?.insights?.ALERT?.total) +
                                  Number(
                                    insightsData?.insights?.FAIL?.total
                                  ))) *
                              100
                            }%`,
                            backgroundColor: isLoading != true ? "#ffc4cc" : "",
                          }}
                          onClick={() => navigate("/home/fails")}
                        >
                          <Tooltip label="Ver más">
                            <div
                              className="insights_datas_info_mantenimiento_datos_barras_title"
                              onClick={() => navigate("/home/fails")}
                            >
                              {isLoading == true ? (
                                <>
                                  <div
                                    style={{ width: "2rem", height: "1rem" }}
                                  >
                                    <Skeleton
                                      height={15}
                                      mt={6}
                                      width="400%"
                                      radius="xs"
                                    />
                                  </div>
                                </>
                              ) : insightsData?.insights?.FAIL?.level ===
                                undefined ? (
                                "Sin registro"
                              ) : insightsData?.insights?.FAIL?.level ===
                                "FAIL" ? (
                                <span
                                  style={{
                                    color: "#FA5252",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                  }}
                                >
                                  Fallas
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="insights_datas_info_mantenimiento_datos_barras_cantidad">
                          {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton
                                  height={15}
                                  mt={6}
                                  width="100%"
                                  radius="xs"
                                />
                              </div>
                            </>
                          ) : insightsData?.insights?.FAIL?.total ===
                            undefined ? (
                            "Sin registro"
                          ) : (
                            insightsData?.insights?.FAIL?.total.toLocaleString(
                              "es-MX"
                            )
                          )}
                        </div>
                      </div>
                      <div
                        key={2}
                        className="insights_datas_info_mantenimiento_datos_barras"
                      >
                        <div
                          className="insights_datas_info_mantenimiento_datos_barras_color_Alertas"
                          style={{
                            width: `${
                              ((insightsData?.insights?.ALERT?.total || 0) /
                                (Number(insightsData?.insights?.ALERT?.total) +
                                  Number(
                                    insightsData?.insights?.FAIL?.total
                                  ))) *
                              100
                            }%`,
                            backgroundColor: isLoading != true ? "#fef5c7" : "",
                          }}
                          onClick={() => navigate("/home/alerts")}
                        >
                          <Tooltip label="Ver más">
                            <div
                              className="insights_datas_info_mantenimiento_datos_barras_title"
                              onClick={() => navigate("/home/alerts")}
                            >
                              {isLoading == true ? (
                                <>
                                  <div
                                    style={{ width: "2rem", height: "1rem" }}
                                  >
                                    <Skeleton
                                      height={15}
                                      mt={6}
                                      width="400%"
                                      radius="xs"
                                    />
                                  </div>
                                </>
                              ) : insightsData?.insights?.ALERT?.level ===
                                undefined ? (
                                "Sin registro"
                              ) : insightsData?.insights?.ALERT?.level ===
                                "ALERT" ? (
                                <span
                                  style={{
                                    color: "#E67700",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                  }}
                                >
                                  Alertas
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="insights_datas_info_mantenimiento_datos_barras_cantidad">
                          {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton
                                  height={15}
                                  mt={6}
                                  width="100%"
                                  radius="xs"
                                />
                              </div>
                            </>
                          ) : insightsData?.insights?.ALERT?.total ===
                            undefined ? (
                            "Sin registro"
                          ) : (
                            insightsData?.insights?.ALERT?.total.toLocaleString(
                              "es-MX"
                            )
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
