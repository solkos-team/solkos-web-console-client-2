import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
import { Card, DonutChart, Title, Legend } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapInsightsComponent from "../../../components/mapInsights";
import { SkeletonInsights } from "../../../components/skeletonInsights/SkeletonInsights";
import {
  InsightsData,
  CoolerInterface as Cooler,
} from "../../../interfaces/CoolerInterface";
import { Skeleton } from "@mantine/core";
import { MapInsights } from "./MapInsights";
export default function Insights() {
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [showData, setShowData] = useState(false);
  const [items, numIntems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState(0);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const handleMapKeyChange = () => {
    setMapKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);
  const abrirDrawer = () => {
    setDrawerAbierto(true);
  };
  const cerrarDrawer = () => {
    setDrawerAbierto(false);
  };
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body);
      setInsightsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };
  const body2 = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    page_size: 10000,
    page_number: 1,
  };
  const fetchData2 = async () => {
    try {
      const data = await fetchUniversal("coolers", body2, setIsLoading);
      setCoolersData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  const fetchDataNumerOfItems = async () => {
    try {
      const data = await fetchInsights(pathVerify());
      console.log(data);
      numIntems(Number(data.insights.INDICATOR.total));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching coolers:", error);
    }
  };
  useEffect(() => {
    fetchDataNumerOfItems();
    fetchData();
    fetchData2();
    handleMapKeyChange();
  }, [dt, dto]);

  const filteredMarkers = coolersData
    ? coolersData
      .filter(
        (cooler) =>
          parseFloat(cooler.latitude) !== 0 &&
          parseFloat(cooler.longitude) !== 0
      )
      .map((cooler) => ({
        latitude: parseFloat(cooler.latitude),
        longitude: parseFloat(cooler.longitude),
      }))
    : [];

  const markers = filteredMarkers;

  useEffect(() => { }, [markers]);

  const [showAll1, setShowAll1] = useState(true);

  const toggleShowAll1 = () => {
    setShowAll1(!showAll1);
  };

  const [showAll2, setShowAll2] = useState(false);

  const toggleShowAll2 = () => {
    setShowAll2(!showAll2);
  };

  const [showAll3, setShowAll3] = useState(false);

  const toggleShowAll3 = () => {
    setShowAll3(!showAll3);
  };
  sessionStorage.setItem(
    "TtlCoolers",
    insightsData?.summary.coolers.toLocaleString()
  );
  return (
    <div className="insights_principal_container">
      <PageFilter status={isLoading} />
      <br></br>
      <section className="insights_title">
        <h1 className="insights_title_h1">Cooler Insights</h1>
        <p className="insights_title_p">
          Ve el panorama general de los enfriadores y toma acciones
        </p>
      </section>
      <section className="insights_principal">
        <section className="insights_mapa">
          <div className="insights_mapa_info_title">
            <img
              className="insights_mapa_info_title_mapa"
              src={"../../sampleData/map.svg"}
              alt="Descripción de la imagen"
              style={{ width: "22px", height: "22px" }}
            />
            <h1 className="insights_mapa_info_title_h1">
              Acerca de los equipos
            </h1>
          </div>
          {/* description from mapa */}
          <div className="insights_mapa_info_descripcion">
            <p className="insights_mapa_info_descripcion_p">
              Visualiza la ubicación donde los enfriadores han sido instalados.
            </p>
          </div>
          {/* datas from mapa */}
          <div className="insights_mapa_info_datas">
            <ol className="insights_mapa_info_datas_data">
              <li className="insights_mapa_info_datas_data_li">Enfriadores</li>
              <li className="insights_mapa_info_datas_data_li_value">
                {isLoading == true ? (
                  <>
                    <Skeleton height={15} mt={6} width="100%" radius="xl" />
                  </>
                ) : insightsData?.summary.coolers === undefined ? (
                  "Sin registro"
                ) : (
                  insightsData?.summary.coolers.toLocaleString()
                )}
              </li>
            </ol>
            <ol className="insights_mapa_info_datas_data">
              <li className="insights_mapa_info_datas_data_li">Rutas</li>
              <li className="insights_mapa_info_datas_data_li_value">
                {isLoading == true ? (
                  <>
                    <Skeleton height={15} mt={6} width="100%" radius="xl" />
                  </>
                ) : insightsData?.summary.routes === undefined ? (
                  "Sin registro"
                ) : (
                  insightsData?.summary.routes.toLocaleString()
                )}
              </li>
            </ol>
            <ol className="insights_mapa_info_datas_data">
              <li className="insights_mapa_info_datas_data_li">Unidad Op.</li>
              <li className="insights_mapa_info_datas_data_li_value">
                {isLoading == true ? (
                  <>
                    <Skeleton height={15} mt={6} width="100%" radius="xl" />
                  </>
                ) : insightsData?.summary.operative_units === undefined ? (
                  "Sin registro"
                ) : (
                  insightsData?.summary.operative_units.toLocaleString()
                )}
              </li>
            </ol>
            <ol className="insights_mapa_info_datas_data">
              <li className="insights_mapa_info_datas_data_li">Regiones</li>
              <li className="insights_mapa_info_datas_data_li_value">
                {isLoading == true ? (
                  <>
                    <Skeleton height={15} mt={6} width="100%" radius="xl" />
                  </>
                ) : insightsData?.summary.regions === undefined ? (
                  "Sin registro"
                ) : (
                  insightsData?.summary.regions.toLocaleString()
                )}
              </li>
            </ol>
            <ol className="insights_mapa_info_datas_data">
              <li className="insights_mapa_info_datas_data_li">Zonas</li>
              <li className="insights_mapa_info_datas_data_li_value">
                {isLoading == true ? (
                  <>
                    <Skeleton height={15} mt={6} width="100%" radius="xl" />
                  </>
                ) : insightsData?.summary.zones === undefined ? (
                  "Sin registro"
                ) : (
                  insightsData?.summary.zones.toLocaleString()
                )}
              </li>
            </ol>
          </div>
          {/* Mapa inf and filters */}
          <div className="insights_mapa_info_mapa_info">
            <h1 className="insights_mapa_info_mapa_info">
              Visualización de enfriadores:
            </h1>
            {/* <div className="insights_mapa_info_mapa_filters"></div> */}
          </div>
          {/* Mapa */}
          <div className="insights_mapa_info_mapa">
            {<MapInsightsComponent items={items} data={coolersData} />}
          </div>
        </section>
        <section className="insights_datas">
          <section className="insights_datas_info">
            <div className="insights_datas_kpi">
              <div className="insights_datas_kpi_title">
                <img
                  src={"../../sampleData/kpi.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "22px", height: "22px" }}
                />
                <h1 className="insights_datas_kpi_title_h1">KPI’s</h1>
              </div>
              {/* Informacion KPI´s */}
              <div className="insights_datas_kpi_data">
                {/* <ol className="insights_datas_kpi_data_data">
                  <li className="insights_datas_kpi_data_data_1">Cobertura</li>
                  <li className="insights_datas_kpi_data_data_1">0%</li>
                  <li className="insights_datas_kpi_data_data_1">0 Enfriadores</li>
                </ol>
                <ol className="insights_datas_kpi_data_data">
                  <li>Coincidencia</li>
                  <li>0%</li>
                  <li>0 Enfriadores</li>
                </ol>
                <ol className="insights_datas_kpi_data_data">
                  <li>Frecuencia</li>
                  <li>0%</li>
                  <li>0 Enfriadores</li>
                </ol> */}
                <div className="insights_datas_kpi_data_data">
                  <div className="insights_datas_kpi_data_data_1">
                    Cobertura
                  </div>
                  <div className="insights_datas_kpi_data_data_2">
                    0%
                  </div>
                  <div className="insights_datas_kpi_data_data_3">
                    0 Enfriadores
                  </div>
                </div>
                <div className="insights_datas_kpi_data_data">
                  <div className="insights_datas_kpi_data_data_1">
                    Coincidencia
                  </div>
                  <div className="insights_datas_kpi_data_data_2">
                    0%
                  </div>
                  <div className="insights_datas_kpi_data_data_3">
                    0 Enfriadores
                  </div>
                </div>
                <div className="insights_datas_kpi_data_data">
                  <div className="insights_datas_kpi_data_data_1">
                    Frecuencia
                  </div>
                  <div className="insights_datas_kpi_data_data_2">
                    0%
                  </div>
                  <div className="insights_datas_kpi_data_data_3">
                    0 Enfriadores
                  </div>
                </div>
              </div>
            </div>
            <div className="insights_datas_grafica">
              <div className="insights_datas_kpi_title">
                <img
                  src={"../../sampleData/kpi.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "22px", height: "22px" }}
                />
                <h1 className="insights_datas_kpi_title_h1">Estatus del parque</h1>
              </div>
              <div className="insights_datas_container">
                <div className="insights_datas_container_Grafica">
                  <MapInsights />
                </div>
                <div className="insights_datas_container_Grafica_Datas">
                  <ol className="insights_datas_container_Grafica_Datas_ol">
                    <li className="insights_datas_container_Grafica_Datas_li_title">🔵 Analizados</li>
                    <li className="insights_datas_container_Grafica_Datas_li_Enf">Enfriadores</li>
                    <li className="insights_datas_container_Grafica_Datas_li_total">
                      0
                    </li>
                  </ol>
                  <ol className="insights_datas_container_Grafica_Datas_ol">
                    <li className="insights_datas_container_Grafica_Datas_li_title">🟢 Funcionando</li>
                    <li className="insights_datas_container_Grafica_Datas_li_Enf">Enfriadores</li>
                    <li className="insights_datas_container_Grafica_Datas_li_total">
                      0
                    </li>
                  </ol>
                  <ol className="insights_datas_container_Grafica_Datas_ol">
                    <li className="insights_datas_container_Grafica_Datas_li_title">🔴 Falla</li>
                    <li className="insights_datas_container_Grafica_Datas_li_Enf">Enfriadores</li>
                    <li className="insights_datas_container_Grafica_Datas_li_total">
                      {isLoading == true ? (
                        <>
                          <Skeleton height={15} mt={6} width="100%" radius="xl" />
                        </>
                      ) : insightsData?.insights?.FAIL?.total === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.insights?.FAIL?.total.toLocaleString()
                      )}
                    </li>
                  </ol>
                  <ol className="insights_datas_container_Grafica_Datas_ol">
                    <li className="insights_datas_container_Grafica_Datas_li_title">🟡 Atendidos</li>
                    <li className="insights_datas_container_Grafica_Datas_li_Enf">Enfriadores</li>
                    <li className="insights_datas_container_Grafica_Datas_li_total">
                      0
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="insights_datas_info2">
            <div className="insigths_datas_info2_control">
              <div className="insigths_datas_info2_control_title">
                <img
                  src={"../../sampleData/actividad.svg"}
                  alt="Descripción de la imagen"
                  style={{ width: "22px", height: "22px" }}
                />
                <h1 className="insights_datas_kpi_title_h1">
                  Control de activos
                </h1>
              </div>
              <div className="insigths_datas_info2_control_title">
                <h1 className="insights_datas_kpi_title_h1_data">0</h1>
                <h1 className="insights_datas_kpi_title_data_h1">
                  Total de enfriadores
                </h1>
              </div>
              <div className="insigths_datas_info2_control_title_grapics">
                <div className="insigths_datas_info2_control_title_grapics_container">
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
                        fontSize: "0.8vw",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Tipo
                    </div>
                    <div
                      style={{
                        color: "#3A3A3F",
                        // fontFamily: "DM Sans",
                        fontSize: "0.8vw",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Cantidad
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="insigths_datas_info2_mantenimiento">
              <div className="insigths_datas_info2_control_mantenimiento">
                <div className="insigths_datas_info2_control_title">
                  <img
                    src={"../../sampleData/aler.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">Mantenimiento</h1>
                </div>
                <div className="insigths_datas_info2_control_title">
                  <h1 className="insights_datas_kpi_title_h1_data">                    
                    {isLoading == true ? (
                      <>
                      <div style={{width:"2rem",height:"1rem"}}>
                        <Skeleton height={15} mt={6} width="100%" radius="xl" />
                      </div>
                      </>
                    ) : insightsData?.insights?.ALERT.total == undefined && insightsData?.insights?.FAIL.total == undefined ? (
                      "Sin registro"
                    ) : (
                      insightsData?.insights?.ALERT.total + insightsData?.insights?.FAIL.total
                    )}
                  </h1>
                  <h1 className="insights_datas_kpi_title_data_h1">
                    Total de alertas
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title_grapics_container">
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
                        fontSize: "0.8vw",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Tipo
                    </div>
                    <div
                      style={{
                        color: "#3A3A3F",
                        // fontFamily: "DM Sans",
                        fontSize: "0.8vw",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "20px",
                      }}
                    >
                      Cantidad
                    </div>
                  </div>
                  {/* Indicador barra */}
                  <div
                    key={1}
                    style={{
                      display: "flex",
                      padding: "0px",
                      gap: "16px",
                      alignSelf: "stretch",
                      marginBottom: "1px"
                    }}
                  >
                    <div
                      style={{
                        width: "13vw",
                        height: "2.0vw",
                        borderRadius: "4px",
                        background: "#ffc4cc",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px",
                      }}
                    >
                      <div
                        style={{
                          color: "#142257",
                          fontSize: "0.8vw",
                          fontWeight: 400,
                          lineHeight: "20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {insightsData?.insights?.FAIL.level ===
                          "FAIL"
                          ? "Fallas"
                          : ''}
                      </div>
                    </div>
                    <div
                      style={{
                        color: "#000005",
                        fontSize: "0.8vw",
                        fontWeight: 400,
                        lineHeight: "normal",
                        marginLeft: "auto",
                      }}
                    >
                      {isLoading == true ? (
                        <>
                        <div style={{width:"2rem",height:"1rem"}}>
                          <Skeleton height={15} mt={6} width="100%" radius="xl" />
                        </div>                        
                        </>
                      ) : insightsData?.insights?.FAIL.total === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.insights?.FAIL.total
                      )}
                    </div>
                  </div>
                  <div
                    key={2}
                    style={{
                      display: "flex",
                      padding: "0px",
                      gap: "16px",
                      alignSelf: "stretch",
                      marginBottom: "1px"
                    }}
                  >
                    <div
                      style={{
                        width: "13vw",
                        height: "2.0vw",
                        borderRadius: "4px",
                        background: "#FEF5C7",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px",
                      }}
                    >
                      <div
                        style={{
                          color: "#142257",
                          fontSize: "0.8vw",
                          fontWeight: 400,
                          lineHeight: "20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {insightsData?.insights?.ALERT.level ===
                          "ALERT"
                          ? "Alertas"
                          : ''}
                      </div>
                    </div>
                    <div
                      style={{
                        color: "#000005",
                        fontSize: "0.8vw",
                        fontWeight: 400,
                        lineHeight: "normal",
                        marginLeft: "auto",
                      }}
                    >                      
                      {isLoading == true ? (
                        <>
                        <div style={{width:"2rem",height:"1rem"}}>
                          <Skeleton height={15} mt={6} width="100%" radius="xl" />
                        </div>                        
                        </>
                      ) : insightsData?.insights?.ALERT.total === undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.insights?.ALERT.total
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
