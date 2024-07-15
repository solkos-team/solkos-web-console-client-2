import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { defaultProps, mapOptions } from "./datos";
import { useSelector } from "react-redux";
import { pathVerify } from "../../Functions/pathVerify";
import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
import { fetchUniversal } from "../../utils/apiUtils";
import { MapInsightsResponsive } from "../../pages/shell/insights/Responsive/MapInsightsResponsive";
import { DrawerMap } from "../../pages/shell/insights/Responsive/DrawerMap";
export const MapResponsive = ({ data, setData, isLoading, setIsLoading }) => {
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const [opened, setOpened] = useState(false);
  const toggleDrawer = () => setOpened((flag) => !flag);
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body, setIsLoading);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const handleApiLoaded = (map, maps) => {
    const bounds = new maps.LatLngBounds();
    var mIcon = {
      path: maps.SymbolPath.CIRCLE,
      fillOpacity: 0.8,
      fillColor: "#ED5079",
      strokeOpacity: 0.0,
      strokeWeight: 1,
      scale: 20,
    };
    dataMapa === undefined
      ? []
      : dataMapa.forEach(
          ({ latitude, longitude, num_coolers, area }, index) => {
            const marker = new maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
              title: `${area}  ${num_coolers.toLocaleString(
                "es-MX"
              )} Enfriadores`,
              icon: mIcon,
              label: {
                color: "#000",
                fontSize: "12px",
                fontWeight: "600",
                text: `${num_coolers.toLocaleString("es-MX")}`,
              },
            });
            bounds.extend(marker.getPosition());
          }
        );
    map.fitBounds(bounds);
    const MIN_ZOOM = 6;
    const maxZoomService = new maps.MaxZoomService();
    maxZoomService.getMaxZoomAtLatLng(bounds.getCenter(), (response) => {
      if (response.status === "OK") {
        const maxZoom = response.zoom;
        map.setZoom(Math.min(maxZoom, MIN_ZOOM));
      }
    });
  };
  const dataMapa =
    data?.geo_data == null
      ? []
      : data?.geo_data
          .filter(
            (cooler) =>
              parseFloat(cooler.latitude) != 0 &&
              parseFloat(cooler.longitude) != 0
          )
          .map((cooler) => ({
            latitude: parseFloat(cooler.latitude),
            longitude: parseFloat(cooler.longitude),
            num_coolers: cooler.num_coolers,
            area: cooler.area,
          }));
  useEffect(() => {
    fetchData();
  }, [dt, dto]);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading === true ? (
        <SkeletonMapInsights />
      ) : dataMapa.length == 0 ? (
        "Sin Coordenadas"
      ) : (
        <>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={6}
            options={{
              gestureHandling: "greedy",
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          />
          <MapInsightsResponsive opened={toggleDrawer} />
          <DrawerMap
            opened={opened}
            onClose={toggleDrawer}
            handleApiLoaded={handleApiLoaded}
          />
        </>
      )}
    </div>
  );
};

// QA Y PROD
// VERSIÓN ACTUAL

// ****************************************************************************************************************************************************

// import React, { useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";
// import { defaultProps, mapOptions } from "./datos";
// import { useSelector } from "react-redux";
// import { pathVerify } from "../../Functions/pathVerify";
// import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
// import { fetchUniversal } from "../../utils/apiUtils";
// import polygonsData from "../../Functions/polyg.json";

// interface GeoJSON {
//   type: string;
//   features: GeoJSONFeature[];
// }

// interface GeoJSONFeature {
//   type: string;
//   properties: {
//     area: string;
//   };
//   geometry: {
//     type: string;
//     coordinates: number[][][] | number[][][][];
//   };
// }

// export const MapResponsive = ({ data, setData, isLoading, setIsLoading }) => {
//   const dt = useSelector((state: any) => state.works);
//   const dto = useSelector((state: any) => state.organization);
//   const [zoom, setZoom] = useState(defaultProps.zoom);
//   const body = { customer: dto, path: pathVerify() };
//   const [geojson, setGeojson] = useState<GeoJSON | null>(null);
//   const [selectedArea, setSelectedArea] = useState(
//     localStorage.getItem("selectedArea") || null
//   );
//   console.log(selectedArea);

//   const fetchData = async () => {
//     try {
//       const data = await fetchUniversal("insights", body, setIsLoading);
//       setData(data);
//       setGeojson(polygonsData as GeoJSON);
//       setIsLoading(false);
//     } catch (error) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [dt, dto]);

//   useEffect(() => {
//     if (selectedArea) {
//       localStorage.setItem("selectedArea", selectedArea);
//     }
//   }, [selectedArea]);

//   const handleApiLoaded2 = (map, maps) => {
//     if (geojson) {
//       geojson.features.forEach((feature) => {
//         const areaColor =
//           feature.properties.area === "Monarca"
//             ? "blue"
//             : feature.properties.area === "Bajío"
//             ? "grey"
//             : feature.properties.area === "Sureste"
//             ? "orange"
//             : feature.properties.area === "Golfo"
//             ? "purple"
//             : feature.properties.area === "Centro -Pacífico"
//             ? "red"
//             : feature.properties.area === "Valle de México Oriente"
//             ? "green"
//             : feature.properties.area === "Valle de México Poniente"
//             ? "brown"
//             : "black";

//         if (feature.geometry.type === "Polygon") {
//           const polygonCoords = feature.geometry.coordinates[0].map(
//             (coord) => ({
//               lat: coord[1],
//               lng: coord[0],
//             })
//           );

//           const polygon = new maps.Polygon({
//             paths: polygonCoords,
//             strokeColor: areaColor,
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: areaColor,
//             fillOpacity: 0.35,
//           });

//           polygon.addListener("click", () => {
//             console.log("Clic en el polígono:", feature.properties.area);
//             setSelectedArea(feature.properties.area); // Guardar el nombre del área seleccionada
//           });

//           polygon.setMap(map);
//         } else if (feature.geometry.type === "MultiPolygon") {
//           feature.geometry.coordinates.forEach((polygonCoords) => {
//             const outerCoords = polygonCoords[0].map((coord) => ({
//               lat: coord[1],
//               lng: coord[0],
//             }));

//             const outerPolygon = new maps.Polygon({
//               paths: [outerCoords],
//               strokeColor: areaColor,
//               strokeOpacity: 0.8,
//               strokeWeight: 2,
//               fillColor: areaColor,
//               fillOpacity: 0.35,
//             });

//             outerPolygon.addListener("click", () => {
//               console.log("Clic en el polígono:", feature.properties.area);
//               setSelectedArea(feature.properties.area); // Guardar el nombre del área seleccionada
//             });

//             outerPolygon.setMap(map);

//             // Iterar sobre los espacios vacíos interiores y dejarlos en blanco
//             for (let i = 1; i < polygonCoords.length; i++) {
//               const innerCoords = polygonCoords[i].map((coord) => ({
//                 lat: coord[1],
//                 lng: coord[0],
//               }));

//               const innerPolygon = new maps.Polygon({
//                 paths: [innerCoords],
//                 strokeColor: areaColor,
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: "#FFFFFF", // Color blanco para los anillos interiores
//                 fillOpacity: 1, // Opacidad completa para dejar en blanco
//               });

//               innerPolygon.setMap(map);
//             }
//           });
//         }
//       });
//     }
//   };

//   return (
//     <div style={{ height: "100%", width: "100%" }}>
//       {isLoading === true ? (
//         <SkeletonMapInsights />
//       ) : (
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w" }}
//           defaultCenter={defaultProps.center}
//           defaultZoom={6}
//           options={{
//             gestureHandling: "greedy",
//             ...mapOptions,
//           }}
//           yesIWantToUseGoogleMapApiInternals
//           onGoogleApiLoaded={({ map, maps }) => handleApiLoaded2(map, maps)}
//         />
//       )}
//     </div>
//   );
// };

// VERSION MANUAL

// *******************************************************************************************

// import React, { useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";
// import { defaultProps, mapOptions } from "./datos";
// import { useSelector } from "react-redux";
// import { pathVerify } from "../../Functions/pathVerify";
// import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
// import { fetchUniversal } from "../../utils/apiUtils";
// import polygonsData from "../../Functions/polyg.json";

// interface GeoJSON {
//   type: string;
//   features: GeoJSONFeature[];
// }

// interface GeoJSONFeature {
//   type: string;
//   properties: {
//     area: string;
//   };
//   geometry: {
//     type: string;
//     coordinates: number[][][] | number[][][][];
//   };
// }

// export const MapResponsive = ({ data, setData, isLoading, setIsLoading }) => {
//   const dt = useSelector((state: any) => state.works);
//   const dto = useSelector((state: any) => state.organization);
//   const [zoom, setZoom] = useState(defaultProps.zoom);
//   const body = { customer: dto, path: pathVerify() };
//   const [geojson, setGeojson] = useState<GeoJSON | null>(null);
//   const [selectedArea, setSelectedArea] = useState(
//     localStorage.getItem("selectedArea") || null
//   );
//   console.log(selectedArea);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);

//       const data = await fetchUniversal("insights", body, setIsLoading);
//       console.log("API Response Data:", data);

//       if (data && data.polygon_data) {
//         const geoJsonData: GeoJSON = {
//           type: "FeatureCollection",
//           features: data.polygon_data
//             .map((polygon: any) => {
//               // Verificar que polygon.geometry no es nulo
//               if (!polygon.geometry || !Array.isArray(polygon.geometry)) {
//                 console.error("Invalid geometry data for polygon:", polygon);
//                 return null;
//               }

//               const coordinates = polygon.geometry;

//               return {
//                 type: "Feature",
//                 properties: {
//                   area: polygon.region,
//                 },
//                 geometry: {
//                   type: "MultiPolygon",
//                   coordinates: coordinates,
//                 },
//               };
//             })
//             .filter((feature) => feature !== null),
//         };

//         setGeojson(geoJsonData);
//         setData(data);
//       } else {
//         console.error("No polygon_data found in API response");
//       }

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsLoading(false);
//     }
//   };

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   useEffect(() => {
//     fetchData();
//   }, [dt, dto]);

//   useEffect(() => {
//     if (selectedArea) {
//       localStorage.setItem("selectedArea", selectedArea);
//     }
//   }, [selectedArea]);

//   const handleApiLoaded2 = (map, maps) => {
//     if (geojson) {
//       geojson.features.forEach((feature, index) => {
//         const areaColor = getRandomColor();

//         if (feature.geometry.type === "Polygon") {
//           const polygonCoords = feature.geometry.coordinates[0].map(
//             (coord) => ({
//               lat: coord[1],
//               lng: coord[0],
//             })
//           );

//           const polygon = new maps.Polygon({
//             paths: polygonCoords,
//             strokeColor: areaColor,
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: areaColor,
//             fillOpacity: 0.35,
//           });

//           polygon.addListener("click", () => {
//             console.log("Clic en el polígono:", feature.properties.area);
//             setSelectedArea(feature.properties.area);
//           });

//           polygon.setMap(map);
//         } else if (feature.geometry.type === "MultiPolygon") {
//           feature.geometry.coordinates.forEach((polygonCoords) => {
//             const outerCoords = polygonCoords[0].map((coord) => ({
//               lat: coord[1],
//               lng: coord[0],
//             }));

//             const outerPolygon = new maps.Polygon({
//               paths: [outerCoords],
//               strokeColor: areaColor,
//               strokeOpacity: 0.8,
//               strokeWeight: 2,
//               fillColor: areaColor,
//               fillOpacity: 0.35,
//             });

//             outerPolygon.addListener("click", () => {
//               console.log("Clic en el polígono:", feature.properties.area);
//               setSelectedArea(feature.properties.area);
//             });

//             outerPolygon.setMap(map);

//             // Iterar sobre los espacios vacíos interiores y dejarlos en blanco
//             for (let i = 1; i < polygonCoords.length; i++) {
//               const innerCoords = polygonCoords[i].map((coord) => ({
//                 lat: coord[1],
//                 lng: coord[0],
//               }));

//               const innerPolygon = new maps.Polygon({
//                 paths: [innerCoords],
//                 strokeColor: areaColor,
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: "#FFFFFF",
//                 fillOpacity: 1,
//               });

//               innerPolygon.setMap(map);
//             }
//           });
//         }
//       });
//     }
//   };

//   return (
//     <div style={{ height: "100%", width: "100%" }}>
//       {isLoading === true ? (
//         <SkeletonMapInsights />
//       ) : (
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w" }}
//           defaultCenter={defaultProps.center}
//           defaultZoom={6}
//           options={{
//             gestureHandling: "greedy",
//             ...mapOptions,
//           }}
//           yesIWantToUseGoogleMapApiInternals
//           onGoogleApiLoaded={({ map, maps }) => handleApiLoaded2(map, maps)}
//         />
//       )}
//     </div>
//   );
// };

// VERSION DINAMICA API

// *******************************************************************************************
