import { Button, PasswordInput, Input } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUniversal } from "../../../utils/apiUtils";
import { IconEyeOff, IconEye } from "@tabler/icons-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const pushUserConfig = (data) => {
    const { user } = data;
    const { Customer, Path, Name } = user;
    localStorage.setItem("PATH", JSON.stringify(Path));
    localStorage.setItem("ORG", Customer);
    localStorage.setItem("RO0T", JSON.stringify(Path));
    localStorage.setItem("USER", Name);
    String(Name) == "Call Center"
      ? navigate("/homeCallCenter")
      : navigate("/home");
  };
  const body = {
    email: email,
    password: password,
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("login", body);
      pushUserConfig(data);
    } catch (error) {
      console.error("Error fetching login:", error);
      setErrorMessage("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
  };
  const handleLogin = () => {
    fetchData();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };
  return (
    // General
    <>
      <div className="login_principal_body">
        <div className="login_principal_title">
          {/* title */}
          <div className="login_principal_title_content">
            <img className="login_principal_title_content_img"
              src={"../../sampleData/solkosSymbol.png"}
              alt="Descripción de la imagen" />
            <div
            className="login_principal_title_content_nom_version">
              <div className="login_principal_title_content_nom">
                Consola Solkos
              </div>

              <div className="login_principal_title_content_nom_h2">
                BY IMBERA
              </div>
            </div>
          </div>
          <div className="login_principal_form">
            <div className="login_principal_form_title">
              <div className="login_principal_form_title_h1">
                Inicia Sesión
              </div>
              <div className="login_principal_form_title_h2">
                Utiliza las credenciales proporcionadas por tu administrador
              </div>
            </div>
            <div className="login_principal_form_label1">
              <div className="login_principal_form_label1_1">
                Correo
              </div>
              <Input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className="login_principal_form_label1_input1"/>
            </div>
            <div className="login_principal_form_label2">
              <div className="login_principal_form_label2_2">
                Contraseña
              </div>
              <div className="login_principal_form_label2_2_container"
                
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-20px",
                    transform: "translateY(-50%)",
                  }}
                >
                  {/* {showPassword ? (
                    <IconEye
                      style={{ cursor: "pointer" }}
                      onClick={handleTogglePasswordVisibility}
                    />
                  ) : (
                    <IconEyeOff
                      style={{ cursor: "pointer" }}
                      onClick={handleTogglePasswordVisibility}
                    />
                  )} */}
                </div>
                <PasswordInput
                  // type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="login_principal_form_label2_input2"/>
              </div>
              {errorMessage && (
                <div
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                >
                  {errorMessage}
                </div>
              )}
              {/* <div>
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
              </div> */}
            </div>
            <form onSubmit={handleSubmit}>
              <Button
              className="login_principal_form_button_ini"
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
          {/* <div
            style={{
              width: "430px",
              height: "0.5px",
              background: "#88888B",
              marginLeft: 90,
            }}
          ></div> */}

          {/* <div
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
          </div> */}
          {/* <div
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
          </div> */}

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
        <div
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #FCCFD9 0deg, #ED5079 360deg)",
            width: "1500px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ marginLeft: -130, marginTop: -50 }}>
            <img
              src={"../../sampleData/login1.png"}
              alt="Descripción de la imagen"
              style={{
                width: "790px",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
