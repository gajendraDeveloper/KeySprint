"use client";

import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

interface KeyboardVisualizerProps {
    showAnswer: boolean;
    currentShortcut: any;
    pressedKeys: Set<string>;
    feedback: 'correct' | 'wrong' | null;
    timeLeft: number;
}

const KeyboardVisualizer = ({
    showAnswer,
    currentShortcut,
    pressedKeys,
    feedback,
    timeLeft
}: KeyboardVisualizerProps) => {
    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex gap-2 md:gap-4 min-h-[80px] md:min-h-[120px] items-center justify-center flex-wrap">
                {showAnswer ? (
                    // Revealed Answer
                    currentShortcut?.keys?.map((key: string, idx: number) => (
                        <React.Fragment key={idx}>
                            <div className="min-w-[50px] h-[50px] md:min-w-[80px] md:h-[80px] px-3 md:px-6 rounded-xl md:rounded-2xl border-2 border-red-500 bg-red-50 text-red-600 flex items-center justify-center text-lg md:text-2xl font-bold animate-in fade-in zoom-in duration-300">
                                {key === "Control" ? "Ctrl" : key === "Shift" ? "⇧" : key === "Meta" ? "⌘" : key}
                            </div>
                            {idx < (currentShortcut?.keys?.length || 0) - 1 && (
                                <span className="text-zinc-300 text-xl md:text-3xl font-bold">+</span>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    // Interactive Input
                    Array.from({ length: currentShortcut?.keys?.length || 0 }).map((_, idx) => {
                        const pressedArray = Array.from(pressedKeys);
                        const currentPressed = pressedArray[idx];
                        return (
                            <React.Fragment key={idx}>
                                <div className={`
                                min-w-[50px] h-[50px] md:min-w-[80px] md:h-[80px] px-3 md:px-6 rounded-xl md:rounded-2xl border-2 flex items-center justify-center text-lg md:text-2xl font-bold transition-all duration-200
                                ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-600' :
                                        feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-600' :
                                            currentPressed ? 'border-blue-500 bg-blue-50 text-blue-600 scale-110 shadow-lg shadow-blue-500/10' :
                                                'border-zinc-200 bg-white text-zinc-300'}
                            `}>
                                    {currentPressed ? (currentPressed === "Control" ? "Ctrl" : currentPressed === "Shift" ? "⇧" : currentPressed === "Meta" ? "⌘" : currentPressed) : "?"}
                                </div>
                                {idx < (currentShortcut?.keys?.length || 0) - 1 && (
                                    <span className="text-zinc-200 text-xl md:text-3xl font-bold">+</span>
                                )}
                            </React.Fragment>
                        )
                    })
                )}
            </div>

            {/* Feedback Messages */}
            <div className="h-16 flex items-center justify-center">
                {feedback === 'correct' && (
                    <div className="flex items-center gap-2 text-green-600 animate-bounce">
                        <FiCheckCircle size={24} />
                        <span className="font-bold text-xl">Correct!</span>
                    </div>
                )}
                {feedback === 'wrong' && (
                    <div className="flex flex-col items-center gap-1 text-red-600">
                        <div className="flex items-center gap-2 animate-shake">
                            <FiXCircle size={24} />
                            <span className="font-bold text-xl">{timeLeft === 0 ? "Time's Up!" : "Incorrect Keys"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-500 text-sm mt-2">
                            <FiAlertCircle size={14} />
                            <span>Correct answer revealed above</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeyboardVisualizer;
