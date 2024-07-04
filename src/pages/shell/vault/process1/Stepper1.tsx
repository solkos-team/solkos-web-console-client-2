import React, { useRef, useState, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { Stepper } from "@mantine/core";

export default function Stepper1() {
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
      <div>
        <Stepper
          active={1}
          onStepClick={setActive}
          radius="xs"
          size="xs"
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
            maxWidth: "450px", // Máximo ancho de 450px
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          {/* Contenido del stepper */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src={"../../sampleData/blue.svg"}
                alt="Descripción de la imagen"
              />
              <span
                style={{
                  color: "#3A3A3F",
                  fontSize: ".9rem",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Entradas de archivo
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#88888B",
                fontSize: ".8rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Enfriadores
            </span>
            <span
              style={{
                color: "#3A3A3F",
                fontSize: ".9rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                textAlign: "right",
              }}
            >
              100
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src={"../../sampleData/green.svg"}
                alt="Descripción de la imagen"
              />
              <span
                style={{
                  color: "#3A3A3F",
                  fontSize: ".9rem",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Entradas válidas
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#88888B",
                fontSize: ".8rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Enfriadores
            </span>
            <span
              style={{
                color: "#3A3A3F",
                fontSize: ".9rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                textAlign: "right",
              }}
            >
              98
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src={"../../sampleData/red.svg"}
                alt="Descripción de la imagen"
              />
              <span
                style={{
                  color: "#3A3A3F",
                  fontSize: ".9rem",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Enfriadores a activar vault
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#88888B",
                fontSize: ".8rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Enfriadores
            </span>
            <span
              style={{
                color: "#3A3A3F",
                fontSize: ".9rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                textAlign: "right",
              }}
            >
              70
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src={"../../sampleData/yellow.svg"}
                alt="Descripción de la imagen"
              />
              <span
                style={{
                  color: "#3A3A3F",
                  fontSize: ".9rem",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                Enfriadores a desactivar vault
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#88888B",
                fontSize: ".8rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Enfriadores
            </span>
            <span
              style={{
                color: "#3A3A3F",
                fontSize: ".9rem",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                textAlign: "right",
              }}
            >
              28
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
            navigate(`/home/Process1Vault`);
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
            navigate(`/home/Stepper2`);
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
