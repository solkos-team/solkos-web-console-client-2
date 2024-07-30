import React, { useState, useEffect } from "react";
import { validateAndExecute } from "../../../Functions/pathVerify";
import PageFilter from "../../../components/pageFilter";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { Button, Center, Drawer, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DrawerUsers from "../../../components/drawerUsers/DrawerUsers";
import DrawerNewUser from "../../../components/drawerNewUser/DrawerNewUser";
import { IconArrowRight } from "@tabler/icons-react";
import { Alert, Skeleton } from "@mantine/core";
import {
  fetchDeleteUsers,
  fetchUniversalTables,
} from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import { UsersInterfaces } from "../../../interfaces/UsersInterfaces";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { SkeletonTableUsers } from "../../../components/skeletonTableUsers/SkeletonTableUsers";
import { HeaderInsights } from "../insights/Responsive/HeaderInsights";

export default function Users() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const toggleDrawer = () => setOpened((flag) => !flag);
  const [openedEdit, setOpenedEdit] = useState(false);
  const toggleDrawerEdit = () => setOpenedEdit((flag) => !flag);
  const [searchValue, setSearchValue] = useState("");
  const [dataUsers, setDataUsers] = useState<UsersInterfaces[]>([]);
  const [dataUsersEdit, setDataUsersEdit] = useState<
    UsersInterfaces | string
  >();
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(25);
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [alertPosition, setAlertPosition] = useState({ top: 0, left: 0 });
  const [alertStatus, setAlertStatus] = useState<Boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<Boolean>(false);
  const [userDelete, setUserDelete] = useState();
  const [totalData, setTotalData] = useState<String | number>(0);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const Role = localStorage.getItem("Role") || "";
  console.log(Role);

  useEffect(() => {
    if (location.pathname === "/home/users") {
      localStorage.removeItem("searchTags");
    }
  }, [location]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filterCoolers = (data, searchQuery) => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery?.toLowerCase();
      const codeUsersName = item?.name?.toLowerCase();
      const codeUsersEmail = item?.email?.toLowerCase();
      const codeUsersPath = item?.path.toString().toLowerCase();
      return (
        codeUsersName.includes(searchString) ||
        codeUsersEmail.includes(searchString) ||
        codeUsersPath.includes(searchString)
      );
    });
    return filteredData;
  };
  const filterUsersDataDownload = (data) => {
    data === null || data === undefined
      ? []
      : data.map((user) => ({
          Nombre: user.name,
          Email: user.email,
          Cliente: user.customer,
          Path: user.path.toString(),
        }));
  };
  const filteredUsers = dataUsers ? filterCoolers(dataUsers, searchValue) : [];
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };

  const body = {
    customer: dto,
    page_number: currentPage,
    page_size: Number(datosPorPagina),
    path: pathVerify(),
  };

  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("users", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setDataUsers(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleReloadUsers = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    document.addEventListener("click", function (event) {
      const element = event.target as HTMLElement;
    });
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    dt,
    dto,
    isDrawerOpen2,
    currentPage,
    datosPorPagina,
    userDelete,
    alertStatus,
    updateStatus,
  ]);

  const closeAlert = () => {
    setAlertStatus(false);
    setIsAlertOpen(false);
    setUpdateStatus(false);
    setUpdateOpen(false);
  };

  const [isDelete, setIsDelete] = useState(false);
  const [userDelteID, setUserDelteID] = useState();
  const deleteUserDrawer = async (id) => {
    setUserDelteID(id);
    setIsDelete(true);
  };

  const deleteUser = async () => {
    try {
      const data = await fetchDeleteUsers("users", userDelteID);
      setUserDelete(data);
      setDeleteStatus(true);
      setIsDeleteAlertOpen(true);
      setIsDelete(false);
    } catch (error) {
      console.error("Error", error);
      setDeleteStatus(false);
      setIsDeleteAlertOpen(true);
    }
  };
  dataUsers == undefined ? [] : dataUsers;
  totalData == undefined ? 0 : totalData;
  const formatingPath = (path) => {
    if (path == undefined || path == null) {
      return "";
    } else {
      return path[path.length - 1];
    }
  };
  const isloadingData = () => {
    let rows: any = [];
    for (let i = 0; i < 25; i++) {
      rows.push(
        <tr key={i}>
          <td data-label="Nombre">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="# Enfriadores">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Última visita">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Prioridad">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Acciones">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
        </tr>
      );
    }
    return rows;
  };

  const currentUserRole = Role;

  console.log(totalData);
  return (
    <div>
      {dto === "CALL CENTER" ? (
        <>
          <div style={{ marginTop: "-3rem" }}></div>{" "}
        </>
      ) : (
        <PageFilter status={isLoading} />
      )}
      <br></br>
      <div
        style={{
          display: "flex",
          padding: "16px 0px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "16px",
          flex: 100,
          alignSelf: "stretch",
          width: "100%",
          marginLeft: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "90%",
          }}
        >
          <div
            className="colaboradores_title_h1"
            style={{ color: "#000005", fontWeight: "700", fontSize: "24px" }}
          >
            Colaboradores
          </div>
          <div
            className="colaboradores_title_h1"
            style={{
              color: "#88888B",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            Catálogo de los colaboradores
          </div>
          <div style={{ width: "100%", marginLeft: "-70px" }}>
            <HeaderInsights
              title={"Colaboradores"}
              description={
                "Crea, administra y elimina usuarios, desde este modulo"
              }
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "0px 2rem",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "-40px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              marginTop: -20,
              width: "100%",
            }}
          >
            <TextInput
              className="colaboradores_search_1"
              value={searchValue}
              onChange={handleSearchChange}
              type="text"
              placeholder="Busca por cualquier campo"
              autoComplete="off"
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
                width: "100%",
                paddingRight: "40px",
                margin: 0,
                borderRadius: "4px",
                color: "#88888B",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "0px 2rem",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
            width: "96.5%",
          }}
        >
          <h1
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "155%",
              marginLeft: -55,
            }}
          >
            Tabla
          </h1>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "1.0rem",
                fontStyle: "normal",
                fontWeight: 300,
                marginLeft: -55,
                marginTop: -10,
              }}
            >
              Colaboradores
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: -15,
              }}
            >
              <div>
                <ExportToExcel datos={dataUsers} nombre={"Users"} />
              </div>
              <Button
                style={{ background: "#ED5079" }}
                onClick={toggleDrawer}
                className="colaboradores_button"
              >
                Nuevo colaborador
              </Button>
            </div>
          </div>
        </div>
        {/* Tabla */}
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            alignSelf: "stretch",
            marginLeft:'-55px',
            width:'100%'
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              // padding: "0px 0px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              width: "100%",
              marginTop: -30,
            }}
          >
            <TextInput
              className="colaboradores_button"
              value={searchValue}
              onChange={handleSearchChange}
              type="text"
              placeholder="Busca por cualquier campo "
              autoComplete="off"
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
                width: "100%",
                // paddingRight: "40px",
                margin: 0,
                borderRadius: "4px",
                color: "#88888B",
              }}
            />
          </div>
        </div>
        <section
          style={{
            marginLeft: -55,
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <br />
          <table className="table_responsive">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Cliente</th>
                <th scope="col">Path</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {!isLoading && (
              <>
                {filteredUsers.length > 0 ? (
                  <tbody>
                    {filteredUsers
                      // .slice(firstIndex, lastIndex)

                      .map((user, index) => (
                        <tr key={index}>
                          <td data-label="Nombre" title={user.name}>
                            {isLoading === true ? (
                              <>
                                <Skeleton height={20} radius="sm" width="90%" />
                              </>
                            ) : (
                              user.name
                            )}
                          </td>
                          <td data-label="Email" title={user.email}>
                            {isLoading == true ? (
                              <>
                                <Skeleton height={20} radius="sm" width="90%" />
                              </>
                            ) : (
                              user.email
                            )}
                          </td>
                          <td data-label="Customer" title={user.customer}>
                            {isLoading == true ? (
                              <>
                                <Skeleton height={20} radius="sm" width="90%" />
                              </>
                            ) : (
                              user.customer
                            )}
                          </td>
                          <td data-label="Nombre" title={String(user.name)}>
                            {isLoading == true ? (
                              <>
                                <Skeleton height={20} radius="sm" width="90%" />
                              </>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "left",
                                  alignItems: "center",
                                }}
                              >
                                {user.path && user.path.length != 0 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "1px 6px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      backgroundColor: "#868E96",
                                      borderRadius: "2px",
                                      color: "white",
                                    }}
                                  >
                                    {formatingPath(user.path)}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          <td data-label="Acciones">
                            {isLoading == true ? (
                              <>
                                <Skeleton height={20} radius="sm" width="90%" />
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px",
                                  }}
                                >
                                  <img
                                    src={"../../sampleData/edit.svg"}
                                    alt="Descripción de la imagen"
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      color: "#3E83FF",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      display: "flex",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      toggleDrawerEdit();
                                      setDataUsersEdit(user);
                                    }}
                                  />

                                  <img
                                    src={"../../sampleData/delete.svg"}
                                    alt="Descripción de la imagen"
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      deleteUserDrawer(user.id);
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    <DrawerNewUser
                      setIsAlertOpen={setIsAlertOpen}
                      setAlertStatus={setAlertStatus}
                      setIsDrawerOpen2={setIsDrawerOpen2}
                      openedDrawer={opened}
                      oncloseDrawer={toggleDrawer}
                      setOpenedDrawer={setOpened}
                    >
                      {""}
                    </DrawerNewUser>
                  </tbody>
                ) : isLoading == true ? (
                  <tbody>{isloadingData()}</tbody>
                ) : (
                  <div
                    style={{
                      width: "470%",
                      margin: "0 auto",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "18px",
                      padding: "20px",
                    }}
                  >
                    Sin información para mostrar.
                  </div>
                )}
              </>
            )}
          </table>
          <br />
          <PaginationComponent
            accion={setCurrentPage}
            totalDatos={totalData}
            datosPorPagina={datosPorPagina}
            numero={setNumero}
          />
        </section>
      </div>
      <DrawerNewUser
        setIsAlertOpen={setIsAlertOpen}
        setAlertStatus={setAlertStatus}
        setIsDrawerOpen2={setIsDrawerOpen2}
        openedDrawer={opened}
        oncloseDrawer={close}
        setOpenedDrawer={setOpened}
      >
        {""}
      </DrawerNewUser>
      {dataUsersEdit && (
        <DrawerUsers
          setIsAlertOpen={setIsAlertOpen}
          setAlertStatus={setAlertStatus}
          setUpdateOpen={setUpdateOpen}
          setUpdateStatus={setUpdateStatus}
          userData={dataUsersEdit}
          userDataClear={setDataUsersEdit}
          openedDrawerEdit={openedEdit}
          oncloseDrawerEdit={toggleDrawerEdit}
          setOpenedDrawerEdit={setOpenedEdit}
          deleteUserDrawer={deleteUserDrawer}
        ></DrawerUsers>
      )}
      {isUpdateOpen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 9999,
            marginLeft: "-width",
            marginTop: "-height",
          }}
        >
          <Alert
            title={
              updateStatus == true
                ? "Usuario actualizado"
                : "Usuario no actualizado"
            }
            onClose={closeAlert}
            closeButtonLabel="Cerrar"
            style={{
              backgroundColor: "#FFFF",
              borderColor: "#88888B",
              color: updateStatus == true ? "#6ea2ff" : "#ED5079",
            }}
          >
            {updateStatus == true
              ? "El usuario ha sido actualizado exitosamente."
              : "Error al actualizar el usuario"}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Button
                onClick={closeAlert}
                size="xs"
                style={{
                  marginLeft: 5,
                  backgroundColor: "#ED5079",
                  color: "white",
                }}
              >
                X
              </Button>
            </div>
          </Alert>
        </div>
      )}
      {isAlertOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Alert
            variant="light"
            color="gray"
            title="Usuario creado"
            className="custom-alert"
            style={{
              border: "1px solid #CED4DA",
              background: "#F8F9FA",
              borderRadius: "16px",
              width: "130%",
              position: "relative",
              padding: "1rem",
            }}
          >
            <button
              onClick={closeAlert}
              style={{
                position: "absolute",
                top: "0px",
                right: "5px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              &times;
            </button>{" "}
            <br />
            <div>
              <img
                src={"../../sampleData/user-check.svg"}
                alt="Descripción de la imagen"
                style={{ width: "30px", height: "25px" }}
              />
              <div style={{ color: "#2393F4" }}>Usuario creado</div>
            </div>
            <p></p>
          </Alert>
        </div>
      )}

      {isDelete == true && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "45%",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          className="alert-container"
        >
          <Alert
            variant="light"
            color="gray"
            title="Eliminar usuario"
            className="custom-alert"
            style={{
              border: "1px solid #CED4DA",
              background: "#F8F9FA",
              borderRadius: "16px",
              width: "110%",
              position: "relative",
              padding: "1rem",
            }}
          >
            <button
              onClick={() => setIsDelete(false)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              &times;
            </button>
            ¿Estás seguro de eliminar a este usuario?
            <br />
            <p></p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <div style={{ width: "100%" }}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "#FFF5F5",
                    color: "#FA5252",
                  }}
                  onClick={() => {
                    deleteUser();
                  }}
                >
                  Si, eliminar
                </Button>
              </div>
              <div style={{ width: "100%" }}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "#F1F3F5",
                    color: "#212529",
                  }}
                  variant="filled"
                  onClick={() => {
                    setIsDelete(false);
                  }}
                >
                  No, cancelar
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      )}
      {isDeleteAlertOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "45%",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Alert
            variant="light"
            color="gray"
            title="Eliminar usuario"
            className="custom-alert"
            style={{
              border: "1px solid #CED4DA",
              background: "#F8F9FA",
              borderRadius: "16px",
              width: "130%",
              position: "relative",
              padding: "1rem",
            }}
          >
            <button
              onClick={() => setIsDeleteAlertOpen(false)}
              style={{
                position: "absolute",
                top: "0px",
                right: "5px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                outline: "none",
              }}
            >
              &times;
            </button>{" "}
            <br />
            <div>
              <img
                src={"../../sampleData/deluser.svg"}
                alt="Descripción de la imagen"
                style={{ width: "30px", height: "25px" }}
              />
              <div style={{ color: "#FA5252" }}>Usuario eliminado</div>
            </div>
            <p></p>
          </Alert>
        </div>
      )}
    </div>
  );
}
