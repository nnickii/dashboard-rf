import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface ChartProps {
  title: string;
  data: { name: string; value: number }[];
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF",
  "#0096C7", "#2A9D8F", "#E76F51", "#E9C46A", "#6A0572"
];

const Chart: React.FC<ChartProps> = ({ title, data }) => {
  return (
    <div className="w-full text-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ percent, x, y }) => (
            <text
              x={x}
              y={y}
              fill="white"
              fontSize={18}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {(percent * 100).toFixed(0)}%
            </text>
          )}
          outerRadius={150} 
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" layout="horizontal" align="center" />
      </PieChart>
    </div>
  );
};

export default Chart;
