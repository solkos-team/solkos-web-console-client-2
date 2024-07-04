import React, { useRef, useState, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { Stepper } from "@mantine/core";

export default function Stepper4() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
    <div
      className="insights_principal_container"
      style={{ height: "90%", padding: "0 0rem" }} // Mantener el padding a la derecha
    >
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
          Haz seguimiento de todos los parámetros de cada uno de tus
          enfriadores.
        </span>
      </div>
      <br></br>
      <br></br>
      <div>
        <Stepper
          active={4}
          onStepClick={setActive}
          radius="xs"
          size="sm"
          className="hide-on-mobile"
        >
          <Stepper.Step label="Revisión inicial" description=""></Stepper.Step>
          <Stepper.Step label="Activar vault" description=""></Stepper.Step>
          <Stepper.Step label="Desactivar vault" description=""></Stepper.Step>
          <Stepper.Step label="Errores" description=""></Stepper.Step>
          <Stepper.Step label="Revisión final" description=""></Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            maxWidth: "1200px",
            // background: "red",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          {/* Contenido del stepper */}
          <div
            style={{
              width: "100%",
              textAlign: "left",
              gap: "4px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "0.5rem",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "14px",
              }}
            >
              TABLA
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "155%",
              }}
            >
              Enfriadores
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row", // Cambiar a fila para alinear botones horizontalmente
          justifyContent: "flex-end", // Alinear botones a la derecha
          alignItems: "center",
          gap: "1rem", // Añadir espacio entre los botones
          alignSelf: "stretch",
        }}
      >
        <Button
          style={{
            fontSize: "0.8rem",
            color: "#ED5079",
            background: "white",
            width: "7rem",
          }}
          onClick={() => {
            navigate(`/home/Stepper3`);
          }}
        >
          Regresar
        </Button>
        <Button
          style={{
            fontSize: "0.8rem",
            color: "white",
            background: "#ED5079",
            width: "7rem",
          }}
          onClick={() => {
            navigate(`/home/Stepper5`);
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
