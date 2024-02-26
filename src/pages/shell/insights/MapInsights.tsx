import React from "react";
import { Card, DonutChart, Title,Legend } from "@tremor/react";
import "./Insights.css";
export const MapInsights = ({falla}) => {
  const park_Status = [    
    {
      name: 'Funcionando',
      total: 0,      
    },
    {
      name: 'Falla',
      total: Number(falla),      
    },
    {
      name: 'Atendidos',
      total: 0,      
    }
  ];
  
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <div style={{width:"80%"}}>
      <DonutChart
        data={park_Status}
        category="total"
        index="name"        
        colors={['green', 'red','yellow']}
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
