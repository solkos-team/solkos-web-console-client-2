import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { useNavigate } from "react-router-dom";
import { AcercaDeLosEquiposIcon } from "../../../sampleData/icons";
import { Insights as InsightsIT } from "../../../interfaces/InsightsInterfaces";
import { Skeleton, Tooltip } from "@mantine/core";
import { HeaderInsights } from "./Responsive/HeaderInsights";
import { MapInsightsResponsive } from "./Responsive/MapInsightsResponsive";
import { useSelector } from "react-redux";
import { MapResponsive } from "../../../components/mapInsights/MapResponsive";
import { navigateModules } from "../../../Functions/Routing";
export default function Insights() {
  const [data, setData] = useState<InsightsIT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  console.log(data?.asset_control?.total);
  console.log(data?.asset_control?.algorithms);
  const alertValue =
    data?.maintenance?.find((item) => item.level === "ALERT")?.value || 0;
  console.log(alertValue);
  const failValue =
    data?.maintenance?.find((item) => item.level === "FAIL")?.value || 0;
  console.log(failValue);

  const totalMaintenanceValue = data?.maintenance?.reduce(
    (sum, item) => sum + item.value,
    0
  );
  console.log(totalMaintenanceValue);
  const IndicadoresData = data?.asset_control?.algorithms || [];
  const sum2 = IndicadoresData.reduce((prev, curr) => prev + curr.value, 0);
  data?.summary.coolers.toLocaleString("es-MX") != null ||
  data?.summary.coolers.toLocaleString("es-MX") != undefined
    ? sessionStorage.setItem(
        "TtlCoolers",
        data?.summary.coolers.toLocaleString("es-MX")
      )
    : "";
  useEffect(() => {
    if (location.pathname === "/home/insights") {
      localStorage.removeItem("searchTags");
    }
  }, [location]);

  useEffect(() => {
    //  if (dto === "CALL CENTER") {
    //    navigate("/home/clt_callCenter");
    //  }
    navigateModules(dto, navigate);
  }, [navigate, dto]);

  return (
    <div className="insights_principal_container">
      <PageFilter status={isLoading} />
      <br></br>
      <section className="insights_contenido_principal">
        <section className="insights_title">
          <div className="insights_title_h1">Cooler Insights</div>
          <p className="insights_title_p" style={{ marginTop: -3 }}>
            Ve el panorama general de los enfriadores y toma acciones
          </p>
          <HeaderInsights
            title={"Cooler Insights"}
            description={
              "Haz un seguimiento de todos los parámetros de cada uno de tus enfriadores"
            }
          />
        </section>
        <section className="insights_principal">
          <section className="insights_mapa">
            <div className="insights_mapa_info_title">
              <img
                className="insights_mapa_info_title_mapa"
                src={"../../sampleData/gauge.svg"}
                alt="Descripción de la imagen"
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#C7CBD2",
                  borderRadius: "4px",
                }}
              />
              <h1 className="insights_mapa_info_title_h1">
                Acerca de los equipos
              </h1>
            </div>

            {/* description from mapa */}
            <div className="insights_mapa_info_descripcion">
              <p className="insights_mapa_info_descripcion_p">
                Visualiza la ubicación donde los enfriadores han sido
                instalados.
              </p>
            </div>
            {/* datas from mapa */}
            <div className="insights_mapa_info_datas">
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">
                  Enfriadores
                </li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : data?.summary.coolers === undefined ? (
                    "Sin registro"
                  ) : (
                    data?.summary.coolers.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Rutas</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : data?.summary.routes === undefined ? (
                    "Sin registro"
                  ) : (
                    data?.summary.routes.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Unidad Op.</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : data?.summary.operative_units === undefined ? (
                    "Sin registro"
                  ) : dto === "ECO" ? (
                    0
                  ) : (
                    data?.summary.operative_units.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Zonas</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : data?.summary.zones === undefined ? (
                    "Sin registro"
                  ) : (
                    data?.summary.zones.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Regiones</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xs" />
                    </>
                  ) : data?.summary.regions === undefined ? (
                    "Sin registro"
                  ) : (
                    data?.summary.regions.toLocaleString("es-MX")
                  )}
                </li>
              </div>
            </div>
            <br></br>

            <div className="insights_mapa_info_mapa">
              {
                <MapResponsive
                  data={data}
                  setData={setData}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            </div>
          </section>
          <section className="insights_datas">
            <section className="insights_datas_info">
              <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={"../../sampleData/gauge.svg"}
                    alt="Descripción de la imagen"
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "#C7CBD2",
                      borderRadius: "4px",
                    }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">KPI’s</h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insights_datas_kpi_data">
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Cobertura
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      // style={{ marginTop: "-8px" }}
                    >
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="50%"
                            radius="xs"
                          />
                        </>
                      ) : !data ||
                        !Array.isArray(data.assets_analytics) ||
                        data.assets_analytics === null ||
                        data.assets_analytics[2]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data.assets_analytics[2].percentage.toFixed(1) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="50%"
                            radius="xs"
                          />
                        </>
                      ) : !data ||
                        data.assets_analytics === null ||
                        !Array.isArray(data.assets_analytics) ||
                        data.assets_analytics[2]?.value === undefined ? (
                        "Sin registro"
                      ) : (
                        data.assets_analytics[2].value.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Coincidencia
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      // style={{ marginTop: "-8px" }}
                    >
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : !data ||
                        data.assets_analytics === null ||
                        !Array.isArray(data.assets_analytics) ||
                        data.assets_analytics[0]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data.assets_analytics[0].percentage.toFixed(1) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : !data ||
                        data.assets_analytics === null ||
                        !Array.isArray(data.assets_analytics) ||
                        data.assets_analytics[0]?.value === undefined ? (
                        "Sin registro"
                      ) : (
                        data.assets_analytics[0].value.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Frecuencia ritmo
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      // style={{ marginTop: "-8px" }}
                    >
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="55%"
                            radius="xs"
                          />
                        </>
                      ) : !data ||
                        data.assets_analytics === null ||
                        !Array.isArray(data.assets_analytics) ||
                        data.assets_analytics[1]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data.assets_analytics[1].percentage.toFixed(1) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="55%"
                            radius="xs"
                          />
                        </>
                      ) : !data ||
                        data.assets_analytics === null ||
                        !Array.isArray(data.assets_analytics) ||
                        data.assets_analytics[1]?.value === undefined ? (
                        "Sin registro"
                      ) : (
                        data.assets_analytics[1].value.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Frec. Últ. 7 días
                    </div>
                    <div
                      className="insights_datas_kpi_data_data_2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {isLoading ? (
                        <Skeleton height={15} mt={6} width="55%" radius="xs" />
                      ) : (
                        <>
                          <div
                            style={{
                              marginRight: "4px",
                              color: "color-del-0%",
                            }}
                          >
                            0%
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#FA5252",
                                borderRadius: "50%",
                                marginRight: "5px", // Espacio entre el círculo y el texto
                              }}
                            ></div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="55%"
                            radius="xs"
                          />
                        </>
                      ) : (
                        "0 Enfriadores"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={"../../sampleData/fridges.svg"}
                    alt="Descripción de la imagen"
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "#C7CBD2",
                      borderRadius: "4px",
                    }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Estatus del parque
                  </h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insights_datas_kpi_data">
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Analizados
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="70%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[0]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[0]?.percentage.toLocaleString(
                          "es-MX"
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="70%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[0]?.total === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[0]?.total.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Funcionando
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[3]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[3]?.percentage.toLocaleString(
                          "es-MX"
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[3]?.total === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[3]?.total.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">Falla</div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[2]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[2]?.percentage.toLocaleString(
                          "es-MX"
                        ) + " %"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="60%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[2]?.total === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[2]?.total.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Atendidos
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[1]?.percentage === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[1]?.percentage.toLocaleString(
                          "es-MX"
                        ) + "%"
                      )}
                    </div>
                    <div className="insights_datas_kpi_data_data_3">
                      {isLoading == true ? (
                        <>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="80%"
                            radius="xs"
                          />
                        </>
                      ) : data?.status_parque[1]?.total === undefined ? (
                        "Sin registro"
                      ) : (
                        data?.status_parque[1]?.total.toLocaleString("es-MX") +
                        " Enfriadores"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="insights_datas_info2">
              <div className="insigths_datas_info2_control">
                <div className="insigths_datas_info2_control_title">
                  <img
                    src={"../../sampleData/fridge_c.svg"}
                    alt="Descripción de la imagen"
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "#C7CBD2",
                      borderRadius: "4px",
                    }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Control de activos
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title">
                  <h1 className="insights_datas_kpi_title_h1_data">
                    {isLoading == true ? (
                      <>
                        <div style={{ width: "2rem", height: "1rem" }}>
                          <Skeleton
                            height={15}
                            mt={6}
                            width="100%"
                            radius="xs"
                          />
                        </div>
                      </>
                    ) : data?.asset_control?.total === null ||
                      data?.asset_control?.total === undefined ? (
                      "0"
                    ) : (
                      data?.asset_control?.total?.toLocaleString("es-MX")
                    )}
                  </h1>
                  <h1 className="insights_datas_kpi_title_data_h1">
                    Total de enfriadores
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title_grapics">
                  <div
                    className="insigths_datas_info2_control_title_grapics_container"
                    style={{ borderBottom: "1px solid #cacaca" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        // padding: "8px 0px",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch",
                      }}
                    >
                      <div
                        style={{
                          color: "#3A3A3F",
                          // fontFamily: "DM Sans",
                          fontSize: "0.75rem",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "20px",
                        }}
                      >
                        Tipo
                      </div>
                      <div
                        style={{
                          color: "#3A3A3F",
                          // fontFamily: "DM Sans",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          fontStyle: "normal",
                          lineHeight: "20px",
                        }}
                      >
                        Cantidad
                      </div>
                    </div>
                    {IndicadoresData.sort((a, b) => {
                      const order = [
                        "Sin Riesgo",
                        "SIN RIESGO",
                        "Visita PdV",
                        "VISITA PDV PARA LECTURA",
                        "Actualizar Info",
                        "Estatus sin venta",
                        "SIN VENTA",
                        "Acciones urgentes",
                        "SIN COINCIDENCIA",
                      ];
                      const indexA = order.indexOf(a.algorithm);
                      const indexB = order.indexOf(b.algorithm);
                      return indexA - indexB;
                    }).map((algorithm, index) => {
                      const max = Math.max(
                        ...IndicadoresData.map((alg) => alg.value)
                      );

                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            padding: "0px",
                            gap: "16px",
                            alignSelf: "stretch",
                            marginBottom: "16px",
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            className="insights_datas_info_mantenimiento_datos_barras_color_Fallas"
                            style={{
                              width: `${(algorithm.value / max) * 100}%`,
                              background: isLoading != true ? "#D0EBFF" : "",
                            }}
                          >
                            <div className="insights_datas_info_mantenimiento_datos_barras_title">
                              {isLoading == true ? (
                                <>
                                  <div
                                    style={{
                                      width: "2rem",
                                      height: "1rem",
                                      // marginLeft: -10,
                                    }}
                                  >
                                    <Skeleton
                                      height={15}
                                      mt={6}
                                      width="400%"
                                      radius="xs"
                                    />
                                  </div>
                                </>
                              ) : (
                                <span
                                  style={{
                                    color: "#2393F4",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                  }}
                                >
                                  {algorithm.algorithm}
                                </span>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              color: "#000005",
                              fontSize: "0.75rem",
                              fontWeight: 400,
                              lineHeight: "15.62px",
                              marginLeft: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isLoading == true ? (
                              <>
                                <div style={{ width: "2rem", height: "1rem" }}>
                                  <Skeleton
                                    height={15}
                                    mt={6}
                                    width="100%"
                                    radius="xs"
                                  />
                                </div>
                              </>
                            ) : algorithm.value === undefined ? (
                              "Sin registro"
                            ) : (
                              algorithm.value.toLocaleString("es-MX")
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <section
                    className="insights_datas_mantenimiento_VerDetalles_principal"
                    style={{ display: isLoading == true ? "none" : "" }}
                    onClick={() => navigate("/home/indicator")}
                  >
                    <div className="insights_datas_mantenimiento_VerDetalles_h1">
                      Ver detalles
                    </div>
                    <img
                      src={"../../sampleData/arrow_b.png"}
                      alt="Descripción de la imagen"
                      style={{ marginTop: 4 }}
                    />
                  </section>
                </div>
              </div>
              <div className="insigths_datas_info2_control">
                <div className="insigths_datas_info2_control_mantenimiento">
                  <div className="insigths_datas_info2_control_title">
                    <img
                      src={"../../sampleData/tool.svg"}
                      alt="Descripción de la imagen"
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "#C7CBD2",
                        borderRadius: "4px",
                      }}
                    />
                    <h1 className="insights_datas_kpi_title_h1">
                      Mantenimiento
                    </h1>
                  </div>
                  <div className="insigths_datas_info2_control_title">
                    <h1 className="insights_datas_kpi_title_h1_data">
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "2rem", height: "1rem" }}>
                            <Skeleton
                              height={15}
                              mt={6}
                              width="100%"
                              radius="xs"
                            />
                          </div>
                        </>
                      ) : (
                        totalMaintenanceValue?.toLocaleString("es-MX")
                      )}
                    </h1>
                    <h1 className="insights_datas_kpi_title_data_h1">
                      Total de alertas y fallas
                    </h1>
                  </div>
                  <div className="insigths_datas_info2_control_title_grapics_container">
                    <section className="insights_datas_info_mantenimiento_datos">
                      <div className="insights_datas_info_mantenimiento_datos_h1">
                        Tipo
                      </div>
                      <div className="insights_datas_info_mantenimiento_datos_h1">
                        Cantidad
                      </div>
                    </section>
                    {/* Indicador barra */}
                    <section className="insights_datas_mantenimiento_barras">
                      <div
                        key={1}
                        className="insights_datas_info_mantenimiento_datos_barras"
                      >
                        <div
                          className="insights_datas_info_mantenimiento_datos_barras_color_Fallas"
                          style={{
                            width: `${
                              (failValue / (alertValue + failValue)) * 100
                            }%`,
                            backgroundColor: !isLoading ? "#ffc4cc" : "",
                          }}
                          onClick={() => navigate("/home/fails")}
                        >
                          <Tooltip label="Ver más">
                            <div
                              className="insights_datas_info_mantenimiento_datos_barras_title"
                              onClick={() => navigate("/home/fails")}
                            >
                              {isLoading == true ? (
                                <>
                                  <div
                                    style={{ width: "2rem", height: "1rem" }}
                                  >
                                    <Skeleton
                                      height={15}
                                      mt={6}
                                      width="400%"
                                      radius="xs"
                                    />
                                  </div>
                                </>
                              ) : (
                                <span
                                  style={{
                                    color: "#FA5252",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                  }}
                                >
                                  Fallas
                                </span>
                              )}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="insights_datas_info_mantenimiento_datos_barras_cantidad">
                          {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton
                                  height={15}
                                  mt={6}
                                  width="100%"
                                  radius="xs"
                                />
                              </div>
                            </>
                          ) : failValue === 0 ? (
                            "0"
                          ) : (
                            failValue.toLocaleString("es-MX")
                          )}
                        </div>
                      </div>
                      <div
                        key={2}
                        className="insights_datas_info_mantenimiento_datos_barras"
                      >
                        <div
                          className="insights_datas_info_mantenimiento_datos_barras_color_Alertas"
                          style={{
                            width: `${
                              ((data?.insights?.ALERT?.total || 0) /
                                (Number(data?.insights?.ALERT?.total) +
                                  Number(data?.insights?.FAIL?.total))) *
                              100
                            }%`,
                            backgroundColor: isLoading != true ? "#FFF3BF" : "",
                          }}
                          onClick={() => navigate("/home/alerts")}
                        >
                          <Tooltip label="Ver más">
                            <div
                              className="insights_datas_info_mantenimiento_datos_barras_title"
                              onClick={() => navigate("/home/alerts")}
                            >
                              {isLoading == true ? (
                                <>
                                  <div
                                    style={{ width: "2rem", height: "1rem" }}
                                  >
                                    <Skeleton
                                      height={15}
                                      mt={6}
                                      width="400%"
                                      radius="xs"
                                    />
                                  </div>
                                </>
                              ) : (
                                <span
                                  style={{
                                    color: "#E67700",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                  }}
                                >
                                  Alertas
                                </span>
                              )}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="insights_datas_info_mantenimiento_datos_barras_cantidad">
                          {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton
                                  height={15}
                                  mt={6}
                                  width="100%"
                                  radius="xs"
                                />
                              </div>
                            </>
                          ) : alertValue === 0 ? (
                            "0"
                          ) : (
                            alertValue?.toLocaleString("es-MX")
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
