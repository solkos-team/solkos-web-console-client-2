import React, { useEffect, useRef } from "react";

export default function Drawer({ isOpen, onClose, outletDetails }) {
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
        // overflowY: "auto",
        padding: "10px",
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
            padding: "0px 32px",
            alignItems: "flex-start",
            gap: "8px",
            alignSelf: "stretch",
            background: "#FFF",
          }}
        >
          <img
            onClick={onClose}
            src={"../../sampleData/buildings2.png"}
            alt="Descripción de la imagen"
            style={{ width: "60px", height: "60px", cursor: "pointer" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              flex: 100,
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  {outletDetails?.outlet_name}
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "2px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "2px",
                    border: "1.5px solid #0F9F67",
                    background: "#FFF",
                  }}
                >
                  {/* <img
                  onClick={onClose}
                  src={"../../sampleData/a.png"}
                  alt="Descripción de la imagen"
                /> */}
                  <div
                    style={{
                      color: "#0F9F67",
                      fontFamily: "DM Sans",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "14px",
                    }}
                  >
                    ----
                  </div>
                </div>
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                --------
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
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
                Leído por última vez el:
              </div>
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "Inter",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                -- -- ----- --- -- -----
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                    height: "10px",
                  }}
                >
                  -- DÍAS SIN VISITA
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "22px",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                CANAL:
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  -----
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                height: "22px",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                REGIÓN:
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  -----
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                height: "22px",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                RUTA:
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  -----
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                height: "22px",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                GERENCIA DE ZONA:
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                  height: "10px",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  -----
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
    </div>
  );
}
