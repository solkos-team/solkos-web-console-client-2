import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import DrawerA from "../../../components/drawerAlerts/DrawerAlerts";
import { useSelector } from "react-redux";
import { fetchUniversal } from "../../../utils/apiUtils";
import { SkeletonCards } from "../../../components/skeletonCards/SkeletonCards";
import { CoolerInterface as Cooler } from "../../../interfaces/CoolerInterface";
import { useDisclosure } from "@mantine/hooks";

export default function Fails() {
  const [opened, { open, close }] = useDisclosure(false);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
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
      // console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dt, dto]);

  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <PageFilter status={isLoading} />
      <br></br>
      <div className="principal-titl">
        {/* title */}
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
                background: "#FFC7CD",
              }}
            >
              <img
                src={"../../sampleData/fail1.svg"}
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
              fontSize: "14px",
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
            ) : coolersData == null ? (
              "Sin registros"
            ) : (
              coolersData
                .filter(
                  (cooler) =>
                    cooler.class === "OPE" &&
                    cooler.algorithm.endsWith("FAIL") &&
                    cooler.algorithm !== "NO_FAIL"
                )

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
                          {cooler.algorithm === "COMPRESSOR_FAIL" ? (
                            <>
                              <img
                                src={"../../sampleData/failc.svg"}
                                alt="Descripción de la imagen"
                                style={{ width: "18px", height: "18px" }}
                              />
                            </>
                          ) : cooler.algorithm.includes("TEMPERATURE") ? (
                            <img
                              src={"../../sampleData/failt.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : cooler.algorithm.includes("VOLTAGE_FAIL") ? (
                            <img
                              src={"../../sampleData/faile.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
                          ) : (
                            <img
                              src={"../../sampleData/failc.svg"}
                              alt="Descripción de la imagen"
                              style={{ width: "18px", height: "18px" }}
                            />
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
                          {cooler.algorithm === "COMPRESSOR_FAIL"
                            ? "Falla asociada al compresor"
                            : cooler.algorithm === "DISCONNECTIONS_FAIL"
                            ? "Desconexión"
                            : cooler.algorithm === "TEMPERATURE_FAIL"
                            ? "Alta temperatura"
                            : cooler.algorithm === "VOLTAGE_FAIL"
                            ? "Posible daño eléctrico"
                            : cooler.algorithm === "FREEZING_FAIL"
                            ? "Evaporador bloqueado"
                            : cooler.algorithm}
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
                            // fontFamily: "DM Sans",
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
                      {/* ***** */}
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
                            // fontFamily: "DM Sans",
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
                            // fontFamily: "DM Sans",
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
