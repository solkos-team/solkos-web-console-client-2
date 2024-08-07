import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import DrawerA from "../../../components/drawerAlerts/DrawerAlerts";
import { useSelector } from "react-redux";
import { fetchUniversal } from "../../../utils/apiUtils";
import { SkeletonCards } from "../../../components/skeletonCards/SkeletonCards";
import { CoolerInterface as Cooler } from "../../../interfaces/CoolerInterface";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function Indicator() {
  const [opened, { open, close }] = useDisclosure(false);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalCoolers = sessionStorage.getItem("TtlCoolers");
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const navigate = useNavigate();
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUniversal("alerts", body);
      // console.log(data);
      setCoolersData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt, dto]);

  const [isLoading, setIsLoading] = useState(true);

  // Page (Body)
  useEffect(() => {
    document.addEventListener("click", function (event) {
      const element = event.target as HTMLElement;
      if (
        (isDrawerOpen == true &&
          element.className == "mantine-134h5mf mantine-AppShell-main") ||
        element.className == "IndicatorCardsContent"
      ) {
        setIsDrawerOpen(false);
      }
    });
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const [selectedAlgorithmValues, setSelectedAlgorithmValues] = useState<{
    value: number;
    delta: number;
    level: string;
  }>({ value: 0, delta: 0, level: "" });

  useEffect(() => {
    if (location.pathname === "/home/indicator") {
      localStorage.removeItem("searchTags");
    }
  }, [location]);

  useEffect(() => {
    if (dto === "CALL CENTER") {
      navigate("/home/clt_callCenter");
    }
  }, [navigate, dto]);
  return (
    <div>
      <PageFilter status={isLoading} />
      <br></br>
      <div className="principal-titl">
        <div
          className="IndicatorCardsContent"
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
                fontSize: "24px",
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
                borderRadius: "8px",
                background: "#E7F5FF",
              }}
            >
              <img
                src={"../../sampleData/gauge2.svg"}
                alt="Descripción de la imagen"
                style={{ width: "18px", height: "18px" }}
              />
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "Space Mono",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                Control de activos
              </div>
            </div>
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
            Monitorea y toma acción sobre tus enfriadores.
          </div>
          <br></br>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              alignItems: "flex-start",
              alignContent: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {/* Indicador */}
            {isLoading ? (
              <>
                <SkeletonCards></SkeletonCards>
              </>
            ) : (
              coolersData &&
              coolersData
                .filter(
                  (cooler) => cooler.class === "ASSET_MANAGEMENT_ACTIONABLE"
                )

                .sort((a, b) => {
                  const order = [
                    "Sin Riesgo",
                    "SIN RIESGO",
                    "Visita PdV",
                    "VISITA PDV PARA LECTURA",
                    "Actualizar Info",
                    "Estatus sin venta",
                    "SIN VENTA",
                    "Acciones urgentes",
                    "SIN COINCIDENCIA",
                  ];
                  const indexA = order.indexOf(a.algorithm);
                  const indexB = order.indexOf(b.algorithm);
                  return indexA - indexB;
                })
                .map((cooler, index) => (
                  <div
                    className="IndicatorCardsContent"
                    key={index}
                    style={{
                      marginBottom: "16px",
                      width: "250px",
                      padding: "18px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "10px",
                      borderRadius: "8px",
                      border: "1px solid #88888B",
                      background: "#F8F9FA",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
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
                        <div
                          style={{
                            display: "flex",
                            padding: "2px",
                            alignItems: "center",
                            gap: "10px",
                            borderRadius: "4px",
                            border:
                              cooler.algorithm === "Sin Riesgo" ||
                              cooler.algorithm === "SIN RIESGO"
                                ? "1px solid #40C057"
                                : cooler.algorithm === "Sin Riesgo" ||
                                  cooler.algorithm ===
                                    "Solicitar serv. correctivo" ||
                                  cooler.algorithm ===
                                    "Solicitar serv. preventivo" ||
                                  cooler.algorithm === "Seguimiento a equipo" ||
                                  cooler.algorithm === "Visita PdV" ||
                                  cooler.algorithm === "VISITA PDV PARA LECTURA"
                                ? "1px solid #E67700"
                                : cooler.algorithm === "Estatus sin venta" ||
                                  cooler.algorithm === "SIN VENTA" ||
                                  cooler.algorithm === "Acciones urgentes" ||
                                  cooler.algorithm === "SIN COINCIDENCIA"
                                ? "1px solid #FA5252"
                                : "1px",
                            background:
                              cooler.algorithm === "Sin Riesgo" ||
                              cooler.algorithm === "SIN RIESGO"
                                ? "#C0F2C8"
                                : cooler.algorithm === "Actualizar Info"
                                ? "#FEF5C7"
                                : cooler.algorithm === "Estatus sin venta" ||
                                  cooler.algorithm === "SIN VENTA" ||
                                  cooler.algorithm === "Acciones urgentes" ||
                                  cooler.algorithm === "SIN COINCIDENCIA"
                                ? "#FFF5F5"
                                : cooler.algorithm === "Visita PdV" &&
                                  dto != "KOF Colombia"
                                ? "#FEF5C7"
                                : cooler.algorithm === "Actualizar dato" ||
                                  cooler.algorithm === "Datos faltantes" ||
                                  cooler.algorithm === "Monitoreo" ||
                                  cooler.algorithm === "Movimiento"
                                ? "#A5D8FF"
                                : cooler.algorithm ===
                                    "Solicitar serv. correctivo" ||
                                  cooler.algorithm ===
                                    "Solicitar serv. preventivo" ||
                                  cooler.algorithm === "Seguimiento a equipo" ||
                                  cooler.algorithm === "Visita PdV" ||
                                  cooler.algorithm === "VISITA PDV PARA LECTURA"
                                ? "#FFF9DB"
                                : cooler.algorithm === "Visita PdV prioritaria"
                                ? "#FFC9C9"
                                : "",
                          }}
                        >
                          {cooler.algorithm === "Sin Riesgo" ||
                          cooler.algorithm === "SIN RIESGO" ? (
                            <img
                              src={"../../sampleData/circle-check.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Actualizar Info" ? (
                            <img
                              src={"../../sampleData/reqa.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Estatus sin venta" ||
                            cooler.algorithm === "SIN VENTA" ||
                            cooler.algorithm === "Acciones urgentes" ||
                            cooler.algorithm === "SIN COINCIDENCIA" ? (
                            <img
                              src={"../../sampleData/alert-circle2.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Visita PdV" &&
                            dto != "KOF Colombia" ? (
                            <img
                              src={"../../sampleData/vp.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Actualizar dato" ? (
                            <img
                              src={"../../sampleData/actDat.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Datos faltantes" ? (
                            <img
                              src={"../../sampleData/datFal.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Monitoreo" ? (
                            <img
                              src={"../../sampleData/Mont.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Movimiento" ? (
                            <img
                              src={"../../sampleData/mov1.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm ===
                              "Solicitar serv. correctivo" ||
                            cooler.algorithm ===
                              "Solicitar serv. preventivo" ? (
                            <img
                              src={"../../sampleData/serCP.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Seguimiento a equipo" ? (
                            <img
                              src={"../../sampleData/seguE.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Visita PdV" ||
                            cooler.algorithm === "VISITA PDV PARA LECTURA" ? (
                            <img
                              src={"../../sampleData/building-store.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Visita PdV prioritaria" ? (
                            <img
                              src={"../../sampleData/visitapd.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          style={{
                            color: "#3A3A3F",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                          }}
                        >
                          {cooler.algorithm}
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
                            color: "#000",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                          }}
                        >
                          {cooler.value.toLocaleString("es-MX")}
                        </div>
                        <div
                          style={{
                            color: "#88888B",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          {totalCoolers === undefined || totalCoolers === null
                            ? "de 0 enfriadores "
                            : "de " +
                              totalCoolers?.toLocaleLowerCase() +
                              " enfriadores"}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "none",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              padding: "8px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "4px",
                              borderRadius: "8px",
                              background:
                                cooler.delta < 0
                                  ? "#C0F2C8"
                                  : cooler.delta === 0
                                  ? "#ADBACC"
                                  : cooler.delta > 0
                                  ? "#FFC7CD"
                                  : "",
                            }}
                          >
                            {cooler.delta < 0 ? (
                              <>
                                {" "}
                                <img
                                  src={"../../sampleData/arrow2.svg"}
                                  alt="Descripción de la imagen"
                                />
                              </>
                            ) : cooler.delta === 0 ? (
                              <>
                                <img
                                  src={"../../sampleData/arrow1.svg"}
                                  alt="Descripción de la imagen"
                                />
                              </>
                            ) : cooler.delta > 0 ? (
                              <>
                                {" "}
                                <img
                                  src={"../../sampleData/arrow3.svg"}
                                  alt="Descripción de la imagen"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            color:
                              cooler.delta < 0
                                ? "#31B648"
                                : cooler.delta === 0
                                ? "#313A49"
                                : cooler.delta > 0
                                ? "#F93448"
                                : "",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          {cooler.delta > 0 ? "+" + cooler.delta : cooler.delta}
                        </div>
                        <div
                          style={{
                            color: "#88888B",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                          }}
                        >
                          desde ayer
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
                          marginTop: 10,
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "4px",
                          flex: 100,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedAlgorithm(cooler.algorithm);
                          setSelectedAlgorithmValues({
                            value: cooler.value,
                            delta: cooler.delta,
                            level: cooler.level,
                          });
                          open();
                        }}
                      >
                        <div
                          style={{
                            color: "#3E83FF",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                            marginLeft: 100,
                          }}
                        >
                          Ver enfriadores
                        </div>
                        <img
                          src={"../../sampleData/view.svg"}
                          alt="Descripción de la imagen"
                          style={{ marginLeft: "4px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      {selectedAlgorithm && selectedAlgorithmValues && (
        <DrawerA
          opened={opened}
          onClose={close}
          selectedAlgorithm={selectedAlgorithm}
          value={selectedAlgorithmValues.value}
          delta={selectedAlgorithmValues.delta}
          level={selectedAlgorithmValues.level}
        />
      )}
    </div>
  );
}
