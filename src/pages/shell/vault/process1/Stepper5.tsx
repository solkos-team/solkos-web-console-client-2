import React, { useRef, useState, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { Stepper, TextInput, Group } from "@mantine/core";
import { VaultLogo } from "../../../../sampleData/Vault/VaultIcons";
import { useLocation } from "react-router-dom";

export default function Stepper5() {
  const location = useLocation();
  let vaultData = location.state?.vaultData;

  // Si los datos no vienen de location.state, cargarlos desde localStorage
  if (!vaultData) {
    const storedVaultData = localStorage.getItem("vaultData");
    vaultData = storedVaultData ? JSON.parse(storedVaultData) : null;
  }

  const coolers = vaultData?.activar_vault?.Coolers || [];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [active, setActive] = useState(5);
  const [confirmationWord, setConfirmationWord] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const nextStep = () => {
    if (active < 5) {
      setActive(active + 1);
    } else {
      navigate(`/home/Stepper6`);
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationWord(event.currentTarget.value);
    if (event.currentTarget.value === "CONFIRMAR") {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
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
    <section style={{ marginTop: -40, marginLeft: -20 }}>
      <div
        className="vault_Information_Container2"
        style={{ height: 538, marginTop: 10 }}
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
            Proceder con los cambios.
          </span>
        </div>

        <div style={{ width: "80%" }}>
          <Stepper
            active={5}
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
            <Stepper.Step label="Duplicados" description=""></Stepper.Step>
            <Stepper.Step label="Revisión final" description=""></Stepper.Step>
            <Stepper.Completed>
              <></>
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
                  src={"../../sampleData/blue_1.svg"}
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
                  Duplicados
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
                {vaultData?.duplicados?.total === undefined
                  ? "Sin registro"
                  : vaultData?.duplicados?.total}
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
                  src={"../../sampleData/alert-circle.svg"}
                  alt="Descripción de la imagen"
                />
                <span
                  style={{
                    color: "#111827",
                    fontSize: ".75rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Para proceder con los cambios escribir la contraseña
                </span>
              </div>
            </div>
            <TextInput
              placeholder="*** Contraseña"
              value={confirmationWord}
              onChange={handleInputChange}
              style={{ marginTop: "1rem", width: "100%", maxWidth: "450px" }}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="button-container">
          <Button
            className="button"
            style={{
              fontSize: "0.8rem",
              color: "#ED5079",
              background: "white",
            }}
            onClick={() => {
              navigate(`/home/Stepper4_1`);
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
            onClick={nextStep}
            disabled={!isConfirmed}
          >
            Continuar
          </Button>
        </div>
      </div>
    </section>
  );
}
