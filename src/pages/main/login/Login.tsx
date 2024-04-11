import { Button, PasswordInput, Input } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUniversal } from "../../../utils/apiUtils";
import { useDispatch } from "react-redux";
import { addPath } from "../../../app/works";
import { addOrg } from "../../../app/organization";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pushUserConfig = (data) => {
    const { user, token } = data;
    const { Customer, Path, Name, Role } = user;
    localStorage.setItem("PATH", JSON.stringify(Path));
    localStorage.setItem("ORG", Customer);
    localStorage.setItem("RO0T", JSON.stringify(Path));
    localStorage.setItem("USER", Name);
    sessionStorage.setItem("Email", email);
    sessionStorage.setItem("Token", token);
    localStorage.setItem("Role", Role);
    console.log(Role);
    dispatch(addPath());
    dispatch(addOrg());
    String(Name) == "Call Center"
      ? setTimeout(() => {
          navigate("/homeCallCenter");
        }, 2000)
      : setTimeout(() => {
          navigate("/home");
        }, 2000);
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
    <>
      <div className="login_principal_body">
        <div className="login_principal_title">
          {/* <div className="login_un"> */}
          <div className="login_principal_title_content">
            <img
              className="login_principal_title_content_img"
              src={"../../sampleData/solkosSymbol.png"}
              alt="Descripción de la imagen"
            />
            <div className="login_principal_title_content_nom_version">
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
              <div className="login_principal_form_title_h1">Inicia Sesión</div>
              <div className="login_principal_form_title_h2">
                Utiliza las credenciales proporcionadas por tu administrador
              </div>
            </div>
            <div className="login_principal_form_label1">
              <div className="login_principal_form_label1_1">Correo</div>
              <Input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className="login_principal_form_label1_input1"
              />
            </div>
            <div className="login_principal_form_label1">
              <div className="login_principal_form_label1_1">Contraseña</div>

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="login_principal_form_label1_input1"
              />

              {errorMessage && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} style={{ width: "60%" }}>
              <Button
                className="login_principal_form_button_ini"
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
          {/* </div> */}
          <div
            style={{
              color: "#88888B",
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
          className="login_principal_image"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #FCCFD9 0deg, #ED5079 360deg)",
            width: "62%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={"../../sampleData/login1.png"}
            alt="Descripción de la imagen"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </>
  );
};
