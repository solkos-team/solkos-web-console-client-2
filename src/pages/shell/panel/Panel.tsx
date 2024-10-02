import React, { useState, useEffect, useCallback } from "react";
import { tableauFetch } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import TableauReport from "tableau-react";
import PageFilter from "../../../components/pageFilter";
import { Loader, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Panel() {
  const navigate = useNavigate();

  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tab0");
  const [tabsEnabled, setTabsEnabled] = useState(true);

  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);

  const verifiedPath = dt.length === 0 ? [] : JSON.parse(dt);
  const region = verifiedPath[0] || "";
  const zone = verifiedPath[1] || "";
  const operative_unit = verifiedPath[2] || "";
  const route = verifiedPath[3] || "";

  const options = { height: "1200px", width: "100%" };
  const parameters = { region, management_zone: zone, operative_unit, route };

  const fetchToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const URL = "https://tableau.efemsa.com/trusted";
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        username: "solkos",
        server: "https://tableau.efemsa.com",
      });

      const response = await fetch(URL, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const token = await response.text();
      setData(token);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Sin conexión a internet.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Token fetching on tab change or path updates
  useEffect(() => {
    fetchToken();
  }, [fetchToken, region, zone, operative_unit, route]);

  // Navigation based on organization changes
  useEffect(() => {
    if (!["KOF", "KOF Colombia", "KOF Guatemala", "ECO"].includes(dto)) {
      navigate("/home");
    } else if (dto === "CALL CENTER") {
      navigate("/home/clt_callCenter");
    }
  }, [navigate, dto]);

  // Handle tabs and token refresh logic
  useEffect(() => {
    const handleTabChange = async () => {
      setTabsEnabled(false);
      await fetchToken();
      const timer = setTimeout(() => setTabsEnabled(true), 20000);

      return () => clearTimeout(timer);
    };
    handleTabChange();
  }, [activeTab, fetchToken]);

  const renderTableauReport = (url: string) => (
    <TableauReport
      url={url}
      token={data}
      options={options}
      parameters={parameters}
      query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
    />
  );

  return (
    <section>
      <PageFilter />
      <br />
      <div
        style={{
          display: "flex",
          padding: "16px",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
        }}
      >
        <text
          style={{
            color: "#000",
            fontSize: "1.5rem",
            fontWeight: 700,
            lineHeight: "140%",
            marginLeft: -55,
          }}
        >
          Tableros
        </text>
      </div>

      {dto === "KOF Colombia" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {[
                "Actividad del parque",
                "Control activos",
                "Lect Gerente",
                "% Parque reparado",
                "Cumplimiento mto",
                "Cumplimiento mto sucursal",
                "Cumplimiento mto piso",
                "Tiempo respuesta",
                "Reincidencia",
                "Equipos reincidentes",
                "Detalle O.S",
                "O.S por activo",
              ].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Actividadparque/ActividaddelParque"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab1">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Controlactivos/ControlActivos"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab2">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Lect_Gerente-Zona/Reportes/Solkos/_0"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab3">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/ParqueReparado/ParqueReparado"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab4">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Cumplimientomantenimiento/CumplimientoMtoanual"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab5">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Cumplimientomtosucursal/CumplimientoMtosucursal"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab6">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Cumplimientomtopiso/CumplimientoMtopiso"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab7">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Tiemporespuesta/TRMAo"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab8">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Reincidencia/Reincidencia"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab9">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Equiposreincidentes/Detalleequiposreincidentes"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab10">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/DetalleO_S/DetalleO_SMes"
                  )}
                </Tabs.Panel>
                <Tabs.Panel value="tab11">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/O_Sporactivo/O_Sporactivo"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : dto === "KOF" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {["Detalle de rutas"].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/KOF/Detalle_Rutas"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : dto === "KOF Guatemala" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {["Rutas"].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/KOFGuatemala/Detalle_Rutas"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : dto === "ECO" ? (
        <>
          <Tabs
            color="teal"
            value={activeTab || "tab0"}
            onTabChange={(value) => setActiveTab(value || "tab0")}
            style={{ width: "94%" }}
          >
            <Tabs.List className="tabs-list">
              {["Actividad del parque"].map((tab, index) => (
                <Tabs.Tab
                  key={index}
                  value={`tab${index}`}
                  style={{ fontSize: ".9vw" }}
                  disabled={!tabsEnabled}
                >
                  {tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {isLoading ? (
              <div style={{ marginTop: 30 }}>
                <Loader color="gray" size="xs" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Tabs.Panel value="tab0">
                  {renderTableauReport(
                    "https://tableau.efemsa.com/views/Eco/ECO"
                  )}
                </Tabs.Panel>
              </div>
            )}
          </Tabs>
        </>
      ) : (
        <div style={{ marginTop: 30 }}>
          No hay tableros disponibles para mostrar
        </div>
      )}
    </section>
  );
}
