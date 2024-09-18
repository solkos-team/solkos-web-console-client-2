import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { defaultProps, mapOptions } from "./datos";
import { useSelector } from "react-redux";
import { pathVerify } from "../../Functions/pathVerify";
import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
import { fetchUniversal } from "../../utils/apiUtils";
import polygonsData from "../../Functions/polyg.json";
import { MapInsightsResponsive } from "../../pages/shell/insights/Responsive/MapInsightsResponsive";
import { DrawerMap } from "../../pages/shell/insights/Responsive/DrawerMap";
interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

interface GeoJSONFeature {
  type: string;
  properties: {
    area: string;
    region: string;
    zone: string;
    operative_unit: string;
    type: string;
    route: string;
    serial_number?: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

export const MapResponsive = ({ data, setData, isLoading, setIsLoading }) => {
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const [zoom, setZoom] = useState(defaultProps.zoom);
  const [dataSelect, setDataSelect] = useState([]);
  const [dataSelectLoaded, setDataSelectLoaded] = useState(false);
  const [renamedResult, setRenamedResult] = useState<string[]>([]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        // Obtener el token de localStorage
        const token = localStorage.getItem("Token");

        const response = await fetch(
          "https://qa-test---universal-console-server-b7agk5thba-uc.a.run.app/hierachy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Añadir el token al encabezado
            },
            body: JSON.stringify({ customer: dto }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          // console.log("Datos originales:", result);

          // Mapear los nombres de los campos
          const renamedResult = result.map((item) => {
            if (item === "Region") return "region";
            if (item === "Zona") return "zone";
            if (item === "Unidad Operativa") return "operative_unit";
            if (item === "Ruta") return "route";
            return item; // Retornar el valor original si no coincide con los anteriores
          });

          // Guardar el resultado renombrado en el estado
          setDataSelect(result); // Guardar los datos originales si los necesitas
          setRenamedResult(renamedResult); // Guardar los datos renombrados
          setDataSelectLoaded(true);

          // console.log("Datos renombrados:", renamedResult);
        } else {
          console.error("Error in response:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, [dto, dt]);

  // Fuera del useEffect puedes utilizar renamedResult
  // console.log("Datos renombrados fuera del useEffect:", renamedResult);

  const body = {
    customer: dto,
    path: pathVerify(),
    map_coolers: pathVerify().length >= dataSelect.length ? true : false,
    // map_coolers:
    //   (dto === "HEINEKEN" && pathVerify().length >= 3) ||
    //   (dto !== "HEINEKEN" && pathVerify().length >= 4)
    //     ? true
    //     : false,
  };

  const [geojson, setGeojson] = useState<GeoJSON | null>(null);
  const [opened, setOpened] = useState(false);
  const toggleDrawer = () => setOpened((flag) => !flag);
  const [selectedArea, setSelectedArea] = useState<string | null>(
    localStorage.getItem("selectedArea") || null
  );
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mapsInstance, setMapsInstance] = useState<any>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const data = await fetchUniversal("insights", body, setIsLoading);
      // console.log("API Response Data:", data);

      if (data) {
        if (data.polygon_data) {
          const geoJsonData = {
            type: "FeatureCollection",
            features: data.polygon_data
              .map((polygon) => {
                if (polygon.type === "coolers") {
                  return polygon.coolers.map((cooler) => ({
                    type: "Feature",
                    properties: {
                      area: cooler.region,
                      region: cooler.region,
                      zone: cooler.zone,
                      operative_unit: cooler.operative_unit,
                      route: cooler.route,
                      type: "coolers",
                      serial_number: cooler.serial_number,
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [
                        parseFloat(cooler.longitude),
                        parseFloat(cooler.latitude),
                      ],
                    },
                  }));
                } else if (polygon.type === "route") {
                  return {
                    type: "Feature",
                    properties: {
                      area: polygon.region,
                      region: polygon.region,
                      zone: polygon.zone,
                      operative_unit: polygon.operative_unit,
                      route: polygon.route,
                      type: polygon.type,
                    },
                    geometry: {
                      type: "Point",
                      coordinates: polygon.geometry,
                    },
                  };
                } else {
                  if (!polygon.geometry || !Array.isArray(polygon.geometry)) {
                    console.error(
                      "Invalid geometry data for polygon:",
                      polygon
                    );
                    return null;
                  }

                  const coordinates = polygon.geometry;

                  return {
                    type: "Feature",
                    properties: {
                      area: polygon.region,
                      region: polygon.region,
                      zone: polygon.zone,
                      operative_unit: polygon.operative_unit,
                      route: polygon.route,
                      type: polygon.type,
                    },
                    geometry: {
                      type: "MultiPolygon",
                      coordinates: coordinates,
                    },
                  };
                }
              })
              .flat()
              .filter((feature) => feature !== null),
          };

          setGeojson(geoJsonData);
        } else {
          console.warn("No polygon_data found in API response");
          setGeojson(null); // Limpia el estado del mapa
        }

        setData(data);
      } else {
        console.error("No data found in API response");
        setGeojson(null); // Limpia el estado del mapa
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGeojson(null); // Limpia el estado del mapa
      setIsLoading(false);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    fetchData();
    // console.log("useEffect ejecutado con dt:", dt, "y dto:", dto);
  }, [dt, dto]);

  const handleApiLoaded2 = (map, maps) => {
    if (geojson) {
      const bounds = new maps.LatLngBounds();

      // Limpia los antiguos overlays
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });

      const tooltipElement = document.createElement("div");
      tooltipElement.className = "tooltip";
      tooltipElement.style.position = "absolute";
      tooltipElement.style.backgroundColor = "white";
      tooltipElement.style.border = "1px solid black";
      tooltipElement.style.padding = "5px";
      tooltipElement.style.display = "none"; // Ocultar inicialmente
      document.body.appendChild(tooltipElement);

      geojson.features.forEach((feature) => {
        const areaColor = getRandomColor();

        const handleClick = () => {
          const { region, zone, operative_unit, route, type, serial_number } =
            feature.properties;
          let selectedValue = "";

          const hasProperty = (prop) => renamedResult.includes(prop);

          if (type === "region" && hasProperty("region")) {
            selectedValue = region;
          } else if (
            type === "zone" &&
            hasProperty("region") &&
            hasProperty("zone")
          ) {
            selectedValue = `${region}, ${zone}`;
          } else if (
            type === "operative_unit" &&
            hasProperty("region") &&
            hasProperty("zone") &&
            hasProperty("operative_unit")
          ) {
            selectedValue = `${region}, ${zone}, ${operative_unit}`;
          } else if (
            type === "route" &&
            hasProperty("region") &&
            hasProperty("zone") &&
            hasProperty("route")
          ) {
            selectedValue = hasProperty("operative_unit")
              ? `${region}, ${zone}, ${operative_unit}, ${route}`
              : `${region}, ${zone}, ${route}`;
          } else if (type === "coolers") {
            if (serial_number) {
              window.open(`/home/clt/${serial_number}`, "_blank");
            }
            return; // Evita realizar otras acciones para coolers
          }

          setSelectedArea(selectedValue);
          // console.log("Propiedades ya verificadas:", selectedValue);
          localStorage.setItem("selectedArea", selectedValue); // Guardar en localStorage
          // console.log("Clic en:", selectedValue);

          const splitValues: string[] = selectedValue
            .split(",")
            .map((item) => item.trim());
          let updatedPath: string[] = [];

          // Verificar si dt es un array, si no convertirlo a array
          if (Array.isArray(dt)) {
            updatedPath = [...dt, ...splitValues];
          } else {
            updatedPath = splitValues;
          }

          localStorage.setItem("PATH", JSON.stringify(updatedPath));

          // Ejecuta el recarga de la página si el tipo no es 'coolers'
          if (type !== "coolers") {
            window.location.reload();
          }
        };

        if (feature.geometry.type === "MultiPolygon") {
          feature.geometry.coordinates.forEach((polygonCoords) => {
            const outerCoords = polygonCoords[0].map((coord) => ({
              lat: coord[1],
              lng: coord[0],
            }));

            const outerPolygon = new maps.Polygon({
              paths: [outerCoords],
              strokeColor: areaColor,
              strokeOpacity: 1,
              strokeWeight: 0.6,
              fillColor: areaColor,
              fillOpacity: 0.6,
            });

            outerPolygon.addListener("click", handleClick);

            outerPolygon.addListener("mouseover", (event) => {
              if (feature.properties.type === "coolers") return; // No mostrar tooltip para coolers

              const { type } = feature.properties;
              const value = feature.properties[type] || "";

              tooltipElement.innerHTML = value;
              tooltipElement.style.display = "block";

              const x = event.domEvent.clientX;
              const y = event.domEvent.clientY;
              tooltipElement.style.left = `${x + 10}px`; // Ajusta la posición horizontal
              tooltipElement.style.top = `${y + 10}px`; // Ajusta la posición vertical
            });

            outerPolygon.addListener("mousemove", (event) => {
              if (feature.properties.type === "coolers") return; // No mostrar tooltip para coolers

              const x = event.domEvent.clientX;
              const y = event.domEvent.clientY;
              tooltipElement.style.left = `${x + 10}px`; // Ajusta la posición horizontal
              tooltipElement.style.top = `${y + 10}px`; // Ajusta la posición vertical
            });

            outerPolygon.addListener("mouseout", () => {
              if (feature.properties.type === "coolers") return; // No ocultar tooltip para coolers

              tooltipElement.style.display = "none"; // Ocultar el tooltip
            });

            outerPolygon.setMap(map);

            outerCoords.forEach((coord) => {
              bounds.extend(coord);
            });

            for (let i = 1; i < polygonCoords.length; i++) {
              const innerCoords = polygonCoords[i].map((coord) => ({
                lat: coord[1],
                lng: coord[0],
              }));

              const innerPolygon = new maps.Polygon({
                paths: [innerCoords],
                strokeColor: areaColor,
                strokeOpacity: 0.8,
                strokeWeight: 0.5,
                fillColor: "#FFFFFF",
                fillOpacity: 1,
              });

              innerPolygon.setMap(map);

              innerCoords.forEach((coord) => {
                bounds.extend(coord);
              });
            }
          });
        } else if (feature.geometry.type === "Point") {
          const [lng, lat] = feature.geometry.coordinates;
          const { type } = feature.properties;

          // Define el icono base
          const baseIconUrl = {
            url: "../../sampleData/pin_r.svg",
            scaledSize: new maps.Size(32, 32),
          };

          // Define el icono superpuesto para tipos específicos
          let overlayIconUrl;
          if (type === "route") {
            overlayIconUrl = {
              url: "../../sampleData/pin_r2.svg",
              scaledSize: new maps.Size(14, 14),
              anchor: new maps.Point(7, 27), // Centra el overlayIcon
            };
          } else if (type === "coolers") {
            overlayIconUrl = {
              url: "../../sampleData/fridge_r.svg",
              scaledSize: new maps.Size(14, 14),
              anchor: new maps.Point(7, 27), // Centra el overlayIcon
            };
          }

          const marker = new maps.Marker({
            position: { lat, lng },
            map,
            icon: baseIconUrl,
          });

          // Añade el icono de overlay como un segundo marcador
          if (type === "route" || type === "coolers") {
            const overlayMarker = new maps.Marker({
              position: { lat, lng },
              map,
              icon: overlayIconUrl,
            });

            overlayMarker.setMap(map);

            // Agrega el evento de clic al overlayMarker
            overlayMarker.addListener("click", handleClick);
          }

          marker.addListener("click", handleClick);

          marker.addListener("mouseover", (event) => {
            if (feature.properties.type === "coolers") return; // No mostrar tooltip para coolers

            const { type } = feature.properties;
            const value = feature.properties[type] || "";

            tooltipElement.innerHTML = value;
            tooltipElement.style.display = "block";

            const x = event.domEvent.clientX;
            const y = event.domEvent.clientY;
            tooltipElement.style.left = `${x + 10}px`; // Ajusta la posición horizontal
            tooltipElement.style.top = `${y + 10}px`; // Ajusta la posición vertical
          });

          marker.addListener("mousemove", (event) => {
            if (feature.properties.type === "coolers") return; // No mostrar tooltip para coolers

            const x = event.domEvent.clientX;
            const y = event.domEvent.clientY;
            tooltipElement.style.left = `${x + 10}px`; // Ajusta la posición horizontal
            tooltipElement.style.top = `${y + 10}px`; // Ajusta la posición vertical
          });

          marker.addListener("mouseout", () => {
            if (feature.properties.type === "coolers") return; // No ocultar tooltip para coolers

            tooltipElement.style.display = "none"; // Ocultar el tooltip
          });

          marker.setMap(map);
          bounds.extend({ lat, lng });
        }
      });

      map.fitBounds(bounds);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {isLoading ? (
        <SkeletonMapInsights />
      ) : (
        <>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={{
              gestureHandling: "greedy",
              ...mapOptions,
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              setMapInstance(map);
              setMapsInstance(maps);
              handleApiLoaded2(map, maps);
            }}
          />
          <MapInsightsResponsive opened={toggleDrawer} />
          <DrawerMap
            opened={opened}
            onClose={toggleDrawer}
            handleApiLoaded={handleApiLoaded2}
          />
        </>
      )}
    </div>
  );
};
