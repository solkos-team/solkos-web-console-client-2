import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import Resume from "../../../components/resume";
import EconomicDetail from "../../../components/economicDetail/EconomicDetail";
import Energy from "../../../components/energyConsum";
import { Tabs } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function CoolerDetail() {
  interface CoolerData {
    cooler: {
      serial_number: string;
      model_id: string;
      outlet_name: string;
      customer: string;
      region: string;
      route: string;
      zone: string;
    };
    service_orders?: Array<{ description: string }>; // Ajusta según la estructura real
    tracking?: Array<{ class: string; algorithm: string }>; // Ajusta según la estructura real
  }

  const b = "../../sampleData/devices.png";
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false); // Restablecer el estado cuando se realiza una nueva búsqueda
  };

  const fetchCoolersFromAPI = async (serial_number) => {
    const url = `https://universal-console-server-b7agk5thba-uc.a.run.app/coolers/${serial_number}`;

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
      console.log(responseData);
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoolersFromAPI(serial_number);
        setCoolersData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const { serial_number } = useParams();

  useEffect(() => {
    console.log(`Serial number from the route: ${serial_number}`);
  }, [serial_number, coolersData]);

  console.log(coolersData?.cooler?.outlet_name);
  return (
    <div>
      <PageFilter />
      <br></br>
      <div>
        {/* *********************************************************** */}
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
              alignItems: "flex-start",
              gap: "4px",
              flex: 100,
            }}
          >
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
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                  {coolersData?.cooler?.serial_number === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.serial_number}
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
                    -----
                  </div>
                </div>
              </div>
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
              {coolersData?.cooler?.model_id === ""
                ? "Sin registro"
                : coolersData?.cooler?.model_id}
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
                ------
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
                -----
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
                    // fontFamily: "DM Mono",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {" "}
                  --- días sin visita
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              alignSelf: "stretch",
            }}
          >
            {coolersData?.cooler?.customer !== "KOF" ? (
              <>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                    padding: "0px 0px 4px",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      // fontFamily: "DM Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "14px",
                    }}
                  >
                    CANAL:
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
                      marginTop: -5,
                    }}
                  >
                    <div
                      style={{
                        color: "#313A49",
                        // fontFamily: "DM Mono",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "14px",
                      }}
                    >
                      SIN REGISTRO
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                padding: "0px 0px 4px",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                REGIÓN:
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
                  marginTop: -5,
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {coolersData?.cooler?.region === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.region}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                padding: "0px 0px 4px",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                RUTA:
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
                  marginTop: -5,
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {coolersData?.cooler?.route === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.route}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#88888B",
                  // fontFamily: "DM Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "14px",
                }}
              >
                GERENCIA DE ZONA:
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
                  marginTop: -5,
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    // fontFamily: "DM Mono",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  {coolersData?.cooler?.zone === ""
                    ? "Sin registro"
                    : coolersData?.cooler?.zone}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* *********************************************************** */}
        <br></br>
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
              <Resume coolersData={coolersData} />
            </Tabs.Panel>

            <Tabs.Panel value="second" pt="xs">
              <EconomicDetail coolersData={coolersData} />
            </Tabs.Panel>

            <Tabs.Panel value="tree" pt="xs">
              <Energy coolersData={coolersData} />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
