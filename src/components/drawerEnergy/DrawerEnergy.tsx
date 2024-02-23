import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import MapComponentPv from "../mapPv/MapPv";
import { Table } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { Drawer, Button } from "@mantine/core";
import {
  AreaChart,
  BarChart,
  Card,
  Flex,
  Switch,
  Title,
  Subtitle,
} from "@tremor/react";
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

export default function DrawerEnergy({ opened, onClose, coolersData }) {
  // const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
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

  const mes1 = new Date(
    coolersData?.properties.energy_consumption_month_1.timestamp
  );
  const mes11 = mes1.toLocaleString("es-ES", { month: "long" });
  const mes2 = new Date(
    coolersData?.properties?.energy_consumption_month_2.timestamp
  );
  const mes22 = mes2.toLocaleString("es-ES", { month: "long" });
  const mes3 = new Date(
    coolersData?.properties?.energy_consumption_month_3.timestamp
  );
  const mes33 = mes3.toLocaleString("es-ES", { month: "long" });
  const chartdata = [
    {
      name: mes33,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_3
        .value == undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_3.value
      ).toFixed(2),
    },
    {
      name: mes22,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_2
        .value == undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_2.value
      ).toFixed(2),
    },
    {
      name: mes11,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_1
        .value == undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_1.value
      ).toFixed(2),
    },
  ];

  const valueFormatter = (number) =>
    `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title=""
      position="bottom"
      size="35rem"
    >
      {/* <div style={{ height: "100vh", overflowY: "auto" }}> */}
      <div style={{ height: "100vh" }}>
        <div
          style={{
            display: "flex",
            padding: "2px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
            marginTop: -34,
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
            Gastos de energía
          </div>
          {/* PRIMERO */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "5px",
              flex: 100,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
              width: "93vw",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
                marginBottom: "-10px",
              }}
            >
              <img
                src={"../../sampleData/nature.png"}
                width={"13px"}
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
                Promedio de consumo de energía diario
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
                Visión general del rendimiento energético.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                alignContent: "flex-start",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  width: "200px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".9vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "28px",
                  }}
                >
                  Costo en energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.2vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "28px",
                  }}
                >
                  {coolersData?.properties?.energy_cost.value == undefined
                    ? "Sin registro"
                    : "$" +
                      `${coolersData?.properties?.energy_cost.value.toLocaleString()}`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  width: "200px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "0.9vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "28px",
                  }}
                >
                  Consumo de energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.2vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "28px",
                  }}
                >
                  {coolersData?.properties?.energy_consumption.value ==
                  undefined
                    ? "Sin registro"
                    : `${
                        (coolersData?.properties?.energy_consumption.value).toFixed(
                          2
                        ) +
                        " " +
                        "KW/h"
                      }`}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  width: "250px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "0.9vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "28px",
                  }}
                >
                  Referencia de consumo de energía
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.2vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "28px",
                  }}
                >
                  {coolersData?.properties?.power_consumption_reference
                    .value === undefined
                    ? "Sin registro"
                    : (coolersData?.properties?.power_consumption_reference.value).toFixed(
                        2
                      ) +
                      " " +
                      "KW/h"}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  width: "200px",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: ".9vw",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "28px",
                  }}
                >
                  Promedio de emisiones de C02
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "DM Sans",
                    fontSize: "1.2vw",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "28px",
                  }}
                >
                  {coolersData?.properties?.average_C02_emissions.value ==
                  undefined
                    ? "Sin registro"
                    : `${
                        (coolersData?.properties?.average_C02_emissions.value).toFixed(
                          2
                        ) +
                        " " +
                        "Kg/día"
                      }`}
                </div>
              </div>
            </div>
            <br></br>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <a
                href="https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/PequenaDemandaBT.aspx"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none", // Elimina el subrayado del enlace
                  color: "#3E83FF",
                  fontSize: "1vw",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  marginTop: "-80px",
                }}
              >
                Ver referencias de la CFE
                <IconArrowRight
                  style={{ width: "12px", height: "12px", color: "#3E83FF" }}
                />
              </a>
            </div>
          </div>
          {/* SEGUNDO */}
          <div
            style={{
              display: "flex",
              width: "90.8vw",
              height: "22vw",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFF",
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
                src={"../../sampleData/nature.png"}
                width={"15px"}
                height={"15px"}
                alt="cooler"
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
                Consumo de energía por mes
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
                Consumo de energía consumida durante cada mes.
              </div>
            </div>
            <div>
              {coolersData?.properties?.energy_consumption_month_1.value ===
              0 ? (
                <div
                  style={{ marginLeft: 500, marginTop: 100, fontSize: "1vw" }}
                >
                  Sin información para mostrar
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: "800px",
                      height: "500px",
                      marginTop: -110,
                      marginLeft: 130,
                    }}
                  >
                    <Card style={{ backgroundColor: "transparent" }}>
                      <BarChart
                        className="h-80"
                        data={chartdata}
                        index="name"
                        categories={["Consumo de energía"]}
                        colors={["blue"]}
                        valueFormatter={valueFormatter}
                        yAxisWidth={100}
                      />
                    </Card>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </Drawer>
  );
}
