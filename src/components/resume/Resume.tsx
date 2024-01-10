import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import {
  IconCircleX,
  IconCirclePlus,
  IconArrowDownRight,
  IconArrowRight,
} from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import MapComponent from "../map";

async function validarExistenciaImagen(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });

    if (response.ok) {
      console.log("La imagen existe.");
    } else {
      console.log("La imagen no existe. Código de respuesta:", response.status);
    }
  } catch (error) {
    console.error(
      "Error al intentar validar la existencia de la imagen:",
      error
    );
  }
}

const Resume = ({ coolersData }) => {
  const a = "../../sampleData/cooler_c.png";
  const b = "../../sampleData/buildings.png";
  const urlImagen = coolersData?.cooler?.asset_url;

  validarExistenciaImagen(urlImagen);

  console.log(coolersData?.cooler?.asset_url);
  return (
    <>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row", // Ajusta la dirección a "row" para colocar los divs uno al lado del otro
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            padding: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid #88888B",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              alignSelf: "stretch",
            }}
          >
            <img src={b} width={"24px"} alt="cooler"></img>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Acerca del punto de venta
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  border: "1.5px solid #0F9F67",
                  background: "#FFF",
                  marginTop: 5,
                  marginLeft: -240,
                }}
              >
                <div
                  style={{
                    color: "#0F9F67",
                    // fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "14px",
                  }}
                >
                  -----
                </div>
              </div>
            </div>
          </div>
          {/* *** */}
          <div
            style={{
              display: "flex",
              padding: "8px 0px",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderBottom: "1px solid #CACACA",
            }}
          >
            <div
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Nombre del punto de venta
            </div>
            <div
              style={{
                color: "#88888B",
                textAlign: "right",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              {coolersData?.cooler?.outlet_name === ""
                ? "Sin registro"
                : coolersData?.cooler?.outlet_name}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 0px",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderBottom: "1px solid #CACACA",
            }}
          >
            <div
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Dirección
            </div>
            <div
              style={{
                color: "#88888B",
                textAlign: "right",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              {coolersData?.cooler?.outlet_address === ""
                ? "Sin registro"
                : coolersData?.cooler?.outlet_address}
            </div>
          </div>
          {/* ********** */}
          <Tabs
            color="teal"
            defaultValue="first"
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Tabs.List>
              <Tabs.Tab value="first">Mapa</Tabs.Tab>
              <Tabs.Tab value="second">Datos</Tabs.Tab>
            </Tabs.List>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <Tabs.Panel value="first" pt="xs">
                <div
                  style={{
                    width: "95%",
                    height: "450px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div>
                    <MapComponent
                      latitude={coolersData?.cooler?.latitude}
                      longitude={coolersData?.cooler?.longitude}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={"../../sampleData/filled.png"}
                      width={"100%"}
                      alt="cooler"
                    ></img>
                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Instalación
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={"../../sampleData/pin_filled.png"}
                      width={"24px"}
                      alt="cooler"
                    ></img>
                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Última ubicación
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {/* <IconCircleX /> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px", // Espacio entre los bloques
                      }}
                    >
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Distancia entre puntos
                    </div>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="second" pt="xs">
                <div
                  style={{
                    // width: "500px",
                    display: "flex",
                    padding: "8px 0px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderBottom: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Instalación (Lat, Lon)
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      textAlign: "right",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    {"("}{" "}
                    {coolersData?.cooler?.latitude === ""
                      ? "Sin registro"
                      : coolersData?.cooler?.latitude}{" "}
                    {","}
                    {coolersData?.cooler?.longitude === ""
                      ? "Sin registro"
                      : coolersData?.cooler?.longitude}
                    {")"}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px 0px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderBottom: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Última posición (Lat, Lon)
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      textAlign: "right",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    (----, ----)
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px 0px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderBottom: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Distancia al punto de instalación
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      textAlign: "right",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    -- metros
                  </div>
                </div>
              </Tabs.Panel>
            </div>
          </Tabs>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column", // Ajusta la dirección a "column" para colocar los divs uno debajo del otro
            gap: "16px",
          }}
        >
          {/* ACERCA DEL EQUIPO */}
          <div
            style={{
              display: "flex",
              width: "380px",
              height: "450px",
              padding: "24px",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "8px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <img
                  src={"../../sampleData/system1.png"}
                  width={"24px"}
                  alt="cooler"
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Acerca del equipo
                </div>
              </div>
              <div style={{ height: "290px", alignSelf: "stretch" }}>
                <img
                  src={"../../sampleData/cooler_c.png"}
                  width={"100%"}
                  alt="cooler"
                  onError={() => console.log("Error al cargar la imagen")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 0px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #CACACA",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Serie
                </div>
                <div
                  style={{
                    color: "#88888B",
                    textAlign: "left",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {coolersData?.cooler?.serial_number === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.serial_number}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 0px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #CACACA",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  MAC
                </div>
                <div
                  style={{
                    color: "#88888B",
                    textAlign: "left",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {coolersData?.cooler?.device_id === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.device_id}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 0px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #CACACA",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Modelo
                </div>
                <div
                  style={{
                    color: "#88888B",
                    textAlign: "left",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {coolersData?.cooler?.model_id === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.model_id}
                </div>
              </div>
            </div>
          </div>
          {/* **************** */}

          {/* ********** */}
          <div
            style={{
              width: "88%",
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #88888B",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <img
                  src={"../../sampleData/commerce.png"}
                  width={"24px"}
                  alt="cooler"
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Inversión total en el enfriador
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "8px",
                    flex: 100,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "4px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        background: "#FFC7CD",
                        width: "20px",
                        height: "20px",
                      }}
                    >
                      <IconArrowDownRight style={{ color: "#F93448" }} />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#F93448",
                      // fontFamily: "DM Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                    }}
                  >
                    $-------
                  </div>
                </div>
              </div>
            </div>
            {/* ******** */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "10px",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "10.9px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Gasto total de propiedad
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $-----
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "11px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Precio de venta
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $------
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Gasto total por servicio
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $-------
                </div>
              </div>
            </div>
          </div>
          {/* ******************************* */}
          <div
            style={{
              width: "385px",
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #88888B",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <img
                  src={"../../sampleData/nature.png"}
                  width={"24px"}
                  alt="cooler"
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Gastos de energía
                </div>
              </div>
            </div>
            {/* ******** */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "10px",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Consumo de energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $-------
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "4px",
                  flex: 100,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    color: "#3E83FF",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Ver detalles
                </div>
                <IconArrowRight
                  style={{ color: "#3E83FF", width: "16px", height: "16px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
};
export default Resume;
