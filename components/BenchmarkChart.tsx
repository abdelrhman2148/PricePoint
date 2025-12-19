import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';
import { PricingBenchmark, UserTier } from '../types';

interface BenchmarkChartProps {
  data: PricingBenchmark;
  tier: UserTier;
}

const BenchmarkChart: React.FC<BenchmarkChartProps> = ({ data, tier }) => {
  const isFree = tier === 'FREE';

  // Prepare data for the chart
  const chartData = [
    { name: 'Low', price: data.low, desc: 'Bottom 15%', color: '#94a3b8' },
    { name: 'Median', price: data.median, desc: 'Market Avg', color: '#3b82f6' },
    { name: 'High', price: data.high, desc: 'Top Earners', color: '#16a34a' },
    { name: 'Elite', price: data.elite, desc: 'Luxury', color: '#1e293b' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // If user is free, they can only see Median detail, hide others? 
      // Actually, strategy is to show ranges but blur the High/Elite numbers on the axis or tooltip
      // For MVP, we show the tooltip but blur the specific high/elite text if free
      const isBlurred = isFree && (label === 'High' || label === 'Elite');

      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-bold text-slate-800">{label}</p>
          <p className="text-sm text-slate-500">{payload[0].payload.desc}</p>
          <p className={`text-lg font-bold text-blue-600 mt-1 ${isBlurred ? 'blur-sm select-none' : ''}`}>
             ${payload[0].value} <span className="text-xs font-normal text-slate-400">/{data.unit}</span>
          </p>
          {isBlurred && <p className="text-xs text-orange-500 font-bold mt-1">Upgrade to see</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            hide={true} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="price" radius={[8, 8, 0, 0]} barSize={50}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                opacity={(isFree && (entry.name === 'High' || entry.name === 'Elite')) ? 0.3 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BenchmarkChart;
