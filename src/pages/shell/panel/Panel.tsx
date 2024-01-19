import React, { useState, useEffect } from "react";

import PageFilter from "../../../components/pageFilter";

export default function Panel() {
  // Page (Body)
  useEffect(() => {
    // document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo

    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);
  return (
    <>
      <iframe
        src="https://tableau.efemsa.com/views/KOF_Nacional/KOF?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y"
        title="iframe Example 1"
        width="900"
        height="1200"
        style={{ marginLeft: -30 }}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </>
  );
}
