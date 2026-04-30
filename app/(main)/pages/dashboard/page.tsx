"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    FiTarget,
    FiZap,
    FiPlay,
    FiCode,
    FiFramer,
    FiFileText,
    FiCamera
} from 'react-icons/fi';
import { MdWhatshot, MdOutlineEmojiEvents } from 'react-icons/md';
import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import CommonKpi from '@/components/commonUI/CommonKpi';
import CommonButton from '@/components/commonUI/CommonButton';
import CommonCard from '@/components/commonUI/CommonCard';

const tools = [
    { id: 'vscode', name: 'VS Code', icon: <FiCode size={24} />, description: 'Master essential editor shortcuts' },
    { id: 'figma', name: 'Figma', icon: <FiFramer size={24} />, description: 'Design and prototyping keys' },
    { id: 'notion', name: 'Notion', icon: <FiFileText size={24} />, description: 'Quick navigation and blocks' },
    { id: 'photoshop', name: 'Photoshop', icon: <FiCamera size={24} />, description: 'Image editing and layers' },
];

const difficulties = [
    { id: 'easy', name: 'Easy', time: '7s', color: 'text-green-600' },
    { id: 'medium', name: 'Medium', time: '5s', color: 'text-yellow-600' },
    { id: 'hard', name: 'Hard', time: '3s', color: 'text-red-600' },
];

export default function Dashboard() {
    const router = useRouter();
    const { user } = useAuth();
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
    const [stats, setStats] = useState({
        streak: 0,
        accuracy: 0,
        totalMastered: 0,
        avgSpeed: 0,
        sessionsCount: 0
    });

    useEffect(() => {
        if (user?.username) {
            const storageKey = `userStats_${user.username}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '{"sessions": [], "streak": 0}');

            if (data.sessions.length > 0) {
                const totalAccuracy = data.sessions.reduce((acc: number, s: any) => acc + s.accuracy, 0);
                const totalAvgTime = data.sessions.reduce((acc: number, s: any) => acc + s.avgTime, 0);

                let uniqueMasteredCount = 0;
                if (data.masteredShortcuts) {
                    uniqueMasteredCount = Object.values(data.masteredShortcuts)
                        .reduce((acc: number, ids: any) => acc + (ids?.length || 0), 0);
                }

                setStats({
                    streak: data.streak || 0,
                    accuracy: Math.round(totalAccuracy / data.sessions.length),
                    totalMastered: uniqueMasteredCount,
                    avgSpeed: parseFloat((totalAvgTime / data.sessions.length).toFixed(1)),
                    sessionsCount: data.sessions.length
                });
            }
        }
    }, [user]);

    const handleStartTest = async () => {
        if (selectedTool) {
            try {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                }
            } catch (err) {
                console.warn("Fullscreen request failed or was blocked:", err);
            }
            router.push(`/pages/gameScreen?tool=${selectedTool}&difficulty=${selectedDifficulty}`);
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex-1 bg-zinc-50 text-zinc-900 p-6 md:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                            Welcome, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent capitalize">{user?.username || 'Trainer'}!</span>
                        </h1>
                        <p className="text-zinc-500">Track your performance and start a new practice session.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <CommonKpi
                            label="STREAK"
                            value={`${stats.streak} Days`}
                            icon={<MdWhatshot size={18} className="text-orange-500" />}
                            trend={stats.sessionsCount > 0 ? "Keep it up!" : "Start your first session"}
                            styleWrapper="bg-white border-zinc-200"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                        <CommonKpi
                            label="ACCURACY"
                            value={`${stats.accuracy}%`}
                            icon={<FiTarget size={18} className="text-blue-500" />}
                            trend={stats.sessionsCount > 1 ? "Across all sessions" : "Current average"}
                            styleWrapper="bg-white border-zinc-200"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                        <CommonKpi
                            label="TOTAL SHORTCUTS MASTERED"
                            value={stats.totalMastered.toString()}
                            icon={<MdOutlineEmojiEvents size={18} className="text-purple-500" />}
                            trend={`From ${stats.sessionsCount} sessions`}
                            styleWrapper="bg-white border-zinc-200"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                        <CommonKpi
                            label="AVG. SPEED"
                            value={`${stats.avgSpeed}s`}
                            icon={<FiZap size={18} className="text-yellow-600" />}
                            trend="Seconds per key"
                            styleWrapper="bg-white border-zinc-200"
                            styleLabel="text-zinc-500"
                            styleValue="text-zinc-900"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-zinc-900">Choose Your Tool</h2>
                            <span className="text-sm text-zinc-500">4 Tools Supported</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tools.map((tool) => (
                                <div
                                    key={tool.id}
                                    onClick={() => setSelectedTool(tool.id)}
                                    className={`cursor-pointer transition-all duration-300 ${selectedTool === tool.id
                                        ? 'ring-2 ring-blue-500 scale-[1.02]'
                                        : 'opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <CommonCard
                                        title={tool.name}
                                        description={tool.description}
                                        icon={tool.icon}
                                        styleCard="bg-white border border-zinc-200 p-6 rounded-2xl h-full flex flex-col items-start text-left shadow-sm"
                                        styleTitle="text-lg font-bold text-zinc-900 mt-4"
                                        styleDescription="text-zinc-500 text-sm"
                                        styleIcon="p-3 bg-zinc-100 rounded-lg text-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
                        <div className="space-y-4 w-full lg:w-auto">
                            <h3 className="text-lg font-medium text-zinc-900">Select Difficulty</h3>
                            <div className="flex flex-wrap gap-3 md:gap-4">
                                {difficulties.map((diff) => (
                                    <button
                                        key={diff.id}
                                        onClick={() => setSelectedDifficulty(diff.id)}
                                        className={`flex-1 sm:flex-initial px-4 md:px-6 py-3 rounded-xl border transition-all cursor-pointer ${selectedDifficulty === diff.id
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold">{diff.name}</span>
                                            <span className={`text-xs ${selectedDifficulty === diff.id ? 'text-blue-100' : 'text-zinc-400'}`}>{diff.time}/key</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-auto">
                            <CommonButton
                            title="First choose your tool and Difficulty level to start training"
                                label="Start Training"
                                onClick={handleStartTest}
                                disabled={!selectedTool}
                                icon={<FiPlay size={20} fill="currentColor" />}
                                styleButton={`flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all cursor-pointer ${selectedTool
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                                    }`}
                                styleLabel=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
