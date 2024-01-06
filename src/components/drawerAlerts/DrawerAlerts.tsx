import React, { useEffect, useRef } from "react";
import { flushSync } from "react-dom";

export default function DrawerA({
  isOpen,
  onClose,
  selectedAlgorithm,
  value,
  delta,
}) {
  const drawerRef = useRef(null);

  return (
    <div
      ref={drawerRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "700px",
        backgroundColor: "#FFF",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        transform: `translateX(${isOpen ? "0" : "100%"})`,
        transition: "transform 0.3s ease-in-out",
        padding: "10px",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "27px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            alignItems: "flex-start",
            gap: "10px",
            alignSelf: "stretch",
          }}
        >
          <img
            onClick={onClose}
            src={"../../sampleData/arrowsDes.png"}
            alt="Descripción de la imagen"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </div>
        {/* 2 */}
        <div
          style={{
            display: "flex",
            padding: "0px 30px",
            alignItems: "center",
            gap: "30px",
            alignSelf: "stretch",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
                  background: selectedAlgorithm.endsWith("ALERT")
                    ? "#FEF5C7"
                    : "#FFC7CD",
                }}
              >
                {selectedAlgorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ? (
                  <>
                    <img
                      src={"../../sampleData/devices_2.png"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  </>
                ) : selectedAlgorithm === "DISCONNECTION_ALERT" ? (
                  <>
                    {" "}
                    <img
                      src={"../../sampleData/disconnection.png"}
                      alt="Descripción de la imagen"
                      style={{ width: "44px", height: "44px" }}
                    />
                  </>
                ) : selectedAlgorithm === "HIGH_TEMPERATURE_ALERT" ? (
                  <img
                    src={"../../sampleData/weather.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : selectedAlgorithm === "COMPRESSOR_FAIL" ? (
                  <img
                    src={"../../sampleData/compressor2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : selectedAlgorithm === "TEMPERATURE_FAIL" ? (
                  <img
                    src={"../../sampleData/weather2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: selectedAlgorithm.endsWith("ALERT")
                    ? "#FEF5C7"
                    : "#FFC7CD",
                  height: 8,
                }}
              >
                {selectedAlgorithm.endsWith("ALERT") ? (
                  <img
                    src={"../../sampleData/alert_y.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                ) : (
                  <img
                    src={"../../sampleData/fails2.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                )}

                <div
                  style={{
                    color: "#451C03",
                    // fontFamily: "Space Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "14px",
                  }}
                >
                  {selectedAlgorithm.endsWith("ALERT") ? "ALERTA" : "FALLA"}
                </div>
              </div>
              <div
                style={{
                  color: "#000",
                  // fontFamily: "DM Sans",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                }}
              >
                {selectedAlgorithm && (
                  <div>
                    {selectedAlgorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                      ? "Alta demanda del compresor"
                      : selectedAlgorithm === "DISCONNECTION_ALERT"
                      ? "Desconexión"
                      : selectedAlgorithm === "HIGH_TEMPERATURE_ALERT"
                      ? "Alta temperatura"
                      : selectedAlgorithm === "HIGH_VOLTAGE_ALERT"
                      ? "Alto voltaje"
                      : selectedAlgorithm === "LOW_VOLTAGE_ALERT"
                      ? "Bajo voltaje"
                      : selectedAlgorithm === "DISCONNECTIONS_FAIL"
                      ? "Desconexión"
                      : selectedAlgorithm === "TEMPERATURE_FAIL"
                      ? "Falla de temperatura"
                      : selectedAlgorithm === "VOLTAGE_FAIL"
                      ? "Falla de voltaje"
                      : selectedAlgorithm === "COMPRESSOR_FAIL"
                      ? "Falla asociada al compresor"
                      : selectedAlgorithm}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "265px",
              padding: "8px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "8px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
              marginLeft: "auto",
            }}
          >
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
                  color: "#000005",
                  // fontFamily: " DM Sans",
                  fontSize: "26px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                {value}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
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
                        background:
                          delta < 0
                            ? "#C0F2C8"
                            : delta === 0
                            ? "#ADBACC"
                            : delta > 0
                            ? "#FFC7CD"
                            : "",
                      }}
                    >
                      {delta < 0 ? (
                        <>
                          {" "}
                          <img
                            src={"../../sampleData/arrow_gr.png"}
                            alt="Descripción de la imagen"
                          />
                        </>
                      ) : delta === 0 ? (
                        <>
                          <img
                            src={"../../sampleData/arrow_3.png"}
                            alt="Descripción de la imagen"
                          />
                        </>
                      ) : delta > 0 ? (
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
                        delta < 0
                          ? "#31B648"
                          : delta === 0
                          ? "#313A49"
                          : delta > 0
                          ? "#F93448"
                          : "",
                      // fontFamily: "DM Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {delta > 0 ? "+" + delta : delta}
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
              </div>
            </div>
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
            style={{ width: "100%", height: "1px", background: "#CACACA" }}
          ></div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "0px 64px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              color: "#88888B",
              // fontFamily: "DM Sans",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "155%",
            }}
          >
            TABLA
          </div>
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "155%",
            }}
          >
            ENFRIADORES
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginLeft: 350,
          }}
        >
          <div
            style={{
              color: "#3E83FF",
              // fontFamily: "DM Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "26px",
              cursor: "pointer",
            }}
          >
            Descargar
          </div>
          <img
            src={"../../sampleData/download.png"}
            width={"22px"}
            alt="cooler"
          ></img>
        </div>
      </div>
    </div>
  );
}
