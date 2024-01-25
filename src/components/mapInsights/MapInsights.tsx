import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const MapInsightsComponent = ({ markers }) => {
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

    const bounds = new maps.LatLngBounds();

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

  const openGoogleMaps = () => {
    //@ts-ignore
    if (window.google && window.google.maps) {
      const url = `https://www.google.com/maps/search/?api=1&query=${markers[0].latitude},${markers[0].longitude}`;
      window.open(url, "_blank");
    } else {
      console.error("La API de Google Maps no se ha cargado completamente.");
    }
  };

  if (!googleMapsLoaded) {
    return <div></div>;
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
        }}
      />
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
