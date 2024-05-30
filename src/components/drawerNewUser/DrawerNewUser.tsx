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
    >
      <section className="users_principal">
        <section className="users_content">
          <section className="users_title">
            <h1 className="users_title_h1">Nuevo Usuario</h1>
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
          <section className="users_form">
            <section className="users_form_1">
              <Input.Wrapper label="Nombre" description="" error="">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Input.Wrapper>
            </section>
            <section className="users_form_1">
              <Input.Wrapper label="Correo" description="" error="">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Input.Wrapper>
            </section>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <section className="users_form_button">
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
            </section>
            <section className="users_form_button" style={{ marginTop: -20 }}>
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
            </section>{" "}
          </section>
        </section>
      </section>
    </Drawer>
  );
}
