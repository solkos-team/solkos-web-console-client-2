import React, { useRef, useEffect } from "react";

export default function Stepper6() {
  useEffect(() => {
    // Añadir overflow hidden al montar el componente
    document.body.style.overflow = "hidden";

    // Eliminar overflow hidden al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <section style={{ width: "100%", height: "100%", flexDirection: "column" }}>
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
        <span style={{ color: "#88888B", fontSize: ".8rem" }}>
          Proceder con los cambios.
        </span>
      </div>
      <section
        style={{
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section className="vault_container_final">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect width="24" height="24" rx="4" fill="#B2F2BB" />
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#40C057"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="vault_container_final_h1">Proceso Completo</div>
        </section>
      </section>
    </section>
  );
}
