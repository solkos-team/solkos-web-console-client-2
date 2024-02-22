import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IconMap, IconMap2 } from "@tabler/icons-react";

interface Marker {
  setMap(map: any): void;
}

const MapComponent2 = ({
  latitude,
  longitude,
  last_latitude,
  last_longitude,
}) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [line, setLine] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w&libraries=places`;
    script.async = true;

    script.onload = () => {
      setGoogleMapsLoaded(true);
    };

    script.onerror = () => {
      console.error("Error al cargar el script de Google Maps");
      setGoogleMapsLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleApiLoaded = (map, maps) => {
    setMap(map);

    const iconUrl = "../../sampleData/icon1.svg";
    const iconUrl2 = "../../sampleData/icon2.svg";

    const currentMarker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Mi Marcador Fijo",
      icon: {
        url: iconUrl,
        scaledSize: new maps.Size(32, 32),
      },
    });

    const anotherMarker = new maps.Marker({
      position: { lat: last_latitude, lng: last_longitude },
      map,
      title: "Otro Marcador",
      icon: {
        url: iconUrl2,
        scaledSize: new maps.Size(25, 25),
      },
    });

    setMarkers([currentMarker, anotherMarker]);

    const lineCoordinates = [
      { lat: latitude, lng: longitude },
      { lat: last_latitude, lng: last_longitude },
    ];
    const linePath = new maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: "transparent",
      strokeOpacity: 0,
      strokeWeight: 0,
      icons: [
        {
          icon: {
            path: "M 0,-1 0,1",
            strokeColor: "#f0547c",
            strokeOpacity: 1,
            scale: 4,
          },
          offset: "0",
          repeat: "20px",
        },
      ],
    });

    linePath.setMap(map);
    setLine(linePath);

    const zoomLevel = Math.log2(
      12200000 /
        (Dist(latitude, longitude, last_latitude, last_longitude) * 1000)
    );
    map.setZoom(zoomLevel);
  };

  const Dist = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;
  };

  const openGoogleMaps = () => {
    //@ts-ignore
    if (window.google && window.google.maps) {
      const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${last_latitude},${last_longitude}`;
      window.open(url, "_blank");
    } else {
      console.error("La API de Google Maps no se ha cargado completamente.");
    }
  };

  if (!googleMapsLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "15vw",
        flexShrink: 0,
        borderRadius: "8px",
        border: "1px solid #CACACA",
        overflow: "hidden",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w",
        }}
        center={{ lat: latitude, lng: longitude }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={{
          gestureHandling: "greedy",
          fullscreenControl: false,
        }}
      />
      <div
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
      </div>
    </div>
  );
};

export default MapComponent2;
