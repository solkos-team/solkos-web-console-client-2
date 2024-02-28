import React, { useState, useEffect } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import {
  AreaChart,
  BarChart,
  Card,
  Flex,
  Switch,
  Title,
  Subtitle,
} from "@tremor/react";

const Energy = ({ coolersData }) => {
  const mes1 = new Date(
    coolersData?.properties?.energy_consumption_month_1.timestamp
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
        .value === undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_3.value
      ).toFixed(2),
    },
    {
      name: mes22,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_2
        .value === undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_2.value
      ).toFixed(2),
    },
    {
      name: mes11,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_1
        .value === undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_1.value
      ).toFixed(2),
    },
  ];

  const valueFormatter = (number) =>
    `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

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
              {coolersData?.properties?.energy_cost.value === undefined
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
              {coolersData?.properties?.energy_consumption.value === undefined
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
              {coolersData?.properties?.power_consumption_reference.value ===
              undefined
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
              {coolersData?.properties?.average_C02_emissions.value ===
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
                {coolersData?.properties?.energy_consumption_month_1.value ===
                0 ? (
                  <div style={{ marginLeft: 270, marginTop: 50 }}>
                    Sin información para mostrar
                  </div>
                ) : (
                  <>
                    <div style={{ width: "700px", height: "500px" }}>
                      <Card>
                        <BarChart
                          className="mt-6"
                          data={chartdata}
                          index="name"
                          categories={["Consumo de energía"]}
                          colors={["blue"]}
                          valueFormatter={valueFormatter}
                          yAxisWidth={48}
                        />
                      </Card>
                    </div>
                  </>
                )}
              </Tabs.Panel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default Energy;
