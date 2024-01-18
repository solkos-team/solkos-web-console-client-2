import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapInsightsComponent from "../../../components/mapInsights";

export default function Insights() {
  interface Algorithm {
    level: string;
    class: string;
    algorithm: string;
    value: number;
  }

  interface InsightLevel {
    ALERT: {
      level: string;
      total: number;
      algorithms: Algorithm[];
    };
    FAIL: {
      level: string;
      total: number;
      algorithms: Algorithm[];
    };
    INDICATOR: {
      level: string;
      total: number;
      algorithms: Algorithm[];
    };
    DATA: {
      coolers_total: string;
      routes_total: string;
      operativ_u_total: string;
      region_total: string;
      zone_total: string;
      coolers_data: string;
      coolers_no_data: string;
    };
  }

  interface InsightsData {
    [key: string]: InsightLevel;
  }

  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body);
      setInsightsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt, dto]);

  // console.log(insightsData?.insights?.DATA?.coolers_total);

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
          // style={{
          //   display: "flex",
          //   padding: "0px 32px",
          //   flexDirection: "column",
          //   alignItems: "flex-start",
          //   alignSelf: "stretch",
          //   marginLeft: -55,
          // }}
          className="principal-titl"
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
          // style={{
          //   display: "flex",
          //   padding: "16px 0px",
          //   alignItems: "flex-start",
          //   alignContent: "flex-start",
          //   gap: "20px",
          //   alignSelf: "stretch",
          //   flexWrap: "wrap",
          //   marginLeft: -25,
          // }}
          className="principal-content"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexFlow: "wrap",
              flexDirection: "row",
              alignItems: "start",
              gap: "16px",
              flex: 100,
            }}
          >
            {/* Acerca de los equipos */}
            <div
              style={{
                display: "flex",
                width: "91.6%",
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
                    {insightsData?.insights?.DATA?.coolers_total ===
                      undefined ||
                    insightsData?.insights?.DATA?.coolers_total === ""
                      ? "Sin registro"
                      : insightsData?.insights?.DATA?.coolers_total}
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
                    {insightsData?.insights?.DATA?.routes_total === undefined ||
                    insightsData?.insights?.DATA?.routes_total === ""
                      ? "Sin registro"
                      : insightsData?.insights?.DATA?.routes_total}
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
                    {insightsData?.insights?.DATA?.operativ_u_total ===
                      undefined ||
                    insightsData?.insights?.DATA?.operativ_u_total === ""
                      ? "Sin registro"
                      : insightsData?.insights?.DATA?.operativ_u_total}
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
                    {insightsData?.insights?.DATA?.region_total === undefined ||
                    insightsData?.insights?.DATA?.region_total === ""
                      ? "Sin registro"
                      : insightsData?.insights?.DATA?.region_total}
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
                    {insightsData?.insights?.DATA?.zone_total === undefined ||
                    insightsData?.insights?.DATA?.zone_total === ""
                      ? "Sin registro"
                      : insightsData?.insights?.DATA?.zone_total}
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
                        cursor: "pointer",
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
                    {/* <div
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
                    </div> */}
                    {/* Fails */}
                    {/* <div
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
                    </div> */}
                    {/* Indic */}
                    {/* <div
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
                    </div> */}
                  </div>
                </div>
                <br></br>
                <div
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #CACACA",
                    width: "100%",
                    height: "450px",
                  }}
                >
                  {/* MAPA */}
                  <MapInsightsComponent
                    markers={[
                      { latitude: 20.6904037, longitude: -99.8208632 },
                      { latitude: 20.70686, longitude: -99.83713 },
                      { latitude: 20.3915, longitude: -99.9814 },
                    ]}
                  />
                </div>
              </div>
            </div>
            {/* Indicadores */}
            <div
              style={{
                display: "flex",
                width: "42.3%",
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
                    {insightsData?.insights?.INDICATOR?.total === undefined
                      ? "Sin registro"
                      : insightsData?.insights?.INDICATOR?.total.toLocaleString()}
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
                    total de indicadores
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
              {insightsData?.insights?.INDICATOR?.algorithms.map(
                (algorithm, index) => {
                  const max = Math.max(
                    ...insightsData.insights.INDICATOR.algorithms.map(
                      (alg) => alg.value
                    )
                  );

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        padding: "0px",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          width: `${(algorithm.value / max) * 100}%`,
                          height: "36px",
                          borderRadius: "4px",
                          background: "#BCDAFF",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "16px",
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
                          {algorithm.algorithm === "INSTALLED"
                            ? "Instalado"
                            : algorithm.algorithm}
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
                        {algorithm.value === undefined
                          ? "Sin registro"
                          : algorithm.value.toLocaleString()}
                      </div>
                    </div>
                  );
                }
              )}

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
                    width: "420px",
                    height: "1px",
                    background: "#CACACA",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "4px",
                  marginLeft: 270,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/indicator")}
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
                width: "42.3%",
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
                    {insightsData?.insights?.ALERT?.total === undefined
                      ? "Sin registro"
                      : insightsData?.insights?.ALERT?.total.toLocaleString()}
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
              {insightsData?.insights?.ALERT?.algorithms.map(
                (algorithm, index) => {
                  const max = Math.max(
                    ...insightsData.insights?.ALERT?.algorithms.map(
                      (alg) => alg.value
                    )
                  );

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        padding: "0px",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          width: `${(algorithm.value / max) * 100}%`,
                          height: "36px",
                          borderRadius: "4px",
                          background: "#FEF5C7",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "16px",
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
                          {algorithm.algorithm ===
                          "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                            ? "Alta demanda del compresor"
                            : algorithm.algorithm === "LOW_VOLTAGE_ALERT"
                            ? "Bajo voltaje"
                            : algorithm.algorithm === "HIGH_VOLTAGE_ALERT"
                            ? "Alto voltaje"
                            : algorithm.algorithm === "MOVED_VISIT_ALERT"
                            ? "Movimiento"
                            : algorithm.algorithm === "HIGH_TEMPERATURE_ALERT"
                            ? "Alta temperatura"
                            : algorithm.algorithm === "DISCONNECTION_ALERT"
                            ? "Desconexión"
                            : algorithm.algorithm}
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
                        {algorithm.value === undefined
                          ? "Sin registro"
                          : algorithm.value.toLocaleString()}
                      </div>
                    </div>
                  );
                }
              )}

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
                    width: "420px",
                    height: "1px",
                    background: "#CACACA",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "4px",
                  marginLeft: 270,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/alerts")}
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
                width: "42.3%",
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
                    {insightsData?.insights?.FAIL?.total === undefined
                      ? "Sin registro"
                      : insightsData?.insights?.FAIL?.total.toLocaleString()}
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
                    total de fallas
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
              {insightsData?.insights?.FAIL?.algorithms.map(
                (algorithm, index) => {
                  const max = Math.max(
                    ...insightsData.insights?.FAIL?.algorithms.map(
                      (alg) => alg.value
                    )
                  );

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        padding: "0px",
                        gap: "16px",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          width: `${(algorithm.value / max) * 100}%`,
                          height: "36px",
                          borderRadius: "4px",
                          background: "#FFC7CD",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "16px",
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
                          {algorithm.algorithm === "TEMPERATURE_FAIL"
                            ? "Falla de temperatura"
                            : algorithm.algorithm === "COMPRESSOR_FAIL"
                            ? "Falla asociada al compresor"
                            : algorithm.algorithm === "DISCONNECTIONS_FAIL"
                            ? "Desconexión"
                            : algorithm.algorithm === "VOLTAGE_FAIL"
                            ? "Falla de voltaje"
                            : algorithm.algorithm}
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
                        {algorithm.value === undefined
                          ? "Sin registro"
                          : algorithm.value}
                      </div>
                    </div>
                  );
                }
              )}

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
                    width: "420px",
                    height: "1px",
                    background: "#CACACA",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "4px",
                  marginLeft: 270,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/fails")}
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
            {/* Enfriadores */}
            <div
              style={{
                width: "47.3%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "90%",
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
                        {insightsData?.insights?.DATA?.coolers_data ===
                          undefined ||
                        insightsData?.insights?.DATA?.coolers_data === ""
                          ? "Sin registro"
                          : insightsData?.insights?.DATA?.coolers_data}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "90%",
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
                        {insightsData?.insights?.DATA?.coolers_no_data ===
                          undefined ||
                        insightsData?.insights?.DATA?.coolers_no_data === ""
                          ? "Sin registro"
                          : insightsData?.insights?.DATA?.coolers_no_data}
                      </div>
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
