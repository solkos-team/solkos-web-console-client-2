import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

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
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  color: "#000005",
                  //   fontFamily: "DM Sans",
                  fontSize: "23px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "155%",
                  marginRight: 280,
                }}
              >
                Inicia Sesión
              </div>
              <div
                style={{
                  color: "#88888B",
                  //   fontFamily: "DM Sans",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "155%",
                  marginRight: 70,
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
                  fontSize: "14px",
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
                  fontSize: "14px",
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
              <div>
                <Link to="/recover">
                  <div
                    style={{
                      alignSelf: "stretch",
                      color: "#ED5079",
                      marginLeft: 295,
                      //   fontFamily: "DM Sans",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "155%",
                      cursor: "pointer",
                    }}
                  >
                    Olvide mi contraseña
                  </div>
                </Link>
              </div>
            </div>
            <Button
              style={{ background: "#ED5079", width: "440px", marginLeft: 10 }}
            >
              Iniciar sesión
            </Button>
          </div>
          <div
            style={{
              width: "430px",
              height: "0.5px",
              background: "#88888B",
              marginLeft: 90,
            }}
          ></div>

          <div
            style={{
              marginLeft: 230,
              color: "#88888B",
              textAlign: "center",
              //   fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              marginBottom: 0,
            }}
          >
            ¿No tienes una cuenta?
          </div>
          <div
            style={{
              marginLeft: 270,
              color: "#ED5079",
              textAlign: "center",
              //   fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              marginBottom: 0,
              cursor: "pointer",
            }}
          >
            Solicita una
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
        <div style={{ background: "#FCCFD9", width: "1500px" }}></div>
      </div>
    </>
  );
};
