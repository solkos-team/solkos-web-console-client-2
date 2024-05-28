import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IconMap } from "@tabler/icons-react";

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

    const iconUrl = "../../sampleData/mappin.svg";
    const iconUrlSmall = "../../sampleData/pdv.svg";
    const iconUrl2 = "../../sampleData/mappin.svg";
    const iconUrlSmall2 = "../../sampleData/ub.svg";

    const currentMarker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Mi Marcador Fijo",
      icon: {
        url: iconUrl,
        scaledSize: new maps.Size(25, 25),
        labelOrigin: new maps.Point(85, 12),
      },
      label: {
        text: "Punto de instalación",
        color: "#ED5079",
        fontSize: "12px",
        fontWeight: "bold",
      },
    });

    const currentMarkerSmall = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      icon: {
        url: iconUrlSmall,
        scaledSize: new maps.Size(12, 12),
        anchor: new maps.Point(6.5, 20), // Ajustar para mover hacia arriba
      },
      zIndex: maps.Marker.MAX_ZINDEX + 1, // Asegura que esté por encima
    });

    const anotherMarker = new maps.Marker({
      position: { lat: last_latitude, lng: last_longitude },
      map,
      title: "Otro Marcador",
      icon: {
        url: iconUrl2,
        scaledSize: new maps.Size(25, 25),
        labelOrigin: new maps.Point(75, 12),
      },
      label: {
        text: "Última ubicación",
        color: "#ED5079",
        fontSize: "12px",
        fontWeight: "bold",
        labelOrigin: new maps.Point(1000, 200),
      },
    });

    const anotherMarkerSmall = new maps.Marker({
      position: { lat: last_latitude, lng: last_longitude },
      map,
      icon: {
        url: iconUrlSmall2,
        scaledSize: new maps.Size(12, 12),
        anchor: new maps.Point(6.5, 20), // Ajustar para mover hacia arriba
      },
      zIndex: maps.Marker.MAX_ZINDEX + 1, // Asegura que esté por encima
    });

    setMarkers([
      currentMarker,
      currentMarkerSmall,
      anotherMarker,
      anotherMarkerSmall,
    ]);

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
            scale: 2.8,
          },
          offset: "0",
          repeat: "15px",
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
        height: "17vw",
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
          top: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "#868E96",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
        onClick={openGoogleMaps}
      >
        <IconMap size={17} style={{ color: "#FFFFFF" }} />
        <span style={{ marginLeft: "8px", color: "#FFFFFF", fontSize: 12 }}>
          Ver en maps
        </span>{" "}
      </div>
    </div>
  );
};

export default MapComponent2;
