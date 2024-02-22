import React, { useRef, useState } from "react";
import { Button, Drawer } from "@mantine/core";

export default function DrawerUsers({
  userData,
  userDataClear,
  openedDrawerEdit,
  setOpenedDrawerEdit,
  oncloseDrawerEdit,
}) {
  const { name, email, customer, path } = userData;
  const [nameUser, setNameUser] = useState(name);
  const [emailUser, setEmailUser] = useState(email);
  const [customerUser, setCustomerUser] = useState(customer);
  const closeAndClearInfo = () => {
    userDataClear("");
  };
  openedDrawerEdit == false ? closeAndClearInfo() : "";
  return (
    <Drawer
      opened={openedDrawerEdit}
      onClose={oncloseDrawerEdit}
      position="right"
      size="40rem"
    >
      <div
        style={{
          display: "flex",
          padding: "0px 2rem",
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
          width: "28rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <section
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <label
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
          </label>
          <input
            type="text"
            value={nameUser}
            // onChange={(e) => setName(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: "17rem",
              backgroundColor: "#FFFF",
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
            gap: "1rem",
          }}
        >
          <label
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
          </label>
          <input
            type="text"
            value={emailUser}
            // onChange={(e) => setEmail(e.target.value)}
            style={{
              color: "#000",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: "17rem",
              backgroundColor: "#FFFF",
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
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -200,
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
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: "17rem",
              backgroundColor: "#FFFF",
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
            gap: "1rem",
          }}
        >
          <label
            style={{
              color: "#3A3A3F",
              // fontFamily: "DM Sans",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              marginLeft: -230,
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
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "28px",
              width: "17rem",
              backgroundColor: "#FFFF",
            }}
          />
        </section>
        <br></br>
        <Button
          style={{ background: "#ED5079", width: "17rem", marginLeft: 0 }}
          // onClick={handleLogin}
          disabled
        >
          Editar usuario
        </Button>
      </div>
    </Drawer>
  );
}
