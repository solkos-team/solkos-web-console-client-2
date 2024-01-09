import { Button } from "@mantine/core";
import React from "react";

export const Login = () => {
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
            margin: "0 auto",
          }}
        >
          {/* title */}
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
                  fontSize: "21px",
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
                  fontSize: "10px",
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
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                marginTop: "-20px",
              }}
            >
              <div
                style={{
                  color: "#000005",
                  //   fontFamily: "DM Sans",
                  fontSize: "26px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "155%",
                }}
              >
                Inicia Sesión
              </div>
              <div
                style={{
                  color: "#88888B",
                  //   fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "155%",
                }}
              >
                Utiliza las credenciales proporcionadas por tu administrador
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "420px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  //   fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                Correo
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
            <div
              style={{
                display: "flex",
                width: "420px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  //   fontFamily: "DM Sans",
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
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#ED5079",
                  textAlign: "right",
                  //   fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "155%",
                }}
              >
                Olvide mi contraseña
              </div>
            </div>
            <Button
              style={{ background: "#ED5079", width: "430px", marginLeft: 10 }}
            >
              Iniciar sesión
            </Button>
          </div>
          <div>© Imbera 2024</div>
        </div>
        <div style={{ background: "#FCCFD9", width: "1500px" }}></div>
      </div>
    </>
  );
};
