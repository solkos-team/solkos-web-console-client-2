import { useSelector } from "react-redux";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mantine/core";
import { fetchUniversal } from "../../utils/apiUtils";
import { useState, useEffect } from "react";

export default function DrawerNewUser({    
  children,
  setIsAlertOpen,
  setAlertStatus,
  setIsDrawerOpen2,
  openedDrawer,
  oncloseDrawer,
  setOpenedDrawer
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  const clearInputs = () =>{
    setName('')
    setEmail('')
  }
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
        clearInputs()
        setShowAlert(true);
        setIsAlertOpen(true);
        setAlertStatus(true);        
      } catch (error) {
        setIsDrawerOpen2(false);
        setAlertStatus(false);
        console.error("Error fetching :", error);
        setIsAlertOpen(true);
        clearInputs()
      }    
    
  };

  return (
    <Drawer opened={openedDrawer} onClose={oncloseDrawer} position="right" size="40rem">     
      <div
        style={{
          display: "flex",
          padding: "0px 32px",
          alignItems: "flex-start",
          gap: "8px",
          alignSelf: "stretch"          
        }}
      >
        <img
          src={"../../sampleData/user_c.png"}
          alt="Descripción de la imagen"
          style={{ width: "60px", height: "55px" }}
        />
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
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginBottom: 100,
            }}
          >
            Crear nuevo usuario
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "450px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              color: "#3A3A3F",
              // fontFamily: "DM Sans",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -220,
            }}
          >
            Nombre
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: "50%",              
              backgroundColor:"#FFFF"
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              color: "#3A3A3F",
              // fontFamily: "DM Sans",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -220,
            }}
          >
            Correo
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: "50%",              
              backgroundColor:"#FFFF"
            }}
          />
        </div>
        <br></br>
        <Button
          style={{ background: "#ED5079", width: "50%", marginLeft: 0 }}
          onClick={handleLogin}
        >
          Crear usuario
        </Button>
      </div>
    </Drawer>
  );
}
