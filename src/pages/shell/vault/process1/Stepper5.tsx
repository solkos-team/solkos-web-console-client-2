import React, { useRef, useState, useMemo } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { Stepper, TextInput, Group } from "@mantine/core";
import { VaultLogo } from "../../../../sampleData/Vault/VaultIcons";
import { useLocation } from "react-router-dom";
import { fetchVaul } from "../../../../utils/apiUtils";

export default function Stepper5() {
  const location = useLocation();
  let vaultData = location.state?.vaultData;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // Si los datos no vienen de location.state, cargarlos desde localStorage
  if (!vaultData) {
    const storedVaultData = localStorage.getItem("vaultData");
    vaultData = storedVaultData ? JSON.parse(storedVaultData) : null;
  }

  const coolers = vaultData?.activar_vault?.Coolers || [];
  const navigate = useNavigate();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationWord(event.currentTarget.value);
    if (event.currentTarget.value === "CONFIRMAR") {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  };

  const body = useMemo(() => {
    const coolersActivar = vaultData?.activar_vault?.Coolers || [];
    const coolersDesactivar = vaultData?.desactivar_vault?.Coolers || [];

    const coolers = [
      ...coolersActivar.map((cooler) => ({
        device_id: cooler.mac,
        estatus: true,
      })),
      ...coolersDesactivar.map((cooler) => ({
        device_id: cooler.mac,
        estatus: false,
      })),
    ];

    return {
      coolers,
    };
  }, [vaultData]);

  console.log("Body generado:", body);

  // Función para ejecutar el fetch cuando se haga clic en "Continuar"
  const handleFetch = async () => {
    try {
      setIsLoading(true);
      const result = await fetchVaul("vault", setIsLoading, body);
      console.log("Fetch ejecutado con éxito:", result);
      setData(result); // Almacena los datos en el estado
      return result; // Devuelve el resultado para poder usarlo
    } catch (error) {
      console.error("Error fetching vault insights:", error);
      return null; // Retorna null en caso de error
    } finally {
      setIsLoading(false);
    }
  };

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
            onClick={async () => {
              const fetchResult = await handleFetch(); // Espera el resultado del fetch
              if (fetchResult) {
                console.log(fetchResult); // Datos recibidos con éxito
                navigate("/home/Stepper6"); // Redirige si los datos son válidos
              } else {
                console.error("No se recibió datos válidos después del fetch");
              }
            }}
            disabled={!isConfirmed || isLoading} // Deshabilita si no está confirmado o si está cargando
          >
            Continuar
          </Button>
        </div>
      </div>
    </section>
  );
}
