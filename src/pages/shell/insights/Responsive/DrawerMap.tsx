import { Drawer } from '@mantine/core'
import React from 'react'
import GoogleMapReact from "google-map-react";
import { defaultProps } from '../../../../components/mapInsights/datos';


export const DrawerMap = ({opened,onClose,handleApiLoaded}) => {
  return (
    <Drawer opened={opened} onClose={onClose} position="right" size="100%" >
      <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w" }}
          defaultCenter={defaultProps.center}
          defaultZoom={6}
          options={{
            gestureHandling: "greedy",
            fullscreenControl: false,
            scaleControl: false,
            zoomControl: false,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
        <button
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--pink-6, #ED5079)",
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            gap :'10px'
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
}
