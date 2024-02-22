import React from "react";
import { Card, DonutChart, Title,Legend } from "@tremor/react";
import "./Insights.css";
export const MapInsights = () => {
  const park_Status = [
    {
      name: 'Analizados',
      total: 980,      
    },
    {
      name: 'Funcionando',
      total: 456,      
    },
    {
      name: 'Falla',
      total: 390,      
    },
    {
      name: 'Atendidos',
      total: 390,      
    }
  ];
  
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <div>
      <DonutChart
        data={park_Status}
        category="total"
        index="name"        
        colors={['blue', 'green', 'red','yellow']}
        className="w-20"
        showLabel
        // variant="pie"
      />
      {/* <Legend
        categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
        colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
        className="max-w-xs"
      /> */}

    </div>

  );
};
