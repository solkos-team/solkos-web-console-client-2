import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import DrawerA from "../../../components/drawerAlerts/DrawerAlerts";
import { useSelector } from "react-redux";
import { fetchUniversal } from "../../../utils/apiUtils";
import { SkeletonCards } from "../../../components/skeletonCards/SkeletonCards";
import { CoolerInterface as Cooler } from "../../../interfaces/CoolerInterface";
import { useDisclosure } from "@mantine/hooks";

export default function Indicator() {
  const [opened, { open, close }] = useDisclosure(false);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalCoolers = sessionStorage.getItem("TtlCoolers");
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUniversal("alerts", body);
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
                borderRadius: "2px",
                background: "#BCDAFF",
              }}
            >
              <img
                src={"../../sampleData/act.svg"}
                alt="Descripción de la imagen"
                style={{ width: "18px", height: "18px" }}
              />
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                CONTROL DE ACTIVOS
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
                    "Visita PdV",
                    "Actualizar Info",
                    "Toma de Decisiones",
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
                      background: "#FFF",
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
                            background:
                              cooler.algorithm === "Sin Riesgo"
                                ? "#C0F2C8"
                                : cooler.algorithm === "Actualizar Info"
                                ? "#FEF5C7"
                                : cooler.algorithm === "Toma de Decisiones"
                                ? "#FFC7CD"
                                : cooler.algorithm === "Visita PdV"
                                ? "#FEF5C7"
                                : "",
                          }}
                        >
                          {cooler.algorithm === "Sin Riesgo" ? (
                            <img
                              src={"../../sampleData/sinr.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Actualizar Info" ? (
                            <img
                              src={"../../sampleData/reqa.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Toma de Decisiones" ? (
                            <img
                              src={"../../sampleData/accio.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm === "Visita PdV" ? (
                            <img
                              src={"../../sampleData/vp.svg"}
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
                          {cooler.algorithm === "Visita PdV"
                            ? "Visita PdV"
                            : cooler.algorithm === "Actualizar Info"
                            ? "Requiere actualizar información"
                            : cooler.algorithm === "Toma de Decisiones"
                            ? "Acciones urgentes"
                            : cooler.algorithm}
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
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                          }}
                        >
                          {cooler.value.toLocaleString()}
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
                            ? "de sin registro de enfriadores "
                            : "de " +
                              totalCoolers?.toLocaleLowerCase() +
                              " enfriadores"}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
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
                          // console.log(cooler.level);
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
