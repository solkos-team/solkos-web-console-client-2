import { useSelector } from "react-redux";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Input } from "@mantine/core";
import { fetchUniversal } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
export default function DrawerNewUser({
  children,
  setIsAlertOpen,
  setAlertStatus,
  setIsDrawerOpen2,
  openedDrawer,
  oncloseDrawer,
  setOpenedDrawer,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  const clearInputs = () => {
    setName("");
    setEmail("");
  };
  const handleLogin = async () => {
    const body = {
      customer: dto,
      email: email,
      name: name,
      path: pathVerify(),
      role: pathVerify().length === 0 ? "user" : "path_user",
    };
    try {
      const data = await fetchUniversal("users/add", body);
      setOpenedDrawer((flag) => !flag);
      clearInputs();
      setShowAlert(true);
      setIsAlertOpen(true);
      setAlertStatus(true);
    } catch (error) {
      setIsDrawerOpen2(false);
      setAlertStatus(false);
      console.error("Error fetching :", error);
      setIsAlertOpen(true);
      clearInputs();
    }
  };
  const handleClose = () => {
    setOpenedDrawer(false);
  };
  return (
    <Drawer
      opened={openedDrawer}
      onClose={oncloseDrawer}
      position="right"
      size="40rem"
      withCloseButton={false}
    >
      <div style={{ position: "absolute", left: "2rem", top: "1rem" }}>
        <button
          style={{
            display: "flex",
            padding: "0.313rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.625rem",
            alignSelf: "stretch",
            borderRadius: "0.25rem",
            border: "0.063rem solid #CED4DA",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={oncloseDrawer}
        >
          <img
            src={"../../sampleData/CloseDrawer.svg"}
            alt="Close"
            style={{ width: "1.125rem", height: "1.125rem" }}
          />
        </button>
      </div>
      <section className="users_principal" style={{ marginTop: "1rem" }}>
        <section className="users_content">
          <section className="users_title">
            <h1 className="users_title_h1" style={{ padding: "0rem 1rem" }}>
              Nuevo Usuario
            </h1>
          </section>
          <div
            style={{
              display: "flex",
              padding: "4px 0px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              alignSelf: "strech",
            }}
          >
            <div
              style={{ background: "#CACACA", height: "1px", width: "105%" }}
            ></div>
          </div>
          <section
            style={{
              // background: "red",
              display: "flex",
              padding: "1rem 1rem",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 100,
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                // background: "blue",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  // background: "green",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "0.313rem",
                  flex: 100,
                  width: "100%",
                }}
              >
                <Input.Wrapper
                  label="Nombre"
                  description=""
                  error=""
                  style={{ width: "100%" }}
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={
                      <img
                        src={"../../sampleData/user_1.svg"}
                        alt="Descripción de la imagen"
                        // style={{ width: "1.813rem", height: "1.813rem" }}
                      />
                    }
                  />
                </Input.Wrapper>
              </div>
              <div
                style={{
                  // background: "green",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "0.313rem",
                  flex: 100,
                  width: "100%",
                }}
              >
                <Input.Wrapper
                  label="Correo"
                  description=""
                  error=""
                  style={{ width: "100%" }}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={
                      <img
                        src={"../../sampleData/at.svg"}
                        alt="Descripción de la imagen"
                        // style={{ width: "1.813rem", height: "1.813rem" }}
                      />
                    }
                  />
                </Input.Wrapper>
              </div>
            </div>{" "}
            <div
              style={{
                // background: "pink",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
                alignSelf: "stretch",
              }}
            >
              <Button
                style={{
                  background: "#FFF5F5",
                  width: "100%",
                  marginLeft: 0,
                  color: "#FA5252",
                  cursor: "pointer",
                }}
                onClick={handleClose} // Cambiado para cerrar el Drawer
              >
                <div
                  style={{
                    display: "flex",
                    padding: "8px 26px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    flex: 100,
                    borderRadius: "8px",
                    background: "#FFF5F5",
                  }}
                >
                  <img
                    src={"../../sampleData/x.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Cancelar
                </div>
              </Button>
              <Button
                style={{
                  background: "#E7F5FF",
                  width: "100%",
                  marginLeft: 0,
                  color: "#2393F4",
                  cursor: "pointer",
                }}
                onClick={handleLogin}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "8px 26px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    flex: 100,
                    borderRadius: "8px",
                    background: "#E7F5FF",
                  }}
                >
                  <img
                    src={"../../sampleData/check.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Guardar
                </div>
              </Button>
            </div>
          </section>
        </section>
      </section>
    </Drawer>
  );
}
