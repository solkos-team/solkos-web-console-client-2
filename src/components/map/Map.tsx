import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IconMap, IconMap2 } from "@tabler/icons-react";

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

    // URL de la imagen que quieres usar como marcador
    const iconUrl = "../../sampleData/filled.png";

    // Agregar el marcador fijo con la imagen personalizada
    new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Mi Marcador Fijo",
      icon: {
        url: iconUrl,
        scaledSize: new maps.Size(32, 32), // Tamaño de la imagen
      },
    });
  };

  if (!googleMapsLoaded) {
    return <div>Error al cargar Google Maps</div>;
  }

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
    return <div>Error al cargar Google Maps</div>;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "450px",
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
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "25px", // Ajusta la posición vertical
          right: "10px", // Ajusta la posición horizontal
        }}
      >
        {/* Agrega el ícono SVG de Tabler Icons */}

        <IconMap
          size={30}
          style={{ color: "#666666", cursor: "pointer" }}
          onClick={openGoogleMaps}
        />
      </div>
    </div>
  );
};

export default MapComponent;
