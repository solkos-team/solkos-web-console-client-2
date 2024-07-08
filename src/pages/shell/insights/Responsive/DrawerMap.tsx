import { Drawer } from '@mantine/core'
import React from 'react'
import GoogleMapReact from "google-map-react";
import { defaultProps } from '../../../../components/mapInsights/datos';


export const DrawerMap = ({opened,onClose,handleApiLoaded}) => {
  return (
    <Drawer 
    opened={opened}
    onClose={onClose}
    position="right"
    size="100%">
        <div style={{width:'100%',height:'100%',backgroundColor:'red'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w" }}
          defaultCenter={defaultProps.center}
          defaultZoom={6}
          options={{
            gestureHandling: "greedy",
            fullscreenControl : false,
            scaleControl : false,
            zoomControl : false
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          />
        </div>
    </Drawer>
  )
}
