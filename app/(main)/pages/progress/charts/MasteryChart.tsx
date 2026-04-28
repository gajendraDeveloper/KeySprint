"use client";

import React from 'react';

interface MasteryChartProps {
    data: any[];
}

const MasteryChart = ({ data }: MasteryChartProps) => {
    return (
        <div className="bg-white border border-zinc-200 p-8 rounded-[2.5rem] space-y-8 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900">Tool Mastery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="font-medium text-zinc-700">{cat.name}</span>
                            <span className="text-sm text-zinc-400">{cat.learned} / {cat.total} keys</span>
                        </div>
                        <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-600 transition-all duration-1000"
                                style={{ width: `${(cat.learned / cat.total) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MasteryChart;
