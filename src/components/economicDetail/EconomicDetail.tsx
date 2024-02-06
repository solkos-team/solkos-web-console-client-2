import React, { useState, useEffect } from "react";
import { BarChart, Card, Title, LineChart } from "@tremor/react";
import { IconArrowDownRight, IconArrowRight } from "@tabler/icons-react";
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

  // *************
  const chartData = [
    { name: "Category A", value: 10 },
    { name: "Category B", value: 20 },
    // ... otros datos
  ];
  // data de ejemplo para grafica
  const chartdata4 = [
    {
      date: "Jan 23",
      Running: 167,
    },
    {
      date: "Feb 23",
      Running: 125,
    },
    {
      date: "Mar 23",
      Running: 156,
    },
    {
      date: "Apr 23",
      Running: 165,
    },
    {
      date: "May 23",
      Running: 153,
    },
    {
      date: "Jun 23",
      Running: 124,
    },
    {
      date: "Jul 23",
      Running: 164,
    },
    {
      date: "Aug 23",
      Running: 123,
    },
    {
      date: "Sep 23",
      Running: 132,
    },
  ];

  const valueFormatter = (number) => {
    const formattedValue = `$ ${new Intl.NumberFormat("us")
      .format(number)
      .toString()}`;
    return formattedValue;
  };

  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);

  const handleClick = () => {
    setMostrarVentanaEmergente(true);
  };

  const handleCloseVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "16px 0px",
          flexDirection: "column",
          // alignItems: "flex-start",
          gap: "16px",
          // alignSelf: "stretch",
          // width : "138vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
            width: "100%",
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
              width: "100%",
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
                  maxWidth: "400px",
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
                  {coolersData?.properties?.total_ownership_expense?.value ==
                  undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_ownership_expense.value.toLocaleString()}`}
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
                    marginRight: 40,
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
                    marginRight: 75,
                  }}
                >
                  {coolersData?.properties?.sale_price?.value == undefined
                    ? "Sin registro"
                    : "$" + `${coolersData?.properties?.sale_price.value}`}
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
                  {coolersData?.properties?.total_expense_service.value ==
                  undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_expense_service.value.toLocaleString()}`}
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
              width: "100%",
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
                    {coolersData?.properties?.present_value_of_depreciation
                      .value == undefined
                      ? "Sin registro"
                      : "$" +
                        `${coolersData?.properties?.present_value_of_depreciation.value.toLocaleString()}`}
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
                    {coolersData?.properties?.annual_decrement.value ==
                    undefined
                      ? "Sin registro"
                      : "$" +
                        `${coolersData?.properties?.annual_decrement.value.toLocaleString()}`}
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
                  {coolersData?.properties?.year_of_production.value ==
                  undefined
                    ? "Sin registro"
                    : `${coolersData?.properties?.year_of_production.value}`}
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
                  {coolersData?.cooler?.customer === "KOF"
                    ? "10 años"
                    : "5 años"}
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
              {/* <div
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
              </div> */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "4px",
                    alignSelf: "stretch",
                  }}
                  onClick={handleClick}
                >
                  <div
                    style={{
                      color: "#3E83FF",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      cursor: "pointer",
                    }}
                  >
                    Ver detalles de depreciación
                  </div>
                  <IconArrowRight
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#3E83FF",
                      cursor: "pointer",
                    }}
                  />
                </div>

                {mostrarVentanaEmergente && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "500px", // Ajusta el ancho deseado aquí
                      marginLeft: -340,
                      // margin: "0 auto", // Centra horizontalmente
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        padding: "32px",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "16px",
                        borderRadius: "8px",
                        border: "1px solid #88888B",
                        // zIndex: 999, // Ajusta este valor según sea necesario para superponer correctamente
                        background: "#FFF",
                        width: "500px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "stretch",
                        }}
                      >
                        <div
                          style={{
                            color: "#3A3A3F",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                          }}
                        >
                          Tabulación de la depreciación anual
                        </div>
                        <img
                          src={"../../sampleData/x.png"}
                          alt="cooler"
                          style={{ cursor: "pointer" }}
                          onClick={handleCloseVentanaEmergente}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "8px",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          borderRadius: "4px",
                          border: "1px solid #CACACA",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 0px",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                          }}
                        >
                          <div
                            style={{
                              color: "#3A3A3F",
                              // fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Año
                          </div>
                          <div
                            style={{
                              color: "#3A3A3F",
                              // fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Precio
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "8px 0px",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            alignSelf: "stretch",
                            borderBottom: "1px solid #CACACA",
                          }}
                        >
                          <div
                            style={{
                              color: "#88888B",
                              // fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Sin registro
                          </div>
                          <div
                            style={{
                              color: "#3A3A3F",
                              textAlign: "right",
                              // fontFamily: "DM Sans",
                              fontSize: "14px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            Sin registro
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
            // alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid #88888B",
            width: "95%",
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
                {coolersData?.properties?.total_expense_service.value ==
                undefined
                  ? "Sin registro"
                  : `${coolersData?.properties?.total_expense_service.value}`}
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
                (+ $
                {coolersData?.properties?.annual_decrement.value == undefined
                  ? "Sin registro"
                  : `${coolersData?.properties?.annual_decrement.value.toLocaleString()}`}
                )
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
                $0
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
                  <div style={{ width: "100%", height: "100px" }}>
                    <div style={{ marginLeft: 400 }}>Sin registros</div>
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="second" pt="xs">
                  <div style={{ width: "100%", height: "100px" }}>
                    <div style={{ marginLeft: 400 }}>Sin registros</div>
                  </div>
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
              width: "45%",
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
                // alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #CACACA",
                background: "#F4F4F4",
                width: 350,
              }}
            >
              {/* ORDEN */}
              <div>
                {coolersData?.service_orders === null ||
                coolersData?.service_orders.length === 0 ? (
                  <>
                    <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                      Sin ordenes de movimiento
                    </p>
                  </>
                ) : (
                  coolersData?.service_orders && (
                    <div>
                      {coolersData.service_orders
                        .filter(
                          (order) =>
                            order.service_id === "1003" &&
                            order.status === "D,D"
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
                                  width: "100%",
                                  backgroundColor: "#FFF",
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
                                    {order.id === ""
                                      ? "Sin registro"
                                      : order.id}
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
                      {/* {coolersData.service_orders.filter(
                          (order) =>
                            order.service_id === "1003" &&
                            order.status === "D,D"
                        ).length === 0 && (
                          <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                            Sin órdenes de movimiento
                          </p>
                        )} */}
                    </div>
                  )
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
              width: "45%",
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
                {coolersData?.service_orders === null ||
                coolersData?.service_orders.length === 0 ? (
                  <>
                    <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                      Sin ordenes de servicio
                    </p>
                  </>
                ) : (
                  coolersData?.service_orders && (
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
                                  width: "90%",
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
                                    {order.id === ""
                                      ? "Sin registro"
                                      : order.id}
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
                      {/* {coolersData.service_orders.filter(
                        (order) =>
                          order.service_id === "1001" ||
                          order.service_id === "1002" ||
                          (order.service_id === "1005" &&
                            order.status === "D,D")
                      ).length === 0 && (
                        <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                          Sin órdenes de servicio
                        </p>
                      )} */}
                    </div>
                  )
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
