import React, { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { IconArrowDownRight } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Tabs } from "@mantine/core";
import { Drawer } from "@mantine/core";
import { BarChart } from "@tremor/react";
import Plot from "react-plotly.js";

export default function DrawerInversion({ opened, onClose, coolersData }) {
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);
  const handleClick = () => {
    setMostrarVentanaEmergente(true);
  };
  const handleCloseVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
  };

  // Gráfica de barras
  const chartdata = [
    {
      name: "2023",
      "Gasto real": 2488,
    },
    {
      name: "2024",
      "Gasto real": 1445,
    },
  ];

  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Desglose económico"
      position="bottom"
      size="95%"
    >
      <section className="clt_detail_drawer_energy">
        <section className="clt_detail_drawer_economic_data">
          {/* Inversion total */}
          <div
            style={{
              display: "flex",
              padding: "14px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              flex: 100,
              alignSelf: "stretch",
              borderRadius: '8px',
              border: '1px solid var(--gray-4, #CED4DA)',
              background: 'var(--gray-0, #F8F9FA)',
              width: "60%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={"../../sampleData/commerce.png"}
                    alt="cooler"
                    style={{ width: "15px", height: "15px" }}
                  ></img>
                  <div
                    style={{
                      color: "#3A3A3F",
                      // fontFamily: "DM Sans",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      marginLeft: 5,
                    }}
                  >
                    Inversión total en el enfriador
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "justify",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "1rem",
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
                    fontSize: "1.625rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.total_ownership_expense?.value ===
                  undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_ownership_expense.value.toLocaleString(
                        "es-MX"
                      )}`}
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".9vw",
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: ".05vw",
                  background: "#CACACA",
                }}
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
                  padding: "0px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".9vw",
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
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    marginRight: 75,
                  }}
                >
                  {coolersData?.properties?.sale_price?.value === undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.sale_price.value.toLocaleString(
                        "es-MX"
                      )}`}
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
                    fontSize: ".9vw",
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
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.total_expense_service.value ===
                  undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_expense_service.value.toLocaleString(
                        "es-MX"
                      )}`}
                </div>
              </div>
            </div>
          </div>
          {/* Depreciacion anual */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              flex: 100,
              alignSelf: "stretch",
              borderRadius: '8px',
              border: '1px solid var(--gray-4, #CED4DA)',
              background: 'var(--gray-0, #F8F9FA)',
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={"../../sampleData/commerce.png"}
                    alt="cooler"
                    style={{ width: "15px", height: "15px" }}
                  ></img>
                  <div
                    style={{
                      color: "#3A3A3F",
                      // fontFamily: "DM Sans",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      marginLeft: 5,
                    }}
                  >
                    Depreciación Anual
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "justify",
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "1rem",
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
                      fontSize: "1.625rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    {coolersData?.properties?.present_value_of_depreciation
                      .value === undefined
                      ? "Sin registro"
                      : "$" +
                        `${coolersData?.properties?.present_value_of_depreciation.value.toLocaleString(
                          "es-MX"
                        )}`}
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "0.875rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    Valor actual de depreciación
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
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
                        width: "10px",
                        height: "10px",
                      }}
                    >
                      <IconArrowDownRight
                        style={{
                          color: "#F93448",
                          width: "1vw",
                          height: "10px",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#F93448",
                      // fontFamily: "DM Sans",
                      fontSize: "1vw",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                    }}
                  >
                    {coolersData?.properties?.annual_decrement.value ===
                    undefined
                      ? "Sin registro"
                      : "$" +
                        `${coolersData?.properties?.annual_decrement.value.toLocaleString(
                          "es-MX"
                        )}`}
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Sans",
                      fontSize: "0.875rem",
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
                  // justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  marginBottom: "-18px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "0.05vw",
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
                  // padding: "8px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "0.875rem",
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
                    fontSize: "1.375rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.year_of_production.value ===
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
                    fontSize: "0.875rem",
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
                    fontSize: "1.375rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {/* {coolersData?.cooler?.customer === "KOF"
                        ?  */}
                  10 años
                  {/*  : "5 años"} */}
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
                marginTop: "-45px",
              }}
            >
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
                      fontSize: ".9vw",
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
                      width: "12px",
                      height: "12px",
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
                      width: "400px",
                      marginLeft: -340,
                      marginTop: 90,
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
                        background: "#FFF",
                        width: "300px",
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
                            fontSize: "12px",
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
                              fontSize: "12px",
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
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "20px",
                            }}
                          >
                            Precio
                          </div>
                        </div>
                        {coolersData?.properties?.sale_price?.value !==
                          undefined &&
                        coolersData?.properties?.year_of_production?.value !==
                          undefined ? (
                          Array.from({ length: 10 }, (_, i) => i).map(
                            (_, index) => {
                              const year =
                                coolersData.properties.year_of_production
                                  .value + index;
                              const adjustedPrice =
                                coolersData.properties.sale_price.value -
                                index *
                                  coolersData.properties.annual_decrement.value;
                              return (
                                <div
                                  key={index}
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
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    {year}
                                  </div>
                                  <div
                                    style={{
                                      color: "#3A3A3F",
                                      textAlign: "right",
                                      // fontFamily: "DM Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "20px",
                                    }}
                                  >
                                    ${adjustedPrice.toLocaleString("es-MX")}
                                  </div>
                                </div>
                              );
                            }
                          )
                        ) : (
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
                                fontSize: "12px",
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
                                fontSize: "12px",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "20px",
                              }}
                            >
                              Sin registro
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="clt_detail_drawer_energy_grap">
          {/* Costo acumulado por servicio */}
          <div
            style={{
              display: "flex",
              padding: "14px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
              borderRadius: '8px',
              border: '1px solid var(--gray-4, #CED4DA)',
              background: 'var(--gray-0, #F8F9FA)',
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={"../../sampleData/commerce2.png"}
                    alt="cooler"
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "5px",
                    }} // Agregamos margen derecho para separar el icono del texto
                  />
                  <div
                    style={{
                      color: "#3A3A3F",
                      // fontFamily: "DM Sans",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Costo acumulado por servicio
                  </div>
                </div>

                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "1rem",
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
                    fontSize: "1.625rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.properties?.total_expense_service.value ===
                  undefined
                    ? "Sin registro"
                    : `${coolersData?.properties?.total_expense_service.value.toLocaleString(
                        "es-MX"
                      )}`}
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "0.875rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Gasto total por servicio
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
                      width: "10px",
                      height: "10px",
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
                    fontSize: "1rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "14px",
                  }}
                >
                  (+ $
                  {coolersData?.properties?.annual_decrement.value === undefined
                    ? "Sin registro"
                    : `${coolersData?.properties?.annual_decrement.value.toLocaleString(
                        "es-MX"
                      )}`}
                  )
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "14px",
                  }}
                >
                  {coolersData?.properties?.total_expense_service_last_year
                    .value === undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.total_expense_service_last_year.value.toLocaleString(
                        "es-MX"
                      )}`}
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "0.875rem",
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
                style={{ width: "100%", marginLeft: 60 }}
              >
                <Tabs.List>
                  <Tabs.Tab value="first" style={{ fontSize: "0.75rem" }}>
                    Gráfica del acumulado
                  </Tabs.Tab>
                  <Tabs.Tab value="second" style={{ fontSize: "0.75rem" }}>
                    Gráfica por año
                  </Tabs.Tab>
                </Tabs.List>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tabs.Panel value="first">
                    <div
                      style={{
                        width: "900px",
                        height: "130px",
                        // background: "red",
                      }}
                    >
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Sans",
                          fontSize: "1vw",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          marginTop: 30,
                          marginLeft: 500,
                        }}
                      >
                        Sin información para mostrar
                      </div>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="second">
                    {/* <div
                      style={{
                        width: "900px",
                        height: "130px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Plot
                        data={[
                          {
                            x: coolersData?.yearly_invoice?.años.map(
                              (año) => año
                            ),
                            y: coolersData?.yearly_invoice?.total.map(
                              (total) => total
                            ),
                            type: "bar",
                            mode: "markers",
                            name: "Gasto real",
                            marker: {
                              color: "#FFC7CD",
                              line: {
                                color: " #ec547c ",
                                width: 1,
                              },
                            },
                          },
                        ]}
                        layout={{
                          paper_bgcolor: "rgba(0,0,0,0)",
                          plot_bgcolor: "rgba(0,0,0,0)",
                          width: 600,
                          height: 200,
                          margin: {
                            t: 10,
                            l: 50,
                            r: 10,
                            b: 40,
                          },
                          xaxis: {
                            tickvals: coolersData?.yearly_invoice?.años.map(
                              (año) => año
                            ),
                            ticktext: coolersData?.yearly_invoice?.años.map(
                              (año) => año
                            ),
                          },
                        }}
                      />
                    </div> */}
                    <div
                      style={{
                        width: "900px",
                        height: "130px",
                        // background: "red",
                      }}
                    >
                      <div
                        style={{
                          color: "#88888B",
                          // fontFamily: "DM Sans",
                          fontSize: "1vw",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          marginTop: 30,
                          marginLeft: 500,
                        }}
                      >
                        Sin información para mostrar
                      </div>
                    </div>
                  </Tabs.Panel>
                </div>
              </Tabs>
            </div>
          </div>
        </section>
      </section>
    </Drawer>
  );
}
