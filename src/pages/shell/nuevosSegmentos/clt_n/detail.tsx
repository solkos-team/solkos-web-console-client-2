import React, { useState, useEffect } from "react";
import PageFilter from "../../../../components/pageFilter";
import { Tooltip, Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";
import { fetchUniversalDetails } from "../../../../utils/apiUtils";
import moment from "moment";
import "moment/locale/es";
import { CoolerData } from "../../../../interfaces/CoolerInterface";
import MapComponent from "../../../../components/map";
import MapComponent1 from "../../../../components/map_1";
import MapComponent2 from "../../../../components/map_2";
import { IconArrowRight } from "@tabler/icons-react";
import DrawerInversion from "../../../../components/drawerInversion/DrawerInversion";
import DrawerEnergy from "../../../../components/drawerEnergy/DrawerEnergy";
import { useDisclosure } from "@mantine/hooks";
moment.locale("es", {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
});

export const Detail = () => {
  const b = "../../sampleData/devices.png";
  const { serial_number } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [editSerie, setEditSerie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serie, SetSerie] = useState(serial_number);
  const [inversionOpened, { open: openInversion, close: closeInversion }] =
    useDisclosure(false);
  const [energyOpened, { open: openEnergy, close: closeEnergy }] =
    useDisclosure(false);

  const fetchData = async (serie?) => {
    try {
      const data = await fetchUniversalDetails(
        "coolers",
        serie,
        "GET",
        setIsLoading
      );
      setCoolersData(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(serie);
  }, []);

  useEffect(() => {}, [serial_number, coolersData]);
  const searchSerial = (value) => {
    value == "" || value == null || value == undefined
      ? alert("Ingresa datos correctos! ")
      : fetchData(value);
    setEditSerie(false);
  };
  return (
    <>
      {" "}
      <PageFilter path="clt" disabledPath={true} />
      <section className="detail_principal_body">
        <section className="detail_image_info">
          <div className="detail_image_info_data">
            <div className="detail_image_show">
              {isLoading == true ? (
                <div
                  style={{ width: "50%", height: "50%", marginLeft: "2rem" }}
                >
                  <Skeleton height={90} radius="sm" />
                </div>
              ) : (
                <img
                  src={coolersData?.asset?.url}
                  alt="cooler"
                  width={"100%"}
                  height={"85%"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://storage.googleapis.com/negocon-renders/default/default_cooler.webp";
                  }}
                />
              )}
            </div>
            <div className="detail_data_show">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.25rem",
                  flex: 100,
                  marginLeft: 10,
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
                  <>
                    {coolersData?.cooler?.status == undefined ||
                    coolersData?.cooler.status == "" ? (
                      <div
                        style={{
                          color: "#88888B",
                          fontSize: "0.75rem",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                        }}
                      >
                        Sin registro
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            padding: "4px",
                            fontSize: "0.625rem",
                            // justifyContent: "center",
                            alignItems: "center",
                            gap: "4px",
                            borderRadius: "2px",
                            background:
                              coolersData?.cooler?.status === "EN FALLA"
                                ? "#FFC7CD"
                                : coolersData?.cooler?.status ===
                                  "FUNCIONANDO CORRECTAMENTE"
                                ? "#DFF9E3"
                                : coolersData?.cooler?.status ===
                                  "FUNCIONANDO CON ALERTA"
                                ? "#FEF5C7"
                                : "#D4DAE3",
                          }}
                        >
                          <img
                            src={"../../sampleData/transmiss2.svg"}
                            alt="Descripción de la imagen"
                            style={{ width: "15px", height: "15px" }}
                          />
                          <div
                            style={{
                              color:
                                coolersData?.cooler?.status === "EN FALLA"
                                  ? "#F93448"
                                  : coolersData?.cooler?.status ===
                                    "FUNCIONANDO CORRECTAMENTE"
                                  ? "#1D5E29"
                                  : coolersData?.cooler?.status ===
                                    "FUNCIONANDO CON ALERTA"
                                  ? "#451C03"
                                  : "black",
                              // fontFamily: "Space Mono",
                              fontSize: "0.625.rem",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "14px",
                            }}
                          >
                            {/* {coolersData?.cooler?.status} */}
                            TRANSMITIENDO
                          </div>
                        </div>
                      </>
                    )}
                  </>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                    }}
                  >
                    <div
                      style={{
                        color: "#000005",
                        // fontFamily: "DM Sans",
                        fontSize: "1.25rem",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                      }}
                    >
                      {coolersData?.cooler?.serial_number === undefined ? (
                        "Sin registro"
                      ) : (
                        <input
                          placeholder="Ingresa una nueva serie"
                          value={serie}
                          onChange={(e) => {
                            SetSerie(e.target.value);
                          }}
                          style={{
                            color: "#000005",
                            // fontFamily: "DM Sans",
                            fontSize: "1.25rem",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            width: `${
                              coolersData?.cooler?.serial_number.length + 1
                            }ch`,
                            border: editSerie == false ? "transparent" : "",
                          }}
                          disabled={!editSerie}
                          onKeyDown={(e) =>
                            e.key === "Enter" ? searchSerial(serie) : ""
                          }
                        />
                      )}
                    </div>
                    <Tooltip label="Ver otra serie">
                      <div
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          display: "none",
                        }}
                        onClick={() => {
                          setEditSerie((o) => !o);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="24"
                          height="24"
                          viewBox="0 0 50 50"
                        >
                          <path
                            d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
                            onClick={() => {
                              setEditSerie((o) => !o);
                            }}
                          ></path>
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Mono",
                    fontSize: "0.75rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {coolersData?.cooler?.model_id === undefined ||
                  coolersData?.cooler?.model_id === null
                    ? "Sin registro"
                    : coolersData?.cooler?.model_id}
                </div>
                {coolersData?.cooler?.status == undefined ||
                coolersData?.cooler.status == "" ? (
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "0.75rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Sin registro
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        padding: "4px",
                        fontSize: "0.625rem",
                        // justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        borderRadius: "2px",
                        background:
                          coolersData?.cooler?.status === "EN FALLA"
                            ? "#FFC7CD"
                            : coolersData?.cooler?.status ===
                              "FUNCIONANDO CORRECTAMENTE"
                            ? "#DFF9E3"
                            : coolersData?.cooler?.status ===
                              "FUNCIONANDO CON ALERTA"
                            ? "#FEF5C7"
                            : "#D4DAE3",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "5px",
                          background:
                            coolersData?.cooler?.status === "EN FALLA"
                              ? "#F93448"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CORRECTAMENTE"
                              ? "#31B648"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CON ALERTA"
                              ? "#F6A60A"
                              : "#808080",
                        }}
                      ></div>
                      <div
                        style={{
                          color:
                            coolersData?.cooler?.status === "EN FALLA"
                              ? "#F93448"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CORRECTAMENTE"
                              ? "#1D5E29"
                              : coolersData?.cooler?.status ===
                                "FUNCIONANDO CON ALERTA"
                              ? "#451C03"
                              : "black",
                          // fontFamily: "Space Mono",
                          fontSize: "0.625.rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "14px",
                        }}
                      >
                        {coolersData?.cooler?.status}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="detail_data_ns">
            <div
              style={{
                display: "flex",
                padding: "16px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: 100,
                }}
              >
                <img
                  src={"../../sampleData/online.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "17px", height: "17px" }}
                />
                <text
                  style={{
                    color: "#3A3A3F",
                    fontSize: "0.75rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  EN VIVO
                </text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    minWidth: "140px",
                    minHeight: "52px",
                    padding: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: 100,
                    }}
                  >
                    <text
                      style={{
                        overflow: "hidden",
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Temperatura
                    </text>
                    <text
                      style={{
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      4°C
                    </text>
                  </div>
                  <img
                    src={"../../sampleData/tem1.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    minWidth: "140px",
                    minHeight: "52px",
                    padding: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: 100,
                    }}
                  >
                    <text
                      style={{
                        overflow: "hidden",
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Voltaje
                    </text>
                    <text
                      style={{
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      118V
                    </text>
                  </div>
                  <img
                    src={"../../sampleData/vol1.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "140px",
                    minWidth: "140px",
                    minHeight: "52px",
                    padding: "4px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "4px",
                      flex: 100,
                    }}
                  >
                    <text
                      style={{
                        overflow: "hidden",
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "0.75rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Temperatura
                    </text>
                    <text
                      style={{
                        color: "#000005",
                        textOverflow: "ellipsis",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      4°C
                    </text>
                  </div>
                  <img
                    src={"../../sampleData/tem1.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="detail_hr" style={{ marginTop: 2 }} />
      </section>
    </>
  );
};
