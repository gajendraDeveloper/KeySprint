"use client";

import React from 'react';
import { FiHome, FiZap } from 'react-icons/fi';
import { MdOutlineEmojiEvents } from 'react-icons/md';
import CommonButton from '@/components/commonUI/CommonButton';

interface ResultsModalProps {
    isGameOver: boolean;
    tool: string;
    score: number;
    totalQuestions: number;
    accuracy: number;
    onDashboard: () => void;
    onTryAgain: () => void;
}

const ResultsModal = ({
    isGameOver,
    tool,
    score,
    totalQuestions,
    accuracy,
    onDashboard,
    onTryAgain
}: ResultsModalProps) => {
    if (!isGameOver) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-900/60 backdrop-blur-sm">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-300 shadow-2xl">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <MdOutlineEmojiEvents size={40} className="text-blue-600" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-zinc-900">Session Complete!</h2>
                    <p className="text-zinc-500">You've finished the {tool} module.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-zinc-500 text-xs mb-1 uppercase tracking-wider font-bold">Score</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-xl font-bold text-zinc-900">{score} / {totalQuestions}</span>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-zinc-500 text-xs mb-1 uppercase tracking-wider font-bold">Accuracy</p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-xl font-bold text-zinc-900">{accuracy}%</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <CommonButton
                        label="Go to Dashboard"
                        onClick={onDashboard}
                        icon={<FiHome size={18} />}
                        styleButton="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
                    />
                    <CommonButton
                        label="Try Again"
                        onClick={onTryAgain}
                        icon={<FiZap size={18} />}
                        styleButton="w-full flex items-center justify-center gap-2 py-4 bg-zinc-100 text-zinc-900 font-bold rounded-2xl hover:bg-zinc-200 transition-colors cursor-pointer border border-zinc-200"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResultsModal;
