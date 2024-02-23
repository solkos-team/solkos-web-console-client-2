import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { IconArrowDownRight } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import MapComponentPv from "../mapPv/MapPv";
import { Table } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { Drawer, Button } from "@mantine/core";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { fetchCoolers, fetchUniversal } from "../../utils/apiUtils";
import { CoolerInterface } from "../../interfaces/CoolerInterface";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { ExportToExcel } from "../exportExcel/ExportToExcel";
import { TextInput } from "@mantine/core";

export default function DrawerInversion({ opened, onClose, coolersData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const [searchValue, setSearchValue] = useState("");

  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const navigate = useNavigate();
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };

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
    <Drawer
      opened={opened}
      onClose={onClose}
      title=""
      position="bottom"
      size="35rem"
    >
      <>
        <div>
          <div
            style={{
              display: "flex",
              padding: "2px 32px",
              flexDirection: "column",
              gap: "16px",
              maxHeight: "100vh", // establecer una altura máxima para el Drawer
              marginTop: -35,
            }}
          >
            <div
              style={{
                color: "#000005",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "155%",
              }}
            >
              Desglose económico
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                width: "94.8vw",
              }}
            >
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
                  height: "11vw",
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
                        fontSize: "0.9vw",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                      }}
                    >
                      Es la suma del precio factura y los gastos en servicios
                      asociados. Incluye todos los gastos incurridos desde su
                      compra hasta la fecha actual.
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
                      {coolersData?.properties?.total_ownership_expense
                        ?.value == undefined
                        ? "Sin registro"
                        : "$" +
                          `${coolersData?.properties?.total_ownership_expense.value.toLocaleString()}`}
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
                    padding: "0px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0px",
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
                  padding: "10px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  flex: 100,
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid #88888B",
                  width: "100%",
                  height: "11.7vw",
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
                          .value == undefined
                          ? "Sin registro"
                          : "$" +
                            `${coolersData?.properties?.present_value_of_depreciation.value.toLocaleString()}`}
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
                      <div
                        style={{ display: "flex", alignItems: "flex-start" }}
                      >
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
                padding: "14px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                // alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #88888B",
                width: "92.5vw",
                height: "22vw",
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
                      fontSize: ".9vw",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Muestra la acumulación de los gastos generados en cada año
                    por concepto de servicio
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
                    {coolersData?.properties?.total_expense_service.value ==
                    undefined
                      ? "Sin registro"
                      : `${coolersData?.properties?.total_expense_service.value}`}
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
                    {coolersData?.properties?.annual_decrement.value ==
                    undefined
                      ? "Sin registro"
                      : `${coolersData?.properties?.annual_decrement.value.toLocaleString()}`}
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
                    $0
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
                  style={{ width: "100%" }}
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
                      <>
                        <div style={{ width: "100%", height: "10px" }}>
                          <div
                            style={{
                              marginLeft: 500,
                              marginTop: 50,
                              fontSize: "1vw",
                            }}
                          >
                            Sin información para mostrar
                          </div>
                        </div>
                      </>
                    </Tabs.Panel>

                    <Tabs.Panel value="second">
                      <>
                        <div style={{ width: "100%", height: "10px" }}>
                          <div
                            style={{
                              marginLeft: 500,
                              marginTop: 50,
                              fontSize: "1vw",
                            }}
                          >
                            Sin información para mostrar
                          </div>
                        </div>
                      </>
                      {/* <Card style={{width:"95%",height:"90%"}}>
                      <BarChart
                        className="mt-6"
                        data={chartdata3}
                        index="date"
                        categories={["2022", "2023"]}
                        colors={["neutral", "indigo"]}
                        yAxisWidth={30}                        
                      />
                    </Card> */}
                      {/* </div> */}
                      <></>
                    </Tabs.Panel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </>
    </Drawer>
  );
}
