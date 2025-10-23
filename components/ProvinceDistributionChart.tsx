import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface ProvinceDistributionChartProps {
  data: ChartData[];
}

const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe', '#60a5fa', '#93c5fd', '#bfdbfe'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent * 100 < 5) return null; // Hide label for small slices

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const ProvinceDistributionChart: React.FC<ProvinceDistributionChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">داده‌ای برای نمایش وجود ندارد.</p>
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ direction: 'rtl', fontFamily: 'Vazirmatn' }} />
          <Legend wrapperStyle={{ fontFamily: 'Vazirmatn' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProvinceDistributionChart;
