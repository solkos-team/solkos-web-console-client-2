import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { ExportToExcel } from "../../../components/exportExcel/ExportToExcel";
import { Button, TextInput } from "@mantine/core";
import DrawerUsers from "../../../components/drawerUsers/DrawerUsers";
import DrawerNewUser from "../../../components/drawerNewUser/DrawerNewUser";
import { IconArrowRight } from "@tabler/icons-react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { fetchUniversal } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import { UsersInterfaces } from "./UsersInterfaces";
import { PaginationComponent } from "../../../components/Pagination/PaginationComponent";
import { SkeletonTableUsers } from "../../../components/skeletonTableUsers/SkeletonTableUsers";

export default function Users() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataUsers, setDataUsers] = useState<UsersInterfaces[]>([]);
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const [isLoading, setIsLoading] = useState(true);

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
    data === null || data === undefined ? [] : data.map((user) => ({
      Nombre: user.name,
      Email: user.email,
      Cliente: user.customer,
      Path: user.path.toString()
    }));
  };
  const filteredUsers = dataUsers ? filterCoolers(dataUsers, searchValue) : [];
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 5);
  };

  const openDrawer2 = () => {
    setIsDrawerOpen2(true);
  };

  const closeDrawer2 = () => {
    setTimeout(() => {
      setIsDrawerOpen2(false);
    }, 5);
  };
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = {
    customer: dto,
    page_number: 1,
    page_size: 10,
    path: pathVerify(),
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("users", body, setIsLoading);
      setDataUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleReloadUsers = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dt, dto, isDrawerOpen2, currentPage, datosPorPagina]);
  return (
    <div>
      <PageFilter loading={isLoading} />
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
          }}
        >
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "155%",
              marginLeft: -55,
            }}
          >
            Colaboradores
          </div>
          <div
            style={{
              color: "#88888B",
              // fontFamily: "DM Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
              marginLeft: -55,
            }}
          >
            Catálogo de los colaboradores
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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "155%",
                marginLeft: -55,
              }}
            >
              TABLA
            </div>
            <div
              style={{
                display: "flex",
                width: "800%",
                marginLeft: -55,
                gap: "10px",
              }}
            >
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "DM Sans",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "155%",
                }}
              >
                Colaboradores
              </div>
              <div style={{ marginLeft: 480 }}>
                <ExportToExcel
                  datos={filterUsersDataDownload(dataUsers)}
                  nombre={"Users"}
                />
              </div>
              <Button style={{ background: "#ED5079" }} onClick={openDrawer2}>
                Nuevo colaborador
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "32px 0px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: 100,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <TextInput
                    value={searchValue}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Busca por cualquier campo "
                    style={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "28px",
                      width: "850px",
                      paddingRight: "40px",
                      margin: 0,
                      borderRadius: "4px",
                      color: "#88888B",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <div style={{}}>
              <Card>
                <Table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    maxWidth: "1000px",
                    // width: "910px",
                    height: "400px",
                  }}
                >
                  <TableHead style={{ display: "block" }}>
                    <TableRow>
                      <TableHeaderCell
                        style={{
                          textAlign: "left",
                          width: "145px",
                        }}
                      >
                        Nombre
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{ textAlign: "left", width: "235px" }}
                      >
                        Correo
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          textAlign: "left",
                          width: "130px",
                        }}
                      >
                        Cliente
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          textAlign: "left",
                          width: "170px",
                        }}
                      >
                        Path
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{ textAlign: "left", width: "150px" }}
                      >
                        Acciones
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  {isLoading == true ? (
                    <>
                      <br></br>
                      <br></br>
                      <div style={{ marginBottom: -40 }}></div>
                      <SkeletonTableUsers></SkeletonTableUsers>
                    </>
                  ) : (
                    ""
                  )}
                  {!isLoading && (
                    <>
                      {filteredUsers.length > 0 ? (
                        <TableBody
                          style={{
                            display: "block",
                            height: "100%",
                            minWidth: "900px",
                            overflowY: "auto",
                          }}
                        >
                          {filteredUsers
                            .slice(firstIndex, lastIndex)
                            .map((user, index) => (
                              <TableRow
                                key={index}
                                style={{ userSelect: "none" }}
                              >
                                <TableCell
                                  style={{
                                    paddingRight: "30px",
                                    fontSize: "15px",
                                    textAlign: "left",
                                    width: "8rem",
                                  }}
                                >
                                  {user.name}
                                </TableCell>
                                <TableCell
                                  style={{
                                    paddingRight: "30px",
                                    fontSize: "15px",
                                    textAlign: "left",
                                    width: "8rem",
                                  }}
                                >
                                  {user.email}
                                </TableCell>
                                <TableCell
                                  style={{
                                    paddingLeft: "2.5rem",
                                    fontSize: "15px",
                                    textAlign: "left",
                                    width: "150px",
                                  }}
                                >
                                  {user.customer}
                                </TableCell>
                                <TableCell
                                  style={{
                                    paddingRight: "30px",
                                    fontSize: "15px",
                                    textAlign: "left",
                                    width: "150px",
                                  }}
                                >
                                  {user.path}
                                </TableCell>
                                <TableCell
                                  style={{
                                    paddingRight: "50px",
                                    fontSize: "15px",
                                    width: "180px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                  }}
                                  onClick={openDrawer}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      alignItems: "center",
                                      gap: "4px",
                                      flex: 100,
                                      height: "40px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#3E83FF",
                                        fontSize: "14px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "20px",
                                        display: "flex",
                                        marginRight: "90px",
                                      }}
                                    >
                                      Ver más{" "}
                                      <IconArrowRight
                                        style={{
                                          color: "#3E83FF",
                                          width: "1.0rem",
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <DrawerUsers
                                    isOpen={isDrawerOpen}
                                    onClose={closeDrawer}
                                  ></DrawerUsers>
                                </TableCell>
                              </TableRow>
                            ))}
                          <DrawerNewUser
                            isOpen={isDrawerOpen2}
                            onClose={closeDrawer2}
                            reloadUsers={handleReloadUsers}
                          >
                            {""}
                          </DrawerNewUser>
                        </TableBody>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 250,
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          <p>No hay datos de coolers disponibles.</p>
                        </div>
                      )}
                    </>
                  )}
                </Table>
                <PaginationComponent
                  accion={setCurrentPage}
                  totalDatos={dataUsers === null ? 0 : dataUsers.length}
                  datosPorPagina={datosPorPagina}
                  numero={setNumero}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
