import { Button } from "@mantine/core";
import React from "react";

export const NewPassword = () => {
  return (
    // General
    <>
      <div style={{ display: "flex", height: "89vh" }}>
        <div
          style={{
            display: "flex",
            width: "1500px",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            background: "#FFF",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}
          >
            <img
              src={"../../sampleData/solkosSymbol.png"}
              alt="Descripción de la imagen"
              style={{ marginTop: 10, width: "30px", height: "30px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "#000005",
                  //   fontFamily: "DM Sans",
                  fontSize: "19px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "155%",
                }}
              >
                Consola Solkos
              </div>

              <div
                style={{
                  color: "#3A3A3F",
                  fontSize: "9px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  // fontFamily: "DM Mono",
                }}
              >
                BY IMBERA
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "64px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                marginRight: 170,
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
                Crea una nueva contraseña
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
                Restablece la contraseña creando una nueva.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                marginLeft: -60,
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                Contraseña
              </div>
              <input
                type="text"
                // value={searchValue}
                // onChange={handleChange}
                style={{
                  color: "#ADBACC",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "28px",
                  width: 430,
                }}
              />
              <br></br>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                Confirma contraseña
              </div>
              <input
                type="text"
                // value={searchValue}
                // onChange={handleChange}
                style={{
                  color: "#ADBACC",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "28px",
                  width: 430,
                }}
              />
            </div>

            <Button
              style={{ background: "#ED5079", width: "440px", marginLeft: -60 }}
            >
              Enviar código de recuperación
            </Button>
          </div>

          <div
            style={{
              color: "#88888B",
              //   fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
            }}
          >
            © Imbera 2024
          </div>
        </div>
        <div style={{ background: "#ADBACC", width: "800px" }}></div>
      </div>
    </>
  );
};
