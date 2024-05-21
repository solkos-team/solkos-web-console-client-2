import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pathVerify } from '../../../../Functions/pathVerify';
import { fetchInsights, fetchUniversal } from '../../../../utils/apiUtils';
import PageFilter from '../../../../components/pageFilter';
import { Skeleton, Tooltip } from '@mantine/core';
import MapInsightsComponent from '../../../../components/mapInsights';
import { Insights as InsightsIT } from "../../../../interfaces/InsightsInterfaces";
import { InsightsData, CoolerInterface as Cooler } from '../../../../interfaces/CoolerInterface';
import { AlertIcon, FailIcon, TransmitionIcon, IconEquiposTransmitiendo, IconEquiposNoTransmitiendo, FallaACompresor, FallaAltaTemperatura, FallaPosibleDañoElectrico, AlertaACompresor, AlertaDesconexion, AlertaAltaTemperatura } from './Icons';
import { DrawerNS } from './DrawerNS';
import { useDisclosure } from '@mantine/hooks';
import { HeaderInsights } from '../../insights/Responsive/HeaderInsights';
import { AcercaDeLosEquiposIcon } from '../../../../sampleData/icons';
import { MapInsightsResponsive } from '../../insights/Responsive/MapInsightsResponsive';

export const Insights = () => {
  const [insightsData, setInsightsData] = useState<InsightsIT | null>(null);
  const [insightsDataAlertas, setInsightsDataAlertas] = useState<Cooler[] | null>(null);
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [items, numIntems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [mapKey, setMapKey] = useState(0);
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

  const body = { customer: dto, path: pathVerify() };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("insights", body, setIsLoading);
      setInsightsData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };
  const body2 = {
    customer: dto,
    class: "STK",
    algorithm: ["INSTALLED"],
    path: pathVerify(),
    // page_size: 10000,
    page_size: 10,
    page_number: 1,
  };
const fetchDataAlertas = async () => {
  try {
    const data = await fetchUniversal("alerts", body, setIsLoading);
    setInsightsDataAlertas(data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching insights:", error);
  }
}
  const fetchDataNumerOfItems = async () => {
    try {
      const data = await fetchInsights(pathVerify());
      numIntems(Number(data.insights.INDICATOR.total));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };
  useEffect(() => {
    fetchDataNumerOfItems();
    fetchData();
    fetchDataAlertas();
    handleMapKeyChange();
  }, [dt, dto]);

  const IndicadoresData =
    insightsData?.insights?.INDICATOR?.algorithms.filter(
      (data) => data.class == "ASSET_MANAGEMENT_ACTIONABLE"
    ) || [];
  // insightsData?.summary.coolers.toLocaleString("es-MX") != null || insightsData?.summary.coolers.toLocaleString("es-MX") != undefined ? sessionStorage.setItem("TtlCoolers",insightsData?.summary.coolers.toLocaleString("es-MX")) : ''
  const [drawerValues, setDrawerValues] = useState({})
  const openDrawer = (icon, title, clase?, algorithm?, totalData?, type?) => {
    setDrawerValues({ icon: icon, title: title, class: clase, algoritmo: algorithm, total: totalData, type: type })
    open()
    console.log('funciona')
  }
  const sum2 = IndicadoresData.reduce((prev, curr) => prev + curr.value, 0);
  insightsData?.summary.coolers.toLocaleString("es-MX") != null ||
  insightsData?.summary.coolers.toLocaleString("es-MX") != undefined
    ? sessionStorage.setItem(
        "TtlCoolers",
        insightsData?.summary.coolers.toLocaleString("es-MX")
      )
    : "";
  return (
    <div className="insights_principal_container">
      <PageFilter status={isLoading} />
      <br></br>
      <section className="insights_contenido_principal">
        <section className="insights_title">
          <div className="insights_title_h1">Cooler Insights</div>
          <p className="insights_title_p">
            Ve el panorama general de los enfriadores y toma acciones
          </p>
          <HeaderInsights />
        </section>
        <section className="insights_principal">
          <section className="insights_mapa">
            <div className="insights_mapa_info_title">
              <img
                className="insights_mapa_info_title_mapa"
                src={AcercaDeLosEquiposIcon}
                alt="Descripción de la imagen"
                style={{ width: "20px", height: "20px" }}
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
                  ) : insightsData?.summary.coolers === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.coolers.toLocaleString("es-MX")
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
                  ) : insightsData?.summary.regions === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.regions.toLocaleString("es-MX")
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
                  ) : insightsData?.summary.zones === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.zones.toLocaleString("es-MX")
                  )}
                </li>
              </div>
              
            </div>
            <br></br>
            {/* Mapa inf and filters */}
            {/* <div className="insights_mapa_info_mapa_info">
              <h1 className="insights_mapa_info_mapa_info_h1">
                Visualización de enfriadores:
              </h1> */}
            {/* <div className="insights_mapa_info_mapa_filters"></div> */}
            {/* </div> */}
            {/* Mapa */}
            <div className="insights_mapa_info_mapa">
              {
                <MapInsightsComponent
                  items={items}
                  data={insightsData?.geo_data}
                />
              }
              <MapInsightsResponsive />
            </div>
          </section>
          <section className="insights_datas">
            <section className="insights_datas_info">
            <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={"../../sampleData/status_park_icon.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Estatus del parque
                  </h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insights_datas_kpi_data">
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Transmitiendo
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
                      ) : insightsData?.status_parque[0]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[0]?.percentage.toLocaleString(
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
                      ) : insightsData?.status_parque[0]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[0]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
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
                      ) : insightsData?.status_parque[3]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[3]?.percentage.toLocaleString(
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
                      ) : insightsData?.status_parque[3]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[3]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
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
                      ) : insightsData?.status_parque[2]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[2]?.percentage.toLocaleString(
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
                      ) : insightsData?.status_parque[2]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[2]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
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
                      ) : insightsData?.status_parque[1]?.percentage ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[1]?.percentage.toLocaleString(
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
                      ) : insightsData?.status_parque[1]?.total ===
                        undefined ? (
                        "Sin registro"
                      ) : (
                        insightsData?.status_parque[1]?.total.toLocaleString(
                          "es-MX"
                        ) + " Enfriadores"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={TransmitionIcon}
                    alt="Descripción de la imagen"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">Estado de la transmisión</h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insightsNS_datas_statusTransmition_data">
                  <div className="insightsNS_datas_statusTransmition_data_data">
                    <div>Tipo</div>
                    <div>Cantidad</div>
                  </div>
                  <div className="insightsNS_datas_statusTransmition_data_data" onClick={() => { openDrawer(IconEquiposTransmitiendo, 'Equipos Transmitiendo') }}>
                    {isLoading == true ? 
                    (
                      <>
                        <div style={{ width: "30%", height: "1rem" }}>
                          <Skeleton height={15} mt={6} width="100%" radius="xl" />
                        </div>
                      </>
                    ):
                    <React.Fragment>
                      <div style={{ width: '50%', backgroundColor: '#C0F2C8', borderRadius: '4px' }}>Transmitiendo</div>
                      <div>10</div>
                    </React.Fragment>                    
                    }                    
                  </div>
                  <div className="insightsNS_datas_statusTransmition_data_data" onClick={() => { openDrawer(IconEquiposNoTransmitiendo, 'Equipos no transmitiendo') }}>
                    {
                      isLoading == true ? 
                      (
                        <>
                          <div style={{ width: "30%", height: "1rem" }}>
                            <Skeleton height={15} mt={6} width="100%" radius="xl" />
                          </div>
                        </>
                      ) :
                      <React.Fragment>
                        <div style={{ width: '20%', backgroundColor: '#FFC7CD', borderRadius: '4px' }}>Sin Transmisión</div>
                        <div>2</div>
                      </React.Fragment>
                    }                    
                  </div>
                </div>
              </div>
              
            </section>
            <section className="insights_datas_info2">
              <div className="insigths_datas_info2_control">
                <div className="insigths_datas_info2_control_title">
                  <img
                    src={FailIcon}
                    alt="Descripción de la imagen"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Fallas
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title_grapics">
                  <div className="insigths_datas_info2_control_title_grapics_container">
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
                    {insightsDataAlertas == null ? [] : insightsDataAlertas
                      .filter(
                        (cooler) =>
                          cooler.class === "OPE" &&
                          cooler.algorithm.endsWith("FAIL") &&
                          cooler.algorithm !== "NO_FAIL"
                      )
                      .map(
                        (algorithm, index) => {
                          const max = Math.max(
                            ...IndicadoresData.map(
                              (alg) => alg.value
                            )
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
                                boxSizing: "border-box"
                              }}
                            >
                              <div className="insights_datas_info_controlDeActivos_barras"
                                style={{
                                  width: `${(algorithm.value / max) * 10000}%`,
                                  background: isLoading != true ? "#FFC7CD" : '',
                                }}
                                onClick={
                                  () => {
                                    openDrawer(algorithm.algorithm === "COMPRESSOR_FAIL"
                                      ? FallaACompresor : algorithm.algorithm === "FREEZING_FAIL"
                                        ? FallaACompresor : algorithm.algorithm === "TEMPERATURE_FAIL"
                                          ? FallaAltaTemperatura : algorithm.algorithm === "VOLTAGE_FAIL"
                                            ? FallaPosibleDañoElectrico : ''
                                      , algorithm.algorithm === "COMPRESSOR_FAIL"
                                        ? "Falla asociada al compresor"
                                        : algorithm.algorithm === "DISCONNECTIONS_FAIL"
                                          ? "Desconexión"
                                          : algorithm.algorithm === "TEMPERATURE_FAIL"
                                            ? "Alta temperatura"
                                            : algorithm.algorithm === "VOLTAGE_FAIL"
                                              ? "Posible daño eléctrico"
                                              : algorithm.algorithm === "FREEZING_FAIL"
                                                ? "Evaporador bloqueado"
                                                : algorithm.algorithm, algorithm.class, algorithm.algorithm, algorithm.value, 'FALLA')
                                  }}
                              >
                                <div className="insights_datas_info_mantenimiento_datos_barras_title">
                                  {isLoading == true ? (
                                    <>
                                      <div style={{ width: "2rem", height: "1rem" }}>
                                        <Skeleton height={15} mt={6} width="100%" radius="xl" />
                                      </div>
                                    </>
                                  ) : algorithm.algorithm === "COMPRESSOR_FAIL"
                                    ? "Falla asociada al compresor"
                                    : algorithm.algorithm === "DISCONNECTIONS_FAIL"
                                      ? "Desconexión"
                                      : algorithm.algorithm === "TEMPERATURE_FAIL"
                                        ? "Alta temperatura"
                                        : algorithm.algorithm === "VOLTAGE_FAIL"
                                          ? "Posible daño eléctrico"
                                          : algorithm.algorithm === "FREEZING_FAIL"
                                            ? "Evaporador bloqueado"
                                            : algorithm.algorithm}
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
                                  justifyContent: "center"
                                }}
                              >
                                {isLoading == true ? (
                                  <>
                                    <div style={{ width: "2rem", height: "1rem" }}>
                                      <Skeleton height={15} mt={6} width="100%" radius="xl" />
                                    </div>
                                  </>
                                ) : algorithm.value === undefined
                                  ? "Sin registro"
                                  : algorithm.value.toLocaleString("es-MX")}
                              </div>
                            </div>
                          );
                        }
                      )}                    
                  </div>
                </div>
              </div>
              <div className="insigths_datas_info2_control">
                <div className="insigths_datas_info2_control_title">
                  <img
                    src={AlertIcon}
                    alt="Descripción de la imagen"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Alertas
                  </h1>
                </div>
                <div className="insigths_datas_info2_control_title_grapics">
                  <div className="insigths_datas_info2_control_title_grapics_container">
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
                    {insightsDataAlertas == null ? [] : insightsDataAlertas
                        .filter(
                          (algorithm) =>
                            algorithm.algorithm ===
                            "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT" ||
                            algorithm.algorithm === "VOLTAGE_ALERT" ||
                            algorithm.algorithm === "HIGH_TEMPERATURE_ALERT" ||
                            algorithm.algorithm === "DISCONNECTION_ALERT"
                        )
                        .map(
                          (algorithm, index) => {
                            const max = Math.max(
                              ...IndicadoresData.map(
                                (alg) => alg.value
                              )
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
                                  boxSizing: "border-box"

                                }}
                              >
                                <div className="insights_datas_info_controlDeActivos_barras"
                                  style={{
                                    width: `${(algorithm.value / max) * 10000}%`,
                                    background: isLoading != true ? "#FEF5C7" : '',
                                  }}
                                  onClick={
                                    () => {
                                      openDrawer(
                                        algorithm.algorithm ===
                                          "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                                          ? AlertaACompresor : algorithm.algorithm === "DISCONNECTION_ALERT"
                                            ? AlertaDesconexion : algorithm.algorithm === "HIGH_TEMPERATURE_ALERT"
                                              ? AlertaAltaTemperatura : algorithm.algorithm === "VOLTAGE_ALERT"
                                                ? AlertaACompresor : ''
                                        , algorithm.algorithm ===
                                          "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                                          ? "Alta demanda del compresor"
                                          : algorithm.algorithm === "DISCONNECTION_ALERT"
                                            ? "Desconexión"
                                            : algorithm.algorithm === "HIGH_TEMPERATURE_ALERT"
                                              ? "Alta temperatura"
                                              : algorithm.algorithm === "HIGH_VOLTAGE_ALERT"
                                                ? "Alto voltaje"
                                                : algorithm.algorithm === "LOW_VOLTAGE_ALERT"
                                                  ? "Bajo voltaje"
                                                  : algorithm.algorithm === "MOVED_VISIT_ALERT"
                                                    ? "Movimiento"
                                                    : algorithm.algorithm === "VOLTAGE_ALERT"
                                                      ? "Bajo/Alto voltaje"
                                                      : algorithm.algorithm, algorithm.class, algorithm.algorithm, algorithm.value, 'ALERTA')
                                    }}
                                >
                                  <div className="insights_datas_info_mantenimiento_datos_barras_title">
                                    {isLoading == true ? (
                                      <>
                                        <div style={{ width: "2rem", height: "1rem" }}>
                                          <Skeleton height={15} mt={6} width="100%" radius="xl" />
                                        </div>
                                      </>
                                    ) : algorithm.algorithm ===
                                      "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                                      ? "Alta demanda del compresor"
                                      : algorithm.algorithm === "DISCONNECTION_ALERT"
                                        ? "Desconexión"
                                        : algorithm.algorithm === "HIGH_TEMPERATURE_ALERT"
                                          ? "Alta temperatura"
                                          : algorithm.algorithm === "HIGH_VOLTAGE_ALERT"
                                            ? "Alto voltaje"
                                            : algorithm.algorithm === "LOW_VOLTAGE_ALERT"
                                              ? "Bajo voltaje"
                                              : algorithm.algorithm === "MOVED_VISIT_ALERT"
                                                ? "Movimiento"
                                                : algorithm.algorithm === "VOLTAGE_ALERT"
                                                  ? "Bajo/Alto voltaje"
                                                  : algorithm.algorithm}
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
                                    justifyContent: "center"
                                  }}
                                >
                                  {isLoading == true ? (
                                    <>
                                      <div style={{ width: "2rem", height: "1rem" }}>
                                        <Skeleton height={15} mt={6} width="100%" radius="xl" />
                                      </div>
                                    </>
                                  ) : algorithm.value === undefined
                                    ? "Sin registro"
                                    : algorithm.value.toLocaleString("es-MX")}
                                </div>
                              </div>
                            );
                          }
                        )}                    
                  </div>
                </div>
              </div>
              
            </section>
          </section>
        </section>
      </section>
      <DrawerNS opened={opened} close={close} values={drawerValues} setvalues={setDrawerValues} dto={dto} level={'OPE'} selectedAlgorithm={"COMPRESSOR_FAIL"} />
    </div>
  );
}


