"use client";

import React from 'react';
import { 
    FiClock, 
    FiLogOut, 
    FiMaximize, 
    FiMinimize 
} from 'react-icons/fi';

interface GameHUDProps {
    toggleFullscreen: () => void;
    isFullscreen: boolean;
    onQuit: () => void;
    timeLeft: number;
    maxTime: number;
    currentIndex: number;
    totalQuestions: number;
    difficulty: string;
    isGameOver: boolean;
    feedback: 'correct' | 'wrong' | null;
}

const GameHUD = ({
    toggleFullscreen,
    isFullscreen,
    onQuit,
    timeLeft,
    maxTime,
    currentIndex,
    totalQuestions,
    difficulty,
    isGameOver,
    feedback
}: GameHUDProps) => {
    return (
        <>

            <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-full shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer text-xs md:text-sm font-bold"
                    >
                        {isFullscreen ? <FiMinimize size={18} /> : <FiMaximize size={18} />}
                        <span className="hidden md:inline">{isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen'}</span>
                    </button>
                    <button
                        onClick={onQuit}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-red-100 text-red-600 rounded-full shadow-sm hover:bg-red-50 transition-colors cursor-pointer text-xs md:text-sm font-bold"
                    >
                        <FiLogOut size={18} />
                        <span>Quit</span>
                    </button>
                </div>

                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Timer with integrated progress bar */}
                    <div className="relative flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full shadow-sm overflow-hidden min-w-[100px]">
                        <FiClock size={18} className={timeLeft < 2 ? 'text-red-500 animate-pulse' : 'text-zinc-400'} />
                        <span className={`font-mono font-bold w-12 text-center z-10 ${timeLeft < 2 ? 'text-red-500' : 'text-zinc-900'}`}>{timeLeft.toFixed(1)}s</span>
                        
                        {/* Integrated Progress Bar */}
                        {!isGameOver && !feedback && (
                            <div 
                                className={`absolute bottom-0 left-0 h-1 transition-all duration-100 ease-linear ${
                                    timeLeft < 2 ? 'bg-red-500' : 'bg-blue-600'
                                }`}
                                style={{ width: `${(timeLeft / maxTime) * 100}%` }}
                            />
                        )}
                    </div>

                    {/* Difficulty and Progress */}
                    <div className="flex flex-col items-end gap-0.5">
                        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span>Level:</span>
                            <span className={`
                                px-2 py-0.5 rounded-md text-[9px] border
                                ${difficulty === 'easy' ? 'bg-green-50 text-green-600 border-green-100' : 
                                  difficulty === 'hard' ? 'bg-red-50 text-red-600 border-red-100' : 
                                  'bg-yellow-50 text-yellow-600 border-yellow-100'}
                            `}>{difficulty}</span>
                        </div>
                        <div className="text-zinc-500 text-xs font-medium">
                            Progress: <span className="text-zinc-900 font-bold">{currentIndex + 1} / {totalQuestions}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameHUD;
