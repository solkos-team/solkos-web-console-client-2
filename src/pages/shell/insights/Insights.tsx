import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";

export default function Insights() {
  // Page (Body)
  useEffect(() => {
    // document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo

    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  const [drawerAbierto, setDrawerAbierto] = useState(false);

  const abrirDrawer = () => {
    setDrawerAbierto(true);
  };

  const cerrarDrawer = () => {
    setDrawerAbierto(false);
  };

  return (
    <div>
      <PageFilter status="false" />
      <br></br>
      <div
        style={{
          display: "flex",
          padding: "16px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          flex: 100,
          alignSelf: "stretch",
        }}
      >
        {/* Titl */}
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            marginLeft: -80,
          }}
        >
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
              color: "#88888B",
              // fontFamily: "DM Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
            }}
          >
            Haz el seguimiento de los enfriadores que tienen una alerta de
            funcionamiento.
          </div>
        </div>
        {/* principal */}
        <div
          style={{
            display: "flex",
            padding: "16px 0px",
            alignItems: "flex-start",
            alignContent: "flex-start",
            gap: "20px",
            alignSelf: "stretch",
            flexWrap: "wrap",
            marginLeft: -50,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "900px",
              height: "100%",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <img
                src={"../../sampleData/map.png"}
                alt="Descripción de la imagen"
                style={{ width: "25px", height: "25px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: 100,
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
                  Acerca de los equipos
                </div>
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Visualiza la ubicación donde los enfriadores han sido
                instalados.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                alignContent: "flex-end",
                rowGap: "16px",
                alignSelf: "stretch",
                flexWrap: "wrap",
                marginTop: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
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
                  Enfriadores
                </div>
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
                  12,283
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
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
                  Rutas
                </div>
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
                  562
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
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
                  Unidad Op.
                </div>
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
                  94
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
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
                  Regiones
                </div>
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
                  30
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
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
                  Zonas
                </div>
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
                  8
                </div>
              </div>
            </div>
            {/* cuadro mapa */}
            <div
              style={{
                display: "flex",
                padding: "8px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                flex: 100,
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    marginTop: 15,
                  }}
                >
                  Visualización de enfriadores:
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                    borderRadius: "2px",
                    marginBottom: -12,
                  }}
                >
                  {/* Todo */}
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      flexDirection: "column",
                      alignItems: "center",
                      background: "#E6E6E6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "7px",
                        alignSelf: "stretch",
                        borderRadius: "2px",
                        background: "#FFF",
                      }}
                    >
                      <img
                        src={"../../sampleData/cooler1.png"}
                        alt="Descripción de la imagen"
                      />
                      <div
                        style={{
                          color: "#3E83FF",
                          // fontFamily: "DM Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        Todo
                      </div>
                    </div>
                  </div>
                  {/* Alerts */}
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      flexDirection: "column",
                      alignItems: "center",
                      background: "#E6E6E6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "7px",
                        alignSelf: "stretch",
                        borderRadius: "2px",
                        background: "#E6E6E6",
                      }}
                    >
                      <img
                        src={"../../sampleData/alerts1.png"}
                        alt="Descripción de la imagen"
                      />
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        Alertas
                      </div>
                    </div>
                  </div>
                  {/* Fails */}
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      flexDirection: "column",
                      alignItems: "center",
                      background: "#E6E6E6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "7px",
                        alignSelf: "stretch",
                        borderRadius: "2px",
                        background: "#E6E6E6",
                      }}
                    >
                      <img
                        src={"../../sampleData/fail2.png"}
                        alt="Descripción de la imagen"
                      />
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        Fallas
                      </div>
                    </div>
                  </div>
                  {/* Indic */}
                  <div
                    style={{
                      display: "flex",
                      padding: "2px",
                      flexDirection: "column",
                      alignItems: "center",
                      background: "#E6E6E6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "7px",
                        alignSelf: "stretch",
                        borderRadius: "2px",
                        background: "#E6E6E6",
                      }}
                    >
                      <img
                        src={"../../sampleData/ind2.png"}
                        alt="Descripción de la imagen"
                      />
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Sans",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "14px",
                        }}
                      >
                        Indicadores
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div
                style={{
                  borderRadius: "8px",
                  border: "1px solid #CACACA",
                  width: "850px",
                  height: "500px",
                }}
              >
                {/* MAPA */}
              </div>
            </div>
          </div>
          {/* Indicadores */}
          <div
            style={{
              display: "flex",
              width: "416px",
              height: "100%",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flexShrink: 0,
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
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
                src={"../../sampleData/indc2.png"}
                alt="Descripción de la imagen"
                style={{ width: "25px", height: "25px" }}
              />
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
                Indicadores
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                flex: 100,
                alignSelf: "stretch",
              }}
            >
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
                  1,556
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
                  total de alertas
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 0px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Tipo
              </div>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Cantidad
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "250px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#BCDAFF",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Alta demanda de compresor
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "220px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#BCDAFF",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Alta temperatura
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "170px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#BCDAFF",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Desconexión
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "130px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#BCDAFF",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Prioridad alta por desconexión
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>

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
                style={{ width: "420px", height: "1px", background: "#CACACA" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                marginLeft: 320,
                cursor: "pointer",
              }}
              onClick={abrirDrawer}
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
              <img
                src={"../../sampleData/arrow_b.png"}
                alt="Descripción de la imagen"
                style={{ marginTop: 5 }}
              />
            </div>
            {/* DRAWER */}
          </div>

          {/* Alertas */}
          <div
            style={{
              display: "flex",
              width: "416px",
              height: "100%",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flexShrink: 0,
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
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
                src={"../../sampleData/alert_y.png"}
                alt="Descripción de la imagen"
                style={{ width: "25px", height: "25px" }}
              />
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
                Alertas
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                flex: 100,
                alignSelf: "stretch",
              }}
            >
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
                  1,556
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
                  total de alertas
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 0px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Tipo
              </div>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Cantidad
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "250px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FEF5C7",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Alta demanda de compresor
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "220px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FEF5C7",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Alta temperatura
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "170px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FEF5C7",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Desconexión
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "130px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FEF5C7",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Prioridad alta por desconexión
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>

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
                style={{ width: "420px", height: "1px", background: "#CACACA" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                marginLeft: 320,
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
              <img
                src={"../../sampleData/arrow_b.png"}
                alt="Descripción de la imagen"
                style={{ marginTop: 5 }}
              />
            </div>
          </div>
          {/* Fallas */}
          <div
            style={{
              display: "flex",
              width: "416px",
              height: "100%",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flexShrink: 0,
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
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
                src={"../../sampleData/fail_r.png"}
                alt="Descripción de la imagen"
                style={{ width: "25px", height: "25px" }}
              />
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
                Fallas
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                flex: 100,
                alignSelf: "stretch",
              }}
            >
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
                  1,556
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
                  total de alertas
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 0px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Tipo
              </div>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                Cantidad
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "250px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FFC7CD",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Alta demanda de compresor
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "220px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FFC7CD",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Alta temperatura
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "170px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FFC7CD",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Desconexión
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>
            {/* Indicador barra */}
            <div
              style={{
                display: "flex",
                padding: "0px",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "130px",
                  height: "36px",
                  borderRadius: "4px",
                  background: "#FFC7CD",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "16px", // Ajusta el espacio interior según sea necesario
                }}
              >
                <div
                  style={{
                    color: "#142257",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Prioridad alta por desconexión
                </div>
              </div>
              <div
                style={{
                  color: "#000005",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginLeft: "auto",
                }}
              >
                600
              </div>
            </div>

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
                style={{ width: "420px", height: "1px", background: "#CACACA" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                marginLeft: 320,
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
              <img
                src={"../../sampleData/arrow_b.png"}
                alt="Descripción de la imagen"
                style={{ marginTop: 5 }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flex: 100,
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                display: "flex",
                width: "416px",
                height: "100%",
                padding: "24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                flexShrink: 0,
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",
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
                    src={"../../sampleData/coolersg.png"}
                    alt="Descripción de la imagen"
                  />
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
                    Enfriadores funcionando
                  </div>
                </div>
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
                      minWidth: "200px",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                    }}
                  >
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
                      Enfriadores
                    </div>
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
                      4,291
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div
              style={{
                display: "flex",
                width: "416px",
                height: "100%",
                padding: "24px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
                flexShrink: 0,
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",
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
                    src={"../../sampleData/coolersr.png"}
                    alt="Descripción de la imagen"
                  />
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
                    Enfriadores sin datos
                  </div>
                </div>
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
                      minWidth: "200px",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                    }}
                  >
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
                      Enfriadores
                    </div>
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
                      2,102
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
