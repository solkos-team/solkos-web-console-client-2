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

export default function Users() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 5);
  };

  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);

  const openDrawer2 = () => {
    setIsDrawerOpen2(true);
  };

  const closeDrawer2 = () => {
    setTimeout(() => {
      setIsDrawerOpen2(false);
    }, 5);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div>
      <PageFilter />
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
                <ExportToExcel datos={""} nombre={"Users"} />
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
                    value={""}
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
                  <TableBody
                    style={{
                      display: "block",
                      height: "450px",
                      minWidth: "900px",
                      overflowY: "auto",
                    }}
                  >
                    <TableCell
                      style={{
                        paddingRight: "30px",
                        fontSize: "15px",
                        textAlign: "left",
                        width: "150px",
                      }}
                    >
                      Mayra Barrón
                    </TableCell>
                    <TableCell
                      style={{
                        paddingRight: "30px",
                        fontSize: "15px",
                        textAlign: "left",
                        width: "150px",
                      }}
                    >
                      mayrabarron91@gmail.com
                    </TableCell>
                    <TableCell
                      style={{
                        paddingLeft: "39px",
                        fontSize: "15px",
                        width: "180px",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "2px",
                          background: "#FCCFD9",
                          width: 50,
                        }}
                      >
                        <div
                          style={{
                            color: "#ED5079",
                            // fontFamily: "Space Mono",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "14px",
                          }}
                        >
                          IMBERA
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      style={{
                        paddingRight: "50px",
                        fontSize: "15px",
                        width: "180px",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "8px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "4px",
                          borderRadius: "2px",
                          background: "#D4DAE3",
                          width: 50,
                        }}
                      >
                        <div
                          style={{
                            color: "#313A49",
                            // fontFamily: "Space Mono",
                            fontSize: "12px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "14px",
                          }}
                        >
                          CLIENTE
                        </div>
                      </div>
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
                      <DrawerUsers isOpen={isDrawerOpen} onClose={closeDrawer}>
                        {""}
                      </DrawerUsers>
                    </TableCell>
                    <DrawerNewUser
                      isOpen={isDrawerOpen2}
                      onClose={closeDrawer2}
                    >
                      {""}
                    </DrawerNewUser>
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
