import React, { useState, useEffect } from "react";
import {
  IconSearch,
  IconArrowNarrowLeft,
  IconLock,
  IconChevronRight,
  IconCircleX,
  IconCirclePlus,
  IconArrowRight,
} from "@tabler/icons-react";
import {
  Table,
  Pagination,
  Select,
  Loader,
  TextInput,
  Paper,
  Tooltip,
  Tabs,
} from "@mantine/core";
import { Text } from "@mantine/core";
import { BarChart, Card, Title, LineChart } from "@tremor/react";

const Energy = ({ coolersData }) => {
  
  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
    {
      name: "Ferns",
      "Number of threatened species": 281,
    },
    {
      name: "Arachnids",
      "Number of threatened species": 251,
    },
    {
      name: "Corals",
      "Number of threatened species": 232,
    },
    {
      name: "Algae",
      "Number of threatened species": 98,
    },
  ];

const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <div
      style={{
        display: "flex",
        padding: "16px 32px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      {/* PRIMERO */}
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
          background: "#FFF",
          width: "790px",
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
            width={"24px"}
            alt="cooler"
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
            Promedio de consumo de energía diario
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
            Visión general del rendimiento energético.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            alignContent: "flex-start",
            gap: "16px",
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
                fontSize: "14px",
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
                fontSize: "26px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              {coolersData?.cooler?.energy_cost == null || coolersData?.cooler?.energy_cost == undefined ? "Sin datos" : '$'+`${coolersData?.cooler?.energy_cost}`}
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
                fontSize: "14px",
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
                fontSize: "26px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              {coolersData?.cooler?.energy_consumption == null || coolersData?.cooler?.energy_consumption == undefined ? "Sin datos" : `${coolersData?.cooler?.energy_consumption}`+`KW/h`}
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
                fontSize: "14px",
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
                fontSize: "26px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              {coolersData?.cooler?.power_consumption_reference == null || coolersData?.cooler?.power_consumption_reference == undefined ? "Sin datos" : `${coolersData?.cooler?.power_consumption_reference}`+`KW/h`}
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
                fontSize: "14px",
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
                fontSize: "26px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28px",
              }}
            >
              {coolersData?.cooler?.average_C02_emissions == null || coolersData?.cooler?.average_C02_emissions == undefined ? "Sin datos" : `${coolersData?.cooler?.average_C02_emissions}`+`Kg/día`}
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
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Ver referencias de la CFE
            <IconArrowRight
              style={{ width: "16px", height: "16px", color: "#3E83FF" }}
            />
          </a>
        </div>
      </div>
      {/* SEGUNDO */}
      <div
        style={{
          display: "flex",
          width: "790px",
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
            width={"24px"}
            alt="cooler"
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
            Consumo de energía por mes
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
            Consumo de energía consumida durante cada mes.
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
            </Tabs.List>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <Tabs.Panel value="first" pt="xs">
              <div style={{ position:"relative",width: "45rem", height: "30rem" }}>
                    <Card style={{ width: "99%", height: "100%" }}>
                      <Title>
                        Number of species threatened with extinction (1)
                      </Title>
                      <BarChart
                        className="h-72 mt-4"
                        data={chartdata}
                        index="name"
                        categories={["Number of threatened species"]}
                        colors={["blue"]}
                        valueFormatter={valueFormatter}
                        yAxisWidth={45}
                        style={{height:"95%"}}
                      />
                    </Card>
                  </div>
              </Tabs.Panel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default Energy;
