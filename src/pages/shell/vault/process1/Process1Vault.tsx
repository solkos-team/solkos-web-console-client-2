import React, { useRef, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";

export default function Process1Vault() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Aquí puedes manejar el archivo seleccionado
    }
  };

  useEffect(() => {
    // Añadir overflow hidden al montar el componente
    document.body.style.overflow = "hidden";

    // Eliminar overflow hidden al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 100,
          alignSelf: "stretch",
          marginTop: -100,
        }}
      >
        <text
          style={{
            color: "#2393F4",
            fontSize: "0.8rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "28px",
            cursor: "pointer",
          }}
          onClick={handleFileClick}
        >
          CARGAR ARCHIVOS +
        </text>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          alignSelf: "stretch",
        }}
      >
        <Button
          style={{
            fontSize: "0.8rem",
            color: "white",
            background: "#ED5079",
            width: "7rem",
          }}
          onClick={() => {
            navigate(`/home/Stepper1`);
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
