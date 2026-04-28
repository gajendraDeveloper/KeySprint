"use client";

import React, { useState, useEffect } from 'react';
import {
    FiTrendingUp,
    FiCalendar,
    FiChevronUp,
    FiZap,
    FiClock,
    FiTarget,
    FiBookOpen,
    FiChevronDown
} from 'react-icons/fi';
import { MdWhatshot } from 'react-icons/md';
import { useAuth } from '@/app/context/AuthContext';
import shortcutsData from '@/app/data/shortcuts.json';
import AccuracyChart from './charts/AccuracyChart';
import SpeedChart from './charts/SpeedChart';
import MasteryChart from './charts/MasteryChart';
import ProtectedRoute from '@/components/ProtectedRoute';
import CommonKpi from '@/components/commonUI/CommonKpi';

// Helper to get day name
const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default function ProgressPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [accuracyData, setAccuracyData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);

    useEffect(() => {
        if (user?.username) {
            const storageKey = `userStats_${user.username}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '{"sessions": [], "streak": 0}');

            if (data.sessions.length > 0) {
                // 1. Generate the last 7 calendar days
                const last7Days: any[] = [];
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toISOString().split('T')[0];
                    last7Days.push({
                        dateStr,
                        day: getDayName(dateStr),
                        sessions: []
                    });
                }

                // 2. Group existing sessions into these days
                data.sessions.forEach((s: any) => {
                    const sDateStr = s.date.split('T')[0];
                    const dayObj = last7Days.find(d => d.dateStr === sDateStr);
                    if (dayObj) {
                        dayObj.sessions.push(s);
                    }
                });

                // 3. Process chart data (Averaging multiple sessions per day)
                const chartData = last7Days.map((d, idx) => {
                    if (d.sessions.length > 0) {
                        const totalAcc = d.sessions.reduce((acc: number, s: any) => acc + s.accuracy, 0);
                        const totalSpeed = d.sessions.reduce((acc: number, s: any) => acc + s.avgTime, 0);
                        return {
                            day: d.day,
                            timestamp: new Date(d.dateStr).getTime() + idx, // Unique key
                            accuracy: Math.round(totalAcc / d.sessions.length),
                            speed: parseFloat((totalSpeed / d.sessions.length).toFixed(1))
                        };
                    }
                    return {
                        day: d.day,
                        timestamp: new Date(d.dateStr).getTime() + idx,
                        accuracy: 0,
                        speed: 0
                    };
                });
                setAccuracyData(chartData);

                // 4. Process mastery data (Overall remains the same)
                const toolStats: Record<string, { learned: number, total: number }> = {};
                Object.keys(shortcutsData).forEach(toolId => {
                    toolStats[toolId] = { 
                        learned: data.masteredShortcuts?.[toolId]?.length || 0, 
                        total: (shortcutsData as any)[toolId].length 
                    };
                });

                setCategoryData(Object.entries(toolStats).map(([id, info]) => ({
                    name: id.charAt(0).toUpperCase() + id.slice(1),
                    learned: info.learned,
                    total: info.total
                })));

                // 5. Calculate KPIs based on this 7-day period
                const activeDays = chartData.filter(d => d.accuracy > 0);
                const periodAccuracy = activeDays.length > 0 
                    ? activeDays.reduce((acc, d) => acc + d.accuracy, 0) / activeDays.length
                    : 0;
                const periodAvgTime = activeDays.length > 0 
                    ? activeDays.reduce((acc, d) => acc + d.speed, 0) / activeDays.length
                    : 0;
                
                let uniqueMasteredCount = 0;
                if (data.masteredShortcuts) {
                    uniqueMasteredCount = Object.values(data.masteredShortcuts)
                        .reduce((acc: number, ids: any) => acc + (ids?.length || 0), 0);
                }

                // Improvement: Compare last active day vs first active day in period
                let periodImprovement = 0;
                if (activeDays.length > 1) {
                    periodImprovement = activeDays[activeDays.length - 1].accuracy - activeDays[0].accuracy;
                }

                setStats({
                    overallAccuracy: Math.round(periodAccuracy),
                    streak: data.streak || 0,
                    totalLearned: uniqueMasteredCount,
                    avgResponse: parseFloat(periodAvgTime.toFixed(1)),
                    improvement: periodImprovement
                });
            }
        }
    }, [user]);

    if (!stats) {
        return (
            <ProtectedRoute>
                <div className="flex-1 bg-zinc-50 text-zinc-900 p-6 md:p-10 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">No practice data yet</h1>
                    <p className="text-zinc-500 mb-8">Complete a session to see your progress!</p>
                    <button
                        onClick={() => window.location.href = '/pages/dashboard'}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex-1 bg-zinc-50 text-zinc-900 p-6 md:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-zinc-900">Your Progress</h1>
                            <p className="text-zinc-500">Analyze your growth and muscle memory development.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-white border border-zinc-200 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm">
                                <FiCalendar size={16} className="text-zinc-400" />
                                <span className="text-sm font-medium">Last 7 Days</span>
                            </div>
                        </div>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <CommonKpi
                            label="PERIOD ACCURACY"
                            value={`${stats.overallAccuracy}%`}
                            icon={<FiTarget size={18} className="text-blue-600" />}
                            trend={stats.improvement >= 0 ? `+${stats.improvement}% this period` : `${stats.improvement}% this period`}
                            styleWrapper="bg-white border-zinc-200 shadow-sm"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                        <CommonKpi
                            label="CURRENT STREAK"
                            value={`${stats.streak} Days`}
                            icon={<MdWhatshot size={18} className="text-orange-500" />}
                            trend="Keep it going!"
                            styleWrapper="bg-white border-zinc-200 shadow-sm"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                        <CommonKpi
                            label="SHORTCUTS LEARNED"
                            value={stats.totalLearned.toString()}
                            icon={<FiBookOpen size={18} className="text-purple-600" />}
                            trend="Total correct answers"
                            styleWrapper="bg-white border-zinc-200 shadow-sm"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                        <CommonKpi
                            label="PERIOD SPEED"
                            value={`${stats.avgResponse}s`}
                            icon={<FiClock size={18} className="text-yellow-600" />}
                            trend="Avg. seconds per key"
                            styleWrapper="bg-white border-zinc-200 shadow-sm"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AccuracyChart data={accuracyData} improvement={stats.improvement} />
                        <SpeedChart data={accuracyData} />
                    </div>

                    {/* Mastery */}
                    <MasteryChart data={categoryData} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
