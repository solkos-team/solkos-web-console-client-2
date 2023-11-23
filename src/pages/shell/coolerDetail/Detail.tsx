import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import Resume from "../../../components/resume";
import EconomicDetail from "../../../components/economicDetail/EconomicDetail";
import Energy from "../../../components/energyConsum";
import { Tabs } from "@mantine/core";

export default function CoolerDetail() {
  interface Cooler {
    serial_number: string;
    device_id: string;
    model_id: string;
    outlet_name: string;
    region: string;
    route: string;
  }

  const b = "../../sampleData/devices.png";
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false); // Restablecer el estado cuando se realiza una nueva búsqueda
  };

  const fetchCoolersFromAPI = async () => {
    const url =
      "https://universal-console-server-b7agk5thba-uc.a.run.app/coolers/A83180403751";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del enfriador");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoolersFromAPI();
        setCoolersData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageFilter />
      <div>
        <div
          style={{
            display: "flex",
            padding: "16px 8px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            flex: 100,
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "0px 32px",
              alignItems: "flex-start",
              marginLeft: -85,
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <img src={b} width={"60px"} alt="cooler"></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
                  lineHeight: "normal",
                }}
              >
                {/* SERIAL_NUMBER */}
                {"A86200103820"}
              </div>
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                {/* MODELO */}
                {"G326 D BMAD R2"}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  borderRadius: "2px",
                  background: "#B6FEDB",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "5px",
                    background: "#31B648",
                  }}
                ></div>
                <div
                  style={{
                    color: "#028053",
                    // fontFamily: "Space Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "14px",
                  }}
                >
                  FUNCIONANDO CORRECTAMENTE
                </div>
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
                    color: "#88888B",
                    // fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Leído por última vez el:
                </div>
                <div
                  style={{
                    color: "#000005",
                    // fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  29 de abril de 2023 7:08
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "4px",
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
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                    }}
                  >
                    {" "}
                    0 DÍAS SIN VISITA
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "4px",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                borderRadius: "2px",
                border: "1.5px solid #0F9F67",
                background: "#FFF",
                marginTop: 5,
                marginLeft: -240,
              }}
            >
              <div
                style={{
                  color: "#0F9F67",
                  // fontFamily: "DM Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "14px",
                }}
              >
                SIN ACCIONES
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "36px",
            width: "1015px",
            padding: "0px 32px",
            alignItems: "flex-start",
            alignSelf: "stretch",
            background: "#D4DAE3",
            flex: 1, // Añade esta línea
            marginLeft: "-75px",
          }}
        >
          {" "}
          <Tabs color="teal" defaultValue="first">
            <Tabs.List>
              <Tabs.Tab value="first">Resumen</Tabs.Tab>
              <Tabs.Tab value="second">Desglose economico </Tabs.Tab>
              <Tabs.Tab value="tree">Gasto de energía </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first" pt="xs">
              <Resume />
            </Tabs.Panel>

            <Tabs.Panel value="second" pt="xs">
              <EconomicDetail />
            </Tabs.Panel>

            <Tabs.Panel value="tree" pt="xs">
              <Energy />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
