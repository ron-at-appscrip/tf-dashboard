"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "Jan",
    total: 2400,
  },
  {
    name: "Feb",
    total: 1398,
  },
  {
    name: "Mar",
    total: 9800,
  },
  {
    name: "Apr",
    total: 3908,
  },
  {
    name: "May",
    total: 4800,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 4300,
  },
  {
    name: "Aug",
    total: 5300,
  },
  {
    name: "Sep",
    total: 4900,
  },
  {
    name: "Oct",
    total: 6300,
  },
  {
    name: "Nov",
    total: 5400,
  },
  {
    name: "Dec",
    total: 7300,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value) => [`$${value}`, 'Revenue']}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}