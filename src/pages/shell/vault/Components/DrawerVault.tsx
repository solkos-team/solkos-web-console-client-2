import { Drawer, Loader, Skeleton, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CoolerData, Vault_Markers } from "../../../../interfaces/CoolerInterface";
import { fetchUniversalDetails } from "../../../../utils/apiUtils";
import { useSelector } from "react-redux";
import {
  backgroundCircle,
  getBorderStyle,
  getColor,
  getStatusColor,
} from "../../../../Functions/Vault";
import MapComponent2 from "../../../../components/map_2";
import MapComponent from "../../../../components/map";
import MapComponent1 from "../../../../components/map_1";
import moment from "moment";
import { Carousel } from "rsuite";
import { VaultLock, VaultUnlock } from "../../../../sampleData/Vault/VaultIcons";

export const DrawerVault = ({ opened, onCLose, Serial_ID }) => {
  // console.log(Serial_ID)
  const [cooler, setCooler] = useState<CoolerData>();
  const [isLoading, setIsLoading] = useState(true);
  const dto = useSelector((state: any) => state.organization);
  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const fetchData = async (serie?) => {
    try {
      const data = await fetchUniversalDetails(
        "coolers",
        serie,
        "GET",
        setIsLoading
      );
      setCooler(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (Serial_ID != undefined) {
      fetchData(Serial_ID);
    }
  }, [Serial_ID]);
const registros : Vault_Markers[] = [
  {
    "cooler_id": "001BC501F6BB",
    "flag": true,
    "date_time": "2024-09-04T23:48:22.263Z",
    "user_id": 'Alicia W'
  },
  {
    "cooler_id": "001BC501F6BB",
    "flag": false,
    "date_time": "2024-09-01T23:48:22.263Z",
    "user_id": 'Mayra b'
  },
  {
    "cooler_id": "001BC501F6BB",
    "flag": false,
    "date_time": "2024-08-10T23:48:22.263Z",
    "user_id": 'Jose i'
  }
]
console.log(cooler)
  return (
    <Drawer
      opened={opened}
      onClose={onCLose}
      title=""
      position="right"
      size="40rem"
      withCloseButton={false}
    >
      <div style={{ position: "absolute", left: "1rem", top: "1rem" }}>
        <button
          style={{
            display: "flex",
            padding: "0.313rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.625rem",
            alignSelf: "stretch",
            borderRadius: "0.25rem",
            border: "0.063rem solid #CED4DA",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={onCLose}
        >
          <img
            src={"../../sampleData/CloseDrawer.svg"}
            alt="Close"
            style={{ width: "1.125rem", height: "1.125rem" }}
          />
        </button>
      </div>
      <section className="vault_drawer_container" style={{ marginTop: "3rem" }}>
        <section className="vault_drawer_header">
          <section className="headerPrincipal">
            <section className="headerContentIMG">
              <section className="headerIMG">
                {isLoading == true ? (
                  <Loader color="gray" size="xs" />
                ) : (
                  <img
                    src={cooler?.asset?.url ?? ""}
                    alt="cooler"
                    width={"100%"}
                    height={"100%"}
                    loading="lazy"
                    className="headerIMG__image"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://storage.googleapis.com/negocon-renders/default/default_cooler.webp";
                    }}
                  />
                )}
              </section>
              <section className="headerDataIMG">
                <div
                  style={{ width: "100%", height: "100%", backgroundColor: "" }}
                >
                  {isLoading == true ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  ) : (
                    <div
                      style={{
                        border: getBorderStyle(cooler, dto),
                        borderRadius: "2px",
                        width: "max-content",
                        height: "max-content",
                        padding: "1px",
                        boxSizing: "border-box",
                        fontSize: "0.563rem",
                        fontWeight: "700",
                        color: getColor(cooler, dto),
                      }}
                    >
                      {cooler?.cooler.actionable ?? 'Sin registro'}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "",
                    color: "var(--other-black, #000)",
                    fontSize: "1.125rem",
                    fontWeight: "700",
                  }}
                >
                  {isLoading == true ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  ) : (
                    cooler?.cooler.serial_number === "" || null || undefined ? 'Sin registro' : cooler?.cooler.serial_number
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "",
                    color: "var(--gray-6, #868E96)",
                    fontSize: "0.563rem",
                    fontWeight: "700",
                  }}
                >
                  {isLoading == true ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  ) : (
                    cooler?.cooler.model_id === "" || null || undefined ? 'Sin registro' : cooler?.cooler.model_id
                  )}
                </div>
                <div
                  style={{ width: "100%", height: "100%", backgroundColor: "" }}
                >
                  {isLoading == true ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  ) : (
                    <div
                      style={{
                        backgroundColor: getStatusColor(cooler),
                        display: "flex",
                        fontSize: "0.563rem",
                        gap: "0.25rem",
                        whiteSpace: "none",
                        width: "max-content",
                        alignItems: "center",
                        borderRadius: "0.25rem",
                        padding: "0.375rem",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "5px",
                          backgroundColor: backgroundCircle(cooler),
                        }}
                      ></div>
                      {cooler?.cooler.status === "" || cooler?.cooler.status == null || cooler?.cooler.status == undefined ? 'Sin registro' : cooler?.cooler.status}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {isLoading == true ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  ) : (
                    <>
                      <div
                        style={{
                          color: "var(--gray-6, #868E96)",
                          fontSize: "0.75rem",
                          fontWeight: "400",
                          width: "max-content",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Leído por última vez:
                      </div>
                      <div
                        style={{
                          backgroundColor: "var(--blue-0, #E7F5FF)",
                          padding: "0.375rem",
                          boxSizing: "border-box",
                          color: "var(--blue-6, #2393F4)",
                          fontSize: "0.563rem",
                          fontWeight: "700",
                          width: "max-content",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cooler?.cooler.last_read === null || undefined || "" ? 'Sin registro' : moment(new Date(String(cooler?.cooler.last_read))).locale("es").format("dddd D MMMM, YYYY")}
                      </div>
                    </>
                  )}
                </div>
              </section>
            </section>
            <section className="headerContentData">
              <section className="headerContentDataContainer">
                <div className="headerContentData1">CANAL: </div>
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                ) : (
                  <div className="headerContentData2">
                    {cooler?.cooler.channel === "" || null || undefined ? 'Sin registro' : cooler?.cooler.channel}
                  </div>
                )}
              </section>
              <section className="headerContentDataContainer">
                <div className="headerContentData1">REGIÓN: </div>
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                ) : (
                  <div className="headerContentData2">
                    {cooler?.cooler.region === "" || null || undefined ? 'Sin registro' : cooler?.cooler.region}
                  </div>
                )}
              </section>
              <section className="headerContentDataContainer">
                <div className="headerContentData1">RUTA: </div>
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                ) : (
                  <div className="headerContentData2">
                    {cooler?.cooler.route === "" || null || undefined ? 'Sin registro' : cooler?.cooler.route}
                  </div>
                )}
              </section>
              <section className="headerContentDataContainer">
                <div className="headerContentData1">GERENCIA DE ZONA: </div>
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="40%" radius="xl" />
                ) : (
                  <div className="headerContentData2">
                    {cooler?.cooler.zone === "" || null || undefined ? 'Sin registro' : cooler?.cooler.zone}
                  </div>
                )}
              </section>
            </section>
          </section>
        </section>
        <section className="vault_drawer_registro">
          <div className="vault_drawer_mapa_title">
            <p>Registro</p>
          </div>
          <div className="vault_drawer_registro_stepper">
            {
              cooler?.vault_markers == null || cooler.vault_markers == undefined ? <h1 style={{fontSize:'0.75rem',color:'var(--gray-6, #868e96)'}}>Sin registros</h1>
                :
                <Carousel style={{ width: '100%', height: '100%' }} placement="bottom" shape="bar" autoplay>
                  {
                    registros.map((registro, index) => (
                      <div style={{ width: '100%', background: '', height: '100%', display: 'flex', gap: '0.25rem', flexDirection: 'column', alignItems: 'center' }} title={registro.flag == true ? `Bloqueado por ${registro.user_id}` : `Desbloqueado por ${registro.user_id}`} key={index}>
                        <div style={{ width: '50%', height: '15%', background: '', color: 'var(--gray-6, #868E96)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{new Date(registro.date_time).getFullYear()}</div>
                        <div style={{ width: '50%', height: '75%', background: '' }}> <img src={registro.flag == true ? VaultLock : VaultUnlock} alt="VaultIcon" style={{ width: '100%', height: '98%' }} /> </div>
                        <div style={{ width: '50%', height: '10%', background: '', color: 'var(--gray-6, #868E96)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{`${new Date(registro.date_time).getDate()} ${nombresMeses[new Date(registro.date_time).getMonth()]}`}</div>
                      </div>
                    ))
                  }
                </Carousel>
            }            
          </div>
        </section>
        <section className="vault_drawer_mapa">
          <div className="vault_drawer_mapa_title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M3.25 22.75H22.75M3.25 7.58333V8.66667C3.25 9.52862 3.59241 10.3553 4.2019 10.9648C4.8114 11.5743 5.63805 11.9167 6.5 11.9167C7.36195 11.9167 8.1886 11.5743 8.7981 10.9648C9.40759 10.3553 9.75 9.52862 9.75 8.66667M3.25 7.58333H22.75M3.25 7.58333L5.41667 3.25H20.5833L22.75 7.58333M9.75 8.66667V7.58333M9.75 8.66667C9.75 9.52862 10.0924 10.3553 10.7019 10.9648C11.3114 11.5743 12.138 11.9167 13 11.9167C13.862 11.9167 14.6886 11.5743 15.2981 10.9648C15.9076 10.3553 16.25 9.52862 16.25 8.66667M16.25 8.66667V7.58333M16.25 8.66667C16.25 9.52862 16.5924 10.3553 17.2019 10.9648C17.8114 11.5743 18.638 11.9167 19.5 11.9167C20.362 11.9167 21.1886 11.5743 21.7981 10.9648C22.4076 10.3553 22.75 9.52862 22.75 8.66667V7.58333M5.41667 22.75V11.7541M20.5833 22.75V11.7541M9.75 22.75V18.4167C9.75 17.842 9.97827 17.2909 10.3846 16.8846C10.7909 16.4783 11.342 16.25 11.9167 16.25H14.0833C14.658 16.25 15.2091 16.4783 15.6154 16.8846C16.0217 17.2909 16.25 17.842 16.25 18.4167V22.75"
                stroke="#313A49"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="vault_drawer_mapa_title_p">
              Acerca del punto de venta
            </div>
          </div>
          <div className="vault_drawer_mapa_info">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="vault_drawer_mapa_info_p">Nombre del PdV</div>
              <div className="vault_drawer_mapa_info_p2">
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                ) : (
                  `${cooler?.cooler.outlet_name === "" || null || undefined ? 'Sin registro' : cooler?.cooler.outlet_name} / ${cooler?.cooler.outlet_id === "" || null || undefined ? 'Sin registro' : cooler?.cooler.outlet_id}`
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="vault_drawer_mapa_info_p">Dirección</div>
              <div className="vault_drawer_mapa_info_p2">
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                ) : (
                  cooler?.cooler.outlet_address === "" || null || undefined ? 'Sin registro' : cooler?.cooler.outlet_address
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="vault_drawer_mapa_info_p">
                Distancia al punto de instalación
              </div>
              <div className="vault_drawer_mapa_info_p2">
                {isLoading == true ? (
                  <Skeleton height={8} mt={6} width="70%" radius="xl" />
                ) : (
                  cooler!.cooler?.distance < 0 || undefined || null ? "Sin registro" : `${cooler?.cooler.distance}m`
                )}
              </div>
            </div>
          </div>
          <div className="vault_drawer_mapa_mapa">
            <div className="clt_actividad_principal_mapa">
              {isLoading == true ? (
                <Skeleton
                  height={10}
                  radius="xs"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : cooler?.cooler?.last_latitude === null &&
                cooler?.cooler?.latitude === 0 ? (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%", // Esto hará que el div ocupe el 100% del ancho del contenedor padre
                      height: "100%",
                      backgroundImage: "url('../../sampleData/fondd.png')",
                      backgroundSize: "cover", // Esto asegurará que la imagen cubra todo el div
                      backgroundPosition: "center", // Esto centrará la imagen en el div
                    }}
                  >
                    <img
                      src={"../../sampleData/notmap.svg"}
                      alt="Descripción de la imagen"
                      style={{
                        width: "26px",
                        height: "26px",
                      }}
                    />
                    <text
                      style={{
                        color: "#ED5079",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "155%",
                      }}
                    >
                      No hay datos de la ubicación
                    </text>
                  </div>
                </>
              ) : cooler?.cooler?.last_latitude != null &&
                cooler?.cooler?.latitude === 0 ? (
                <>
                  <div style={{ height: "100%" }}>
                    <MapComponent1
                      latitude={cooler?.cooler?.last_latitude}
                      longitude={cooler?.cooler?.last_longitude}
                    />
                  </div>
                </>
              ) : cooler?.cooler?.last_latitude === null &&
                cooler?.cooler?.latitude != 0 ? (
                <>
                  <div style={{ height: "100%" }}>
                    <MapComponent
                      latitude={cooler?.cooler?.latitude}
                      longitude={cooler?.cooler?.longitude}
                    />
                  </div>
                </>
              ) : (
                <>
                  <MapComponent2
                    latitude={cooler?.cooler?.latitude}
                    longitude={cooler?.cooler?.longitude}
                    last_latitude={cooler?.cooler?.last_latitude}
                    last_longitude={cooler?.cooler?.last_longitude}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </section>
    </Drawer>
  );
};
