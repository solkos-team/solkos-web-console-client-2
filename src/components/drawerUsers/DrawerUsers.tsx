import React, { useRef, useState } from "react";
import { Button, Drawer } from "@mantine/core";
import { useEffect } from "react";

export default function DrawerUsers({
  setIsAlertOpen,
  setAlertStatus,
  setUpdateOpen,
  setUpdateStatus,
  userData,
  userDataClear,
  openedDrawerEdit,
  setOpenedDrawerEdit,
  oncloseDrawerEdit,
}) {
  const { id, name, email, customer, path } = userData;
  const [nameUser, setNameUser] = useState(name);
  const [showAlert, setShowAlert] = useState(false);
  const [emailUser, setEmailUser] = useState(email);
  const [customerUser, setCustomerUser] = useState(customer);
  // const [pathUser, setPathUser] = useState(path.join(","));
  const [pathUser, setPathUser] = useState(path);
  const closeAndClearInfo = () => {
    userDataClear("");
  };

  openedDrawerEdit === false ? closeAndClearInfo : "";
  const handleEditUser = () => {
    const url = `https://universal-console-server-b7agk5thba-uc.a.run.app/users/${id}`;
    const data = {
      name: nameUser,
      email: emailUser,
      customer: customerUser,
      // path: pathUser.split(","),
      path: pathUser,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setOpenedDrawerEdit((flag) => !flag);
          setShowAlert(true);
          setUpdateOpen(true);
          setUpdateStatus(true);
        } else {
          console.error("Error al editar usuario:", response.statusText);
          setUpdateOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud PUT:", error);
      });
  };

  useEffect(() => {
    const { id, name, email, customer, path } = userData;
    setNameUser(name);
    setEmailUser(email);
    setCustomerUser(customer);
    setPathUser(path);
  }, [userData]);

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
            {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
            localStorage.getItem("USER") === "Mayra Barrón Reséndiz"
              ? "EDITAR USUARIO"
              : "INFORMACIÓN USUARIO"}
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
          {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
          localStorage.getItem("USER") === "Mayra Barrón Reséndiz" ? (
            <>
              <input
                type="text"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
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
            </>
          ) : (
            <>
              <input
                type="text"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
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
                disabled
              />
            </>
          )}
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
          {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
          localStorage.getItem("USER") === "Mayra Barrón Reséndiz" ? (
            <>
              <input
                type="text"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
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
            </>
          ) : (
            <>
              <input
                type="text"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
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
                disabled
              />
            </>
          )}
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
          {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
          localStorage.getItem("USER") === "Mayra Barrón Reséndiz" ? (
            <>
              <input
                type="text"
                value={customerUser}
                onChange={(e) => setCustomerUser(e.target.value)}
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
            </>
          ) : (
            <>
              <input
                type="text"
                value={customerUser}
                onChange={(e) => setCustomerUser(e.target.value)}
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
                disabled
              />
            </>
          )}
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
          {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
          localStorage.getItem("USER") === "Mayra Barrón Reséndiz" ? (
            <>
              <input
                type="text"
                value={path.toString()}
                // onChange={(e) => setPathUser(e.target.value)}
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
            </>
          ) : (
            <>
              <input
                type="text"
                value={path.toString()}
                // onChange={(e) => setPathUser(e.target.value)}
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
                disabled
              />
            </>
          )}
        </section>
        {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
        localStorage.getItem("USER") === "Mayra Barrón Reséndiz" ? (
          <>
            <br></br>
            <Button
              style={{
                background: "#ED5079",
                width: "17rem",
                marginLeft: 0,
                color: "#FEF2F4",
                cursor: "pointer",
              }}
              onClick={handleEditUser}
            >
              Editar usuario
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
    </Drawer>
  );
}
