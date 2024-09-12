import React, { useRef, useState, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { Stepper } from "@mantine/core";
import { VaultLogo } from "../../../../sampleData/Vault/VaultIcons";
import { useLocation } from "react-router-dom";

export default function Stepper1() {
  const location = useLocation();

  // Recupera los datos desde location.state o localStorage
  const [vaultData, setVaultData] = useState(() => {
    const localStorageData = localStorage.getItem("vaultData");
    return (
      location.state?.vaultData ||
      (localStorageData ? JSON.parse(localStorageData) : null)
    );
  });

  console.log("Datos recibidos en Stepper1:", vaultData);
  console.log(vaultData?.entradas?.total);

  useEffect(() => {
    // Si hay datos en vaultData, guárdalos en localStorage
    if (vaultData) {
      localStorage.setItem("vaultData", JSON.stringify(vaultData));
    }
  }, [vaultData]);

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

  useEffect(() => {
    // Añadir overflow hidden al montar el componente
    document.body.style.overflow = "hidden";

    // Eliminar overflow hidden al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section style={{ marginTop: -40, marginLeft: -20 }}>
      <div
        className="vault_Information_Container2"
        style={{ height: 540, marginTop: 10 }}
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
            src={VaultLogo}
            alt="Descripción de la imagen"
            style={{
              width: "3.688rem",
              height: "1.125rem",
            }}
          />
          <span style={{ color: "#88888B", fontSize: ".8rem" }}>
            Haz seguimiento de todos los parámetros de cada uno de tus
            enfriadores.
          </span>
        </div>
        <br></br>
        <div style={{ width: "80%" }}>
          <Stepper
            active={1}
            onStepClick={setActive}
            radius="xs"
            size="xs"
            className="hide-on-mobile"
          >
            <Stepper.Step
              label="Revisión inicial"
              description=""
            ></Stepper.Step>
            <Stepper.Step label="Activar vault" description=""></Stepper.Step>
            <Stepper.Step
              label="Desactivar vault"
              description=""
            ></Stepper.Step>
            <Stepper.Step label="Errores" description=""></Stepper.Step>
            <Stepper.Step label="Revisión final" description=""></Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 100,
            alignSelf: "stretch",
            // background: "red",
            // marginTop: -100,
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
                {vaultData?.entradas?.total === undefined
                  ? "Sin registro"
                  : vaultData?.entradas?.total}
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
                {vaultData?.entradas_validas?.total === undefined
                  ? "Sin registro"
                  : vaultData?.entradas_validas?.total}
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
                {vaultData?.activar_vault?.total === undefined
                  ? "Sin registro"
                  : vaultData?.activar_vault?.total}
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
                {vaultData?.desactivar_vault?.total === undefined
                  ? "Sin registro"
                  : vaultData?.desactivar_vault?.total}
              </span>
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button
            style={{
              fontSize: "0.8rem",
              color: "#ED5079",
              background: "white",
            }}
            className="button"
            onClick={() => {
              navigate(`/home/Process1Vault`);
            }}
          >
            Regresar
          </Button>
          <Button
            className="continue-button"
            style={{
              fontSize: "0.8rem",
              color: "white",
              background: "#ED5079",
            }}
            onClick={() => {
              navigate(`/home/Stepper2`);
            }}
          >
            Continuar
          </Button>
        </div>
      </div>
    </section>
  );
}
