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

  const userVerify = (): Boolean => {
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
    >
      <section className="users_principal">
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
          <section className="users_form">
            <section className="users_form_1">
              {userVerify() == true ? (
                <>
                  <Input.Wrapper label="Nombre" description="" error="">
                    <Input
                      value={nameUser}
                      onChange={(e) => setNameUser(e.target.value)}
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

            <section className="users_form_button">
              <Button
                style={{
                  background: "#E7F5FF",
                  width: "100%",
                  marginLeft: 0,
                  color: "#2393F4",
                  cursor: "pointer",
                }}
                onClick={handleEditUser}
                disabled={true}
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

// import React, { useRef, useState } from "react";
// import { Button, Drawer, Input } from "@mantine/core";
// import { useEffect } from "react";

// export default function DrawerUsers({
//   setIsAlertOpen,
//   setAlertStatus,
//   setUpdateOpen,
//   setUpdateStatus,
//   userData,
//   userDataClear,
//   openedDrawerEdit,
//   setOpenedDrawerEdit,
//   oncloseDrawerEdit,
// }) {
//   const { id, name, email, customer, path } = userData;
//   const [nameUser, setNameUser] = useState(name);
//   const [showAlert, setShowAlert] = useState(false);
//   const [emailUser, setEmailUser] = useState(email);
//   const [customerUser, setCustomerUser] = useState(customer);
//   // const [pathUser, setPathUser] = useState(path.join(","));
//   const [pathUser, setPathUser] = useState(path);
//   const closeAndClearInfo = () => {
//     userDataClear("");
//   };

//   openedDrawerEdit === false ? closeAndClearInfo : "";
//   const handleEditUser = () => {
//     // PRODUCTIVO
//     // const url = `https://universal-console-server-b7agk5thba-uc.a.run.app/users/${id}`;

//     // QA
//     const url = `https://qa-test---universal-console-server-b7agk5thba-uc.a.run.app/users/${id}`;
//     const data = {
//       name: nameUser,
//       email: emailUser,
//       customer: customerUser,
//       // path: pathUser.split(","),
//       path: pathUser,
//     };
//     fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.ok) {
//           setOpenedDrawerEdit((flag) => !flag);
//           setShowAlert(true);
//           setUpdateOpen(true);
//           setUpdateStatus(true);
//         } else {
//           console.error("Error al editar usuario:", response.statusText);
//           setUpdateOpen(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error en la solicitud PUT:", error);
//       });
//   };

//   useEffect(() => {
//     const { id, name, email, customer, path } = userData;
//     setNameUser(name);
//     setEmailUser(email);
//     setCustomerUser(customer);
//     setPathUser(path);
//   }, [userData]);

//   const userVerify = (): Boolean => {
//     const user = localStorage.getItem("USER");
//     if (user == "Jose Ivan Perez Ugalde" || user == "Mayra Barrón Reséndiz") {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   return (
//     <Drawer
//       opened={openedDrawerEdit}
//       onClose={oncloseDrawerEdit}
//       position="right"
//       size="40rem"
//     >
//       <section className="users_principal">
//         <section className="users_content">
//           <section className="users_title">
//             <h1 className="users_title_h1">
//               {localStorage.getItem("USER") === "Jose Iván Peréz Ugalde" ||
//               localStorage.getItem("USER") === "Mayra Barrón Reséndiz"
//                 ? "EDITAR USUARIO"
//                 : "INFORMACIÓN USUARIO"}
//             </h1>
//           </section>
//           <section className="users_form">
//             <section className="users_form_1">
//               {userVerify() == true ? (
//                 <>
//                   <Input.Wrapper label="Nombre" description="" error="">
//                     <Input
//                       value={nameUser}
//                       onChange={(e) => setNameUser(e.target.value)}
//                     />
//                   </Input.Wrapper>
//                 </>
//               ) : (
//                 <>
//                   <Input.Wrapper label="Nombre" description="" error="">
//                     <Input
//                       value={nameUser}
//                       onChange={(e) => setNameUser(e.target.value)}
//                       disabled
//                     />
//                   </Input.Wrapper>
//                 </>
//               )}
//             </section>
//             <section className="users_form_1">
//               {userVerify() == true ? (
//                 <>
//                   <Input.Wrapper label="Correo" description="" error="">
//                     <Input
//                       value={emailUser}
//                       onChange={(e) => setEmailUser(e.target.value)}
//                     />
//                   </Input.Wrapper>
//                 </>
//               ) : (
//                 <>
//                   <Input.Wrapper label="Correo" description="" error="">
//                     <Input
//                       value={emailUser}
//                       onChange={(e) => setEmailUser(e.target.value)}
//                       disabled
//                     />
//                   </Input.Wrapper>
//                 </>
//               )}
//             </section>
//             <section className="users_form_1">
//               {userVerify() == true ? (
//                 <>
//                   <Input.Wrapper label="Customer" description="" error="">
//                     <Input
//                       value={customerUser}
//                       onChange={(e) => setCustomerUser(e.target.value)}
//                       disabled={true}
//                     />
//                   </Input.Wrapper>
//                 </>
//               ) : (
//                 <>
//                   <Input.Wrapper label="Customer" description="" error="">
//                     <Input
//                       value={customerUser}
//                       onChange={(e) => setCustomerUser(e.target.value)}
//                       disabled
//                     />
//                   </Input.Wrapper>
//                 </>
//               )}
//             </section>
//             <section className="users_form_1">
//               {userVerify() == true ? (
//                 <>
//                   <Input.Wrapper label="Path" description="" error="">
//                     <Input
//                       value={path.toString()}
//                       // onChange={(e) => setPathUser(e.target.value)}
//                     />
//                   </Input.Wrapper>
//                 </>
//               ) : (
//                 <>
//                   <Input.Wrapper label="Path" description="" error="">
//                     <Input
//                       value={path.toString()}
//                       // onChange={(e) => setPathUser(e.target.value)}
//                       disabled
//                     />
//                   </Input.Wrapper>
//                 </>
//               )}
//             </section>
//             <section className="users_form_button">
//               <Button
//                 style={{
//                   background: "#ED5079",
//                   width: "17rem",
//                   marginLeft: 0,
//                   color: "#FEF2F4",
//                   cursor: "pointer",
//                 }}
//                 onClick={handleEditUser}
//                 disabled={true}
//               >
//                 Editar usuario
//               </Button>
//             </section>
//           </section>
//         </section>
//       </section>
//     </Drawer>
//   );
// }
