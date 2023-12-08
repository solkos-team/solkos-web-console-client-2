import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";

export default function Fails() {
  interface Cooler {
    class: string;
    algorithm: string;
    value: number;
    delta: number;
  }

  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);

  const fetchCoolersFromAPI = async () => {
    const url =
      "https://universal-console-server-b7agk5thba-uc.a.run.app/alerts";
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      customer: "KOF",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      console.log("After fetch");
      if (!response.ok) {
        throw new Error("Error al obtener los datos de insights");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Indicar que la carga está en curso
        const data = await fetchCoolersFromAPI();
        console.log(data);
        setCoolersData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false); // Indicar que la carga ha terminado, ya sea exitosa o con error
      }
    };

    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

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
            {isLoading ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 400,
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Cargando...
                </div>
              </>
            ) : (
              // Mostrar las tarjetas una vez que la carga ha terminado
              coolersData &&
              coolersData
                .filter(
                  (cooler) =>
                    cooler.class === "OPE" && cooler.algorithm.endsWith("FAIL")
                )
                .map((cooler, index) => (
                  <div
                    key={index}
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
                            background: "#FEF5C7",
                          }}
                        >
                          {cooler.algorithm === "COMPRESSOR_FAIL" ? (
                            <>
                              <img
                                src={"../../sampleData/devices_2.png"}
                                alt="Descripción de la imagen"
                              />
                            </>
                          ) : cooler.algorithm === "DISCONNECTIONS_FAIL" ? (
                            <>
                              {" "}
                              <img
                                src={"../../sampleData/disconnection.png"}
                                alt="Descripción de la imagen"
                              />
                            </>
                          ) : cooler.algorithm.includes("TEMPERATURE") ? (
                            <img
                              src={"../../sampleData/weather.png"}
                              alt="Descripción de la imagen"
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
                          {cooler.algorithm === "COMPRESSOR_FAIL"
                            ? "Falla asociada al compresor"
                            : cooler.algorithm === "DISCONNECTIONS_FAIL"
                            ? "Desconexión"
                            : cooler.algorithm === "TEMPERATURE_FAIL"
                            ? "Falla de temperatura"
                            : cooler.algorithm === "VOLTAGE_FAIL"
                            ? "Falla de voltaje"
                            : ""}
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
                          {cooler.value}
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
                          de ----- enfriadores
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
                                  src={"../../sampleData/arrow_gr.png"}
                                  alt="Descripción de la imagen"
                                />
                              </>
                            ) : cooler.delta === 0 ? (
                              <>
                                <img
                                  src={"../../sampleData/arrow_3.png"}
                                  alt="Descripción de la imagen"
                                />
                              </>
                            ) : cooler.delta > 0 ? (
                              <>
                                {" "}
                                <img
                                  src={"../../sampleData/arrow_4.png"}
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
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
