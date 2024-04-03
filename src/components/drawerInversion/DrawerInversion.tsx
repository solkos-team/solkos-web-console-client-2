import React, { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { IconArrowDownRight } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Tabs } from "@mantine/core";
import { Drawer } from "@mantine/core";

export default function DrawerInversion({ opened, onClose, coolersData }) {
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);
  const handleClick = () => {
    setMostrarVentanaEmergente(true);
  };
  const handleCloseVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
  };

  // datos grafica lineal
  const chartdata = [
    {
      year: 1970,
      "Export Growth Rate": 2.04,
      "Import Growth Rate": 1.53,
    },
    {
      year: 1971,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.58,
    },
    {
      year: 1972,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1973,
      "Export Growth Rate": 1.93,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1974,
      "Export Growth Rate": 1.88,
      "Import Growth Rate": 1.67,
    },
    //...
  ];
  // datos grafica de barras
  const chartdata3 = [
    {
      date: "Jan 23",
      "2022": 45,
      "2023": 78,
    },
    {
      date: "Feb 23",
      "2022": 52,
      "2023": 71,
    },
    {
      date: "Mar 23",
      "2022": 48,
      "2023": 80,
    },
    {
      date: "Apr 23",
      "2022": 61,
      "2023": 65,
    },
    {
      date: "May 23",
      "2022": 55,
      "2023": 58,
    },
    {
      date: "Jun 23",
      "2022": 67,
      "2023": 62,
    },
    {
      date: "Jul 23",
      "2022": 60,
      "2023": 54,
    },
    {
      date: "Aug 23",
      "2022": 72,
      "2023": 49,
    },
    {
      date: "Sep 23",
      "2022": 65,
      "2023": 52,
    },
    {
      date: "Oct 23",
      "2022": 68,
      "2023": null,
    },
    {
      date: "Nov 23",
      "2022": 74,
      "2023": null,
    },
    {
      date: "Dec 23",
      "2022": 71,
      "2023": null,
    },
  ];

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
              borderRadius: "8px",
              border: "1px solid #88888B",
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
                <img
                  src={"../../sampleData/commerce.png"}
                  alt="cooler"
                  style={{ width: "15px", height: "15px" }}
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "1vw",
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
                    fontSize: "0.7vw",
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
                    fontSize: "1.2vw",
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
                    fontSize: "1.2vw",
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
                    fontSize: "1.2vw",
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
              borderRadius: "8px",
              border: "1px solid #88888B",
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
                <img
                  src={"../../sampleData/commerce.png"}
                  alt="cooler"
                  style={{ width: "15px", height: "15px" }}
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "1vw",
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
                    fontSize: ".9vw",
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
                      fontSize: "1.2vw",
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
                      fontSize: ".9vw",
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
                      fontSize: ".9vw",
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
                    fontSize: "0.9vw",
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
                    fontSize: "1.2vw",
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
                    fontSize: ".9vw",
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
                    fontSize: "1.2vw",
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
              borderRadius: "8px",
              border: "1px solid #88888B",
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
                <img
                  src={"../../sampleData/commerce2.png"}
                  alt="cooler"
                  style={{ width: "15px", height: "15px" }}
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "1vw",
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
                    fontSize: ".7vw",
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
                    fontSize: "1.2vw",
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
                    fontSize: ".7vw",
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
                    fontSize: "0.9vw",
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
                    fontSize: "0.9vw",
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
                    fontSize: ".9vw",
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
                  <Tabs.Tab value="first" style={{ fontSize: ".9vw" }}>
                    Gráfica del acumulado
                  </Tabs.Tab>
                  <Tabs.Tab value="second" style={{ fontSize: ".9vw" }}>
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
                    ></div>
                  </Tabs.Panel>

                  <Tabs.Panel value="second">
                    <div
                      style={{
                        width: "900px",
                        height: "130px",
                        // background: "red",
                      }}
                    ></div>
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
