import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

export default function DrawerUsers({ isOpen, onClose, userData }) {
  const { name, email, customer, path } = userData;
  const [nameUser, setNameUser] = useState(name);
  const [emailUser, setEmailUser] = useState(email);
  const [customerUser, setCustomerUser] = useState(customer);
  const [pathUser, setPathUser] = useState(path);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const dt = useSelector((state: any) => state.works);
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
        overflowY: "auto", // Agregado para permitir el scroll vertical
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <h1
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginBottom: 50,
            }}
          >
            EDITAR USUARIO
          </h1>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "450px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <section
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <label
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
          </label>
          <input
            type="text"
            value={nameUser}
            // onChange={(e) => setName(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: 430,
              marginLeft: 250,
            }}
          />
        </section>
        <section
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <label
            style={{
              color: "#3A3A3F",
              // fontFamily: "DM Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -135,
            }}
          >
            Correo
          </label>
          <input
            type="text"
            value={emailUser}
            // onChange={(e) => setEmail(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: 430,
              marginLeft: 250,
            }}
          />
        </section>
        <section
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <label
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
            Customer
          </label>
          <input
            type="text"
            value={customerUser}
            // onChange={(e) => setEmail(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: 430,
              marginLeft: 250,
            }}
          />
        </section>
        <section
          style={{
            display: "flex",
            width: "450px",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <label
            style={{
              color: "#3A3A3F",
              // fontFamily: "DM Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -150,
            }}
          >
            Path
          </label>
          <input
            type="text"
            value={path.toString()}
            // onChange={(e) => setEmail(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: 430,
              marginLeft: 250,
            }}
          />
        </section>
        <br></br>
        <Button
          style={{ background: "#ED5079", width: "440px", marginLeft: 260 }}
          // onClick={handleLogin}
          disabled
        >
          Editar usuario
        </Button>
      </div>
    </div>
  );
}
