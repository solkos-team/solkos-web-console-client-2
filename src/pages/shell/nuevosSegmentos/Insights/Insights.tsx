import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pathVerify } from '../../../../Functions/pathVerify';
import { fetchInsights, fetchUniversal } from '../../../../utils/apiUtils';
import PageFilter from '../../../../components/pageFilter';
import { Skeleton, Tooltip } from '@mantine/core';
import MapInsightsComponent from '../../../../components/mapInsights';
import { Insights as InsightsIT } from "../../../../interfaces/InsightsInterfaces";
import { InsightsData,CoolerInterface as Cooler } from '../../../../interfaces/CoolerInterface';
// import AlertIcon from '../../../../sampleData/NS/AlertsNS.svg';
// import FailIcon from '../../../../sampleData/NS/failNS.svg';
// import TransmitionIcon from '../../../../sampleData/NS/TransmitionNS.svg';
// import IconEquiposTransmitiendo from '../../../../sampleData/NS/TransmitionNSDrawer.svg'
// import IconEquiposNoTransmitiendo from "../../../../sampleData/NS/NoTransmitionNSDrawer.svg";
import { AlertIcon,FailIcon,TransmitionIcon,IconEquiposTransmitiendo,IconEquiposNoTransmitiendo } from './Icons';
import { DrawerNS } from './DrawerNS';
import { useDisclosure } from '@mantine/hooks';

export const Insights = () => {
  const [insightsData, setInsightsData] = useState<InsightsIT | null>(null);
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
      const data = await fetchUniversal("insights", body,setIsLoading);
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
    handleMapKeyChange();
  }, [dt, dto]);

  const filteredMarkers2 = insightsData?.geo_data  
  const IndicadoresData = insightsData?.insights?.INDICATOR?.algorithms.filter(data => data.class == "ASSET_MANAGEMENT_ACTIONABLE") || []
  const sum2 = IndicadoresData.reduce((prev, curr) => prev + curr.value, 0);
  insightsData?.summary.coolers.toLocaleString("es-MX") != null || insightsData?.summary.coolers.toLocaleString("es-MX") != undefined ? sessionStorage.setItem("TtlCoolers",insightsData?.summary.coolers.toLocaleString("es-MX")) : ''
  const [drawerValues,setDrawerValues] = useState({})
  const openDrawer = (icon,title)=>{
    setDrawerValues({icon:icon,title:title})
    open()
  }
  
  return (
    <div className="insights_principal_container">
      <PageFilter status={isLoading} />
      <br></br>
      <section className="insights_contenido_principal">
        <section className="insights_title">
          <div className="insights_title_h1">Cooler InsightsNS</div>
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
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Enfriadores</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {/* {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xl" />
                    </>
                  ) : insightsData?.summary.coolers === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.coolers.toLocaleString("es-MX")
                  )} */}
                  12
                </li>
              </div>
              {/* <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Rutas</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xl" />
                    </>
                  ) : insightsData?.summary.routes === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.routes.toLocaleString("es-MX")
                  )}
                </li>
              </div> */}
              {/* <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Unidad Op.</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xl" />
                    </>
                  ) : insightsData?.summary.operative_units === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.operative_units.toLocaleString("es-MX")
                  )}
                </li>
              </div> */}
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Regiones</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {/* {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xl" />
                    </>
                  ) : insightsData?.summary.regions === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.regions.toLocaleString("es-MX")
                  )} */}
                  1
                </li>
              </div>
              <div className="insights_mapa_info_datas_data">
                <li className="insights_mapa_info_datas_data_li">Zonas</li>
                <li className="insights_mapa_info_datas_data_li_value">
                  {/* {isLoading == true ? (
                    <>
                      <Skeleton height={15} mt={6} width="100%" radius="xl" />
                    </>
                  ) : insightsData?.summary.zones === undefined ? (
                    "Sin registro"
                  ) : (
                    insightsData?.summary.zones.toLocaleString("es-MX")
                  )} */}
                  1
                </li>
              </div>
            </div>
            {/* Mapa inf and filters */}
            <div className="insights_mapa_info_mapa_info">
              <h1 className="insights_mapa_info_mapa_info_h1">
                Visualización de enfriadores:
              </h1>
              {/* <div className="insights_mapa_info_mapa_filters"></div> */}
            </div>
            {/* Mapa */}
            <div className="insights_mapa_info_mapa">
              {<MapInsightsComponent items={items} data={insightsData?.geo_data} />}
            </div>
          </section>
          <section className="insights_datas">
            <section className="insights_datas_info">
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
                  <div className="insightsNS_datas_statusTransmition_data_data" onClick={()=>{openDrawer(IconEquiposTransmitiendo,'Equipos Transmitiendo')}}>
                    <div style={{width:'50%',backgroundColor:'#C0F2C8',borderRadius:'4px'}}>Transmitiendo</div>
                    <div>10</div>                    
                  </div>
                  <div className="insightsNS_datas_statusTransmition_data_data" onClick={()=>{openDrawer(IconEquiposNoTransmitiendo,'Equipos no transmitiendo')}}>
                    <div style={{width:'20%',backgroundColor:'#FFC7CD',borderRadius:'4px'}}>Sin Transmisión</div>
                    <div>2</div>                    
                  </div>
                </div>
              </div>
              <div className="insights_datas_kpi">
                <div className="insights_datas_kpi_title">
                  <img
                    src={"../../sampleData/status_park_icon.svg"}
                    alt="Descripción de la imagen"
                    style={{ width: "22px", height: "22px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">Estatus del parque</h1>
                </div>
                {/* Informacion KPI´s */}
                <div className="insights_datas_kpi_data">
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Transmitiendo
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {/* {isLoading == true ? (
                          <>
                            <Skeleton height={15} mt={6} width="40%" radius="xl" />
                          </>
                        ) : insightsData?.assets_analytics[3]?.percentage == undefined ? ("Sin registro")
                      : insightsData?.assets_analytics[3]?.percentage + '%'} */}
                      10
                    </div>                    
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Funcionando
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {/* {isLoading == true ? (
                          <>
                            <Skeleton height={15} mt={6} width="40%" radius="xl" />
                          </>
                        ) : insightsData?.assets_analytics[1]?.percentage == undefined ? ("Sin registro")
                      : insightsData?.assets_analytics[1]?.percentage + '%'} */}
                      8
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Falla
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {/* {isLoading == true ? (
                          <>
                            <Skeleton height={15} mt={6} width="40%" radius="xl" />
                          </>
                        ) : insightsData?.assets_analytics[2]?.percentage == undefined ? ("Sin registro")
                      : insightsData?.assets_analytics[2]?.percentage+'%'} */}
                      2
                    </div>
                  </div>
                  <div className="insights_datas_kpi_data_data">
                    <div className="insights_datas_kpi_data_data_1">
                      Atendidos
                    </div>
                    <div className="insights_datas_kpi_data_data_2">
                      {/* {isLoading == true ? (
                          <>
                            <Skeleton height={15} mt={6} width="40%" radius="xl" />
                          </>
                        ) : insightsData?.assets_analytics[2]?.percentage == undefined ? ("Sin registro")
                      : insightsData?.assets_analytics[2]?.percentage+'%'} */}
                      1
                    </div>
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
                    style={{ width: "22px", height: "22px" }}
                  />
                  <h1 className="insights_datas_kpi_title_h1">
                    Fallas
                  </h1>
                </div>
                {/* <div className="insigths_datas_info2_control_title">
                  <h1 className="insights_datas_kpi_title_h1_data">
                    {isLoading == true ? (
                      <>
                        <div style={{ width: "2rem", height: "1rem" }}>
                          <Skeleton height={15} mt={6} width="100%" radius="xl" />
                        </div>
                      </>
                    ) : sum2 == undefined && sum2 == undefined ? (
                      "Sin registro"
                    ) : (
                      sum2.toLocaleString("es-MX")
                    )}
                  </h1>
                  <h1 className="insights_datas_kpi_title_data_h1">
                    Total de enfriadores
                  </h1>
                </div> */}
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
                    {IndicadoresData
                    .sort((a, b) => {
                      const order = [
                        "Sin Riesgo",
                        "Visita PdV",
                        "Actualizar Info",
                        "Toma de Decisiones",
                        "Acciones urgentes"
                      ];
                      const indexA = order.indexOf(a.algorithm);
                      const indexB = order.indexOf(b.algorithm);
                      return indexA - indexB;
                    })
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
                              marginBottom:"16px",   
                              boxSizing:"border-box"
                              
                            }}
                          >
                            <div className="insights_datas_info_controlDeActivos_barras"
                              style={{
                                width: `${(algorithm.value / max) * 100
                                  }%`,
                                background: isLoading != true ? "#FFC7CD" : '',                
                              }}
                              onClick={()=>{openDrawer(IconEquiposTransmitiendo,'Equipos Transmitiendo')}}
                            >
                              <div className="insights_datas_info_mantenimiento_datos_barras_title">
                                {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton height={15} mt={6} width="100%" radius="xl" />
                              </div>
                            </>
                          ) : algorithm.algorithm === undefined
                                ? "Sin registro"
                                : algorithm.algorithm ===
                                "Toma de Decisiones"
                                  ? "Toma de Decisiones"
                                  : algorithm.algorithm ===
                                    "Actualizar Info"
                                  ? "Requiere Actualizar Información"
                                  : algorithm.algorithm ===
                                    "Sin Riesgo"
                                  ? "Sin Riesgo"
                                  : algorithm.algorithm ===
                                    "Visita PdV"
                                  ? "Visita Punto de Venta"
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
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center"
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
                    {/* <hr className="insights_datas_hr" style={{display: isLoading == true ? "none" : '' }}/>
                    <section 
                    className="insights_datas_mantenimiento_VerDetalles_principal"
                    style={{display: isLoading == true ? "none" : '' }}
                      onClick={() => navigate("/home/indicator")} >
                      <div className="insights_datas_mantenimiento_VerDetalles_h1">
                        Ver detalles
                      </div>
                      <img
                        src={"../../sampleData/arrow_b.png"}
                        alt="Descripción de la imagen"
                        style={{ marginTop: 4 }}
                      />
                    </section> */}
                  </div>
                </div>
              </div>
              <div className="insigths_datas_info2_mantenimiento">
                <div className="insigths_datas_info2_control_mantenimiento">
                  <div className="insigths_datas_info2_control_title">
                    <img
                      src={AlertIcon}
                      alt="Descripción de la imagen"
                      style={{ width: "22px", height: "22px" }}
                    />
                    <h1 className="insights_datas_kpi_title_h1">Alertas</h1>
                  </div>
                  {/* <div className="insigths_datas_info2_control_title">
                    <h1 className="insights_datas_kpi_title_h1_data">
                      {isLoading == true ? (
                        <>
                          <div style={{ width: "2rem", height: "1rem" }}>
                            <Skeleton height={15} mt={6} width="100%" radius="xl" />
                          </div>
                        </>
                      ) : insightsData?.insights?.ALERT?.total == undefined && insightsData?.insights?.FAIL?.total == undefined ? (
                        "Sin registro"
                      ) : (
                        (Number(insightsData?.insights?.ALERT?.total) + Number(insightsData?.insights?.FAIL?.total)).toLocaleString("es-MX")
                      )}
                    </h1>
                    <h1 className="insights_datas_kpi_title_data_h1">
                      Total de alertas
                    </h1>
                  </div> */}
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
                        className="insights_datas_info_mantenimiento_datos_barras">
                        <div className="insights_datas_info_mantenimiento_datos_barras_color_Fallas" style={{                           
                          width: `${((insightsData?.insights?.FAIL?.total||0)  / (Number(insightsData?.insights?.ALERT?.total) + Number(insightsData?.insights?.FAIL?.total))) * 100
                                  }%`,
                          backgroundColor: isLoading != true ? "#FEF5C7" :'',                           
                        }}  onClick={()=>{openDrawer(IconEquiposTransmitiendo,'Equipos Transmitiendo')}}>
                          <Tooltip label="Ver mas">
                            <div className="insights_datas_info_mantenimiento_datos_barras_title" onClick={()=>{openDrawer(IconEquiposTransmitiendo,'Equipos Transmitiendo')}}>
                            {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton height={15} mt={6} width="100%" radius="xl" />
                              </div>
                            </>
                          ) : insightsData?.insights?.FAIL?.level === undefined
                                ? "Sin registro"
                                : insightsData?.insights?.FAIL?.level ===
                                "FAIL"
                                ? "Fallas"
                                : ''}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="insights_datas_info_mantenimiento_datos_barras_cantidad">
                          {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton height={15} mt={6} width="100%" radius="xl" />
                              </div>
                            </>
                          ) : insightsData?.insights?.FAIL?.total === undefined ? (
                            "Sin registro"
                          ) : (
                            insightsData?.insights?.FAIL?.total.toLocaleString("es-MX")
                          )}
                        </div>
                      </div>
                      <div
                        key={2}
                        className="insights_datas_info_mantenimiento_datos_barras">
                        <div className="insights_datas_info_mantenimiento_datos_barras_color_Alertas" style={{                           
                          width: `${((insightsData?.insights?.ALERT?.total||0)  / (Number(insightsData?.insights?.ALERT?.total) + Number(insightsData?.insights?.FAIL?.total))) * 100
                                  }%`,
                          backgroundColor: isLoading != true ? "#fef5c7" : ''
                        }} onClick={()=>{openDrawer(IconEquiposTransmitiendo,'Equipos Transmitiendo')}}
                        >
                          <Tooltip label="Ver mas">
                            <div className="insights_datas_info_mantenimiento_datos_barras_title" onClick={()=>{openDrawer(IconEquiposTransmitiendo,'Equipos Transmitiendo')}}>
                            {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton height={15} mt={6} width="100%" radius="xl" />
                              </div>
                            </>
                          ) : insightsData?.insights?.ALERT?.level === undefined
                                ? "Sin registro"
                                : insightsData?.insights?.ALERT?.level ===
                                "ALERT"
                                ? "Alertas"
                                : ''}
                            </div>
                          </Tooltip>
                        </div>
                        <div className="insights_datas_info_mantenimiento_datos_barras_cantidad" 
                        >
                          {isLoading == true ? (
                            <>
                              <div style={{ width: "2rem", height: "1rem" }}>
                                <Skeleton height={15} mt={6} width="100%" radius="xl" />
                              </div>
                            </>
                          ) : insightsData?.insights?.ALERT?.total === undefined ? (
                            "Sin registro"
                          ) : (
                            insightsData?.insights?.ALERT?.total.toLocaleString("es-MX")
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
      <DrawerNS opened={opened} close={close} values={drawerValues} setvalues={setDrawerValues} />
    </div>
  )
}


