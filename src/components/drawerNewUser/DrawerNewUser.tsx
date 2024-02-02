import { useSelector } from "react-redux";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, Center } from "@mantine/core";
import { fetchUniversal } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
// import { mailer } from "../../utils/apiUtils";

export default function DrawerNewUser({
  isOpen,
  onClose,
  reloadUsers,
  children,
  setIsAlertOpen,
  setAlertStatus,
  setIsDrawerOpen2,
}) {
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
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
      onClose();
      setShowAlert(true);
      setIsAlertOpen(true);
      setAlertStatus(true);
    } catch (error) {
      setIsDrawerOpen2(false);
      onClose();
      setAlertStatus(false);
      console.error("Error fetching :", error);
      setIsAlertOpen(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    onClose();
  };

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
        padding: "10px",
        overflowY: "auto",
        maxHeight: "100vh",
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
            cursor: "pointer",
          }}
        >
          <img
            onClick={onClose}
            src="../../sampleData/arrowsDes.png"
            alt="Descripción de la imagen"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "0px 32px",
          alignItems: "flex-start",
          gap: "8px",
          alignSelf: "stretch",
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
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -120,
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
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: 430,
              marginLeft: 250,
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
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -130,
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
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: 430,
              marginLeft: 250,
              backgroundColor:"#FFFF"
            }}
          />
        </div>
        <br></br>
        <Button
          style={{ background: "#ED5079", width: "440px", marginLeft: 260 }}
          onClick={handleLogin}
        >
          Crear usuario
        </Button>
      </div>
    </div>
  );
}
