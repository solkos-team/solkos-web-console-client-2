import { Drawer } from "@mantine/core";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { defaultProps } from "../../../components/mapInsights/datos";
import { IconMap } from "@tabler/icons-react";
import { mapOptions } from "../../../components/mapInsights/datos";

export const DrawerMap = ({ opened, onClose, latitude, longitude }) => {
  const [map, setMap] = useState(null);
  const handleApiLoaded = (map, maps) => {
    setMap(map);

    const iconUrl = "../../sampleData/mappv.svg";

    new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Mi Marcador Fijo",
      icon: {
        url: iconUrl,
        scaledSize: new maps.Size(32, 32),
      },
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
  return (
    <Drawer opened={opened} onClose={onClose} position="right" size="100%">
      <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w" }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          // defaultZoom={6}
          defaultZoom={20}
          options={{
            gestureHandling: "greedy",
            fullscreenControl: false,
            scaleControl: false,
            zoomControl: false,
            ...mapOptions,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
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
        <button
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--pink-6, #ED5079)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "2rem",
            color: "#FFFF",
          }}
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Cerrar mapa
        </button>
        <style>
          {`
            .mantine-Drawer-header {
              display: none !important;
            }
          `}
        </style>
      </div>
    </Drawer>
  );
};
