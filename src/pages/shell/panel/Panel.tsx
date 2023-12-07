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
  return <PageFilter />;
}
