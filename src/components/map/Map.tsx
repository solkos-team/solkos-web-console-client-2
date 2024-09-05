import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IconMap, IconMap2 } from "@tabler/icons-react";
import { mapOptions } from "../mapInsights/datos";

const MapComponent = ({ latitude, longitude }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [map, setMap] = useState(null);

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

    new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Mi Marcador Fijo",
      icon: {
        url: iconUrl,
        scaledSize: new maps.Size(32, 32),
        labelOrigin: new maps.Point(90, 12),
      },
      label: {
        text: "Punto de instalación",
        color: "#ED5079",
        fontSize: "12px",
        fontWeight: "bold",
        labelOrigin: new maps.Point(1000, 200),
      },
    });
    // Ícono pequeño superpuesto
    new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      icon: {
        url: iconUrlSmall,
        scaledSize: new maps.Size(16, 16),
        anchor: new maps.Point(8, 28), // Centrar el ícono pequeño sobre el ícono principal
      },
      zIndex: maps.Marker.MAX_ZINDEX + 1, // Asegura que el ícono pequeño esté por encima
    });
  };

  const openGoogleMaps = () => {
    //@ts-ignore
    if (window.google && window.google.maps) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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
        height: "100%",
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
        defaultZoom={20}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={{
          gestureHandling: "greedy",
          fullscreenControl: false,
          ...mapOptions,
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
        <span
          style={{ marginLeft: "8px", color: "#FFFFFF", fontSize: "0.75rem" }}
        >
          Ver en maps
        </span>{" "}
      </div>
    </div>
  );
};

export default MapComponent;
