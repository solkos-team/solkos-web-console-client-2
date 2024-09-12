import React, { useRef, useState, useEffect } from "react";
import { Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import { Stepper } from "@mantine/core";
import { TagInput } from "rsuite";
import { Switch } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DrawerVault } from "../Components/DrawerVault";
import { VaultLogo } from "../../../../sampleData/Vault/VaultIcons";

export default function Stepper2() {
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
              Enfriadores a activar
            </span>
            <img
              src={VaultLogo}
              alt="Descripción de la imagen"
              style={{
                width: "3.688rem",
                height: "1.125rem",
              }}
            />
          </div>
          <span style={{ color: "#88888B", fontSize: ".8rem" }}>
            Haz seguimiento de todos los parámetros de cada uno de tus
            enfriadores.
          </span>
        </div>
        <br></br>
        <div style={{ width: "80%" }}>
          <Stepper
            active={2}
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
            <TextInput
              // value={searchValue}
              // onChange={(event) => handleSearchChange(event)}
              // onKeyDown={handleKeyDown}
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
            <table>
              <thead>
                <tr>
                  <th scope="col">Serie</th>
                  <th scope="col">Mac</th>
                  <th scope="col">Última visita</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Estatus">D56191001431</td>
                  <td data-label="Serie">B4A2EB</td>
                  <td data-label="Última Visita">04/07/2024</td>
                  <td data-label="Acciones">
                    <div
                      style={{
                        color: "#3E83FF",
                        fontSize: "0.8rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        display: "flex",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        open();
                      }}
                    >
                      Ver más
                      <IconArrowRight
                        style={{
                          color: "#3E83FF",
                          width: "1.0rem",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
              navigate(`/home/Stepper1`);
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
              navigate(`/home/Stepper3`);
            }}
          >
            Continuar
          </Button>
        </div>
        {/* <DrawerVault opened={opened} onCLose={close}  /> */}
      </div>
    </section>
  );
}
