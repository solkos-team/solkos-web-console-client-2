// DrInsights.js
import React from "react";

const DrInsights = ({ cerrarDrawer }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100%",
        padding: "16px",
        background: "#FFF",
        border: "1px solid #88888B",
        borderRadius: "8px",
        transition: "left 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Drawer</h2>
        <button onClick={cerrarDrawer}>Cerrar</button>
      </div>
      <p>Hola, este es el contenido del Drawer.</p>
    </div>
  );
};

export default DrInsights;
