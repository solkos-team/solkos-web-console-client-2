import React, { useEffect, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Drawer, MultiSelect } from "@mantine/core";
import { BarChart, Card } from "@tremor/react";
import { GastosEnergia, PromedioConsumoEnergia } from "../../sampleData/icons";
import { RightArrowIcon } from "../../sampleData/Detail/DrawerGastosEnergia/DrawerGastosDeEnergia";

export default function DrawerEnergy({ opened, onClose, coolersData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };

  const mes1 = new Date(
    coolersData?.properties.energy_consumption_month_1.timestamp
  );
  const mes11 = mes1.toLocaleString("es-MX", { month: "long" });
  const mes2 = new Date(
    coolersData?.properties?.energy_consumption_month_2.timestamp
  );
  const mes22 = mes2.toLocaleString("es-MX", { month: "long" });
  const mes3 = new Date(
    coolersData?.properties?.energy_consumption_month_3.timestamp
  );
  const mes33 = mes3.toLocaleString("es-MX", { month: "long" });
  const chartdata = [
    {
      name: mes33,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_3
        .value === undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_3.value
      ).toFixed(2),
    },
    {
      name: mes22,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_2
        .value === undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_2.value
      ).toFixed(2),
    },
    {
      name: mes11,
      "Consumo de energía": (coolersData?.properties?.energy_consumption_month_1
        .value === undefined
        ? 0
        : coolersData?.properties?.energy_consumption_month_1.value
      ).toFixed(2),
    },
  ];

  const valueFormatter = (number) =>
    ` ${new Intl.NumberFormat("es-MX").format(number).toString()} KW/h`;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={<div style={{ color: 'var(--other-black, #000)', fontSize: '1.375rem', fontStyle: 'normal', fontWeight: '500', lineHeight: '140%' }}>Gastos de energía</div>}
      position="bottom"
      size="35rem"
      className="drawerDetail"
    >
      <section className="clt_detail_drawer_energy">
        <section className="clt_detail_drawer_energy_data">
          <div style={{ width: '100%', height: '20%', backgroundColor: '', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '1.625rem', height: '100%', backgroundColor: 'var(--kasmir-2, #C7CBD2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={PromedioConsumoEnergia} alt="" style={{ height: '100%' }} />
            </div>
            <div style={{ width: 'max-content', height: 'max-content', fontSize: '1rem', color: 'var(--other-black, #000)', fontWeight: '400' }}>Promedio de consumo de energía diario</div>
          </div>
          <div style={{ width: '100%', height: '10%', backgroundColor: '', color: 'var(--gray-6, #868E96)', fontSize: '0.75rem', fontWeight: '400' }}>Visión general del rendimiento energético.</div>
          <div className="clt_detail_drawer_energy_options1">
            <div className="clt_detail_drawer_energy_options1_grafico" style={{ width: '32%', height: '100%', backgroundColor: '' }}></div>
            <div className="clt_detail_drawer_energy_options1_data">
              <section style={{ width: '100%', height: '50%', backgroundColor: '', display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                <div style={{ width: '50%', height: '100%', backgroundColor: '', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: 'var(--gray-7, #495057)', fontSize: '0.875rem', fontWeight: '400' }}>Costo en energía</div>
                  <div style={{ color: 'var(--other-black, #000)', fontSize: '1rem', fontWeight: '700' }}>
                    {coolersData?.properties?.energy_cost.value === undefined
                      ? "Sin registro"
                      : "$" +
                      `${coolersData?.properties?.energy_cost.value.toLocaleString(
                        "es-MX"
                      )}`}
                  </div>
                </div>
                <div style={{ width: '50%', height: '100%', backgroundColor: '' }}>
                  <div style={{ color: 'var(--gray-7, #495057)', fontSize: '0.875rem', fontWeight: '400' }}>Referencia de consumo</div>
                  <div style={{ color: 'var(--other-black, #000)', fontSize: '1rem', fontWeight: '700' }}>
                    {coolersData?.properties?.power_consumption_reference
                      .value === undefined
                      ? "Sin registro"
                      : (coolersData?.properties?.power_consumption_reference.value).toFixed(
                        2
                      ) +
                      " " +
                      "KW/h"}
                  </div>
                </div>
              </section>
              <div style={{ width: '100%', height: '50%', backgroundColor: '', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--gray-7, #495057)', fontSize: '0.875rem', fontWeight: '400' }}>Promedio de emisiones ce C02</div>
                <div style={{ color: 'var(--other-black, #000)', fontSize: '1rem', fontWeight: '700' }}>
                  {coolersData?.properties?.average_C02_emissions.value ===
                    undefined
                    ? "Sin registro"
                    : `${(coolersData?.properties?.average_C02_emissions.value).toFixed(
                      2
                    ) +
                    " " +
                    "Kg/día"
                    }`}
                </div>
              </div>
            </div>
            <div className="clt_detail_drawer_energy_options1_link">
              <a 
              href="https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/PequenaDemandaBT.aspx"
              target="_blank"
              style={{ width: 'max-content', height: 'fit-content', display: 'flex', gap: '0.625rem', backgroundColor: '' }}>
                <div style={{ color: 'var(--blue-6, #2393F4)', fontSize: '0.875rem', fontWeight: '400' }}>
                  Ver referencias de la CFE
                </div>
                <img src={RightArrowIcon} alt="RightArrowIcon" />
              </a>
            </div>
          </div>
        </section>
        <section className="clt_detail_drawer_energy_grap">
          <div style={{ width: '100%', height: '10%', backgroundColor: '', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '1.625rem', height: '100%', backgroundColor: 'var(--kasmir-2, #C7CBD2)', borderRadius: '4px' }}>
              <img src={PromedioConsumoEnergia} alt="" />
            </div>
            <div style={{ width: 'max-content', height: 'max-content', fontSize: '1rem', color: 'var(--other-black, #000)', fontWeight: '400' }}>Consumo de energía por mes</div>
          </div>
          <div style={{ width: '100%', height: '10%', backgroundColor: '', color: ' var(--gray-6, #868E96)', fontSize: '0.75rem', fontWeight: '400' }}>Consumo de energía consumida durante el mes:</div>
          {/* Select data grafico */}
          <div style={{ width: '100%', height: '15%', backgroundColor: '', display: 'flex' }}>
            <MultiSelect
              placeholder="Selecciona mes"
              data={['Junio', 'Julio', 'Agosto']}
              clearable
              style={{ width: 'auto', height: '100%' }}
              disabled
            />
          </div>
          {/* Grafico */}
          <div style={{ width: '100%', height: '65vh', backgroundColor: '' }}>
            <BarChart
              style={{ width: '100%', height: '100%' }}
              data={chartdata}
              index="name"
              categories={["Consumo de energía"]}
              colors={["blue"]}
              valueFormatter={valueFormatter}
              yAxisWidth={100}
            />
          </div>
        </section>
      </section>
    </Drawer>
  );
}
