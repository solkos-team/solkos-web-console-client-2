import React from 'react'
import { Card, DonutChart, Title } from "@tremor/react";
import './Insights.css'
export const MapInsights = () => {
    const cities = [
        {
            name: "New York",
            sales: 9800,
        },
        {
            name: "London",
            sales: 4567,
        },
        {
            name: "Hong Kong",
            sales: 3908,
        },
        {
            name: "San Francisco",
            sales: 2400,
        },
        {
            name: "Singapore",
            sales: 1908,
        },
        {
            name: "Zurich",
            sales: 1398,
        },
    ];

    const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
    // @tailwind base;
    // @tailwind components;
    // @tailwind utilities;

    return (                
            <DonutChart
                data={cities}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />                            
    )
}
