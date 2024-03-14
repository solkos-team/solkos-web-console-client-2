import { useSelector } from "react-redux";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer,Input } from "@mantine/core";
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
            <img
              src={"../../sampleData/user2.svg"}
              alt="Descripción de la imagen"
            />
            <h1 className="users_title_h1">
              Crear Nuevo Usuario
            </h1>
          </section>
          <section className="users_form">
            <section className="users_form_1">
              <Input.Wrapper label="Nombre" description="" error="">
                <Input value={name}
                  onChange={(e) => setName(e.target.value)} />
              </Input.Wrapper>
            </section>            
            <section className="users_form_1">
              <Input.Wrapper label="Correo" description="" error="">
                <Input value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Input.Wrapper>
            </section>                                  
            <section className="users_form_button">
              <Button
                style={{
                  background: "#ED5079",
                  width: "17rem",
                  marginLeft: 0,
                  color: "#FEF2F4",
                  cursor: "pointer",
                }}
                onClick={handleLogin}
              >
                Crear usuario
              </Button>
            </section>
          </section>
        </section>
      </section>
    </Drawer>
  );
}
