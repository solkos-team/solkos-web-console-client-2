import React, { useRef, useEffect } from "react";

export default function InsightsVault() {
  useEffect(() => {
    // Añadir overflow hidden al montar el componente
    document.body.style.overflow = "hidden";

    // Eliminar overflow hidden al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {" "}
      <div className="insights_principal_container" style={{ height: "90%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <img
            src={"../../sampleData/logovault.svg"}
            alt="Descripción de la imagen"
            style={{ width: "5rem", height: "3rem", marginTop: -20 }}
          />
          <text style={{ color: "#88888B", fontSize: ".8rem" }}>
            Haz seguimiento de todos los parámetros de cada uno de tus
            enfriadores.
          </text>
        </div>
        <div style={{ marginTop: 150 }}>INSIGHTS</div>
      </div>
    </>
  );
}
