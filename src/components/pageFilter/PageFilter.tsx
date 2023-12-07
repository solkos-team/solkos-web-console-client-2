import React, { useState, useEffect, useRef } from "react";
import {
  IconSearch,
  IconArrowNarrowLeft,
  IconLock,
  IconChevronRight,
  IconCircleX,
  IconCirclePlus,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";

export default function ({}) {
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);

  const handleClick = () => {
    setMostrarVentanaEmergente(true);
  };

  const handleCloseVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
  };

  // Ctrl + x
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        setMostrarVentanaEmergente(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const ventanaEmergenteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCloseOnOutsideClick = (event) => {
      if (
        mostrarVentanaEmergente &&
        ventanaEmergenteRef.current &&
        !ventanaEmergenteRef.current.contains(event.target)
      ) {
        handleCloseVentanaEmergente();
      }
    };

    // Agregar el event listener al cuerpo del documento
    document.body.addEventListener("click", handleCloseOnOutsideClick);

    // Remover el event listener al desmontar el componente
    return () => {
      document.body.removeEventListener("click", handleCloseOnOutsideClick);
    };
  }, [mostrarVentanaEmergente]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          // padding: "0px 32px",
          marginLeft: -60,
          alignItems: "center",
          gap: "32px",
          alignSelf: "stretch",
          marginTop: -30,
          maxWidth: "100%",
          // overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            strokeWidth: "0.5",
            border: "0.5px solid #ADBACC",
            borderRadius: "4px",
            // boxSizing: "border-box",
          }}
        >
          <IconArrowNarrowLeft />
        </div>
        <div
          style={{
            display: "flex",
            padding: "4px",
            alignItems: "flex-start",
            gap: "8px",
            // flex: "100",
            border: "0.5px solid #ADBACC",
            width: "fit-content",
            borderRadius: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #ADBACC",
                background: "#D4DAE3",
                padding: "3px 7px",
              }}
            >
              <IconLock
                style={{
                  color: "#ADBACC",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#ADBACC",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                CLIENTE
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* ZONA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#313A49",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                ZONA
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* REGION */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#313A49",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                REGIÓN
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* UO */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#313A49",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                UNIDAD OPERATIVA
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* RUTA */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #313A49",
                padding: "3px 7px",
              }}
            >
              <IconCircleX
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#313A49",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                RUTA
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {/* ---------------------- */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "3px 7px",
              }}
            >
              <IconCirclePlus
                style={{
                  color: "#313A49",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#313A49",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                AÑADIR FILTRO
              </Text>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "31px",
              strokeWidth: "0.5",
              border: "0.5px solid #ADBACC",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "1px 10px",
                alignItems: "center",
                gap: "10px",
                flex: "100",
              }}
              onClick={handleClick}
            >
              <IconSearch
                style={{
                  color: "#ADBACC",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  display: "flex",
                  color: "#ADBACC",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                Buscar
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                  padding: "4px",
                  marginLeft: "auto",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  Ctrl + x
                </div>
              </div>
            </div>
          </div>

          {mostrarVentanaEmergente && (
            <div
              ref={ventanaEmergenteRef}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "16px",
                borderRadius: "4px",
                border: "1px solid #88888B",
                background: "#FFF",
                zIndex: 999,
                width: 300,
              }}
            >
              {/* Contenido de la ventana emergente */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    // padding: "4px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "4px",
                    background: "#FFF",
                    width: 300,
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 100,
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        // padding: "1px 10px",
                        alignItems: "center",
                        gap: "10px",
                        flex: 100,
                        position: "relative", // Contenedor relativo
                        borderBottom: "1px solid #ADBACC",
                      }}
                    >
                      <input
                        type="text"
                        // value={searchValue}
                        // onChange={handleChange}
                        style={{
                          color: "#ADBACC",
                          // fontFamily: "DM Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "28px",
                          width: 270,
                          border: "none", // Quitar el borde
                          outline: "none", // Quitar el contorno
                        }}
                        placeholder="Busca por..."
                      />
                      <img
                        src={"../../sampleData/filter.png"}
                        alt="Descripción de la imagen"
                        style={{
                          position: "absolute",
                          right: "10px",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "16px",
                      alignItems: "flex-start",
                      gap: "8px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        borderRadius: "8px",
                        border: "1px solid #ADBACC",
                        background: "#D4DAE3",
                      }}
                    >
                      <img
                        src={"../../sampleData/filter.png"}
                        alt="Descripción de la imagen"
                      />
                      <div
                        style={{
                          color: "#ADBACC",
                          // fontFamily: "Space Mono",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                      >
                        CLIENTE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
