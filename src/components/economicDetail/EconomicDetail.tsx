import React, { useState, useEffect } from "react";
import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";
import { IconArrowDownRight, IconArrowRight } from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { Tabs } from "@mantine/core";

const EconomicDetail = ({ coolersData }) => {
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "16px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          {/* Inversion total */}
          <div
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flex: 100,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #88888B",
            }}
          >
            <div
              style={{
                display: "flex",
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
                  gap: "4px",
                  alignSelf: "stretch",
                }}
              >
                <img src={"../../sampleData/commerce.png"} alt="cooler"></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Inversión total en el enfriador
                </div>
                <div
                  style={{
                    textAlign: "justify",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Es la suma del precio factura y los gastos en servicios
                  asociados. Incluye todos los gastos incurridos desde su compra
                  hasta la fecha actual.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  minWidth: "160px",
                  maxWidth: "500px",
                  alignItems: "flex-end",
                  alignContent: "flex-end",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $----
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Gasto total de propiedad
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "0px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{ width: "100%", height: "1px", background: "#CACACA" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flex: 100,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Precio de venta
                </div>
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $------
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  // width: "168px",
                  padding: "8px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Gastos en servicios
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  $-----
                </div>
              </div>
            </div>
          </div>
          {/* Depreciacion anual */}
          <div
            style={{
              display: "flex",
              padding: "14px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flex: 100,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #88888B",
              width: "700px",
            }}
          >
            <div
              style={{
                display: "flex",
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
                  gap: "4px",
                  alignSelf: "stretch",
                }}
              >
                <img src={"../../sampleData/commerce.png"} alt="cooler"></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Depreciación Anual
                </div>
                <div
                  style={{
                    textAlign: "justify",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Valor del enfriador a lo largo del tiempo.
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      color: "#000005",
                      // fontFamily: "DM Sans",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    $-----
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "28px",
                    }}
                  >
                    Valor actual de depreciación
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "8px",
                        background: "#FFC7CD",
                      }}
                    >
                      <IconArrowDownRight
                        style={{
                          color: "#F93448",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#F93448",
                      // fontFamily: "DM Sans",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                    }}
                  >
                    $-----
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                    }}
                  >
                    Decremento anual
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "0px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "0.5px",
                    background: "#CACACA",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Año de fabricación
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  -----
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Depreciación lineal
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.cooler?.customer === "HEINEKEN"
                    ? "5 años"
                    : "10 años"}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                Ver detalles de depreciación
              </div>
              <IconArrowRight
                style={{ width: "16px", height: "16px", color: "#3E83FF" }}
              />
            </div>
          </div>
        </div>
        {/* Costo acumulado por servicio */}
        <div
          style={{
            display: "flex",
            padding: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid #88888B",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <img
                src={"../../sampleData/commerce2.png"}
                alt="cooler"
                style={{ width: "24px", height: "24px" }}
              ></img>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Costo acumulado por servicio
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Muestra la acumulación de los gastos generados en cada año por
                concepto de servicio
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                alignContent: "flex-end",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "DM Sans",
                  fontSize: "24px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                $-----
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "28px",
                }}
              >
                Gasto total por servicio
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "8px",
                    background: "#FFC7CD",
                  }}
                >
                  <IconArrowDownRight
                    style={{
                      color: "#F93448",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  color: "#F93448",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                (+ $-----)
              </div>
              <div
                style={{
                  color: "#000005",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                $0.00
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                }}
              >
                Gasto del año en curso
              </div>
            </div>
          </div>
          <div>
            <Tabs
              color="teal"
              defaultValue="first"
              style={{ width: "100%", marginTop: "16px" }}
            >
              <Tabs.List>
                <Tabs.Tab value="first">Gráfica del acumulado</Tabs.Tab>
                <Tabs.Tab value="second">Gráfica por año</Tabs.Tab>
              </Tabs.List>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                }}
              >
                <Tabs.Panel value="first" pt="xs">
                  <div></div>
                </Tabs.Panel>

                <Tabs.Panel value="second" pt="xs">
                  <div></div>
                </Tabs.Panel>
              </div>
            </Tabs>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
          }}
        >
          {/* Movimientos */}
          <div
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <img src={"../../sampleData/commerce.png"} alt="cooler"></img>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Movimientos
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "16px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #CACACA",
                background: "#F4F4F4",
              }}
            >
              {/* ORDEN */}
              <div>
                {coolersData?.service_orders && (
                  <div>
                    {coolersData.service_orders
                      .filter(
                        (order) =>
                          order.service_id === "1003" && order.status === "D,D"
                      )
                      .map((order) => (
                        <>
                          <div key={order.id}>
                            <div
                              style={{
                                display: "flex",
                                padding: "16px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                alignSelf: "stretch",
                                borderRadius: "5px",
                                background: "#FFF",
                                boxShadow:
                                  "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
                                width: "400px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    flex: 100,
                                    color: "#000005",
                                    // fontFamily: "DM Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "normal",
                                    textAlign: "left",
                                  }}
                                >
                                  Orden{" "}
                                  {order.id === "" ? "Sin registro" : order.id}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "2px",
                                    background: "#D4DAE3",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#313A49",
                                      // fontFamily: "Space Mono",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "10px",
                                    }}
                                  >
                                    CERRADA
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  flex: 100,
                                  color: "#000005",
                                  // fontFamily: "DM Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "normal",
                                }}
                              >
                                $-----
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#3E83FF",
                                    // fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "normal",
                                  }}
                                >
                                  {order.created_at === ""
                                    ? "Sin registro"
                                    : formatCreatedAt(order.created_at)}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "#88888B",
                                  // fontFamily: "Inter",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "normal",
                                  textAlign: "left",
                                }}
                              >
                                {order.description === ""
                                  ? "Sin registro"
                                  : order.description}
                              </div>
                            </div>
                          </div>
                          <br></br>
                        </>
                      ))}
                    {coolersData.service_orders.filter(
                      (order) =>
                        order.service_id === "1003" && order.status === "D,D"
                    ).length === 0 && (
                      <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                        Sin órdenes de movimiento
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------- */}
          {/* ------------------------------------------------------- */}

          {/* Ordenes de servicios */}
          <div
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <img src={"../../sampleData/commerce.png"} alt="cooler"></img>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Ordenes de servicio
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "16px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #CACACA",
                background: "#F4F4F4",
              }}
            >
              {/* ORDEN */}
              <div>
                {coolersData?.service_orders && (
                  <div>
                    {coolersData.service_orders
                      .filter(
                        (order) =>
                          order.service_id === "1001" ||
                          order.service_id === "1002" ||
                          (order.service_id === "1005" &&
                            order.status === "D,D")
                      )
                      .map((order) => (
                        <>
                          <div key={order.id}>
                            <div
                              style={{
                                display: "flex",
                                padding: "16px",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                                alignSelf: "stretch",
                                borderRadius: "5px",
                                background: "#FFF",
                                boxShadow:
                                  "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
                                width: "400px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    flex: 100,
                                    color: "#000005",
                                    // fontFamily: "DM Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "normal",
                                    textAlign: "left",
                                  }}
                                >
                                  Orden{" "}
                                  {order.id === "" ? "Sin registro" : order.id}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "4px",
                                    borderRadius: "2px",
                                    background: "#D4DAE3",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#313A49",
                                      // fontFamily: "Space Mono",
                                      fontSize: "10px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "10px",
                                    }}
                                  >
                                    CERRADA
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  flex: 100,
                                  color: "#000005",
                                  // fontFamily: "DM Sans",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  lineHeight: "normal",
                                }}
                              >
                                $-----
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  alignSelf: "stretch",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#3E83FF",
                                    // fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "normal",
                                  }}
                                >
                                  {order.created_at === ""
                                    ? "Sin registro"
                                    : formatCreatedAt(order.created_at)}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "#88888B",
                                  // fontFamily: "Inter",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  lineHeight: "normal",
                                  textAlign: "left",
                                }}
                              >
                                {order.description === ""
                                  ? "Sin registro"
                                  : order.description}
                              </div>
                            </div>
                          </div>
                          <br></br>
                        </>
                      ))}
                    {coolersData.service_orders.filter(
                      (order) =>
                        order.service_id === "1001" ||
                        order.service_id === "1002" ||
                        (order.service_id === "1005" && order.status === "D,D")
                    ).length === 0 && (
                      <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                        Sin órdenes de servicio
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EconomicDetail;
