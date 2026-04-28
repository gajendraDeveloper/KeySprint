"use client";

import React from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { FiTrendingUp, FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface AccuracyChartProps {
    data: any[];
    improvement: number;
}

const AccuracyChart = ({ data, improvement }: AccuracyChartProps) => {
    return (
        <div className="bg-white border border-zinc-200 p-8 rounded-[2.5rem] space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <FiTrendingUp size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">Accuracy Trend</h3>
                </div>
                <div className={`flex items-center gap-1 ${improvement >= 0 ? 'text-green-600' : 'text-zinc-500'} text-sm font-bold`}>
                    {improvement >= 0 ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    <span>{Math.abs(improvement)}% {improvement >= 0 ? 'improvement' : 'decrease'}</span>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
                        <XAxis 
                            dataKey="timestamp" 
                            stroke="#a1a1aa" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(val) => {
                                const d = data.find(item => item.timestamp === val);
                                return d ? d.day : '';
                            }}
                        />
                        <YAxis 
                            stroke="#a1a1aa" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(val) => `${val}%`}
                        />
                        <Tooltip 
                            labelFormatter={(val) => {
                                const d = data.find(item => item.timestamp === val);
                                return d ? d.day : '';
                            }}
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e4e4e7', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="accuracy" 
                            stroke="#2563eb" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorAcc)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AccuracyChart;
