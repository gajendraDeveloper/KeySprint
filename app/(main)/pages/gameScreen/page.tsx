"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    FiClock,
    FiXCircle,
    FiCheckCircle,
    FiTarget,
    FiZap,
    FiHome,
    FiAlertCircle,
    FiMaximize,
    FiMinimize,
    FiLogOut
} from 'react-icons/fi';
import { MdOutlineEmojiEvents } from 'react-icons/md';
import CommonButton from '@/components/commonUI/CommonButton';
import shortcutsData from '@/app/data/shortcuts.json';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/app/context/AuthContext';

import GameHUD from './components/GameHUD';
import KeyboardVisualizer from './components/KeyboardVisualizer';
import ResultsModal from './components/ResultsModal';

function GameScreenContent() {
    const router = useRouter();
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const tool = (searchParams.get('tool') || 'vscode') as keyof typeof shortcutsData;
    const difficulty = searchParams.get('difficulty') || 'medium';

    const [shortcuts, setShortcuts] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [maxTime, setMaxTime] = useState(5);
    const [isGameOver, setIsGameOver] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(5);
    const [showAnswer, setShowAnswer] = useState(false);
    const [questionTimes, setQuestionTimes] = useState<number[]>([]);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [correctShortcutIds, setCorrectShortcutIds] = useState<number[]>([]);
    const [isFullscreen, setIsFullscreen] = useState(true);
    const [hasStarted, setHasStarted] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);
    const processingIndexRef = React.useRef(-1);

    const initGame = useCallback(() => {
        const data = (shortcutsData[tool] || shortcutsData.vscode).filter((s: any) => s.difficulty === difficulty);
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setShortcuts(shuffled);
        setTotalQuestions(shuffled.length);
        setIsNavigating(false);
        processingIndexRef.current = -1;
        setCurrentIndex(0);
        setScore(0);
        setFeedback(null);
        setPressedKeys(new Set());
        setIsGameOver(false);
        setShowAnswer(false);
        setCorrectShortcutIds([]);
        setQuestionTimes([]);

        const initialTime = difficulty === 'easy' ? 7 : difficulty === 'hard' ? 3 : 5;
        setTimeLeft(initialTime);
        setMaxTime(initialTime);
        setStartTime(Date.now());
    }, [tool, difficulty]);

    useEffect(() => {
        if (!hasStarted) return;
        initGame();
    }, [hasStarted, initGame]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(e => {
                console.error(`Error attempting to enable full-screen mode: ${e.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };



    const nextQuestion = useCallback(() => {
        if (isGameOver) return;

        setIsNavigating(false);

        const timeTaken = (Date.now() - startTime) / 1000;
        setQuestionTimes(prev => [...prev, timeTaken]);

        setCurrentIndex(prev => {
            if (prev < shortcuts.length - 1) {
                setPressedKeys(new Set());
                setFeedback(null);
                setShowAnswer(false);
                const nextTime = difficulty === 'easy' ? 7 : difficulty === 'hard' ? 3 : 5;
                setTimeLeft(nextTime);
                setMaxTime(nextTime);
                setStartTime(Date.now());
                return prev + 1;
            } else {
                setIsGameOver(true);
                return prev;
            }
        });
    }, [isGameOver, shortcuts.length, difficulty, startTime]);

    useEffect(() => {
        if (isGameOver || feedback || isNavigating) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0.1) {
                    if (processingIndexRef.current === currentIndex) return 0;
                    processingIndexRef.current = currentIndex;
                    setIsNavigating(true);
                    setFeedback('wrong');
                    setShowAnswer(true);
                    setTimeout(nextQuestion, 2000);
                    return 0;
                }
                return parseFloat((prev - 0.1).toFixed(1));
            });
        }, 100);

        return () => clearInterval(timer);
    }, [currentIndex, isGameOver, feedback, nextQuestion, isNavigating]);

    useEffect(() => {
        if (!hasStarted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.altKey || e.metaKey || (e.key.length > 1 && e.key !== 'Escape')) {
                e.preventDefault();
            }

            if (isGameOver || feedback || isNavigating || processingIndexRef.current === currentIndex) return;

            if (e.key === 'Escape') return;

            const key = e.key === " " ? "Space" : e.key;
            const currentShortcut = shortcuts[currentIndex];
            if (!currentShortcut) return;

            const newPressed = new Set(pressedKeys);
            newPressed.add(key);
            setPressedKeys(newPressed);

            const isCorrect = currentShortcut.keys.every((k: string) =>
                Array.from(newPressed).some(p => p.toLowerCase() === k.toLowerCase())
            );

            if (isCorrect) {
                processingIndexRef.current = currentIndex;
                setIsNavigating(true);
                setFeedback('correct');
                setScore(prev => prev + 1);
                setCorrectShortcutIds(prev => [...prev, currentShortcut.id]);
                setTimeout(nextQuestion, 1000);
            } else if (newPressed.size >= currentShortcut.keys.size) {
                const hasWrongKey = Array.from(newPressed).some(p =>
                    !currentShortcut.keys.some((k: string) => k.toLowerCase() === p.toLowerCase())
                );

                if (hasWrongKey) {
                    processingIndexRef.current = currentIndex;
                    setIsNavigating(true);
                    setFeedback('wrong');
                    setShowAnswer(true);
                    setTimeout(nextQuestion, 2500);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, shortcuts, pressedKeys, feedback, isGameOver, nextQuestion, hasStarted, isNavigating]);

    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    useEffect(() => {
        if (isGameOver && user?.username) {
            const avgTime = questionTimes.length > 0
                ? questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length
                : 0;

            const sessionData = {
                date: new Date().toISOString(),
                tool,
                difficulty,
                score,
                total: totalQuestions,
                accuracy,
                avgTime: parseFloat(avgTime.toFixed(2))
            };

            const storageKey = `userStats_${user.username}`;
            const existingStats = JSON.parse(localStorage.getItem(storageKey) || '{"sessions": []}');

            existingStats.sessions.push(sessionData);

            const dates = existingStats.sessions.map((s: any) => s.date.split('T')[0]);
            const uniqueDates = Array.from(new Set(dates)).sort() as string[];

            let streak = 0;
            if (uniqueDates.length > 0) {
                const today = new Date().toISOString().split('T')[0];
                let current = today;

                if (!uniqueDates.includes(today)) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    current = yesterday.toISOString().split('T')[0];
                }

                if (uniqueDates.includes(current)) {
                    streak = 1;
                    let checkDate = new Date(current);
                    while (true) {
                        checkDate.setDate(checkDate.getDate() - 1);
                        const prevDateStr = checkDate.toISOString().split('T')[0];
                        if (uniqueDates.includes(prevDateStr)) {
                            streak++;
                        } else {
                            break;
                        }
                    }
                }
            }

            existingStats.streak = streak;

            if (!existingStats.masteredShortcuts) {
                existingStats.masteredShortcuts = {};
            }
            if (!existingStats.masteredShortcuts[tool]) {
                existingStats.masteredShortcuts[tool] = [];
            }

            const currentMastered = new Set(existingStats.masteredShortcuts[tool]);
            correctShortcutIds.forEach(id => currentMastered.add(id));
            existingStats.masteredShortcuts[tool] = Array.from(currentMastered);

            localStorage.setItem(storageKey, JSON.stringify(existingStats));
        }
    }, [isGameOver, user, score, totalQuestions, accuracy, tool, difficulty, questionTimes, correctShortcutIds]);

    const currentShortcut = shortcuts[currentIndex];

    const handleQuit = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        router.push('/pages/dashboard');
    };

    if (hasStarted && shortcuts.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-zinc-900 gap-4">
                <p className="text-xl font-medium">No shortcuts found for {tool} in {difficulty} mode.</p>
                <CommonButton 
                    label="Go Back"
                    onClick={() => router.push('/pages/dashboard')}
                    icon={<FiHome size={18} />}
                    styleButton="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors cursor-pointer"
                />
            </div>
        );
    }

    if (hasStarted && !currentShortcut) {
        return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-zinc-900">Loading...</div>;
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-zinc-50 text-zinc-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <GameHUD 
                    toggleFullscreen={toggleFullscreen}
                    isFullscreen={isFullscreen}
                    onQuit={handleQuit}
                    timeLeft={timeLeft}
                    maxTime={maxTime}
                    currentIndex={currentIndex}
                    totalQuestions={totalQuestions}
                    difficulty={difficulty}
                    isGameOver={isGameOver}
                    feedback={feedback}
                />

                <div className="w-full max-w-4xl flex flex-col items-center gap-8 md:gap-12 z-10 mt-20 md:mt-0">
                    <div className="text-center space-y-2 md:space-y-4">
                        <h2 className="text-zinc-400 text-sm md:text-lg font-medium tracking-widest uppercase">Action to Perform</h2>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 px-4">
                            {currentShortcut?.action || 'Loading...'}
                        </h1>
                    </div>

                    <KeyboardVisualizer 
                        showAnswer={showAnswer}
                        currentShortcut={currentShortcut}
                        pressedKeys={pressedKeys}
                        feedback={feedback}
                        timeLeft={timeLeft}
                    />
                </div>

                <ResultsModal 
                    isGameOver={isGameOver}
                    tool={tool}
                    score={score}
                    totalQuestions={totalQuestions}
                    accuracy={accuracy}
                    onDashboard={handleQuit}
                    onTryAgain={initGame}
                />
            </div>
        </ProtectedRoute>
    );
}

export default function GameScreen() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-50 flex items-center justify-center text-zinc-900">Loading game...</div>}>
            <GameScreenContent />
        </Suspense>
    );
}
