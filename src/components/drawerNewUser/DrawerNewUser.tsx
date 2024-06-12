// //
// import { useSelector } from "react-redux";
// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Drawer } from "@mantine/core";
// import { fetchUniversal } from "../../utils/apiUtils";
// import { useState, useEffect } from "react";
// export default function DrawerNewUser({
//   children,
//   setIsAlertOpen,
//   setAlertStatus,
//   setIsDrawerOpen2,
//   openedDrawer,
//   oncloseDrawer,
//   setOpenedDrawer,
// }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const dto = useSelector((state: any) => state.organization);
//   const dt = useSelector((state: any) => state.works);
//   const pathVerify = () => {
//     return dt.length === 0 ? [] : JSON.parse(dt);
//   };
//   const clearInputs = () => {
//     setName("");
//     setEmail("");
//   };
//   const handleLogin = async () => {
//     const body = {
//       customer: dto,
//       email: email,
//       name: name,
//       path: pathVerify(),
//     };
//     try {
//       const data = await fetchUniversal("users/add", body);
//       setOpenedDrawer((flag) => !flag);
//       clearInputs();
//       setShowAlert(true);
//       setIsAlertOpen(true);
//       setAlertStatus(true);
//     } catch (error) {
//       setIsDrawerOpen2(false);
//       setAlertStatus(false);
//       console.error("Error fetching :", error);
//       setIsAlertOpen(true);
//       clearInputs();
//     }
//   };

//   return (
//     <Drawer
//       opened={openedDrawer}
//       onClose={oncloseDrawer}
//       position="right"
//       size="40rem"
//     >
//       <div
//         style={{
//           display: "flex",
//           padding: "0px 32px",
//           alignItems: "flex-start",
//           gap: "8px",
//           alignSelf: "stretch",
//         }}
//       >
//         <img
//           src={"../../sampleData/user2.svg"}
//           alt="Descripción de la imagen"
//         />
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "flex-start",
//             alignSelf: "stretch",
//           }}
//         >
//           <div
//             style={{
//               color: "#000005",
//               // fontFamily: "DM Sans",
//               fontSize: "20px",
//               fontStyle: "normal",
//               fontWeight: 700,
//               lineHeight: "normal",
//               marginBottom: 100,
//             }}
//           >
//             Crear nuevo usuario
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           width: "450px",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "32px",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             width: "450px",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//             gap: "15px",
//           }}
//         >
//           <div
//             style={{
//               color: "#3A3A3F",
//               // fontFamily: "DM Sans",
//               fontSize: "1rem",
//               fontStyle: "normal",
//               fontWeight: 700,
//               lineHeight: "normal",
//               marginLeft: -220,
//             }}
//           >
//             Nombre
//           </div>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{
//               color: "#000",
//               // fontFamily: "DM Sans",
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "28px",
//               width: "50%",
//               backgroundColor: "#FFFF",
//             }}
//           />
//         </div>
//         <div
//           style={{
//             display: "flex",
//             width: "450px",
//             flexDirection: "column",
//             alignItems: "center",
//             textAlign: "center",
//             gap: "15px",
//           }}
//         >
//           <div
//             style={{
//               color: "#3A3A3F",
//               // fontFamily: "DM Sans",
//               fontSize: "1rem",
//               fontStyle: "normal",
//               fontWeight: 700,
//               lineHeight: "normal",
//               marginLeft: -220,
//             }}
//           >
//             Correo
//           </div>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{
//               color: "#000",
//               // fontFamily: "DM Sans",
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "28px",
//               width: "50%",
//               backgroundColor: "#FFFF",
//             }}
//           />
//         </div>
//         <br></br>
//         <Button
//           style={{ background: "#ED5079", width: "50%", marginLeft: 0 }}
//           onClick={handleLogin}
//         >
//           Crear usuario
//         </Button>
//       </div>
//     </Drawer>
//   );
// }

// *************************************************************************

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
