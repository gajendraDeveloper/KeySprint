"use client";

import React from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { FiZap } from 'react-icons/fi';

interface SpeedChartProps {
    data: any[];
}

const SpeedChart = ({ data }: SpeedChartProps) => {
    return (
        <div className="bg-white border border-zinc-200 p-8 rounded-[2.5rem] space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                    <FiZap size={20} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Speed Improvement</h3>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
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
                            tickFormatter={(val) => `${val}s`}
                        />
                        <Tooltip 
                            labelFormatter={(val) => {
                                const d = data.find(item => item.timestamp === val);
                                return d ? d.day : '';
                            }}
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e4e4e7', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                            dataKey="speed" 
                            fill="#eab308" 
                            radius={[6, 6, 0, 0]} 
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpeedChart;
