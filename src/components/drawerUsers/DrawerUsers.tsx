import React, { useRef, useState } from "react";
import { Button, Drawer, Input } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
  deleteUserDrawer,
}) {
  const { id, name, email, customer, path } = userData;
  const dto = useSelector((state: any) => state.organization);
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
    // PRODUCTIVO
    // const url = `https://universal-console-server-b7agk5thba-uc.a.run.app/users/${id}`;

    // QA
    const url = `https://qa-test---universal-console-server-b7agk5thba-uc.a.run.app/users/${id}`;
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
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
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

  const userVerify = (): boolean => {
    const user = localStorage.getItem("USER");
    if (user == "Jose Ivan Perez Ugalde" || user == "Mayra Barrón Reséndiz") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Drawer
      opened={openedDrawerEdit}
      onClose={oncloseDrawerEdit}
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
          onClick={oncloseDrawerEdit}
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
            <h1 className="users_title_h1">Información de Usuario</h1>
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
            className="users_form"
            // style={{ background: "yellow" }}
          >
            <section
              style={{
                width: "100%",
                height: "60%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                // background: "red",
              }}
            >
              <section className="users_form_1">
                {userVerify() == true ? (
                  <>
                    <Input.Wrapper label="Nombre" description="" error="">
                      <Input
                        value={nameUser}
                        onChange={(e) => setNameUser(e.target.value)}
                        icon={
                          <img
                            src={"../../sampleData/user_1.svg"}
                            alt="Descripción de la imagen"
                            // style={{ width: "1.813rem", height: "1.813rem" }}
                          />
                        }
                      />
                    </Input.Wrapper>
                  </>
                ) : (
                  <>
                    <Input.Wrapper label="Nombre" description="" error="">
                      <Input
                        value={nameUser}
                        onChange={(e) => setNameUser(e.target.value)}
                        disabled
                        icon={
                          <img
                            src={"../../sampleData/user_1.svg"}
                            alt="Descripción de la imagen"
                            // style={{ width: "1.813rem", height: "1.813rem" }}
                          />
                        }
                      />
                    </Input.Wrapper>
                  </>
                )}
              </section>
              <section className="users_form_1">
                {userVerify() == true ? (
                  <>
                    <Input.Wrapper label="Correo" description="" error="">
                      <Input
                        value={emailUser}
                        onChange={(e) => setEmailUser(e.target.value)}
                        icon={
                          <img
                            src={"../../sampleData/at.svg"}
                            alt="Descripción de la imagen"
                            // style={{ width: "1.813rem", height: "1.813rem" }}
                          />
                        }
                      />
                    </Input.Wrapper>
                  </>
                ) : (
                  <>
                    <Input.Wrapper label="Correo" description="" error="">
                      <Input
                        value={emailUser}
                        onChange={(e) => setEmailUser(e.target.value)}
                        disabled
                        icon={
                          <img
                            src={"../../sampleData/at.svg"}
                            alt="Descripción de la imagen"
                            // style={{ width: "1.813rem", height: "1.813rem" }}
                          />
                        }
                      />
                    </Input.Wrapper>
                  </>
                )}
              </section>
              <section className="users_form_1">
                {userVerify() == true ? (
                  <>
                    <Input.Wrapper label="Customer" description="" error="">
                      <Input
                        value={customerUser}
                        onChange={(e) => setCustomerUser(e.target.value)}
                        disabled={true}
                        icon={
                          <img
                            src={"../../sampleData/bs.svg"}
                            alt="Descripción de la imagen"
                            // style={{ width: "1.813rem", height: "1.813rem" }}
                          />
                        }
                      />
                    </Input.Wrapper>
                  </>
                ) : (
                  <>
                    <Input.Wrapper label="Customer" description="" error="">
                      <Input
                        value={customerUser}
                        onChange={(e) => setCustomerUser(e.target.value)}
                        disabled
                        icon={
                          <img
                            src={"../../sampleData/bs.svg"}
                            alt="Descripción de la imagen"
                            // style={{ width: "1.813rem", height: "1.813rem" }}
                          />
                        }
                      />
                    </Input.Wrapper>
                  </>
                )}
              </section>
              {dto === "CALL CENTER" ? (
                ""
              ) : (
                <>
                  <section className="users_form_1">
                    {userVerify() == true ? (
                      <>
                        <Input.Wrapper label="Path" description="" error="">
                          <Input
                            value={path.toString()}
                            // onChange={(e) => setPathUser(e.target.value)}
                          />
                        </Input.Wrapper>
                      </>
                    ) : (
                      <>
                        <Input.Wrapper label="Path" description="" error="">
                          <Input
                            value={path.toString()}
                            // onChange={(e) => setPathUser(e.target.value)}
                            disabled
                          />
                        </Input.Wrapper>
                      </>
                    )}
                  </section>
                </>
              )}
            </section>

            <section className="users_form_button">
              {/* Boton Eliminar */}
              <Button
                style={{
                  background: "var(--red-0, #FFF5F5)",
                  width: "100%",
                  height: "50px",
                  marginLeft: 0,
                  color: "#FA5252",
                  cursor: "pointer",
                }}
                onClick={() => {
                  deleteUserDrawer(id);
                  oncloseDrawerEdit();
                }}
                disabled={!userVerify()}
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
                    background: "var(--red-0, #FFF5F5)",
                  }}
                >
                  <img
                    src={"../../sampleData/delete.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Eliminar
                </div>
              </Button>
              {/* Boton Editar */}
              <Button
                style={{
                  background: "#E7F5FF",
                  width: "100%",
                  marginLeft: 0,
                  color: "#2393F4",
                  cursor: "pointer",
                }}
                onClick={handleEditUser}
                disabled={!userVerify()}
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
                    src={"../../sampleData/edit.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Editar
                </div>
              </Button>
            </section>
          </section>
        </section>
      </section>
    </Drawer>
  );
}
