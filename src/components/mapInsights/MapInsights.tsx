import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { fetchUniversal } from "../../utils/apiUtils";
import { CoolerInterface as Cooler } from "../../interfaces/CoolerInterface";
import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
const MapInsightsComponent = ({ items, data }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [coolersData, setCoolersData] = useState<Cooler[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState(data);
  const [map, setMap] = useState<String>();
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  const body2 = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    page_size: items > 1000 || items === 0 ? 1000 : items,
    page_number: 1,
  };
  const body = { customer: dto, path: pathVerify() };
  const fetchData2 = async () => {
    try {
      const data = await fetchUniversal("insights", body, setIsLoading);
      setMarkers(
        data
          ? data.geo_data
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
              }))
          : []
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };

  useEffect(() => {
    fetchData2();
  }, [dt, dto]);

  const [scale, setScale] = useState(24);
  const handleApiLoaded = (map, maps) => {
    setMap(map);
    const bounds = new maps.LatLngBounds();
    var mIcon = {
      path: maps.SymbolPath.CIRCLE,
      fillOpacity: 0.8,
      fillColor: "#ED5079",
      strokeOpacity: 0.0,
      strokeWeight: 1,
      scale: Number(scale),
    };
    markers === undefined
      ? []
      : markers.forEach(({ latitude, longitude, num_coolers, area }, index) => {
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

          marker.addListener("mouseover", (e) => {
            marker.setIcon({ mIcon, scaledSize: 44 });
          });

          marker.addListener("mouseout", (e) => {
            setScale(24);
          });
          bounds.extend(marker.getPosition());
        });

    map.fitBounds(bounds);
  };
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        flexShrink: 0,
        borderRadius: "0.5rem",
        // border: "1px solid #CACACA",
        overflow: "hidden",
      }}
    >
      {isLoading === true ? (
        <SkeletonMapInsights />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w",
          }}
          center={
            markers.length > 0
              ? { lat: markers[0].latitude, lng: markers[0].longitude }
              : { lat: 0, lng: 0 }
          }
          defaultZoom={30}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          options={{
            gestureHandling: "greedy",
            fullscreenControl: false,
          }}
        />
      )}

      {/* <div
        style={{
          position: "absolute",
          top: "25px",
          right: "10px",
        }}
      >
        <IconMap
          size={30}
          style={{ color: "#666666", cursor: "pointer" }}
          onClick={openGoogleMaps}
        />
      </div> */}
    </div>
  );
};

export default MapInsightsComponent;
