import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isNegative?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, isNegative = false }) => {
  const trendColor = isNegative ? 'text-red-500' : 'text-green-500';
  
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="text-slate-400">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        <p className={`text-xs font-medium ${trendColor} mt-1`}>
          {trend} نسبت به ماه گذشته
        </p>
      </div>
    </div>
  );
};

export default MetricCard;