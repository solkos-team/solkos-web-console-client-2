import React, { useRef, useState, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { Stepper } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { DrawerVault } from "../Components/DrawerVault";
import { useDisclosure } from "@mantine/hooks";
import { VaultLogo } from "../../../../sampleData/Vault/VaultIcons";
import { useLocation } from "react-router-dom";

export default function Stepper4() {
  const location = useLocation();
  let vaultData = location.state?.vaultData;
  const [searchValue, setSearchValue] = useState("");
  const [selectedSerialID, setSelectedSerialID] = useState("");

  // Si los datos no vienen de location.state, cargarlos desde localStorage
  if (!vaultData) {
    const storedVaultData = localStorage.getItem("vaultData");
    vaultData = storedVaultData ? JSON.parse(storedVaultData) : null;
  }

  const coolers = vaultData?.entradas_invalidas?.Coolers || [];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

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

  const filteredCoolers = coolers.filter(
    (cooler) =>
      cooler.mac?.toLowerCase().includes(searchValue.toLowerCase()) ||
      cooler.serial_number?.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.313rem",
            }}
          >
            <span
              style={{
                color: "#000005",
                fontSize: "1.375rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "140%",
              }}
            >
              Enfriadores no encontrados
            </span>
          </div>
          <span style={{ color: "#88888B", fontSize: ".8rem" }}>
            Haz seguimiento de todos los parámetros de cada uno de tus
            enfriadores.
          </span>
        </div>
        <br></br>
        <div style={{ width: "80%" }}>
          <Stepper
            active={4}
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
              maxWidth: "1200px",
              // background: "red",
              padding: "16px",
              boxSizing: "border-box",
              minHeight: "340px",
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
            <TextInput
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              type="text"
              placeholder="Busca por Serie/ Id Coolector / Mac"
              style={{
                fontSize: "0.8rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1,8rem",
                width: "98%",
                paddingRight: "2.5rem",
                margin: 0,
                borderRadius: "4px",
                color: "#88888B",
              }}
            />
            <br></br>
            <div
              style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}
              className="custom-scroll"
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">Serie</th>
                    <th scope="col">Mac</th>
                    <th scope="col">Última visita</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoolers.map((cooler, index) => (
                    <tr key={index}>
                      <td>-</td> <td>{cooler.mac || "Sin registro"}</td>
                      <td>-</td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>{" "}
        <div className="button-container">
          <Button
            className="button"
            style={{
              fontSize: "0.8rem",
              color: "#ED5079",
              background: "white",
            }}
            onClick={() => {
              navigate(`/home/Stepper3`);
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
              navigate(`/home/Stepper4_1`);
            }}
          >
            Continuar
          </Button>
        </div>
      </div>
    </section>
  );
}
