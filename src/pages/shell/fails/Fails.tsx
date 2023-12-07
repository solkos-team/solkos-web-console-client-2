import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";

export default function Fails() {
  // Page (Body)
  useEffect(() => {
    // document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo

    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  return (
    <div>
      <PageFilter />
      <br></br>
      <div
        style={{
          display: "flex",
          padding: "10px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          flex: 100,
          alignSelf: "stretch",
          background: "#FFF",
          marginLeft: -50,
        }}
      >
        {/* title */}
        <div
          style={{
            display: "flex",
            padding: "0px 0px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                color: "#000005",
                // fontFamily: "DM Sans",
                fontSize: "26px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "155%",
              }}
            >
              Cooler Insights
            </div>
            <div
              style={{
                display: "flex",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "2px",
                background: "#FFC7CD",
              }}
            >
              <img
                src={"../../sampleData/fails2.png"}
                alt="Descripción de la imagen"
              />
              <div
                style={{
                  color: "#F93448",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                FALLAS
              </div>
            </div>
          </div>
          <div
            style={{
              color: "#88888B",
              // fontFamily: "DM Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
            }}
          >
            Identifica los enfriadores que tienen falla para realizar las
            acciones necesarias.
          </div>
          <br></br>
          <div
            style={{
              display: "flex",
              padding: "16px 5px",
              alignItems: "flex-start",
              alignContent: "flex-start",
              gap: "16px",
              flex: 100,
              alignSelf: "stretch",
              flexWrap: "wrap",
            }}
          >
            {/* Indicador */}
            <div
              style={{
                display: "flex",
                width: "260px",
                padding: "24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",
              }}
            >
              {/* Descrip */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                {/* icono */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "4px",
                      background: "#FFC7CD",
                    }}
                  >
                    <img
                      src={"../../sampleData/compressor2.png"}
                      alt="Descripción de la imagen"
                    />
                  </div>
                  <div
                    style={{
                      color: "#3A3A3F",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Falla asociada al compresor
                  </div>
                </div>
                {/* Siguiente */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "8px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "26px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    440
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    de 3,203 enfriadores
                  </div>
                </div>
                {/* ***** */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        background: "#C0F2C8",
                      }}
                    >
                      <img
                        src={"../../sampleData/arrow_gr.png"}
                        alt="Descripción de la imagen"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#31B648",
                      // fontFamily: "DM Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    -10
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    desde ayer
                  </div>
                </div>
                {/* ********** */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px 0px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      background: "#CACACA",
                      width: "100%",
                    }}
                  ></div>
                </div>
                {/* ******* */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "4px",
                    flex: 100,
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
                      marginLeft: 140,
                    }}
                  >
                    Ver enfriadores
                  </div>
                  <img
                    src={"../../sampleData/dess.png"}
                    alt="Descripción de la imagen"
                    style={{ marginLeft: "4px" }}
                  />
                </div>
              </div>
            </div>
            {/* Indicador */}
            <div
              style={{
                display: "flex",
                width: "260px",
                padding: "24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",
              }}
            >
              {/* Descrip */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                {/* icono */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "4px",
                      background: "#FFC7CD",
                    }}
                  >
                    <img
                      src={"../../sampleData/weather2.png"}
                      alt="Descripción de la imagen"
                    />
                  </div>
                  <div
                    style={{
                      color: "#3A3A3F",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Alta temperatura
                  </div>
                </div>
                {/* Siguiente */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "8px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "26px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    440
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    de 3,203 enfriadores
                  </div>
                </div>
                {/* ***** */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        background: "#FFC7CD",
                      }}
                    >
                      <img
                        src={"../../sampleData/arrow_4.png"}
                        alt="Descripción de la imagen"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#F93448",
                      // fontFamily: "DM Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    +10
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    desde ayer
                  </div>
                </div>
                {/* ********** */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px 0px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      background: "#CACACA",
                      width: "100%",
                    }}
                  ></div>
                </div>
                {/* ******* */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "4px",
                    flex: 100,
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
                      marginLeft: 140,
                    }}
                  >
                    Ver enfriadores
                  </div>
                  <img
                    src={"../../sampleData/dess.png"}
                    alt="Descripción de la imagen"
                    style={{ marginLeft: "4px" }}
                  />
                </div>
              </div>
            </div>
            {/* Indicador */}
            <div
              style={{
                display: "flex",
                width: "260px",
                padding: "24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",
              }}
            >
              {/* Descrip */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                {/* icono */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "4px",
                      background: "#FFC7CD",
                    }}
                  >
                    <img
                      src={"../../sampleData/elect2.png"}
                      alt="Descripción de la imagen"
                    />
                  </div>
                  <div
                    style={{
                      color: "#3A3A3F",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Posible daño eléctrico
                  </div>
                </div>
                {/* Siguiente */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "8px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "26px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    440
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    de 3,203 enfriadores
                  </div>
                </div>
                {/* ***** */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        background: "#ADBACC",
                      }}
                    >
                      <img
                        src={"../../sampleData/arrow_3.png"}
                        alt="Descripción de la imagen"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#313A49",
                      // fontFamily: "DM Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    0
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    desde ayer
                  </div>
                </div>
                {/* ********** */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px 0px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}
                >
                  <div
                    style={{
                      height: "1px",
                      background: "#CACACA",
                      width: "100%",
                    }}
                  ></div>
                </div>
                {/* ******* */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "4px",
                    flex: 100,
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
                      marginLeft: 140,
                    }}
                  >
                    Ver enfriadores
                  </div>
                  <img
                    src={"../../sampleData/dess.png"}
                    alt="Descripción de la imagen"
                    style={{ marginLeft: "4px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
