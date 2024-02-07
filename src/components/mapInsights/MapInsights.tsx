import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { fetchUniversal } from "../../utils/apiUtils";
import { CoolerInterface as Cooler } from "../drawerOutlets/CoolerInterface";
import { SkeletonMapInsights } from "../skeletonMapInsights/SkeletonMapInsights";
const MapInsightsComponent = ({items,data }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [coolersData, setCoolersData] = useState<Cooler[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [markers,setMarkers] = useState(data)
  const [map, setMap] = useState<String>();
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body2 = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    page_size: items > 1000 || items == 0 ? 1000 : items,
    page_number: 1,
  };
  const fetchData2 = async () => {
    try {
      const data = await fetchUniversal("coolers", body2, setIsLoading);
      setMarkers(data
        ? data
        .filter(
          (cooler) =>
          parseFloat(cooler.latitude) !== 0 &&
          parseFloat(cooler.longitude) !== 0
          )
          .map((cooler) => ({
            latitude: parseFloat(cooler.latitude),
            longitude: parseFloat(cooler.longitude),
          }))
          : [])
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };

  useEffect(() => {    
    fetchData2()    
  }, [dt,dto]);

  const handleApiLoaded = (map, maps) => {
    setMap(map);
    const bounds = new maps.LatLngBounds();
    markers == undefined ? [] :
    markers.forEach(({ latitude, longitude }, index) => {
      const marker = new maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: `Marcador ${index + 1}`,
        icon: {
          path: maps.SymbolPath.CIRCLE,
          fillColor: "#ec5078", // Color de relleno del círculo
          fillOpacity: 1.0,
          scale: 2, // Tamaño del círculo
          strokeColor: "#000000", // Color del borde del círculo
          strokeWeight: 0.1, // Grosor del borde del círculo
        },
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
        borderRadius: "8px",
        border: "1px solid #CACACA",
        overflow: "hidden",
      }}
    >
      {isLoading == true ? (<SkeletonMapInsights />) : (
        <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w",
        }}
        center={
          markers.length > 0
            ? { lat: markers[0].latitude, lng: markers[0].longitude }
            : { lat: 0, lng: 0 }
        }
        defaultZoom={20}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={{
          gestureHandling: "greedy",
          fullscreenControl: false,
        }}/>
      )}
      
      <div
        style={{
          position: "absolute",
          top: "25px",
          right: "10px",
        }}
      >
        {/* <IconMap
          size={30}
          style={{ color: "#666666", cursor: "pointer" }}
          onClick={openGoogleMaps}
        /> */}
      </div>
    </div>
  );
};

export default MapInsightsComponent;
