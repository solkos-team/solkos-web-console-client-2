import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapInsightsComponent from "../../../components/mapInsights";
import { SkeletonInsights } from "../../../components/skeletonInsights/SkeletonInsights";
import { SkeletonMapInsights } from "../../../components/skeletonMapInsights/SkeletonMapInsights";

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
    summary: {
      coolers: number;
      operative_units: number;
      regions: number;
      routes: number;
      zones: number;
    };
    coolers;
    operative_units;
    regions;
    routes;
    zones;
  }

  interface InsightsData {
    [key: string]: InsightLevel;
  }
  interface Cooler {
    serial_number: string;
    device_id: string;
    model_id: string;
    outlet_name: string;
    region: string;
    route: string;
    latitude: string;
    longitude: string;
  }

  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [showData,setShowData] = useState(false)
  const [items, numIntems] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [mapKey, setMapKey] = useState(0);

  const handleMapKeyChange = () => {
    console.log("Calling handleMapKeyChange");
    setMapKey((prevKey) => prevKey + 1);
  };

  // Page (Body)
  useEffect(() => {
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
      console.log(data);
      setInsightsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };

  const body2 = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    page_size: items > 1000 || items == 0 ? 1000 : items,
    page_number: 1,
  };
  const fetchData2 = async () => {
    try {
      const data = await fetchUniversal("coolers", body2, setIsLoading);
      setCoolersData(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  const fetchDataNumerOfItems = async () => {
    try {
      const data = await fetchInsights(pathVerify());
      numIntems(Number(data.insights.INDICATOR.total));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  useEffect(() => {
    fetchDataNumerOfItems();
    fetchData();
    fetchData2();
    handleMapKeyChange();
  }, [dt, dto]);

  const filteredMarkers = coolersData
    ? coolersData
      .filter(
        (cooler) =>
          parseFloat(cooler.latitude) !== 0 &&
          parseFloat(cooler.longitude) !== 0
      )
      .map((cooler) => ({
        latitude: parseFloat(cooler.latitude),
        longitude: parseFloat(cooler.longitude),
      }))
    : [];

  const markers = filteredMarkers;

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <div>
      <PageFilter status={isLoading} />
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flex: 100,
          alignSelf: "stretch"
        }}
      >
        {/* Titl */}
        <section className="principal-titl">
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
        </section>
        {/* principal */}
        <div className="principal-content">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "97%",
              gap : "10px"
            }}
          >
            {/* Acerca de los equipos y graficas */}
            <section style={{ width: "100%", display: "grid",gridColumnGap:"1px"}}>
              <div style={{
                display: "flex",
                width: "96%",
                height: showData == true ? "40%" : "9vw",
                padding: "0.6rem",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "5rem",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF",                
              }}>
                <div style={{width:"33%",height:"100%"}} >donas</div>
                <div style={{width:"33%",height:"100%"}} >donas</div>
                <div style={{width:"33%",height:"100%"}} >donas</div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "92%",
                  height: showData == true ? "30vw": "21vw",
                  padding: "1.2rem",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderRadius: "8px",
                  border: "1px solid #88888B",
                  background: "#FFF"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",

                    alignSelf: "stretch",
                  }}
                >
                  <img
                    src={"../../sampleData/map.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "1.2rem", height: "1.2rem" }}
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
                        fontSize: "0.8rem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      Acerca de los equipos 
                    </div>
                    <button style={{fontSize:"0.8rem", display: showData == true ? 'none' : "contents" }} onClick={()=>{setShowData(true)}}>Ver mas</button>
                    <button style={{fontSize:"0.8rem", display: showData == true ? 'contents' : "none" }} onClick={()=>{setShowData(false)}} >Ver menos</button>
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "0.8rem",
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
                    display: showData == true ? "flex" : "none",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    rowGap: ".3rem",
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
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "0.8rem",
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
                        fontSize: "0.9remrem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      {insightsData?.summary.coolers === undefined
                      ? "Sin registro"
                      : insightsData?.summary.coolers.toLocaleString()}
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
                        fontSize: "0.8rem",
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
                        fontSize: "0.9remrem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      {insightsData?.summary.regions === undefined
                      ? "Sin registro"
                      : insightsData?.summary.regions.toLocaleString()}
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
                        fontSize: "0.8rem",
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
                        fontSize: "0.9remrem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      {insightsData?.summary.zones === undefined
                      ? "Sin registro"
                      : insightsData?.summary.zones.toLocaleString()}
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
                        fontSize: "0.8rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Unidad OP.
                    </div>
                    <div
                      style={{
                        color: "#000005",
                        // fontFamily: "DM Sans",
                        fontSize: "0.9remrem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      {insightsData?.summary.operative_units === undefined
                      ? "Sin registro"
                      : insightsData?.summary.operative_units.toLocaleString()}
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
                        fontSize: "0.8rem",
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
                        fontSize: "0.9remrem",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      {insightsData?.summary.routes === undefined
                      ? "Sin registro"
                      : insightsData?.summary.routes.toLocaleString()}
                    </div>
                  </div>
                </div>
                {/* cuadro mapa */}
                <div
                  style={{
                    display: "flex",
                    padding: "2px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "2px",
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
                        fontSize: "0.8rem",
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
                              fontSize: "0.7rem",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "14px",
                            }}
                          >
                            Todo
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
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* MAPA */}
                    {/* <MapInsightsComponent
                    markers={[
                      { latitude: 20.6904037, longitude: -99.8208632 },
                      { latitude: 20.70686, longitude: -99.83713 },
                      { latitude: 20.3915, longitude: -99.9814 },
                    ]}
                  /> */}

                    {markers && markers.length > 0 ? (
                      <MapInsightsComponent key={mapKey} markers={markers} />
                    ) : (
                      <SkeletonMapInsights />
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* Indicadores */}
            <section style={{ width: "100%", display: "flex", flexDirection: "row",gap:"10px" }}>
              {/* Control del activo */}
              <section style={{
                display: "flex",
                width: "50%",
                height: "95%",
                padding: "0.6rem",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF"
              }}>
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
                    Control del Activo
                  </div>
                </div>
                {isLoading == true ? (
                  <>
                    <br></br>
                    <div style={{ marginBottom: -40 }}></div>
                    <SkeletonInsights></SkeletonInsights>
                  </>
                ) : (
                  ""
                )}
                {!isLoading && (
                  <>
                    {insightsData && insightsData?.insights != undefined ? (
                      <>
                        {/* ******************************** */}
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
                              {insightsData?.insights?.INDICATOR?.total ===
                                undefined
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
                                    height: "1.1vw",
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
                                      : algorithm.algorithm ===
                                        "Indicador de Riesgo Nivel: 0"
                                        ? "Sin riesgo"
                                        : algorithm.algorithm ===
                                          "Indicador de Riesgo Nivel: 1"
                                          ? "Visitar punto de venta"
                                          : algorithm.algorithm ===
                                            "Indicador de Riesgo Nivel: 2"
                                            ? "Requiere actualizar información"
                                            : algorithm.algorithm ===
                                              "Indicador de Riesgo Nivel: 3"
                                              ? "Tomar acción urgente"
                                              : algorithm.algorithm ===
                                                "Indicador de Riesgo Nivel: 4"
                                                ? "En riesgo"
                                                : algorithm.algorithm === "OWNED"
                                                  ? "En propiedad"
                                                  : algorithm.algorithm === "LOCATION"
                                                    ? "Ubicado"
                                                    : algorithm.algorithm === "TELEMETRY"
                                                      ? "Telemetría"
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
                              width: "100%",
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
                            marginLeft: 110,
                            cursor: "pointer",
                          }}
                          onClick={() => navigate("/home/indicator")}
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
                        {/* ******************************** */}
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        <p>No hay datos de coolers disponibles.</p>
                      </div>
                    )}
                  </>
                )}
              </section>
              {/* Mantenimiento */}
              <section style={{
                display: "flex",
                width: "50%",
                height: "95%",
                padding: "0.6rem",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                borderRadius: "8px",
                border: "1px solid #88888B",
                background: "#FFF"
              }}>                
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
                    Mantenimiento
                  </div>
                </div>
                {isLoading == true ? (
                  <>
                    <br></br>
                    <div style={{ marginBottom: -40 }}></div>
                    <SkeletonInsights></SkeletonInsights>
                  </>
                ) : (
                  ""
                )}

                {!isLoading && (
                  <>
                    {insightsData && insightsData?.insights != undefined ? (
                      <>
                        {/* ************************** */}
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
                                    height: "1.1vw",
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
                                      : algorithm.algorithm ===
                                        "LOW_VOLTAGE_ALERT"
                                        ? "Bajo voltaje"
                                        : algorithm.algorithm ===
                                          "HIGH_VOLTAGE_ALERT"
                                          ? "Alto voltaje"
                                          : algorithm.algorithm ===
                                            "MOVED_VISIT_ALERT"
                                            ? "Movimiento"
                                            : algorithm.algorithm ===
                                              "HIGH_TEMPERATURE_ALERT"
                                              ? "Alta temperatura"
                                              : algorithm.algorithm ===
                                                "DISCONNECTION_ALERT"
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
                              width: "100%",
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
                            marginLeft: 110,
                            cursor: "pointer",
                          }}
                          onClick={() => navigate("/home/alerts")}
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
                        {/* ************************** */}
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        <p>No hay datos de coolers disponibles.</p>
                      </div>
                    )}
                  </>
                )}
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}