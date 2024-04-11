import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapInsightsComponent from "../../../components/mapInsights";
import { SkeletonInsights } from "../../../components/skeletonInsights/SkeletonInsights";
import {
  InsightsData,
  CoolerInterface as Cooler,
} from "../../../interfaces/CoolerInterface";
import { Skeleton } from "@mantine/core";
export default function Insights() {
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [showData, setShowData] = useState(false);
  const [items, numIntems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState(0);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);
  const toggleShowAll2 = () => {
    setShowAll2(!showAll2);
  };
  const toggleShowAll3 = () => {
    setShowAll3(!showAll3);
  };
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const handleMapKeyChange = () => {
    setMapKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body);
      setInsightsData(data);
      console.log(data);
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
    page_size: 10000,
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
      // console.log(data);
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
  useEffect(() => {}, [markers]);

  insightsData?.summary.coolers.toLocaleString("es-MX") != null ||
  insightsData?.summary.coolers.toLocaleString("es-MX") != undefined
    ? sessionStorage.setItem(
        "TtlCoolers",
        insightsData?.summary.coolers.toLocaleString("es-MX")
      )
    : "";

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
          alignSelf: "stretch",
        }}
      >
        {/* Titl */}
        <section className="principal-titl">
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "22px",
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
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
            }}
          >
            Ve el panorama general de los enfriadores y toma acciones.
          </div>
        </section>
        {/* principal */}
        <div className="principal-content">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "97%",
              gap: "10px",
            }}
          >
            {/* Acerca de los equipos y graficas */}
            <section
              style={{
                width: "100%",
                height: 200,
                gap: "-10px",
                display: "grid",
                gridColumnGap: "1px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // width: "92%",
                  height: 400,
                  padding: "1.2rem",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderRadius: "8px",
                  border: "1px solid #88888B",
                  background: "#FFF",
                  marginTop: showData == true ? "-3.5rem" : "0%",
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
                    // display: showData == true ? "flex" : "none",
                    display: "flex",
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
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "100%", height: "100%" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="70px"
                              radius="sm"
                            />
                          </div>
                        </>
                      ) : insightsData?.summary.coolers === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.summary.coolers.toLocaleString("es-MX")
                      )}
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
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "100%", height: "100%" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="70px"
                              radius="sm"
                            />
                          </div>
                        </>
                      ) : insightsData?.summary.regions === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.summary.regions.toLocaleString("es-MX")
                      )}
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
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "100%", height: "100%" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="70px"
                              radius="sm"
                            />
                          </div>
                        </>
                      ) : insightsData?.summary.zones === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.summary.zones.toLocaleString("es-MX")
                      )}
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
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "100%", height: "100%" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="70px"
                              radius="sm"
                            />
                          </div>
                        </>
                      ) : insightsData?.summary.operative_units ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.summary.operative_units.toLocaleString(
                          "es-MX"
                        )
                      )}
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
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "100%", height: "100%" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="70px"
                              radius="sm"
                            />
                          </div>
                        </>
                      ) : insightsData?.summary.routes === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.summary.routes.toLocaleString("es-MX")
                      )}
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
                  ></div>
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
                    {<MapInsightsComponent items={items} data={coolersData} />}
                  </div>
                </div>
              </div>
            </section>
            {/* Indicadores */}
            <section
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              {/* Control del activo */}
              <section
                style={{
                  display: "flex",
                  width: "50%",
                  height: "100%",
                  padding: "0.6rem",
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
                    alignItems: "center",
                    gap: "16px",
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
                    Control del Activo
                  </div>
                  <p></p>
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
                              Avanzados
                            </div>

                            <p></p>
                          </div>

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
                                fontSize: "22px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              }}
                            >
                              {insightsData?.insights?.INDICATOR?.algorithms
                                .filter(
                                  (algorithm) =>
                                    algorithm.class ===
                                    "ASSET_MANAGEMENT_ACTIONABLE"
                                )
                                .reduce(
                                  (total, algorithm) => total + algorithm.value,
                                  0
                                )
                                .toLocaleString("es-MX")}
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
                          {/* *************************INDICADORES****************************** */}

                          <>
                            <>
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
                              {insightsData?.insights?.INDICATOR?.algorithms
                                .filter(
                                  (algorithm) =>
                                    algorithm.class ===
                                    "ASSET_MANAGEMENT_ACTIONABLE"
                                )
                                .sort((a, b) => {
                                  const order = [
                                    "Sin Riesgo",
                                    "Visita PdV",
                                    "Actualizar Info",
                                    "Toma de Decisiones",
                                    "Acciones urgentes",
                                  ];
                                  const indexA = order.indexOf(a.algorithm);
                                  const indexB = order.indexOf(b.algorithm);
                                  return indexA - indexB;
                                })
                                .map((algorithm, index) => {
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
                                          width: `${
                                            (algorithm.value / max) * 100
                                          }%`,
                                          height: "2.0vw",
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
                                          {algorithm.algorithm}
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
                                          : algorithm.value.toLocaleString(
                                              "es-MX"
                                            )}
                                      </div>
                                    </div>
                                  );
                                })}
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
                              </div>{" "}
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
                                    marginLeft: 50,
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
                            </>
                          </>
                          {/* )} */}
                          {/* ***********************INDICADORES******************************** */}
                        </div>
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
                        <p>Sin información para mostrar.</p>
                      </div>
                    )}
                  </>
                )}
              </section>
              {/* Mantenimiento */}
              <section
                style={{
                  display: "flex",
                  width: "50%",
                  height: "100%",
                  padding: "0.6rem",
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
                    alignItems: "center",
                    gap: "16px",
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
                    Mantenimiento
                  </div>
                  <p></p>
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
                            <img
                              src={"../../sampleData/cooler1.png"}
                              alt="Descripción de la imagen"
                              style={{ width: "22px", height: "22px" }}
                            />
                            <div
                              style={{
                                color: "#000005",
                                // fontFamily: "DM Sans",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              }}
                            >
                              Enfriadores analizados
                            </div>
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
                                  fontSize: "20px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "normal",
                                }}
                              >
                                0
                              </div>
                            </div>
                          </div>
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
                            <img
                              src={"../../sampleData/coolersg.png"}
                              alt="Descripción de la imagen"
                              style={{ width: "22px", height: "22px" }}
                            />
                            <div
                              style={{
                                color: "#000005",
                                // fontFamily: "DM Sans",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              }}
                            >
                              Enfriadores funcionando
                            </div>
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
                                  fontSize: "20px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "normal",
                                }}
                              >
                                0
                              </div>
                            </div>
                          </div>
                          {/* *********************************** */}
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
                                fontSize: "22px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              }}
                            >
                              {insightsData?.insights?.FAIL?.total === undefined
                                ? "Sin registro"
                                : insightsData?.insights?.FAIL?.total.toLocaleString(
                                    "es-MX"
                                  )}
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              gap: "4px",
                              marginLeft: 110,
                              cursor: "pointer",
                            }}
                            onClick={toggleShowAll3}
                          >
                            <div
                              style={{
                                color: "#3E83FF",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                                marginLeft: 50,
                              }}
                            >
                              {showAll3 ? "Ver menos" : "Ver más"}
                            </div>
                            <img
                              src={"../../sampleData/arrow_b.png"}
                              alt="Descripción de la imagen"
                              style={{ marginTop: 5 }}
                            />
                          </div>
                          {/* ********************** */}
                          {showAll3 && (
                            <>
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
                                          width: `${
                                            (algorithm.value / max) * 100
                                          }%`,
                                          height: "2.0vw",
                                          borderRadius: "4px",
                                          background: "#ffc4cc",
                                          display: "flex",
                                          alignItems: "center",
                                          paddingLeft: "16px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: "#142257",
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {algorithm.algorithm ===
                                          "FREEZING_FAIL"
                                            ? "Evaporador bloqueado"
                                            : algorithm.algorithm ===
                                              "TEMPERATURE_FAIL"
                                            ? "Alta temperatura"
                                            : algorithm.algorithm ===
                                              "COMPRESSOR_FAIL"
                                            ? "Falla asociada al compresor"
                                            : algorithm.algorithm ===
                                              "DISCONNECTIONS_FAIL"
                                            ? "Falla de desconexión"
                                            : algorithm.algorithm ===
                                              "VOLTAGE_FAIL"
                                            ? "Posible daño eléctrico"
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
                                          : algorithm.value.toLocaleString(
                                              "es-MX"
                                            )}
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
                                onClick={() => navigate("/home/fails")}
                              >
                                <div
                                  style={{
                                    color: "#3E83FF",
                                    // fontFamily: "DM Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "normal",
                                    marginLeft: 20,
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
                            </>
                          )}
                          {/* ********************** */}
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
                                fontSize: "22px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              }}
                            >
                              {insightsData?.insights?.ALERT?.total ===
                              undefined
                                ? "Sin registro"
                                : insightsData?.insights?.ALERT?.total.toLocaleString(
                                    "es-MX"
                                  )}
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              gap: "4px",
                              marginLeft: 110,
                              cursor: "pointer",
                            }}
                            onClick={toggleShowAll2}
                          >
                            <div
                              style={{
                                color: "#3E83FF",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "normal",
                                marginLeft: 50,
                              }}
                            >
                              {showAll2 ? "Ver menos" : "Ver más"}
                            </div>
                            <img
                              src={"../../sampleData/arrow_b.png"}
                              alt="Descripción de la imagen"
                              style={{ marginTop: 5 }}
                            />
                          </div>
                          {/* ********************* */}
                          {showAll2 && (
                            <>
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
                              {insightsData?.insights?.ALERT?.algorithms
                                .filter(
                                  (algorithm) =>
                                    algorithm.algorithm ===
                                      "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ||
                                    algorithm.algorithm === "VOLTAGE_ALERT" ||
                                    algorithm.algorithm ===
                                      "HIGH_TEMPERATURE_ALERT" ||
                                    algorithm.algorithm ===
                                      "DISCONNECTION_ALERT"
                                )
                                .map((algorithm, index) => {
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
                                          width: `${
                                            (algorithm.value / max) * 100
                                          }%`,
                                          height: "2.0vw",
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
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            lineHeight: "20px",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          {algorithm.algorithm ===
                                          "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                                            ? "Alta demanda del compresor"
                                            : algorithm.algorithm ===
                                              "HIGH_TEMPERATURE_ALERT"
                                            ? "Alta temperatura"
                                            : algorithm.algorithm ===
                                              "DISCONNECTION_ALERT"
                                            ? "Desconexión"
                                            : algorithm.algorithm ===
                                              "VOLTAGE_ALERT"
                                            ? "Bajo/Alto voltaje"
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
                                          : algorithm.value.toLocaleString(
                                              "es-MX"
                                            )}
                                      </div>
                                    </div>
                                  );
                                })}
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
                                    marginLeft: 20,
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
                            </>
                          )}
                        </div>
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
                        <p>Sin información para mostrar.</p>
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
