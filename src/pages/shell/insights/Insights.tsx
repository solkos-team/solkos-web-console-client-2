import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { fetchInsights, fetchUniversal } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MapInsightsComponent from "../../../components/mapInsights";
import { SkeletonInsights } from "../../../components/skeletonInsights/SkeletonInsights";
import {
  InsightsData,
  CoolerInterface as Cooler,
} from "../../../interfaces/CoolerInterface";
import { Skeleton } from "@mantine/core";
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
      numIntems(Number(data.insights.INDICATOR.total));
      console.log(data);
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
        <p className="insights_title_p">Ve el panorama general de los enfriadores y toma acciones</p>
      </section>
      <section className="insights_principal">
        <section className="insights_mapa">
          <div className="insights_mapa_info_title">
            <img className="insights_mapa_info_title_mapa" src={"../../sampleData/map.png"} alt="Descripción de la imagen" />
            <h1 className="insights_mapa_info_title_h1">A cerca de los equipos</h1>
          </div>
          {/* description from mapa */}
          <div className="insights_mapa_info_descripcion">
            <p className="insights_mapa_info_descripcion_p">Visualiza la ubicación donde los enfriadores han sido instalados.</p>
          </div>
          {/* datas from mapa */}
          <div className="insights_mapa_info_datas">
            <div className="insights_mapa_info_datas_data">
              <div className="insights_mapa_info_datas_data_name">
                <h1 className="insights_mapa_info_datas_data_name_h1">Enfriadores</h1>
              </div>
              <div className="insights_mapa_info_datas_data_value">
                <h1 className="insights_mapa_info_datas_data_name_h1_value">
                  {isLoading == true ? (
                    <>
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton
                          height={15}
                          mt={6}
                          width="70px"
                          radius="xl"
                        />
                      </div>
                    </>
                  ) : insightsData?.summary.coolers === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.coolers.toLocaleString()
                  )}
                </h1>
              </div>
            </div>
            <div className="insights_mapa_info_datas_data">
              <div className="insights_mapa_info_datas_data_name">
                <h1 className="insights_mapa_info_datas_data_name_h1">Regiones</h1>
              </div>
              <div className="insights_mapa_info_datas_data_value">
                <h1 className="insights_mapa_info_datas_data_name_h1_value">
                  {isLoading == true ? (
                    <>
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton
                          height={15}
                          mt={6}
                          width="70px"
                          radius="xl"
                        />
                      </div>
                    </>
                  ) : insightsData?.summary.regions === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.regions.toLocaleString()
                  )}
                </h1>
              </div>
            </div>
            <div className="insights_mapa_info_datas_data">
              <div className="insights_mapa_info_datas_data_name">
                <h1 className="insights_mapa_info_datas_data_name_h1">Zonas</h1>
              </div>
              <div className="insights_mapa_info_datas_data_value">
                <h1 className="insights_mapa_info_datas_data_name_h1_value">
                  {isLoading == true ? (
                    <>
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton
                          height={15}
                          mt={6}
                          width="70px"
                          radius="xl"
                        />
                      </div>
                    </>
                  ) : insightsData?.summary.zones === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.zones.toLocaleString()
                  )}
                </h1>
              </div>
            </div>
            <div className="insights_mapa_info_datas_data">
              <div className="insights_mapa_info_datas_data_name">
                <h1 className="insights_mapa_info_datas_data_name_h1">Unidad OP.</h1>
              </div>
              <div className="insights_mapa_info_datas_data_value">
                <h1 className="insights_mapa_info_datas_data_name_h1_value">
                  {isLoading == true ? (
                    <>
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton
                          height={15}
                          mt={6}
                          width="70px"
                          radius="xl"
                        />
                      </div>
                    </>
                  ) : insightsData?.summary.operative_units ===
                    undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.operative_units.toLocaleString()
                  )}
                </h1>
              </div>
            </div>
            <div className="insights_mapa_info_datas_data">
              <div className="insights_mapa_info_datas_data_name">
                <h1 className="insights_mapa_info_datas_data_name_h1">Rutas</h1>
              </div>
              <div className="insights_mapa_info_datas_data_value">
                <h1 className="insights_mapa_info_datas_data_name_h1_value">
                  {isLoading == true ? (
                    <>
                      <div style={{ width: "100%", height: "100%" }}>
                        <Skeleton
                          height={15}
                          mt={6}
                          width="100%"
                          radius="xl"
                        />
                      </div>
                    </>
                  ) : insightsData?.summary.routes === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.routes.toLocaleString()
                  )}
                </h1>
              </div>
            </div>
          </div>
          {/* Mapa inf and filters */}
          <div className="insights_mapa_info_mapa_info">
            <h1 className="insights_mapa_info_mapa_info">Visualización de enfriadores:</h1>
            <div className="insights_mapa_info_mapa_filters"></div>
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
                  src={"../../sampleData/indc2.png"}
                  alt="Descripción de la imagen"
                  style={{ width: "25px", height: "25px" }}
                />
                <h1 className="insights_datas_kpi_title_h1">KPI’s</h1>
              </div>
              <div className="insights_datas_kpi_data">
                <ol className="insights_datas_kpi_data_data">
                  <li>Cobertura</li>
                  <li>n</li>
                  <li>d</li>
                </ol>
                <ol className="insights_datas_kpi_data_data">
                  <li>Coincidencia</li>
                  <li>n</li>
                  <li>d</li>
                </ol>
                <ol className="insights_datas_kpi_data_data">
                  <li>Frecuencia</li>
                  <li>n</li>
                  <li>d</li>
                </ol>

              </div>
            </div>
            <div className="insights_datas_grafica"></div>
          </section>
          <section className="insights_datas_info2">
            <div className="insigths_datas_info2_control">
              <div className="insigths_datas_info2_control_title">
                <img
                  src={"../../sampleData/cooler1.png"}
                  alt="Descripción de la imagen"
                  style={{ width: "22px", height: "22px" }}
                />
                <h1 className="insights_datas_kpi_title_h1">Control de activos</h1>
              </div>
              <div className="insigths_datas_info2_control_title">
                <h1 className="insights_datas_kpi_title_h1">0</h1>
                <h1 className="insights_datas_kpi_title_h1">Total de enfriadores</h1>
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
                        fontSize: "14px",
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
                        fontSize: "14px",
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
                    src={"../../sampleData/alert_y.png"}
                    alt="Descripción de la imagen"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">Mantenimiento</h1>
                </div>
                <div className="insigths_datas_info2_control_title">
                  <h1 className="insights_datas_kpi_title_h1">0</h1>
                  <h1 className="insights_datas_kpi_title_h1">Total de alertas</h1>
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
                        fontSize: "14px",
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
                        fontSize: "14px",
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
          </section>
        </section>
      </section>
    </div>
  );
}
