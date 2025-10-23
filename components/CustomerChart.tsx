import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChartData {
  name: string;
  'مشتریان جدید': number;
}

interface CustomerChartProps {
  data: ChartData[];
}

const CustomerChart: React.FC<CustomerChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -20, // Adjust to prevent Y-axis label cutoff
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} />
          <Tooltip wrapperStyle={{ direction: 'rtl', fontFamily: 'Vazirmatn', fontSize: '12px' }} />
          <Area type="monotone" dataKey="مشتریان جدید" stroke="#4338ca" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerChart;
